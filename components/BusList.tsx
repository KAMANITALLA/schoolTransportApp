// components/BusList.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Bus = {
  id: number;
  immatriculation: string;
  capacite: number;
  actif: boolean;
  lat: number;
  lon: number;
};

type Props = {
  busList: Bus[];
  onBusSelect: (bus: Bus) => void;
  onClose: () => void;
};

const BusList: React.FC<Props> = ({ busList, onBusSelect, onClose }) => {
  const handleItemPress = (bus: Bus) => {
    if (typeof bus.lat !== 'number' || typeof bus.lon !== 'number') {
      Alert.alert('Erreur', "Coordonnées invalides pour ce bus.");
      return;
    }

    onBusSelect(bus);
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <ScrollView>
              {busList?.map((bus, index) => (
                <TouchableOpacity key={index} onPress={() => handleItemPress(bus)} style={styles.itemContainer}>
                  <Ionicons
                    name="bus"
                    size={24}
                    color={bus.actif ? 'green' : 'red'}
                    style={styles.icon}
                  />
                  <Text style={styles.itemText}>
                    Le "{bus.immatriculation}"("{bus.capacite}")
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    position: 'absolute',
    top: 410,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default BusList;
