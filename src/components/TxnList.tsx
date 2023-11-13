import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { TxnHistoryItem } from '../pages';
import { SCALER } from '../utils/scaler';
import { colors } from '../styles';
import { formatCurrency, getTextAmountColor, getTxnTypeDesc } from '../utils';
import { ROUTES } from '../constants/routes';
import { Text } from '.';

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
                text2: 'Transaction details is only available in unrestricted mode.'
            });
        else navigation.navigate(ROUTES.TRANSACTION_HISTORY_DETAILS, { data: item });
    };

    const renderItem = ({ item }: { item: TxnHistoryItem }) => {
        return (
            <TouchableOpacity onPress={() => handlePressItem(item)} style={{ marginHorizontal: SCALER.w(32) }}>
                <Text style={styles.textDate}>{moment(item.date).format('D MMMM YYYY')}</Text>
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

    const renderSeparator = () => (
        <View style={{ marginHorizontal: SCALER.w(32), marginVertical: SCALER.h(24), height: 2, backgroundColor: colors.border }} />
    );

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={{ backgroundColor: colors.blue[300], paddingHorizontal: SCALER.w(32) }}>
                    <Text style={styles.textHeader} bold>
                        Transaction History
                    </Text>
                </View>
                <View style={styles.totalCard}>
                    <View style={[styles.row, { marginBottom: SCALER.h(16) }]}>
                        <View style={styles.flex1}>
                            <Text style={styles.textLabelTotal}>Total Credit</Text>
                        </View>
                        <View style={styles.flex1}>
                            <Text style={[styles.textValueTotal, { color: colors.green[500] }]}>
                                RM {isRestricted ? '**.**' : formatCurrency(total.credit)}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.row, { marginBottom: SCALER.h(0) }]}>
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
            </View>
        );
    };

    const renderEmpty = () => {
        return (
            <View style={[styles.flex1, { marginHorizontal: SCALER.w(32) }]}>
                <Text style={{ color: colors.neutral[500] }}>There's no transaction available at the moment</Text>
            </View>
        );
    };

    return (
        <FlatList
            contentContainerStyle={styles.container}
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
    container: { flexGrow: 1, paddingHorizontal: SCALER.w(0), paddingBottom: SCALER.h(64), backgroundColor: colors.neutral[100] },
    row: { flexDirection: 'row', marginBottom: SCALER.h(6) },
    flex1: { flex: 1 },
    headerContainer: { marginBottom: SCALER.h(24) },
    textHeader: { fontSize: 32, marginBottom: SCALER.h(24), marginRight: SCALER.w(16), color: colors.neutral[100] },
    textAmount: { fontSize: 24, marginBottom: SCALER.h(24) },
    textDate: { fontSize: 14, color: colors.neutral[500], marginBottom: SCALER.h(12) },
    textLabelTotal: { fontSize: 18, color: colors.neutral[600] },
    textValueTotal: { fontSize: 18, textAlign: 'right', color: colors.neutral[700] },
    textLabel: { fontSize: 16, color: colors.neutral[600] },
    textValue: { fontSize: 16, color: colors.neutral[700], textAlign: 'right' },
    shadow: {
        shadowOffset: { width: 0, height: 12 },
        shadowColor: colors.shadow,
        shadowOpacity: 0.12, // ios shadow
        shadowRadius: 32
    },
    totalCard: {
        backgroundColor: colors.neutral[100],
        marginHorizontal: SCALER.w(32),
        paddingVertical: SCALER.h(24),
        paddingHorizontal: SCALER.w(18),
        marginTop: SCALER.h(36),
        marginBottom: SCALER.h(18),
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.blue[400]
    }
});

export { TxnList };
