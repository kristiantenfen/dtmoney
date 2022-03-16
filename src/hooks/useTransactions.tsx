import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type TransactionProps = {
    id: number,
    title: string,
    amount: number,
    category: string,
    type: string,
    createdAt: Date
}

type TransactionsContextData = {
    transactions: TransactionProps[],
    createNewTransaction: (transaction: NewTransactionProps) => Promise<void>
}

type NewTransactionProps = Omit<TransactionProps, 'id' | 'createdAt'>;

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


type TransactionsProviderProps = {
    children: ReactNode
}

export const TransactionsProvider = ({children}: TransactionsProviderProps) => {

    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    
    useEffect(() => {
        api.get('transactions').then((response) => {
            setTransactions(response.data.transactions);
        })
    }, []);

    const createNewTransaction = async (newTransaction: NewTransactionProps) => {
        const { data: { transaction } } = await api.post('/transactions', { ...newTransaction, createdAt: new Date() });
        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createNewTransaction }}>
            {children}
        </TransactionsContext.Provider>
        );
}

export const useTransactions = () => {
    return useContext(TransactionsContext);
}
