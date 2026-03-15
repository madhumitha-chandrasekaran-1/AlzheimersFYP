import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image 
          source={require('C:/Users/hi/Documents/sem 7/fyp/sem8/appThozha/assets/illustration.png')} // Replace with actual image file
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.welcomeText}>WELCOME TO</Text>
        <Text style={styles.brandText}>thozha.</Text>
        <Text style={styles.tagline}>Here for You, Every Step of the Way!</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('PatientDetails')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1FF', // Light purple shade
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#1F2C77', // Dark blue shade
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  brandText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  tagline: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFD700', // Gold color for contrast
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: '#1F2C77', // Dark blue text
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
