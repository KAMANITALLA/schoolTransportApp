import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

const fetchFonts = () => {
  return Font.loadAsync({
    'space-mono': require('../assets/fonts/Times New Normal Regular.ttf'),
  });
};

const Selection = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/imgfond4.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={[styles.title, { fontFamily: 'space-mono' }]}>Sélectionnez votre catégorie :</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Informations')}>
          <Text style={[styles.buttonText, { fontFamily: 'space-mono' }]}>Étudiant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
          <Text style={[styles.buttonText, { fontFamily: 'space-mono' }]}>Parent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
          <Text style={[styles.buttonText, { fontFamily: 'space-mono' }]}>Interne</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(217, 217, 217, 0.21)',
    padding: 20,
    borderRadius: 30,
    width: '80%',
    height: '70%',
    paddingVertical: 30,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'semibold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(102, 90, 90, 0.22)',
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Selection;