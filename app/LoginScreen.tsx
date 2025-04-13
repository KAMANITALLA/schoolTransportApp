// app/LoginScreen.tsx
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';//Importation de React Navigation

const fetchFonts = () => {
  return Font.loadAsync({
    'space-mono': require('../assets/fonts/Times New Normal Regular.ttf'),
  });
};

const LoginScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const validEmail = '1';
      const validPassword = 'qwerty';

    // Réinitialiser le message d'erreur
    setErrorMessage('');

    if (email !== validEmail && password !== validPassword) {
      setErrorMessage('informations erronées');
    } else if (email !== validEmail) {
      setErrorMessage('identifiant erroné');
    } else if (password !== validPassword) {
      setErrorMessage('mot de passe erroné');
    } else {
        setEmail('');
        setPassword('');
      // Naviguer vers Accueil si les informations sont correctes
        navigation.navigate('Accueil');
    }
  };

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
      <Text style={[styles.title, { fontFamily: 'space-mono' }]}>Connexion</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Text style={[styles.label, { fontFamily: 'space-mono' }]}>Entrez l' identifiant de connexion :</Text>
        <TextInput style={styles.input}
          placeholder="Identifiant"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { fontFamily: 'space-mono' }]}>Entrez votre mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={password}
        onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}
            onPress={handleLogin}>
            {/*<Button style={[styles.buttonText, { fontFamily: 'space-mono' }]}
                title="Valider" onPress={handleLogin} />*/}
          <Text style={[styles.buttonText, { fontFamily: 'space-mono' }]}>Valider</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link}
            onPress={() => navigation.navigate('Récupération')}>
          <Text style={[styles.linkText, { fontFamily: 'space-mono' }]}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={[styles.linkText, { fontFamily: 'space-mono' }]}
            onPress={() => navigation.navigate('Roles')}>Créer un compte</Text>
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
    fontSize: 32,
    fontWeight: 'semibold',
    marginBottom: 55,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginBottom: 2,
  },
  button: {
    backgroundColor: 'rgba(102, 90, 90, 0.22)',
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;