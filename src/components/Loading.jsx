import styles from './Loading.module.css';

function Loading({ message = 'Cargando...' }) {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;