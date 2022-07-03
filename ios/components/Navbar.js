import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { StyleSheet } from 'react-native';
function Navbar() {
  return <FontAwesomeIcon icon={faBars} color={"#555"} style={styles.barsMenu} size={24}/>
}


const styles = StyleSheet.create({
    barsMenu: {
        position: 'absolute',
        top:15,
        right: 15,
    }
});

export default Navbar;
