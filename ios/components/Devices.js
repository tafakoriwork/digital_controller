import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';

const Devices = ({navigation}) => {
  const [_devices, setdevices] = useState([]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('devices');
      if (value !== null) {
        return value;
      }
      return '[]';
    } catch (e) {
      // error reading value
    }
  };

  function removeItem(index) {
    const devices = _devices;
    devices.splice(index, 1);
    AsyncStorage.setItem('devices', JSON.stringify(devices));
    setdevices(devices);
  }
  useEffect(() => {
    getData().then(devices => setdevices(JSON.parse(devices)));
  }, [_devices]);

  return (
    <>
      <Navbar />
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 25,
        }}>
        <View style={styles.containerBox}>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>افزودن دستگاه جدید</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#aaa8',
            marginTop: 22,
            marginHorizontal: 25,
          }}></View>
        <View style={styles.devices}>
          {_devices.length > 0
            ? _devices.map((el, i) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Main', {phonenumber: el.phonenumber})
                    }
                    key={i}
                    style={styles.deviceContainer}>
                    <View style={styles.deviceControlls}>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => removeItem(i)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          size={18}
                          color={'#ff6347'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() =>
                          navigation.navigate('editDevice', {el, index: i})
                        }>
                        <FontAwesomeIcon
                          icon={faEdit}
                          size={18}
                          color={'#9a9aaa'}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.text2}>{el.place}</Text>
                  </TouchableOpacity>
                );
              })
            : ''}
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('addDevice')}>
          <View style={styles.newDevice}>
            <Text style={[styles.text2, {color: '#fff', marginEnd: 10}]}>
              افزودن دستگاه جدید
            </Text>
            <FontAwesomeIcon
              icon={faPlus}
              color={'#fff'}
              style={{marginEnd: 10}}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Vazir-Light', fontSize: 20},
  text2: {fontFamily: 'Vazir-Medium', fontSize: 14},
  textBold: {fontFamily: 'Vazir-Medium', fontSize: 16},
  containerButtonsBtnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButtonsBtn: {
    borderWidth: 2,
    borderColor: '#2AB461',
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: '#fff',
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2AB46180',
    padding: 15,
  },
  deviceControlls: {
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  devices: {
    flexDirection: 'column',
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    flex: 3,
  },
  containerBox: {
    backgroundColor: '#eee',
    maxHeight: 80,
    marginHorizontal: 50,
    marginTop: 40,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    elevation: 2,
    flex: 1,
    fontFamily: 'Vazir-Light',
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonSwitch: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#eee',
  },
  newDevice: {
    position: 'absolute',
    width: 200,
    height: 60,
    backgroundColor: '#2AB461',
    bottom: 40,
    left: Dimensions.get('window').width / 2 - 100,
    borderRadius: 15,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
  },
});

export default Devices;
