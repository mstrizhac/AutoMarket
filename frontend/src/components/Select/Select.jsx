import styles from './Select.module.css';

function Select({name, children, label, value, onChange}) {
    return (<div className={styles.inputGroup}>
        <label className={styles.label}>{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={styles.select}
            required
        >
            {children}
        </select>
    </div>);
}

export default Select;
