// components/ArretList.tsx
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

type Stop = {
    id: number;
    intitule: string;
    latposition: number;
    longposition: number;
};
  
type Props = {
    stops: Stop[];
    onStopSelect: (stop: Stop) => void;
    onClose: () => void;
};  

const ArretList: React.FC<Props> = ({ stops, onStopSelect, onClose }) => {
    const handleItemPress = (stop: Stop) => {
        if (
          typeof stop.latposition !== 'number' ||
          typeof stop.longposition !== 'number'
        ) {
          Alert.alert('Erreur', "Coordonnées invalides pour cet arrêt.");
          return;
        }
       
       //lert.alert('Arrêt sélectionné', stop.intitule);
        onStopSelect(stop);
        onClose();
      };
      
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <ScrollView>
              {stops?.map((stop, index) => (
                <TouchableOpacity key={index} onPress={() => handleItemPress(stop)}>
                  <Text style={styles.item}>{stop.intitule}</Text>
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
  item: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ArretList;
