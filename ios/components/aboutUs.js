import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

//about us
function AboutUs() {
  return (
    <View style={styles.container}>
        <View>
            <Image source={require('./as.png')} />
        </View>
        <View style={styles.card}>
            <Text style={styles.text}>
                متن درباره ما و ...
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
      fontFamily: 'Vazir-Light',
      fontSize: 18,
    },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  },

  card: {
    margin: 25,
    width: Dimensions.get('window').width - 50,
    borderWidth: 1,
    borderColor: '#aaa2',
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 25,
    elevation: 1,
    padding: 25,
    
  }
});

export default AboutUs;
