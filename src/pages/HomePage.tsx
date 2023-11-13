import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaSpacer } from '../components';

const HomePage = () => {
    return (
        <View>
            <SafeAreaSpacer type={'top'} />
            <Text>Home</Text>
            <SafeAreaSpacer type={'bottom'} />
        </View>
    );
};

export { HomePage };
