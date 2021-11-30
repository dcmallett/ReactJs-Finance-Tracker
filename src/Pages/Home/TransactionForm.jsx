import { useState, Fragment, useEffect } from 'react';
import { useFirestore } from '../../Hooks/useFirestore';

const TransactionForm = ({ uid }) => {
    
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    //transactions will be made for us by firestore
    const { addDocument, response } = useFirestore('transactions');

    const submitTransactionFormHandler = (e) => {
        e.preventDefault();
        addDocument({uid, transactionName, transactionAmount});
        console.log('logged');
    }
    
    useEffect(() => {
        if (response.success) {
            setTransactionName('');
            setTransactionAmount('');
        }
    }, [response.success])


    return (
        <Fragment>
            <h3>Add Transaction</h3>
            <form onSubmit={submitTransactionFormHandler}>
                <label htmlFor="transactionName">
                    <span>Transaction Name:</span>
                    <input 
                        type="text"
                        id="transactionName"
                        required 
                        onChange={(e) => setTransactionName(e.target.value)} 
                        value={transactionName} 
                    />
                </label>
                <label htmlFor="transactionAmount">
                    <span>Transaction Amount:</span>
                    <input 
                        type="number"
                        id="transactionAmount"
                        required 
                        onChange={(e) => setTransactionAmount(e.target.value)} 
                        value={transactionAmount} 
                    />
                </label>
                <button>Add Transaction</button>
            </form>
        </Fragment>
    )
}

export default TransactionForm;