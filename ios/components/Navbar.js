import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function Navbar() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
      <FontAwesomeIcon icon={faBars} color={"#555"} style={styles.barsMenu} size={24}/>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    barsMenu: {
        position: 'absolute',
        top:15,
        right: 15,
    }
});

export default Navbar;
