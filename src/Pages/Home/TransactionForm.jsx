import { useState, Fragment } from 'react';


const TransactionForm = (props) => {
    
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');

    const submitTransactionFormHandler = (e) => {
        e.preventDefault();
        console.log(transactionName, transactionAmount);
    }
    
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