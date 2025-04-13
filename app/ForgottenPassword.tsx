import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

const fetchFonts = () => {
  return Font.loadAsync({
    'space-mono': require('../assets/fonts/Times New Normal Regular.ttf'), // Chemin vers votre fichier de police
  });
};

const ForgottenPassword = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSend = () => {
    // Logique pour envoyer le code de réinitialisation
    if (isPhoneMode) {
      // Valider le numéro de téléphone
      if (!phoneNumber) {
        setErrorMessage('Veuillez entrer un numéro de téléphone valide.');
        return;
      }
      // Envoyer le code par téléphone ici
    } else {
      // Valider l'adresse e-mail
      if (!email) {
        setErrorMessage('Veuillez entrer une adresse e-mail valide.');
        return;
      }
      // Envoyer le code par e-mail ici
    }
    // Réinitialiser les champs
    setEmail('');
    setPhoneNumber('');
    setErrorMessage('');
    // Logique pour continuer après l'envoi
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
      source={require('../assets/images/imgfond4.png')} // Chemin vers votre image
      style={styles.background}
      resizeMode="cover" // Permet de couvrir tout l'écran
    >
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {!isPhoneMode ? (
        <>
          <View style={styles.overlay}>
          <Text style={[styles.title, { fontFamily: 'space-mono' }]}>Mot de passe oublié</Text>
          <Text style={[styles.label, { fontFamily: 'space-mono' }]}>Entrez votre adresse e-mail :</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Adresse e-mail" 
            placeholderTextColor="rgba(172, 153, 153, 0.7)"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, { fontFamily: 'space-mono' }]}
              onPress={handleSend}>Envoyer un mot de passe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Text style={[styles.linkText, { fontFamily: 'space-mono' }]}
              onPress={() => setIsPhoneMode(true)}>Envoyer par téléphone</Text>
          </TouchableOpacity>
      </View>
        </>) : (
        <>
          <View style={styles.overlay}>
          <Text style={[styles.title, { fontFamily: 'space-mono' }]}>Mot de passe oublié</Text>
          <Text style={[styles.label, { fontFamily: 'space-mono' }]}>Entrez votre numéro de telephone:</Text>
          <TextInput 
            style={styles.input}
            placeholderTextColor="rgba(172, 153, 153, 0.7)"
            placeholder="Numéro de téléphone"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, { fontFamily: 'space-mono' }]}
              onPress={handleSend}>Envoyer un mot de passe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Text style={[styles.linkText, { fontFamily: 'space-mono' }]}
              onPress={() => setIsPhoneMode(false)}>Utiliser une adresse mail</Text>
          </TouchableOpacity>
      </View>
        </>)}
      
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
    backgroundColor: 'rgba(217, 217, 217, 0.1)', // Pour un effet de superposition
    padding: 20,
    borderRadius: 30,
    width: '80%', // Ajustez la largeur
    height: '70%', // Ajustez la hauteur
    
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'semibold',
    marginBottom: 65,
    textAlign: 'center',
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white', // Pour le texte de l'input
  },
  button: {
    backgroundColor: 'rgba(102, 90, 90, 0.22)',
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    color: 'black', // Couleur du texte
    fontSize: 16,
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline', // Souligner
  },
  error: {
    color: 'red',
    
  },
});

export default ForgottenPassword;