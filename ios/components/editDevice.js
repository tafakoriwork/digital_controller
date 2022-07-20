import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapPin, faSimCard, faLock} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';

const EditDevice = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const {navigation, route} = props;

  const setItem = async data => {
    AsyncStorage.getItem('devices', (err, result) => {
      const id = [data];
      if (result !== null) {
        var newIds = JSON.parse(result);
        newIds[route.params.index] = data;
        AsyncStorage.setItem('devices', JSON.stringify(newIds));
      } else {
        AsyncStorage.setItem('devices', JSON.stringify(id));
      }
      navigation.navigate('Devices');
    });
  };

  const [device, setdevice] = useState({
    place: route.params.el.place,
    phonenumber: route.params.el.phonenumber,
    password: route.params.el.password,
    description: route.params.el.description,
    z1: route.params.el.z1,
    z2: route.params.el.z2,
    z3: route.params.el.z3,
    z4: route.params.el.z4,
    z5: route.params.el.z5,
    z6: route.params.el.z6,
    z7: route.params.el.z7,
    z8: route.params.el.z8,
    z9: route.params.el.z9,
    r1: route.params.el.r1,
    r2: route.params.el.r2,
    r3: route.params.el.r3,
  });

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 40,
        }}>
        <View style={styles.containerBox}>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>مشخصات دستگاه</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#aaa8',
            marginTop: 22,
            marginHorizontal: 25,
          }}></View>
        <ScrollView style={styles.EditDevice}>
          <View style={{paddingBottom: 50}}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={device.place}
                onChangeText={text =>
                  setdevice(prevState => ({
                    ...prevState,
                    place: text,
                  }))
                }
                placeholder={'محل نصب دستگاه'}
              />
              <FontAwesomeIcon
                icon={faMapPin}
                size={20}
                color={'#AFC3D3'}
                style={{position: 'absolute', top: 15, left: 20}}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={device.phonenumber}
                keyboardType={'number-pad'}
                onChangeText={text =>
                  setdevice(prevState => ({
                    ...prevState,
                    phonenumber: text,
                  }))
                }
                placeholder={'شماره سیم کارت دستگاه'}
              />
              <FontAwesomeIcon
                icon={faSimCard}
                size={18}
                color={'#AFC3D3'}
                style={{position: 'absolute', top: 17, left: 20}}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={text =>
                  setdevice(prevState => ({
                    ...prevState,
                    password: text,
                  }))
                }
                value={device.password}
                style={styles.input}
                placeholder={'پسورد دستگاه'}
              />
              <FontAwesomeIcon
                icon={faLock}
                size={18}
                color={'#AFC3D3'}
                style={{position: 'absolute', top: 15, left: 20}}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                multiline={true}
                value={device.description}
                onChangeText={text =>
                  setdevice(prevState => ({
                    ...prevState,
                    description: text,
                  }))
                }
                style={[styles.input, {height: 200, textAlignVertical: 'top'}]}
                placeholder={'توضیحات دستگاه'}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  flexDirection: 'column',
                  width: '100%',
                },
              ]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Vazir-Light',
                  color: '#888',
                  fontSize: 15,
                }}>
                {' '}
                حذف زون{' '}
              </Text>

              <View
              
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.z1}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z1: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۱
                </Text>
              </View>

              <View
              
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.z2}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z2: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۲
                </Text>
              </View>

              <View
              
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.z3}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z3: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۳
                </Text>
              </View>

              <View
            
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                  value={device.z4}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z4: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۴
                </Text>
              </View>

              <View
             
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                 value={device.z5}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z5: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۵
                </Text>
              </View>

              <View
            
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                  value={device.z6}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z6: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۶
                </Text>
              </View>

              <View
           
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                   value={device.z7}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z7: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۷
                </Text>
              </View>

              <View
              
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.z8}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z8: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۸
                </Text>
              </View>

              <View
              
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.z9}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      z9: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  زون ۹
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  flexDirection: 'column',
                  width: '100%',
                },
              ]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Vazir-Light',
                  color: '#888',
                  fontSize: 15,
                }}>
                فرمان از راه دور
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.r1}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      r1: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  رله ۱
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.r2}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      r2: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  رله ۲
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  height: 40,
                  marginVertical: 5,
                }}>
                <TextInput
                value={device.r3}
                  onChangeText={text =>
                    setdevice(prevState => ({
                      ...prevState,
                      r3: text,
                    }))
                  }
                  style={[
                    styles.input2,
                    {
                      flex: 2,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#aaa5',
                    },
                  ]}
                  placeholder={'محل نصب'}
                />
                <Text
                  style={{fontFamily: 'Vazir-Light', fontSize: 14, flex: 1}}>
                  رله ۳
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: null,
                },
              ]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setItem(device)}>
                <Text style={[styles.textBold, {fontSize: 14, color: '#fff'}]}>
                  ویرایش
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => navigation.navigate('Devices')}>
                <Text style={[styles.textBold, {fontSize: 14, color: '#fff'}]}>
                  انصراف
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonCancel: {
    margin: 2,
    backgroundColor: '#ff6347',
    flex: 1,
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  button: {
    margin: 2,
    backgroundColor: '#3ACE78',
    flex: 1,
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text: {fontFamily: 'Vazir-Light', fontSize: 20},
  text2: {fontFamily: 'Vazir-Light', fontSize: 14},
  textBold: {fontFamily: 'Vazir-Medium', fontSize: 16},
  containerButtonsBtnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#dfdfdf90',
    borderRadius: 15,
    position: 'relative',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingStart: 50,
    fontFamily: 'Vazir-Light',
    paddingEnd: 15,
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
    backgroundColor: '#dfdfdf80',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
  },
  deviceControlls: {
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  EditDevice: {
    flexDirection: 'column',
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    flex: 3,
  },
  input2: {
    fontSize: 14,
    fontFamily: 'Vazir-Light',
    paddingHorizontal: 5,
  },
  containerBox: {
    backgroundColor: '#eee',
    maxHeight: 80,
    marginHorizontal: 50,
    marginTop: 5,
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
    width: 160,
    height: 40,
    backgroundColor: '#efefef',
    borderWidth: 2,
    borderColor: '#2AB461',
    bottom: 40,
    left: Dimensions.get('window').width / 2 - 80,
    borderRadius: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: '#aaa',
    alignItems: 'center',
    padding: 5,
  },
});

export default EditDevice;
