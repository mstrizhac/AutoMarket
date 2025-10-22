import styles from './Button.module.css';

function Button({label, value, type, placeHolder, onChange}) {
  return (
      <div className={styles.inputGroup}>
          <label className={styles.label}>{label}</label>
          <input
              type={type}
              placeholder={placeHolder}
              value={value}
              onChange={onChange}
              className={styles.input}
              required
          />
      </div>
  );
}

export default Button;
