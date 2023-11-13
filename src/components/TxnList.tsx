import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TxnHistoryItem } from '../pages';
import { SCALER } from '../utils/scaler';
import { colors } from '../styles';
import { formatCurrency, getTextAmountColor, getTxnTypeDesc } from '../utils';
import { ROUTES } from '../constants/routes';
import { BiometricsAPI } from '../integrations/biometric';
import Toast from 'react-native-toast-message';

interface ListProps {
    data: TxnHistoryItem[];
    onRefresh: () => void;
    refreshing: boolean;
    isRestricted: boolean;
}

const TxnList = ({ data, onRefresh, refreshing, isRestricted }: ListProps) => {
    const navigation = useNavigation();
    const [total, setTotal] = useState<{ credit: number; debit: number }>({ credit: 0.0, debit: 0.0 });

    useEffect(() => {
        calculateTotal();
    }, [data]);

    const calculateTotal = () => {
        let totalCredit: number = 0.0;
        let totalDebit: number = 0.0;

        data.forEach((item) => {
            if (item.type === 'c') totalCredit += Number(item.amount);
            if (item.type === 'd') totalDebit += Number(item.amount);
        });

        setTotal({ credit: totalCredit, debit: totalDebit });
    };

    const handlePressItem = async (item: TxnHistoryItem) => {
        if (isRestricted)
            Toast.show({
                type: 'info',
                text1: 'Restricted!',
                text2: 'Transaction details is only available in unrestricted mode. Unlock this feature by tapping on "Unlock unrestricted view" button on the top left of your screen.'
            });
        else navigation.navigate(ROUTES.TRANSACTION_HISTORY_DETAILS, { data: item });
    };

    const renderItem = ({ item }: { item: TxnHistoryItem }) => {
        return (
            <TouchableOpacity onPress={() => handlePressItem(item)}>
                <Text style={styles.textDate}>{moment(item.date).format('DD MMMM YYYY')}</Text>
                <Text style={[styles.textAmount, { color: getTextAmountColor(item.type) }]}>
                    RM {isRestricted ? '**.**' : formatCurrency(item.amount)}
                </Text>
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.textLabel}>Transaction Type</Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={styles.textValue}>{getTxnTypeDesc(item.type)}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.textLabel}>Reference No.</Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={styles.textValue}>{item.refNo}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.textLabel}>Remarks</Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={styles.textValue}>{item.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSeparator = () => <View style={{ marginVertical: SCALER.h(24), height: 2, backgroundColor: colors.border }} />;

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.textHeader}>Transaction History</Text>
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.textLabelTotal}>Total Credit</Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={[styles.textValueTotal, { color: colors.green[500] }]}>
                            RM {isRestricted ? '**.**' : formatCurrency(total.credit)}
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.textLabelTotal}>Total Debit</Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={[styles.textValueTotal, { color: colors.red[500] }]}>
                            RM {isRestricted ? '**.**' : formatCurrency(total.debit)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderEmpty = () => {
        return (
            <View style={styles.flex1}>
                <Text style={{ color: colors.neutral[500] }}>There's no transaction available at the moment</Text>
            </View>
        );
    };

    return (
        <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: SCALER.w(32), paddingBottom: SCALER.h(64) }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.refNo}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmpty}
        />
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: 'row', marginBottom: SCALER.h(6) },
    flex1: { flex: 1 },
    headerContainer: { marginBottom: SCALER.h(24) },
    textHeader: { fontWeight: 'bold', fontSize: 32, marginBottom: SCALER.h(32) },
    textAmount: { fontWeight: 'bold', fontSize: 28, marginBottom: SCALER.h(24) },
    textDate: { fontSize: 14, color: colors.neutral[500], marginBottom: SCALER.h(12) },
    textLabelTotal: { fontSize: 18, color: colors.neutral[600] },
    textValueTotal: { fontSize: 18, textAlign: 'right', fontWeight: 'bold', color: colors.neutral[700] },
    textLabel: { fontSize: 16, color: colors.neutral[600] },
    textValue: { fontSize: 16, color: colors.neutral[700], fontWeight: 'bold', textAlign: 'right' }
});

export { TxnList };
