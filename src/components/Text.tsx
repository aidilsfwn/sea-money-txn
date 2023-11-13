import React, { ReactNode } from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
    children: ReactNode;
    bold?: boolean;
    style?: TextStyle | object;
}

const Text = ({ children, bold, style }: TextProps) => {
    return <RNText style={[style, styles.text, bold && { fontFamily: 'Montserrat-Bold' }]}>{children}</RNText>;
};

const styles = StyleSheet.create({
    text: { fontFamily: 'Montserrat-Regular' }
});

export { Text };
