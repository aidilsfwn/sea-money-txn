import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaSpacer, TxnList } from '../../components';
import { colors } from '../../styles';
import { LoadingOverlay } from '../../components';
import Toast from 'react-native-toast-message';

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

    useEffect(() => {
        fetchData(false);
    }, []);

    const fetchData = async (isRefresh: boolean) => {
        if (isRefresh) setIsRefreshing(true);
        else setIsLoading(true);

        try {
            const { statusText, data } = await axios.get('https://6551b75d5c69a779032904c5.mockapi.io/api/v1/transactions');
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

    return (
        <View style={styles.container}>
            <SafeAreaSpacer type={'top'} />
            <TxnList data={txnList} onRefresh={() => handleRefresh()} refreshing={isRefreshing} />
            <LoadingOverlay isVisible={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neutral[100] }
});

export { TransactionHistoryPage };
