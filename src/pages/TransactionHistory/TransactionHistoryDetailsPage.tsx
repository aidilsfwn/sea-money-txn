import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Button, SafeAreaSpacer } from '../../components';
import { colors } from '../../styles';
import { TxnHistoryItem } from './TransactionHistoryPage';
import { SCALER, formatCurrency, getTextAmountColor, getTxnTypeDesc } from '../../utils';

interface TransactionHistoryDetailsProps {
    route: {
        params: {
            item: TxnHistoryItem;
        };
    };
}

const TransactionHistoryDetailsPage = ({ route }: TransactionHistoryDetailsProps) => {
    const navigation = useNavigation();

    const { refNo, amount, date, type, description } = route.params.item;

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <SafeAreaSpacer type={'top'} />
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textHeader}>Transaction Details</Text>
                </View>
                <View style={[styles.tagContainer, { backgroundColor: getTextAmountColor(type) }]}>
                    <Text style={styles.textTag}>{getTxnTypeDesc(type)}</Text>
                </View>
                <Text style={styles.textAmount}>RM {formatCurrency(amount)}</Text>
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.textLabel}>Date</Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={styles.textValue}>{moment(date).format('DD MMMM YYYY')}</Text>
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
            <Button onPress={handleBack} text="Done" />
            <SafeAreaSpacer type={'bottom'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neutral[100], paddingHorizontal: SCALER.w(32) },
    contentContainer: { flex: 1 },
    row: { flexDirection: 'row', marginBottom: SCALER.h(12) },
    flex1: { flex: 1 },
    headerContainer: { marginTop: SCALER.h(24), marginBottom: SCALER.h(48) },
    textHeader: { fontWeight: 'bold', fontSize: 32 },
    tagContainer: {
        width: '30%',
        alignItems: 'center',
        paddingVertical: SCALER.h(6),
        borderRadius: 50
    },
    textAmount: { fontWeight: 'bold', fontSize: 28, marginTop: SCALER.h(18), marginBottom: SCALER.h(36) },
    textLabel: { fontSize: 16, color: colors.neutral[600] },
    textValue: { fontSize: 16, color: colors.neutral[700], fontWeight: 'bold', textAlign: 'right' },
    textTag: { color: colors.neutral[100], fontWeight: 'bold' }
});

export { TransactionHistoryDetailsPage };
