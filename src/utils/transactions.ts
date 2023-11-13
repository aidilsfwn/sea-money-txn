import { colors } from '../styles';

const getTxnTypeDesc = (txnTypeCode: string) => {
    if (txnTypeCode === 'c') return 'Credit';
    if (txnTypeCode === 'd') return 'Debit';
    return '-';
};

const getTextAmountColor = (txnTypeCode: string) => {
    if (txnTypeCode === 'c') return colors.green[500];
    if (txnTypeCode === 'd') return colors.red[500];
    return colors.neutral[700];
};

const formatCurrency = (amount: string | number) => {
    let stringAmount: string = '';
    let roundedOffAmount: number = 0;
    if (typeof amount === 'number') {
        roundedOffAmount = Math.round(amount * 100) / 100;
    }
    if (typeof amount === 'string') {
        if (amount === '-') return '-';
        roundedOffAmount = Math.round(Number(amount) * 100) / 100;
    }
    stringAmount = String(roundedOffAmount.toFixed(2));
    return stringAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export { getTextAmountColor, getTxnTypeDesc, formatCurrency };
