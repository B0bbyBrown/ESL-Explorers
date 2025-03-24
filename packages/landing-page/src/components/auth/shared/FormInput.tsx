import { FormInputProps } from "../types/auth.types";
import styles from "../styles/FormInput.module.css";

export const FormInput = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
}: FormInputProps) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        required={required}
        disabled={disabled}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
