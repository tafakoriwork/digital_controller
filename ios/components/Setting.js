import {faCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//about us
function Setting() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('./setting.png')}
          style={{resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.column}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>تنظیم 1</Text>
          <FontAwesomeIcon color={"#2AB461"} icon={faCog} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>تنظیم 2</Text>
          <FontAwesomeIcon color={"#2AB461"} icon={faCog} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Vazir-Light',
    fontSize: 18,
    marginHorizontal: 10
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
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Setting;
