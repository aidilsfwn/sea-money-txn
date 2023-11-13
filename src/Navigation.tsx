import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from './constants/routes';
import * as Pages from './pages';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.TRANSACTION_HISTORY} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={ROUTES.HOME} component={Pages.HomePage} />
                <Stack.Screen name={ROUTES.TRANSACTION_HISTORY} component={Pages.TransactionHistoryPage} />
                <Stack.Screen name={ROUTES.TRANSACTION_HISTORY_DETAILS} component={Pages.TransactionHistoryDetailsPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { Navigation };
