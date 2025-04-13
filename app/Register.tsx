import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône

const fetchFonts = () => {
  return Font.loadAsync({
    'space-mono': require('../assets/fonts/Times New Normal Regular.ttf'),
  });
};

const Register = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const handleRegister = () => {
    // Ajoutez la logique de validation et d'enregistrement ici
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    // Logique d'enregistrement réussie
    setName('');
    setSurname('');
    setEmail('');
    setMatricule('');
    setPassword('');
    setConfirmPassword('');
    navigation.navigate(' '); // Remplacez par la page suivante
  };

  return (
    <ImageBackground
      source={require('../assets/images/imgfond4.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={[styles.title, { fontFamily: 'space-mono' }]}>Création de compte étudiant</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Matricule"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={matricule}
          onChangeText={setMatricule}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmation du mot de passe"
          placeholderTextColor="rgba(172, 153, 153, 0.7)"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
            <Icon name="arrow-right" size={25} color="black" style={{}}/>
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
    height: '80%',
    paddingVertical: 30,
  },
  title: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'semibold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
  nextButton: {
    marginTop: 30,
    flexDirection: 'row-reverse',

  },
  error: {
    color: 'red',
    marginBottom: 10,
    paddingHorizontal: 40,
  },
});

export default Register;