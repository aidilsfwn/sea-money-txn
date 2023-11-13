import { TxnHistoryItem } from '../pages';

export type Routes = { [key: string]: keyof ROUTES_PARAMS };

export enum ROUTES {
    HOME = 'Home',
    TRANSACTION_HISTORY = 'TransactionHistory',
    TRANSACTION_HISTORY_DETAILS = 'TransactionHistoryDetails'
}

export type ROUTES_PARAMS = {
    Home: undefined;
    TransactionHistory: undefined;
    TransactionHistoryDetails: {
        data: TxnHistoryItem;
    };
};
