import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

function ModalRed(props) {
    const {Component, close, pheight} = props;
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        height: pheight,
        backgroundColor: '#fff',
        padding: 10,
        elevation: 1,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'red',
        position: 'absolute',
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});

useEffect(() => {
    console.log(23);
    setTimeout(() => {
        close();
    }, 3000);
}, [])

    return (
    <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={close}>
            <View style={styles.close}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalBox}>
            {Component()}
        </View>
    </View>);
}

export default ModalRed;