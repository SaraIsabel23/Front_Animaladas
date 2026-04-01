import styles from './Error.module.css';

function Error({ message = 'Ha ocurrido un error' }) {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
}

export default Error;