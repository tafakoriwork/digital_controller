import {
  faFileText,
  faLock, faTextHeight,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Modal1 from './Modal1';
import globals from './globals';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';

//about us
function Setting({navigation}) {
  console.log(navigation);
  /* const [isSim, setSim] = useState(null); */
  const [modal, setModal] = useState(null);
  const [close, setClose] = useState(false);
  const modalCloser = async () => {
    setClose(!close);
  };
  
  /* const setSimcard = async value => {
    try {
      globals.sim = String(value);
      setSim(value);
      await AsyncStorage.setItem('@sim', String(value));
    } catch (e) {}
  };

  const getSimcard = async () => {
    try {
      const value = await AsyncStorage.getItem('@sim');
      if(value)
        setSim(Number(value));
      else
        setSim(Number(1));
    } catch (e) {
      console.log(e);
    }
  }; */

 /*  useEffect(() => {
    if(!isSim)
    {
     getSimcard();
    }
    setSimcard(isSim);
      globals.sim = isSim;
  }, [isSim]); */

  /* function simChange() {

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
        <Text style={styles.text}>سیم کارت پیش فرض ارسال پیام را انتخاب کنید</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {modalCloser; setSim(2)}}>
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
          <TouchableOpacity onPress={() => {modalCloser; setSim(1)}}>
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
  } */

  //change password
  function changePassword() {
    const [password, setpassword] = useState(null);
    const savePass = async() => {
        try {
          await AsyncStorage.setItem('@pass', password);
          globals.password2 = password;
          ToastAndroid.show("با موفقیت ذخیره شد", ToastAndroid.SHORT)
          modalCloser();
        } catch (e) {}
      
    }
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
          <TouchableOpacity
            onPress={savePass}>
            <View style={[styles.btn, {backgroundColor: '#2AB461'}]}>
              <Text style={[styles.text, {fontSize: 14, color: '#eee'}]}>
                ذخیره
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
    /* simChange, */
    changePassword,
  };

  const heights = {
    /* simChange: 150, */
    changePassword: 200,
  };

  return (
    <View style={styles.container}>
      {close && (
        <Modal1
          Component={components[modal]}
          pheight={heights[modal]}
          close={modalCloser}
        />
      )}
      <View>
        <Image
          source={require('./setting.png')}
          style={{resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.column}>
        {/* <TouchableOpacity style={styles.item} onPress={() => {modalCloser();setModal('simChange')}}>
          <Text style={styles.text}>انتخاب سیم کارت</Text>
          <FontAwesomeIcon color={'#2AB461'} icon={faSimCard} />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.item} onPress={() => {modalCloser();setModal('changePassword')}}>
          <Text style={styles.text}>تغییر رمز نرم افزار</Text>
          <FontAwesomeIcon color={'#2AB461'} icon={faLock} />
        </TouchableOpacity>
       <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("AboutUs")}>
          <Text style={styles.text}>درباره ما</Text>
          <FontAwesomeIcon color={'#2AB461'} icon={faFileText} />
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Vazir-Light',
    fontSize: 16,
    marginHorizontal: 10,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },

  column: {
    margin: 25,
    width: Dimensions.get('window').width - 50,
    flexDirection: 'column',
  },

  item: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#aaa2',
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Setting;
