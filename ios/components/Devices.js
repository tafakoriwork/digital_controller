import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
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
import Modal1 from './Modal1';

const Devices = ({navigation}) => {
  const [_devices, setdevices] = useState([]);
  const [rmid, setClose] = useState(null);
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

  const toggler = async() => setClose(null);


  function removeConfirmer() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
      },
      btn: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>آیا مایلید این دستگاه حذف شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => removeItem(rmid)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggler}>
            <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                انصراف
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function removeItem(index) {
    const devices = _devices;
    devices.splice(index, 1);
    AsyncStorage.setItem('devices', JSON.stringify(devices));
    setdevices(devices);
    toggler()
  }
  useEffect(() => {
    getData().then(devices => setdevices(JSON.parse(devices)));
  }, [_devices]);

  return (
    <>
      {rmid != null ? <Modal1 pheight={150} close={toggler} Component={removeConfirmer} /> : null}
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
        <ScrollView style={styles.devices}>
          {_devices.length > 0
            ? _devices.map((el, i) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Main', {el, index: i})
                    }
                    key={i}
                    style={styles.deviceContainer}>
                    <View style={styles.deviceControlls}>
                      <TouchableOpacity
                        style={{paddingHorizontal: 5, paddingVertical: 5}}
                        onPress={() => setClose(i)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          size={18}
                          color={'#ff6347'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{paddingHorizontal: 10, paddingVertical: 5}}
                        onPress={() =>
                          navigation.navigate('editDevice', {el, index: i})
                        }>
                        <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          size={20}
                          color={'#2AB461'}
                        />
                        <Text>تنظیم محل نصب</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.text2}>{el.place}</Text>
                  </TouchableOpacity>
                );
              })
            : ''}
        </ScrollView>
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
    paddingHorizontal: 10,
    paddingVertical:5,
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
    flex: 1,
    marginBottom: 80,
  },
  containerBox: {
    backgroundColor: '#eee',
    maxHeight: 80,
    marginHorizontal: 50,
    marginTop: 20,
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
    bottom: 20,
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
