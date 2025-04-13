import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const Account = () => {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleExitApp = () => {
    BackHandler.exitApp(); // Ferme l'application sur Android
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      {/* Flou en arrière-plan */}
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />

      {/* Rectangle Profil */}
      <TouchableOpacity
        style={[styles.rectItem, styles.rectBlue]}
        onPress={() => handleNavigate('Profil')}
      >
        <Ionicons name="person-outline" size={28} color="#fff" />
        <Text style={styles.label}>Profil utilisateur</Text>
      </TouchableOpacity>

      {/* Rectangle Fonctionnalités */}
      <TouchableOpacity
        style={[styles.rectItem, styles.rectViolet]}
        onPress={() => handleNavigate('Fonctionnalites')}
      >
        <Ionicons name="construct-outline" size={28} color="#fff" />
        <Text style={styles.label}>Autres fonctionnalités</Text>
      </TouchableOpacity>

      {/* Rectangle Paramètres */}
      <TouchableOpacity
        style={[styles.rectItem, styles.rectRose]}
        onPress={() => handleNavigate('Parametres')}
      >
        <Ionicons name="settings-outline" size={28} color="#fff" />
        <Text style={styles.label}>Paramètres</Text>
      </TouchableOpacity>

      {/* Bouton Quitter */}
      <TouchableOpacity style={styles.exitButton} onPress={handleExitApp}>
        <Ionicons name="exit-outline" size={20} color="#fff" />
        <Text style={styles.exitLabel}>Deconnexion</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  rectItem: {
    width: '85%',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  rectBlue: {
    backgroundColor: '#3498db',
  },
  rectViolet: {
    backgroundColor: '#8e44ad',
  },
  rectRose: {
    backgroundColor: '#e91e63',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
    fontFamily: 'Raleway',
  },
  exitButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
  },
  exitLabel: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default Account;
