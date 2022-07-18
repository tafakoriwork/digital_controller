import { faInstagram, faInternetExplorer } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text,Linking, TouchableOpacity, View} from 'react-native';

//about us
function AboutUs() {
  return (
    <View style={styles.container}>
        <View>
            <Image source={require('./as.png')} />
        </View>
        <View style={styles.card}>
            <Text style={styles.text}>
            برای دریافت کاتالوگ دستگاه و آموزش نصب به سایت زیر مراجعه فرمایید :
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25}} onPress={() => Linking.openURL("http://www.gsmalarm.ir")}>
              <FontAwesomeIcon icon={faInternetExplorer} color={'#0088ff'}/>
            <Text style={[styles.text, {marginHorizontal: 10}]}>
            WWW.GSMALARM.IR
            </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => Linking.openURL("https://www.instagram.com/payronix.iran/")}>
              <FontAwesomeIcon icon={faInstagram} color={'#aa8800'}/>
            <Text style={[styles.text, {marginHorizontal: 10}]}>
            Instagram
            </Text>
            </TouchableOpacity> */}
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
