import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { SafeAreaSpacer, Spacer, Text, TxnList } from '../../components';
import { colors } from '../../styles';
import { LoadingOverlay } from '../../components';
import { SCALER } from '../../utils';
import { BiometricsAPI } from '../../integrations/biometric';

export interface TxnHistoryItem {
    id: string;
    refNo: string;
    amount: string;
    date: string;
    type: string;
    description: string;
}

const TransactionHistoryPage = () => {
    const [txnList, setTxnList] = useState<TxnHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isRestricted, setIsRestricted] = useState<boolean>(true);
    const [isBiometricsAvailable, setIsBiometricsAvailable] = useState<boolean>(true);

    useEffect(() => {
        fetchData(false);
    }, []);

    useEffect(() => {
        BiometricsAPI.isSensorAvailable().then((supported) => {
            setIsBiometricsAvailable(supported);
        });
    }, []);

    const fetchData = async (isRefresh: boolean) => {
        if (isRefresh) setIsRefreshing(true);
        else setIsLoading(true);

        try {
            const { data } = await axios.get('https://6551b75d5c69a779032904c5.mockapi.io/api/v1/transactions');
            setTxnList(data);
        } catch (e) {
            Toast.show({ type: 'error', text1: e.code, text2: e.message });
        }

        setIsRefreshing(false);
        setIsLoading(false);
    };

    const handleRefresh = () => {
        fetchData(true);
    };

    const handleUnrestrict = async () => {
        if (!isBiometricsAvailable) Linking.openSettings();
        else {
            const applyBiometric = await BiometricsAPI.biometricPrompt();
            if (applyBiometric) setIsRestricted(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaSpacer type={'top'} />
            {isRestricted && (
                <TouchableOpacity onPress={handleUnrestrict} style={styles.unlockButtonContainer}>
                    <Text bold style={{ color: colors.neutral[200] }}>
                        {!isBiometricsAvailable
                            ? `Enable biometrics in device's settings to unlock unrestricted view`
                            : 'Unlock unrestricted view'}
                    </Text>
                </TouchableOpacity>
            )}
            <Spacer space={SCALER.h(24)} />
            <TxnList data={txnList} onRefresh={() => handleRefresh()} refreshing={isRefreshing} isRestricted={isRestricted} />
            <LoadingOverlay isVisible={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.blue[300] },
    unlockButtonContainer: {
        backgroundColor: colors.red[400],
        marginHorizontal: SCALER.w(32),
        marginTop: SCALER.h(16),
        paddingVertical: SCALER.h(8),
        alignItems: 'center',
        borderRadius: 10
    }
});

export { TransactionHistoryPage };
