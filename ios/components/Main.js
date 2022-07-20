/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
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
  faClock,
  faCog,
  faCoins,
  faContactCard,
  faExchange,
  faKey,
  faList,
  faPhone,
  faPhoneSlash,
  faPowerOff,
  faSimCard,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import {faCreditCardAlt, faFileText} from '@fortawesome/free-regular-svg-icons';
import Modal1 from './Modal1';
import globals from './globals';
import ModalRed from './ModalRed';

const Main = props => {
  const {navigation, route} = props;
  const phonenumber = route.params.el.phonenumber;
  const dvice = route.params.el;
  const [close, setClose] = useState(false);
  const [modal, setModal] = useState(null);
  const [isSim, setSim] = useState(null);
  const [dzmsg, setDZMSG] = useState(null);
  const [redModal, setRedModal] = useState(false);
  const [rellemsg, setRelleMsg] = useState(null);
  const [addto, setAddTo] = useState(null);

  console.log('device', dvice);
  const modalCloser = async () => {
    setClose(!close);
  };

  const modalredCloser = async () => {
    setRedModal(false);
  };

  const setEditItem = async data => {
    AsyncStorage.getItem('devices', (err, result) => {
      const id = [data];
      if (result !== null) {
        var newIds = JSON.parse(result);
        newIds[route.params.index] = data;
        AsyncStorage.setItem('devices', JSON.stringify(newIds));
      } else {
        AsyncStorage.setItem('devices', JSON.stringify(id));
      }
      modalCloser();
    });
  };

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
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
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
          globals.sim,
          (err, name) => {
            console.log(err, name);
          },
        );

        ToastAndroid.show('پیام ارسال شد', ToastAndroid.SHORT);
        setTimeout(() => {
          setRedModal(true);
        }, 8000);
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

  const setSimcard = async value => {
    try {
      globals.sim = String(value);
      setSim(value);
      await AsyncStorage.setItem('@sim', String(value));
    } catch (e) {}
  };

  const getSimcard = async () => {
    try {
      const value = await AsyncStorage.getItem('@sim');
      if (value) setSim(Number(value));
      else setSim(Number(1));
    } catch (e) {
      console.log(e);
    }
  };

  function simChange() {
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
        <Text style={styles.text}>
          سیم کارت پیش فرض ارسال پیام را انتخاب کنید
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              modalCloser;
              setSim(2);
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: isSim == 2 ? '#2AB461' : '#aaa',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#666'}]}>
                سیم کارت ۲
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              modalCloser;
              setSim(1);
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: isSim == 1 ? '#2AB461' : '#aaa',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#666'}]}>
                سیم کارت ۱
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  useEffect(() => {
    if (!isSim) {
      getSimcard();
    }
    setSimcard(isSim);
    globals.sim = isSim;
  }, [isSim]);

  useEffect(() => {
    globals.password1 = dvice.password;
  }, [dvice]);

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
    const msg = `*${globals.password1}*72#`;

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
        <Text style={[styles.text, {color: '#dc9900'}]}>
          جهت استعلام شارژ سیم کارت ابتدا صفحه ابتدایی کاتالوگ مطالعه گردد.
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: '#aaa5',
            marginVertical: 0,
          }}></View>
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //disconnect calling
  function disconnectCalling() {
    const msg = `*${globals.password1}*70#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //so so
  function powerswitchSOSO() {
    const msg = `*${globals.password1}*62#`;

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
        <Text style={[styles.text, {color: '#dc9900'}]}>
          در این حالت دستگاه به صورت بی صدا روشن می شود و زون‌های ۱ و ۲ و ۳ و ۷
          فعال و مابقی زون‌ها غیرفعال می‌شوند.
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: '#aaa5',
            marginVertical: 0,
          }}></View>
        <Text style={styles.text}>
          آیا از فعال سازی دستگاه در این حالت اطمینان دارید؟
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //on
  function powerswitchON() {
    const msg = `*${globals.password1}*61#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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
  //off
  function powerswitchOFF() {
    const msg = `*${globals.password1}*60#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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
  //silentChangerConfimer enable
  function silentChangerConfimerEN() {
    const msg = `*${globals.password1}*33#2#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //silentChangerConfimer disable
  function silentChangerConfimerDIS() {
    const msg = `*${globals.password1}*33#1#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //add charge
  function addCharge() {
    const msg = chargeCode => `*${globals.password1}*50#${chargeCode}#`;

    const [chargecode, setchargecode] = useState(null);
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

      input: {
        backgroundColor: '#aaa2',
        fontFamily: 'Vazir-Medium',
        borderRadius: 10,
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={'number-pad'}
          style={styles.input}
          onChangeText={text => setchargecode(text)}
          placeholder="کد شارژ"
        />
        <View style={{height: 1, backgroundColor: '#aaa5'}}></View>

        <Text style={styles.text}>آیا مایلید شارژ ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg(chargecode))}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //change password
  function changePassword() {
    const msg = password => `*${globals.password1}*49#${password}#`;
    /*  const storePassword = async value => {
      try {
        requestSMSPermission(phonenumber, msg(password));
        await AsyncStorage.setItem('@pass_device', value);
        globals.password1 = value;
      } catch (e) {}
    }; */
    const storePassword = password => {
      dvice.password = password;
      requestSMSPermission(phonenumber, msg(password));
      globals.password1 = password;
      setEditItem(dvice);
    };
    const [password, setpassword] = useState(null);
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

      input: {
        backgroundColor: '#aaa2',
        fontFamily: 'Vazir-Medium',
        borderRadius: 10,
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={'number-pad'}
          style={styles.input}
          onChangeText={text => setpassword(text)}
          placeholder="رمز جدید"
        />
        <View style={{height: 1, backgroundColor: '#aaa5'}}></View>
        <Text style={styles.text}>آیا مایلید رمز جدید ذخیره شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => storePassword(password)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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
  //silentChanger
  function silentChanger() {
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

      input: {
        backgroundColor: '#aaa2',
        fontFamily: 'Vazir-Medium',
        borderRadius: 10,
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>تنظیمات مورد نظر را انتخاب کنید</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setModal('silentChangerConfimerEN');
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#2AB461',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#2AB461'}]}>
                فعال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModal('silentChangerConfimerDIS');
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#B42A33',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#B42A33'}]}>
                غیرفعال
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //delay zone
  function delayZoneMenu() {
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

      input: {
        backgroundColor: '#aaa2',
        fontFamily: 'Vazir-Medium',
        borderRadius: 10,
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>تنظیمات مورد نظر را انتخاب کنید</Text>
        <View
          style={{
            height: 1,
            backgroundColor: '#aaa5',
            marginVertical: 0,
          }}></View>
        <Text style={[styles.text, {color: '#dc9900'}]}>
          در صورت عدم آشنایی با عملکرد زون تاخیری این گزینه را فعال ننمایید
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: '#aaa5',
            marginVertical: 0,
          }}></View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setModal('delayZoneExit');
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#2AB461',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#2AB461'}]}>
                زمان خروج
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModal('delayZoneEnter');
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#B42A33',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#B42A33'}]}>
                زمان ورود
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function delayZoneEnter() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'center',
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            تنظیمات زمان ورود
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setModal('delayZoneEnterSend30')}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>۳۰ ثانیه</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setModal('delayZoneEnterSend60')}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>۶۰ ثانیه</Text>
          </View>
        </View>
      </View>
    );
  }

  function delayZoneExit() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'center',
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            تنظیمات زمان خروج
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setModal('delayZoneExitSend30')}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>۳۰ ثانیه</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setModal('delayZoneExitSend60')}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>۶۰ ثانیه</Text>
          </View>
        </View>
      </View>
    );
  }

  function delayZoneExitSend30() {
    const msg = `*${globals.password1}*37#1#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  function delayZoneExitSend60() {
    const msg = `*${globals.password1}*37#2#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  function delayZoneEnterSend30() {
    const msg = `*${globals.password1}*38#1#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  function delayZoneEnterSend60() {
    const msg = `*${globals.password1}*38#2#`;

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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //delay zone

  function relle() {
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
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },

      column: {
        flexDirection: 'column',
        justifyContent: 'space-around',
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
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>گزینه مورد نظر را انتخاب کنید</Text>
        <View style={styles.column}>
          {/* <TouchableOpacity
            onPress={() => {
              setModal('relleRemote');
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#888',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#888'}]}>
                فرمان با ریموت
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setModal('relleDistance');
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#888',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#888'}]}>
                فرمان از راه دور
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //relle distance
  function relleDistance() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'center',
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            فرمان از راه دور
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>
<View style={styles.row}>
        <View style={{flex: 1}}>
            <Text style={styles.text1}></Text>
          </View><View style={{flex: 1}}>
            <Text style={styles.text1}></Text>
          </View><View style={{flex: 1}}>
            <Text style={styles.text1}>محل نصب</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>نام</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#11#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              روشن
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#10#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              خاموش
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#12#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#00aaff'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              لحظه‌ای
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.r1}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>رله ۱</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#21#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              روشن
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#20#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              خاموش
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#22#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#00aaff'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              لحظه‌ای
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.r2}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>رله ۲</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#31#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              روشن
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#30#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              خاموش
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*48#32#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#00aaff'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              لحظه‌ای
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.r3}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>رله ۳</Text>
          </View>
        </View>
      </View>
    );
  }

  //relle remote
  function relleRemote() {
    const msg = password => `*${globals.password1}*2#${password}#`;

    const [password, setpassword] = useState(null);
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'center',
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            فرمان با ریموت
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*32#1#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>DOOR در بازکن</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*32#2#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>TOGGLE دایم</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setRelleMsg(`*${globals.password1}*32#3#`);
              setModal('relleConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              انتخاب
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>پروژکتور LIGHT</Text>
          </View>
        </View>
      </View>
    );
  }

  //charge control
  function relleConfirmer() {
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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, rellemsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //end relle

  //delete zone
  function deleteZone() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'center',
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            حذف زون
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
        <View style={{flex: 1}}>
            <Text style={styles.text1}></Text>
          </View><View style={{flex: 1}}>
            <Text style={styles.text1}></Text>
          </View><View style={{flex: 1}}>
            <Text style={styles.text1}>محل نصب</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>نام</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*21#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*21#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z1}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۱</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*22#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*22#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z2}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۲</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*23#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*23#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z3}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۳</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*24#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*24#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z4}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۴</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*25#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*25#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z5}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۵</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*26#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*26#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z6}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۶</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*27#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*27#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z7}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۷</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*28#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*28#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z8}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۸</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*29#60#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*29#61#`);
              setModal('deleteZoneConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={styles.text1}>{dvice.z9}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text1}>زون ۹</Text>
          </View>
        </View>
      </View>
    );
  }

  //charge control
  function deleteZoneConfirmer() {
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
        <Text style={[styles.text, {color: '#dc9900'}]}>
          در صورت حذف زون امنیت دستگاه به پایین ترین حد خود می‌رسد. این گزینه
          جهت عیب یابی در سنسورها مورد استفاده قرار می‌گیرد.
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: '#aaa5',
            marginVertical: 0,
          }}></View>
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, dzmsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //remove remotes
  function deleteRemotes() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'center',
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            خروجی رله ها
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*30#1#`);
              setModal('dremotesConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف ریموت ۱</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*30#2#`);
              setModal('dremotesConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف ریموت ۲</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*30#3#`);
              setModal('dremotesConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف ریموت ۳</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*30#4#`);
              setModal('dremotesConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف ریموت ۴</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*30#5#`);
              setModal('dremotesConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف ریموت ۵</Text>
          </View>
        </View>
      </View>
    );
  }

  function dremotesConfirmer() {
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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, dzmsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  //software settings
  function settings() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
      },

      btn: {
        padding: 3,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        width: 60,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: '#7775',
        padding: 5,
        borderRadius: 10,
        elevation: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        marginVertical: 2,
      },

      column: {
        flexDirection: 'column',
        justifyContent: 'space-around',
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'right',
        fontSize: 12,
        color: '#777',
        marginEnd: 8,
      },

      input: {
        backgroundColor: '#aaa2',
        fontFamily: 'Vazir-Medium',
        borderRadius: 10,
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>تنظیمات نرم افزار</Text>
        <View style={styles.column}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setDZMSG(`*${globals.password1}*46#1#`);
                setModal('settingsConfirmer');
              }}
              style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
                انگلیسی
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDZMSG(`*${globals.password1}*46#2#`);
                setModal('settingsConfirmer');
              }}
              style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
                فارسی
              </Text>
            </TouchableOpacity>
            <View style={{flex: 3}}>
              <Text style={styles.text1}>زبان ارسال پیامک</Text>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setDZMSG(`*${globals.password1}*45#2#`);
                setModal('settingsConfirmer');
              }}
              style={[styles.btn, {borderWidth: 2, borderColor: '#00aabb'}]}>
              <Text style={[styles.text, {fontSize: 10, color: '#00aabb'}]}>
                همراه‌اول
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDZMSG(`*${globals.password1}*45#1#`);
                setModal('settingsConfirmer');
              }}
              style={[styles.btn, {borderWidth: 2, borderColor: '#ffd000'}]}>
              <Text style={[styles.text, {fontSize: 10, color: '#ffd000'}]}>
                ایرانسل
              </Text>
            </TouchableOpacity>
            <View style={{flex: 3}}>
              <Text style={styles.text1}>انتخاب اپراتور</Text>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setDZMSG(`*${globals.password1}*35#1#`);
                setModal('settingsConfirmer');
              }}
              style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
                فعال
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDZMSG(`*${globals.password1}*35#2#`);
                setModal('settingsConfirmer');
              }}
              style={[styles.btn, {borderWidth: 2, borderColor: '#B42A33'}]}>
              <Text style={[styles.text, {fontSize: 10, color: '#B42A33'}]}>
                غیرفعال
              </Text>
            </TouchableOpacity>
            <View style={{flex: 3}}>
              <Text style={styles.text1}>هشدار قطع برق</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*36#1#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*36#2#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#B42A33'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>هشدار قطع آژیر</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*40#1#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*40#2#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#B42A33'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>گزارش محرمانه</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*43#1#`);
              setModal('settingsConfirmergozaresh');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*43#2#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#B42A33'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>گزارش موجودی سیم‌کارت</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*34#2#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              ۴ دقیقه
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*34#1#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              ۲ دقیقه
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>مدت زمان آژیر</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*44#1#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#2AB461'}]}>
              فعال
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*44#2#`);
              setModal('settingsConfirmer');
            }}
            style={[styles.btn, {borderWidth: 2, borderColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#B42A33'}]}>
              غیرفعال
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>گزارش تحویل sms</Text>
          </View>
        </View>
      </View>
    );
  }

  //charge control
  function settingsConfirmer() {
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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, dzmsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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
  function settingsConfirmergozaresh() {
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
        <Text style={[styles.text, {color: '#dc9900'}]}>
          فقط در صورت استفاده از سیم کارت ایرانسل در داخل دستگاه این گزینه فعال
          شود
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: '#aaa5',
            marginVertical: 0,
          }}></View>
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, dzmsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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
  //end software settings

  //contact
  function contactMenu() {
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
        borderWidth: 2,
        borderColor: '#2AB461',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#eee',
        alignItems: 'center',
        marginVertical: 2,
        width: 270,
      },

      column: {
        flexDirection: 'column',
        alignItems: 'center',
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
        paddingHorizontal: 15,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'right',
        fontSize: 13,
        color: '#2AB461',
        marginEnd: 8,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>گزینه مورد نظر را انتخاب کنید</Text>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => {
              setModal('addContact');
            }}>
            <View style={styles.row}>
              <Text style={styles.text1}>اضافه نمودن شماره تلفن</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModal('deleteContact');
            }}>
            <View style={styles.row}>
              <Text style={styles.text1}>حذف شماره تلفن از حافظه دستگاه</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModal('showContact');
            }}>
            <View style={styles.row}>
              <Text style={styles.text1}>
                مشاهده شماره تلفن در حافظه دستگاه
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function deleteContact() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'right',
        marginEnd: 8,
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            حذف شماره تلفن از حافظه دستگاه
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*2##`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف حافظه ۲</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*3##`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف حافظه ۳</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*4##`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف حافظه ۴</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*5##`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#B42A33'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              حذف
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>حذف حافظه ۵</Text>
          </View>
        </View>
      </View>
    );
  }

  function showContact() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'right',
        marginEnd: 8,
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            مشاهده شماره تلفن در حافظه دستگاه
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*2#`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              مشاهده
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>مشاهده حافظه ۲</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*3#`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              مشاهده
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>مشاهده حافظه ۳</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*4#`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              مشاهده
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>مشاهده حافظه ۴</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setDZMSG(`*${globals.password1}*5#`);
              setModal('contactConfirmer');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              مشاهده
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>مشاهده حافظه ۵</Text>
          </View>
        </View>
      </View>
    );
  }

  function addContact() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 5,
        borderColor: '#aaa5',
        borderRadius: 5,
        marginTop: 5,
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },

      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },

      text1: {
        fontFamily: 'Vazir-Medium',
        fontSize: 14,
        textAlign: 'right',
        marginEnd: 8,
      },

      btn: {
        paddingVertical: 5,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={[styles.text, {color: '#888', fontSize: 14}]}>
            افزودن شماره تلفن به حافظه دستگاه
          </Text>
        </View>

        <View
          style={{height: 1, backgroundColor: '#aaa5', marginBottom: 5}}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setAddTo(2);
              setModal('addPhone');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              افزودن
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>افزودن به حافظه ۲</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setAddTo(3);
              setModal('addPhone');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              افزودن
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>افزودن به حافظه ۳</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setAddTo(4);
              setModal('addPhone');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              افزودن
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>افزودن به حافظه ۴</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setAddTo(5);
              setModal('addPhone');
            }}
            style={[styles.btn, {backgroundColor: '#2AB461'}]}>
            <Text style={[styles.text, {fontSize: 10, color: '#fff'}]}>
              افزودن
            </Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text style={styles.text1}>افزودن به حافظه ۵</Text>
          </View>
        </View>
      </View>
    );
  }

  function contactConfirmer() {
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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, dzmsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  function addPhone() {
    const msg = pnumber => `*${globals.password1}*${addto}#${pnumber}#`;

    const [pnumber, setpnumber] = useState(null);
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

      input: {
        backgroundColor: '#aaa2',
        fontFamily: 'Vazir-Medium',
        borderRadius: 10,
        paddingHorizontal: 15,
      },
    });

    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={'number-pad'}
          style={styles.input}
          onChangeText={text => setpnumber(text)}
          placeholder="شماره تلفن"
        />
        <View style={{height: 1, backgroundColor: '#aaa5'}}></View>

        <Text style={styles.text}>آیا مایلید شماره جدید ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, msg(pnumber))}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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
  //end contact

  function callerOrder() {
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginVertical: 2,
        marginHorizontal: '10%',
      },
      column: {
        flexDirection: 'column',
      },
      text: {
        fontFamily: 'Vazir-Medium',
        textAlign: 'center',
        fontSize: 16,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>اولویت تلفن کننده</Text>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => {
              modalCloser;
              setModal('callerConfirmer');
              setDZMSG(`*${globals.password1}*42#1#`);
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#2AB461',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#2AB461'}]}>
                SMS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              modalCloser;
              setModal('callerConfirmer');
              setDZMSG(`*${globals.password1}*42#2#`);
            }}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#2AB461',
                },
              ]}>
              <Text style={[styles.text, {fontSize: 14, color: '#2AB461'}]}>
                CALL
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function callerConfirmer() {
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
        <Text style={styles.text}>آیا مایلید پیام ارسال شود؟</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => requestSMSPermission(phonenumber, dzmsg)}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ارسال
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={modalCloser}>
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

  const components = {
    chargeControl,
    addCharge,
    disconnectCalling,
    powerswitchON,
    powerswitchOFF,
    powerswitchSOSO,
    changePassword,
    relle,
    deleteRemotes,
    simChange,
    silentChanger,
    silentChangerConfimerDIS,
    silentChangerConfimerEN,
    delayZoneMenu,
    delayZoneEnter,
    delayZoneExit,
    delayZoneExitSend30,
    delayZoneExitSend60,
    delayZoneEnterSend30,
    delayZoneEnterSend60,
    deleteZone,
    deleteZoneConfirmer,
    relleDistance,
    relleRemote,
    relleConfirmer,
    settings,
    settingsConfirmer,
    settingsConfirmergozaresh,
    contactMenu,
    deleteContact,
    contactConfirmer,
    showContact,
    addContact,
    addPhone,
    dremotesConfirmer,
    callerConfirmer,
    callerOrder,
  };

  const heights = {
    chargeControl: 150,
    addCharge: 200,
    disconnectCalling: 150,
    powerswitchON: 150,
    powerswitchOFF: 150,
    powerswitchSOSO: 200,
    changePassword: 200,
    deleteRemotes: 300,
    simChange: 150,
    silentChanger: 150,
    silentChangerConfimerDIS: 150,
    silentChangerConfimerEN: 150,
    delayZoneMenu: 210,
    delayZoneEnter: 170,
    delayZoneExit: 180,
    delayZoneExitSend30: 150,
    delayZoneExitSend60: 150,
    delayZoneEnterSend30: 150,
    delayZoneEnterSend60: 150,
    deleteZone: 510,
    deleteZoneConfirmer: 200,
    relle: 160,
    relleDistance: 240,
    relleRemote: 200,
    relleConfirmer: 150,
    settings: 480,
    settingsConfirmer: 150,
    settingsConfirmergozaresh: 200,
    contactMenu: 200,
    deleteContact: 250,
    contactConfirmer: 150,
    showContact: 250,
    addContact: 250,
    addPhone: 200,
    dremotesConfirmer: 150,
    callerConfirmer: 150,
    callerOrder: 200,
  };

  const RedMessage = () => (
    <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16, color: 'tomato'}}>
      پیام توسط دستگاه دریافت شد
    </Text>
  );

  return (
    <>
      {close && (
        <Modal1
          Component={components[modal]}
          close={modalCloser}
          pheight={heights[modal]}
        />
      )}
      {redModal && (
        <ModalRed Component={RedMessage} close={modalredCloser} pheight={60} />
      )}
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 40,
        }}>
        <View style={styles.containerBox}>
          <TouchableWithoutFeedback
            onPress={() => {
              modalCloser();
              setModal('powerswitchSOSO');
            }}
            style={{
              marginVertical: 5,
            }}>
            <View style={styles.buttonContainer}>
              <View style={[styles.buttonSwitch, {backgroundColor: '#ddcc5f'}]}>
                <FontAwesomeIcon icon={faPowerOff} size={42} color={'#eee'} />
              </View>

              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                نیمه فعال
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              modalCloser();
              setModal('powerswitchON');
            }}
            style={{
              marginVertical: 5,
            }}>
            <View style={styles.buttonContainer}>
              <View style={[styles.buttonSwitch, {backgroundColor: '#2AB461'}]}>
                <FontAwesomeIcon icon={faPowerOff} size={42} color={'#eee'} />
              </View>

              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                روشن
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              modalCloser();
              setModal('powerswitchOFF');
            }}
            style={{
              marginVertical: 5,
            }}>
            <View style={styles.buttonContainer}>
              <View style={[styles.buttonSwitch, {backgroundColor: '#B42A33'}]}>
                <FontAwesomeIcon icon={faPowerOff} size={42} color={'#eee'} />
              </View>

              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                خاموش
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.containerButtonsColumn}>
          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('addCharge');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon
                  icon={faCreditCardAlt}
                  size={26}
                  color={'#2AB461'}
                />
              </TouchableOpacity>
              <Text style={styles.text}>افزایش شارژ</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('chargeControl');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faSimCard} size={26} color={'#2AB461'} />
                <FontAwesomeIcon
                  icon={faCoins}
                  size={12}
                  color={'#007700'}
                  style={{position: 'absolute', top: 20, left: 25}}
                />
              </TouchableOpacity>
              <Text style={styles.text}>کنترل شارژ</Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('relle');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faList} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>خروجی رله‌ها</Text>
            </View>
          </View>

          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('disconnectCalling');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon
                  icon={faPhoneSlash}
                  size={26}
                  color={'#2AB461'}
                />
              </TouchableOpacity>
              <Text style={styles.text}>قطع شماره گیری</Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                style={styles.containerButtonsBtn}
                onPress={() => {
                  modalCloser();
                  setModal('deleteZone');
                }}>
                <FontAwesomeIcon icon={faTrash} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>حذف زون</Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('changePassword');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faKey} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>تغییر رمز دستگاه</Text>
            </View>
          </View>

          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                style={styles.containerButtonsBtn}
                onPress={() => {
                  modalCloser();
                  setModal('deleteRemotes');
                }}>
                <FontAwesomeIcon icon={faTrash} size={26} color={'#2AB461'} />
                <FontAwesomeIcon
                  icon={faCalculator}
                  size={12}
                  color={'#fff'}
                  style={{position: 'absolute', top: 35, left: 32}}
                />
              </TouchableOpacity>
              <Text style={styles.text}>حذف ریموت‌ها</Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                style={styles.containerButtonsBtn}
                onPress={() => {
                  modalCloser();
                  setModal('contactMenu');
                }}>
                <FontAwesomeIcon
                  icon={faContactCard}
                  size={26}
                  color={'#2AB461'}
                />
              </TouchableOpacity>
              <Text style={styles.text}>افزودن شماره</Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('delayZoneMenu');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faClock} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>زون تاخیری</Text>
            </View>
          </View>

          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('callerOrder');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faPhone} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>اولویت تلفن‌کننده </Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                style={styles.containerButtonsBtn}
                onPress={() => {
                  modalCloser();
                  setModal('settings');
                }}>
                <FontAwesomeIcon icon={faCog} size={26} color={'#2AB461'} />
              </TouchableOpacity>
              <Text style={styles.text}>تنظیمات</Text>
            </View>

            <View style={styles.containerButtonsBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  modalCloser();
                  setModal('simChange');
                }}
                style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faSimCard} size={26} color={'#2AB461'} />
                <FontAwesomeIcon
                  icon={faExchange}
                  size={12}
                  color={'#007700'}
                  style={{position: 'absolute', top: 20, left: 25}}
                />
              </TouchableOpacity>
              <Text style={styles.text}>انتخاب سیم‌کارت</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Vazir-Medium', fontSize: 12, marginTop: -5},
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
    height: 70,
    width: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: '#fff',
  },
  containerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
  },
  containerButtonsColumn: {
    flexDirection: 'column',
    marginHorizontal: 25,
    borderColor: '#aaa3',
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    flex: 3,
  },
  containerBox: {
    backgroundColor: '#eee',
    marginHorizontal: 25,
    marginTop: 5,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 2,
    fontFamily: 'Vazir-Light',
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonSwitch: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#eee',
  },
});

export default Main;
