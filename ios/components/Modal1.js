import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

function Modal1(props) {
    const {Component, close} = props;
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

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#3335',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        width: '70%',
        height: 150,
        backgroundColor: '#eee',
        padding: 10,
        elevation: 1,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#33ff3330'
    },
    close: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});

export default Modal1;