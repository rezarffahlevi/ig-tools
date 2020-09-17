import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const SkipButton = props => {
     return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={props.onClick}>
            <Text style={styles.title}>Lewati</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginTop: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SkipButton;