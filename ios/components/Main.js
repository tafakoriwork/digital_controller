/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {NativeModules} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalculator,
  faCog,
  faCreditCard,
  faEraser,
  faGasPump,
  faKey,
  faList,
  faPhoneSlash,
  faPowerOff,
  faSimCard,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import {
  faCreditCardAlt,
  faFileText,
  faListAlt,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import Modal1 from './Modal1';
import globals from './globals';

const Main = (props) => {
  const {navigation, route} = props;
  const phonenumber = route.params.phonenumber;
  const isDarkMode = useColorScheme() === 'dark';
  const [close, setClose] = useState(false);
  const [modal, setModal] = useState(null);
  const modalCloser = async () => {setClose(!close);};
  const requestSMSPermission = async (phone, msg) => {
    try {
      setClose(false);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Cool SMS Permission',
          message:
            'Cool Photo Main needs access to your SMS ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        NativeModules.TAFAKORISMS.sendMsg(
          phone,
          msg,
          (err, name) => {
            console.log(err, name);
          },
        );

        ToastAndroid.show("پیام ارسال شد", ToastAndroid.SHORT)
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = value;
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  let comp;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  //charge control
  function chargeControl() {
    const msg = "*1234*72#";
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
        alignItems: 'center'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          آیا مایلید پیام ارسال شود؟
        </Text>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => requestSMSPermission(phonenumber, msg)}>
          <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>ارسال</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalCloser}>
          <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>انصراف</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  //disconnect calling
  function disconnectCalling() {
    const msg = "*1234*70#";
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
        alignItems: 'center'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          آیا مایلید پیام ارسال شود؟
        </Text>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => requestSMSPermission(phonenumber, msg)}>
          <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>ارسال</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalCloser}>
          <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>انصراف</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }


//on
function powerswitchON() {
  const msg = "*1234*61#";
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
      alignItems: 'center'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    text: {
      fontFamily: 'Vazir-Medium',
      textAlign: 'center',
      fontSize: 16,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        آیا مایلید پیام ارسال شود؟
      </Text>
      <View style={styles.row}>
      <TouchableOpacity onPress={() => requestSMSPermission(phonenumber, msg)}>
        <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
          <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>ارسال</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={modalCloser}>
        <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
          <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>انصراف</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}
//off
function powerswitchOFF() {
  const msg = "*1234*60#";
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
      alignItems: 'center'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    text: {
      fontFamily: 'Vazir-Medium',
      textAlign: 'center',
      fontSize: 16,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        آیا مایلید پیام ارسال شود؟
      </Text>
      <View style={styles.row}>
      <TouchableOpacity onPress={() => requestSMSPermission(phonenumber, msg)}>
        <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
          <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>ارسال</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={modalCloser}>
        <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
          <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>انصراف</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

  //add charge
  function addCharge() {
    const msg = chargeCode => `*1234*50#${chargeCode}#`;
    const [chargecode, setchargecode] = useState(null)
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
        alignItems: 'center'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      input: {
        backgroundColor: '#aaa2',
         fontFamily: 'Vazir-Medium',
         borderRadius: 10,
         paddingHorizontal: 15
      }
    });

    return (
      <View style={styles.container}>
        <TextInput keyboardType={"number-pad"} style={styles.input} onChangeText={text => setchargecode(text)} placeholder='کد شارژ'/>
        <Text style={styles.text}>
          آیا مایلید پیام ارسال شود؟
        </Text>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => requestSMSPermission(phonenumber, msg(chargecode))}>
          <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>ارسال</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalCloser}>
          <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>انصراف</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  //change password
  function changePassword() {
    const msg = password => `*1234*2#${password}#`;
    const [password, setpassword] = useState(null)
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
        alignItems: 'center'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      input: {
        backgroundColor: '#aaa2',
         fontFamily: 'Vazir-Medium',
         borderRadius: 10,
         paddingHorizontal: 15
      }
    });

    return (
      <View style={styles.container}>
        <TextInput keyboardType={"number-pad"} style={styles.input} onChangeText={text => setpassword(text)} placeholder='رمز جدید'/>
        <Text style={styles.text}>
          آیا مایلید پیام ارسال شود؟
        </Text>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => requestSMSPermission(phonenumber, msg(password))}>
          <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>ارسال</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalCloser}>
          <View style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>انصراف</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }



  


  const components = {
    chargeControl,
    addCharge,
    disconnectCalling,
    powerswitchON,
    powerswitchOFF,
    changePassword,
  }

  return (
    <>
      <Navbar />
      {close && (
        <Modal1 Component={components[modal]} close={modalCloser} />
      )}
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 25,
        }}>
        <View style={styles.containerBox}>
        <TouchableWithoutFeedback
             onPress={() => {modalCloser(); setModal('powerswitchON')}}
              style={{
                marginVertical: 5,
              }}>
          <View style={styles.buttonContainer}>
            <View
              style={[styles.buttonSwitch, {backgroundColor: '#2AB461'}]}>
              <FontAwesomeIcon icon={faPowerOff} size={60} color={'#eee'} />
            </View>
            
              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                روشن
              </Text>
          </View>
            </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
              onPress={() => {modalCloser(); setModal('powerswitchOFF')}}
              style={{
                marginVertical: 5,
              }}>
          <View style={styles.buttonContainer}>
            <View style={[styles.buttonSwitch, {backgroundColor: '#B42A33'}]}>
              <FontAwesomeIcon icon={faPowerOff} size={60} color={'#eee'} />
            </View>
           
              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                خاموش
              </Text>
          </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.containerButtonsColumn}>
          <View style={styles.containerButtonsRow}>
            <View
             
              style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity   style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faList} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>خروجی رله‌ها</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity onPress={() => {modalCloser(); setModal('addCharge')}} style={styles.containerButtonsBtn}>
                <FontAwesomeIcon
                  icon={faCreditCardAlt}
                  size={26}
                  color={'#2AB461'}
                />
              </TouchableOpacity>
              <Text style={styles.text}>افزایش شارژ</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity onPress={() => {modalCloser(); setModal('chargeControl')}} style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faSimCard} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>کنترل شارژ</Text>
            </View>
          </View>

          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity onPress={() =>  {modalCloser(); setModal('changePassword')}} style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faKey} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>تغییر رمز دستگاه</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faTrash} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>حذف زون</Text>
            </View>
            <View  style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity onPress={() => {modalCloser(); setModal('disconnectCalling')}}  style={styles.containerButtonsBtn}>
                <FontAwesomeIcon
                  icon={faPhoneSlash}
                  size={26}
                  color={'#2AB461'}
                />
              </TouchableOpacity>
              <Text style={styles.text}>قطع شماره گیری</Text>
            </View>
          </View>

          <View
          
            style={[styles.containerButtonsRow, {justifyContent: 'flex-end'}]}>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={styles.containerButtonsBtn}>
                <FontAwesomeIcon
                  icon={faFileText}
                  size={26}
                  color={'#2AB461'}
                />
              </TouchableOpacity>
              <Text style={styles.text}>درباره ما</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faCog} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>تنظیمات نرم افزار</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Vazir-Light', fontSize: 16},
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
  containerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  containerButtonsColumn: {
    flexDirection: 'column',
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    flex: 3,
  },
  containerBox: {
    backgroundColor: '#eee',
    height: 150,
    marginHorizontal: 25,
    marginTop: 25,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
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
});

export default Main;
