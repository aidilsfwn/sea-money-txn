import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Button, SafeAreaSpacer, Text } from '../../components';
import { colors } from '../../styles';
import { TxnHistoryItem } from './TransactionHistoryPage';
import { SCALER, formatCurrency, getTextAmountColor, getTxnTypeDesc } from '../../utils';

interface TransactionHistoryDetailsProps {
    route?: {
        params: {
            data: TxnHistoryItem;
        };
    };
}

const DEFAULT_DATA: TxnHistoryItem = {
    amount: '0.00',
    date: '2023-11-13T19:10:31.525Z',
    description: '-',
    id: '0',
    refNo: '-',
    type: 'd'
};

const TransactionHistoryDetailsPage = ({ route }: TransactionHistoryDetailsProps) => {
    const navigation = useNavigation();

    const { refNo, amount, date, type, description } = route?.params.data ?? DEFAULT_DATA;

    const handleBack = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <SafeAreaSpacer type={'top'} />
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textHeader} bold>
                        Transaction Details
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={[styles.tagContainer, { backgroundColor: getTextAmountColor(type) }]}>
                        <Text style={styles.textTag}>{getTxnTypeDesc(type)}</Text>
                    </View>
                    <Text style={styles.textAmount}>RM {formatCurrency(amount)}</Text>
                    <View style={styles.row}>
                        <View style={styles.flex1}>
                            <Text style={styles.textLabel}>Date</Text>
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.textValue}>{moment(date).format('D MMMM YYYY')}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.flex1}>
                            <Text style={styles.textLabel}>Reference No.</Text>
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.textValue}>{refNo}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.flex1}>
                            <Text style={styles.textLabel}>Remarks</Text>
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.textValue}>{description}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={handleBack} text="Done" />
                    <SafeAreaSpacer type={'bottom'} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.blue[300], paddingHorizontal: SCALER.w(0) },
    contentContainer: { flex: 1 },
    row: { flexDirection: 'row', marginBottom: SCALER.h(12) },
    flex1: { flex: 1 },
    headerContainer: { paddingHorizontal: SCALER.w(32) },
    bottomContainer: { flex: 1, backgroundColor: colors.neutral[100], paddingHorizontal: SCALER.w(32), paddingTop: SCALER.h(32) },
    textHeader: {
        fontSize: 32,
        marginRight: SCALER.w(16),
        color: colors.neutral[100],
        marginTop: SCALER.h(24),
        marginBottom: SCALER.h(24)
    },
    tagContainer: {
        width: '30%',
        alignItems: 'center',
        paddingVertical: SCALER.h(6),
        borderRadius: 50
    },
    textAmount: { fontSize: 28, marginTop: SCALER.h(18), marginBottom: SCALER.h(36) },
    textLabel: { fontSize: 16, color: colors.neutral[600] },
    textValue: { fontSize: 16, color: colors.neutral[700], textAlign: 'right' },
    textTag: { color: colors.neutral[100], fontWeight: 'bold' },
    buttonContainer: { backgroundColor: colors.neutral[100], paddingHorizontal: SCALER.w(32) }
});

export { TransactionHistoryDetailsPage };
