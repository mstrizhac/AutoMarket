import styles from './Input.module.css';

function Input({name, label, value, type, placeHolder, onChange}) {
  return (
      <div className={styles.inputGroup}>
          <label className={styles.label}>{label}</label>
          <input
              type={type}
              name={name}
              placeholder={placeHolder}
              value={value}
              onChange={onChange}
              className={styles.input}
              required
          />
      </div>
  );
}

export default Input;
