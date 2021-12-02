import { useAuthContext } from '../../Hooks/useAuthContext';
import styles from './Home.module.css';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useCollection } from '../../Hooks/useCollection';

const Home = (props) => {

    const { user } = useAuthContext();
    //pass in the transaction we want to connect to
    const { documents, error} = useCollection(
        'transactions',
        //this is part of a query in our collection that will check if the uid matches the users uid
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    );

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { error && <p>{error}</p>}
                {documents && <TransactionList transactions={documents} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    );
}

export default Home;