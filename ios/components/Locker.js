import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Moda11 from './Modal1';
import globals from './globals';

function Locker({navigation}) {
  const [text, setText] = useState('');
  const [wrong, setWrong] = useState(false);
  const addText = ntext => {
    setText(String(text) + ntext);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@pass');
     
        return value;
     
    } catch (e) {
      console.log(e);
    }
  };

  const backSpace = () => {
    setText(String(text).slice(0, -1));
  };

  const checkAuth = async () => {
    const savedPass = await getData();
    if (savedPass == text) {
      globals.isOpen = true;
      navigation.navigate('Devices');
    } else setWrong(true);
  };

  const modal = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text style={{fontFamily: 'Vazir-Medium', fontSize: 18, color: '#a44'}}>
          کلمه عبور اشتباه است!

          
        </Text>
      </View>
    );
  };

  return (
    <>
      {wrong && (
        <Moda11
          Component={modal}
          close={async () => setWrong(false)}
          pheight={100}
        />
      )}
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 25,
        }}>
        <View style={styles.lock}>
          <Image source={require('./lock.png')} style={styles.image} />
        </View>
        <View style={styles.lockInputContainer}>
          <TextInput
            style={styles.lockInput}
            showSoftInputOnFocus={false}
            placeholder={'رمز ورود را وارد کنید'}
            value={text}
          />
        </View>
        <View style={styles.lockInputGuide}>
          <Text style={styles.lockGuide}>رمز پیش فرض: ۱۲۳۴</Text>
        </View>
        <View style={styles.keyContainer}>
          <View style={styles.keyContainerRow}>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(1)}>
              <Text style={styles.keyBtnText}>۱</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(2)}>
              <Text style={styles.keyBtnText}>۲</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(3)}>
              <Text style={styles.keyBtnText}>۳</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyContainerRow}>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(4)}>
              <Text style={styles.keyBtnText}>۴</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(5)}>
              <Text style={styles.keyBtnText}>۵</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(6)}>
              <Text style={styles.keyBtnText}>۶</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyContainerRow}>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(7)}>
              <Text style={styles.keyBtnText}>۷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(8)}>
              <Text style={styles.keyBtnText}>۸</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(9)}>
              <Text style={styles.keyBtnText}>۹</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keyContainerRow}>
            <TouchableOpacity style={styles.keyBtn} onPress={() => backSpace()}>
              <Text
                style={[styles.keyBtnText, {fontSize: 16, color: '#90C0B8'}]}>
                تصحیح
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => addText(0)}>
              <Text style={styles.keyBtnText}>۰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={checkAuth}>
              <Text
                style={[styles.keyBtnText, {fontSize: 16, color: '#90C0B8'}]}>
                تایید
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  keyBtnText: {
    fontFamily: 'Vazir-Medium',
    fontSize: 26,
    color: '#4FD386',
  },
  keyBtn: {
    borderWidth: 1,
    elevation: 3,
    borderColor: '#4FD38680',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  keyContainer: {
    marginVertical: 20,
    marginHorizontal: 40,
    flexDirection: 'column',
  },
  lock: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 100,
    borderColor: '#2AB46120',
    borderWidth: 1,
  },

  lockInputContainer: {
    marginTop: 25,
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#70707030',
    borderRadius: 15,
    backgroundColor: '#4FD38620',
    padding: 5,
  },

  lockInputGuide: {
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },

  lockGuide: {
    fontFamily: 'Vazir-Medium',
    fontSize: 12,
    color: '#aaa8',
  },

  lockInput: {
    fontFamily: 'Vazir-Medium',
    fontSize: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Locker;
