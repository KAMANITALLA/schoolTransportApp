import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import ArretList from '../components/ArretList';
import BusList from '../components/BusList';
import { astar } from '../components/astar';
import { useNavigation } from '@react-navigation/native';
import polyline from '@mapbox/polyline';

const Accueil = () => {
  const [showBusList, setShowBusList] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const [selectedBus, setSelectedBus] = useState<any | null>(null);
  const [busLat, setBusLat] = useState<number | null>(null);
  const [busLong, setBusLong] = useState<number | null>(null);
  const [showArretList, setShowArretList] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [routesCoords, setRoutesCoords] = useState<any[]>([]);

  const navigation = useNavigation();
  const mapRef = useRef<MapView | null>(null);

  const [region, setRegion] = useState({
    latitude: 4.0511,
    longitude: 9.7085,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [stops, setStops] = useState<any[]>([]);
  const [highlightedStop, setHighlightedStop] = useState(null);

  useEffect(() => {
    initLocation();
    fetchStops();
  }, []);

  const initLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission refusée pour accéder à la localisation.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setUserLocation({ latitude, longitude });
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const centerMapOnUser = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setUserLocation({ latitude, longitude });

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const fetchStops = async () => {
    try {
      const response = await fetch('http://192.168.214.77:3000/api/arrets');
      const data = await response.json();

      const formattedStops = data.map((stop) => ({
        id: stop.idarret,
        intitule: stop.intitule,
        latposition: stop.latposition,
        longposition: stop.longposition,
      }));

      setStops(formattedStops);
      if (data.length > 0) {
        const first = data[0];
        setBusLat(Number(first.latposition));
        setBusLong(Number(first.longposition));
      }

      console.log('Arrêts chargés :', formattedStops);
    } catch (error) {
      console.error('Erreur de chargement des arrêts :', error);
    }
  };

  const fetchBuses = async () => {
    try {
      const data = [
        {
          id: 999,
          immatriculation: 'Bus 1',
          capacite: 50,
          actif: true,
          latitude: 4.0831079320738,
          longitude: 9.7803245984320
        }
      ];

      const formattedBuses = data.map((bus) => ({
        id: bus.id,
        immatriculation: bus.immatriculation,
        capacite: bus.capacite,
        actif: bus.actif,
        lat: Number(bus.latitude) || 4.06,
        lon: Number(bus.longitude) || 9.71,
      }));

      setBuses(formattedBuses);
      console.log('Bus chargés :', formattedBuses);
    } catch (error) {
      console.error('Erreur de chargement des bus :', error);
    }
  };

  const handleStopSelect = (stop) => {
    const lat = Number(stop.latposition);
    const lon = Number(stop.longposition);

    if (isNaN(lat) || isNaN(lon)) {
      console.warn('Coordonnées invalides pour le stop sélectionné :', stop);
      return;
    }

    const newRegion = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    setHighlightedStop(stop);

    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }

    setTimeout(() => setHighlightedStop(null), 60000);
  };

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    const newRegion = {
      latitude: bus.lat,
      longitude: bus.lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);

    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const toggleRoutes = async () => {
    if (showRoutes) {
      setRoutesCoords([]);
      setShowRoutes(false);
      return;
    }

    const coordsList: any[] = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i];
      const to = stops[i + 1];
      try {
        const apiKey = 'AIzaSyCUpmaNnnqvxalk2FZojDoUwjIEUxZiu18';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from.latposition},${from.longposition}&destination=${to.latposition},${to.longposition}&key=${apiKey}`;
        const res = await fetch(url);
        const json = await res.json();
        const points = json.routes[0]?.overview_polyline?.points;
        if (points) {
          const decoded = polyline.decode(points);
          coordsList.push(...decoded.map(([lat, lon]) => ({ latitude: lat, longitude: lon })));
        }
      } catch (err) {
        console.error('Erreur API Google Maps :', err);
      }
    }
    setRoutesCoords(coordsList);
    setShowRoutes(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={24} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Faire une recherche"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      <MapView style={styles.map} region={region} ref={mapRef}>
        {userLocation && (
          <Marker coordinate={userLocation} title="Vous êtes ici">
            <Ionicons name="location" size={35} color="red" />
          </Marker>
        )}

        {stops.map((stop) => {
          const lat = Number(stop.latposition);
          const lon = Number(stop.longposition);
          if (isNaN(lat) || isNaN(lon)) return null;

          const isHighlighted = highlightedStop?.id === stop.id;

          return (
            <Marker
              key={`stop-${stop.id}`}
              coordinate={{ latitude: lat, longitude: lon }}
              title={stop.intitule}
              pinColor={isHighlighted ? 'deeppink' : 'purple'}
            />
          );
        })}

        {buses.map((bus) => (
          <Marker
            key={`bus-${bus.id}`}
            coordinate={{ latitude: bus.lat, longitude: bus.lon }}
            title={`Bus ${bus.immatriculation}`}
          >
            <Ionicons name="bus" size={30} color={bus.actif ? 'green' : 'red'} />
          </Marker>
        ))}

        {busLat && busLong && (
          <Marker
            coordinate={{ latitude: busLat, longitude: busLong }}
            title="Bus (initial)"
          >
            <Ionicons name="bus" size={30} color="green" />
          </Marker>
        )}

        {selectedBus && (
          <Marker
            coordinate={{ latitude: selectedBus.lat, longitude: selectedBus.lon }}
            title={`Bus sélectionné`}
          >
            <Ionicons name="bus" size={30} color="green" />
          </Marker>
        )}

        {showRoutes && routesCoords.length > 0 && (
          <Polyline
            coordinates={routesCoords}
            strokeColor="#00BFFF"
            strokeWidth={4}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.updateLocationButton} onPress={centerMapOnUser}>
        <Ionicons name="locate" size={30} color="blue" />
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setShowArretList(!showArretList)}>
          <Ionicons name="golf" size={24} color="white" />
          <Text style={styles.navText}>Arrêt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            fetchBuses();
            setShowBusList(!showBusList);
          }}
        >
          <Ionicons name="bus" size={24} color="white" />
          <Text style={styles.navText}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={toggleRoutes}>
          <Ionicons name="map" size={24} color="white" />
          <Text style={styles.navText}>Itinéraire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.navText}>Compte</Text>
        </TouchableOpacity>
      </View>

      {showArretList && (
        <ArretList
          stops={stops}
          onStopSelect={handleStopSelect}
          onClose={() => setShowArretList(false)}
        />
      )}
      {showBusList && (
        <BusList
          busList={buses}
          onBusSelect={handleBusSelect}
          onClose={() => setShowBusList(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, marginTop: 60 },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  searchInputContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 10,
  },
  searchInput: {
    height: 50,
    width: '90%',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  searchIcon: { paddingHorizontal: 10 },
  updateLocationButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    zIndex: 2,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    paddingVertical: 10,
    width: '100%',
    elevation: 10,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    height: 70,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Accueil;
