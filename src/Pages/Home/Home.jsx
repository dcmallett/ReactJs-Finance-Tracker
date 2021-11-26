import styles from './Home.module.css';
import TransactionForm from './TransactionForm';

const Home = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                Transaction list
            </div>
            <div className={styles.sidebar}>
                <TransactionForm />
            </div>
        </div>
    );
}

export default Home;