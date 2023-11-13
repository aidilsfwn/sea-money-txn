import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles';
import { SCALER } from '../utils';

interface ButtonProps {
    text: string;
    onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: colors.blue[500], paddingVertical: SCALER.h(18), alignItems: 'center', borderRadius: 100 },
    text: { color: colors.neutral[100], fontWeight: 'bold' }
});

export { Button };
