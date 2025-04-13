// components/AppNavigator.tsx
import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/LoginScreen'; // Écran de connexion
import ForgottenPassword from '../app/ForgottenPassword'; // Écran pour mot de passe oublié
import Accueil from '../app/Accueil'; // Écran d'accueil
import Register from '../app/Register'; // Écran d'inscription
import Selection from '../app/Selection';   // Écran de sélection de rôle
import Account from'./Account'; // Écran de compte
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'space-mono': require('../assets/fonts/Times New Normal Regular.ttf'),
  });
};

const AppNavigator = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Récupération" component={ForgottenPassword} options={{ headerShown: false }}/>
          <Stack.Screen name="Roles" component={Selection} options={{ headerShown: false }}/>
          <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
          <Stack.Screen name="Informations" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
    
});

export default AppNavigator;