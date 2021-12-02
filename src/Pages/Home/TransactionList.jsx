import { useFirestore } from '../../Hooks/useFirestore';

import styles from './Home.module.css';

const TransactionList = ({ transactions }) => {

    const { deleteDocument, response } = useFirestore('transactions');
    console.log(response);
    return (
        <ul className={styles.transactions}>
            {transactions.map((transaction) => (
                <li key={transaction.id}>
                    <p className={styles.name}>{transaction.transactionName}</p>
                    <p className={styles.amount}>${transaction.transactionAmount}</p>
                    <button onClick={() => {deleteDocument(transaction.id)}}>X</button>
                </li>
            ))}
        </ul>
    )
}

export default TransactionList;