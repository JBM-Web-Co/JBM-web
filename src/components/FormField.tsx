import s from './FormField.module.scss';

type FormFieldProps = Readonly<{
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
    value: string;
    error?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    options?: readonly string[];
    autoComplete?: string;
}>;

export function FormField({
    label,
    name,
    type = 'text',
    value,
    error,
    onChange,
    placeholder,
    required,
    options = [],
    autoComplete,
}: FormFieldProps) {
    const input_cls =
        `${s.formInput} ${error ? s.formInputError : ''} ${type === 'textarea' ? s.formTextarea : ''} ${type === 'select' ? s.formSelect : ''}`.trim();
    const input_id = `field-${name}`;
    const error_id = `error-${name}`;

    return (
        <div className={s.formGroup}>
            <label htmlFor={input_id} className={s.formLabel}>
                {label}
                {required && ' *'}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={input_id}
                    name={name}
                    className={input_cls}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    aria-describedby={error ? error_id : undefined}
                    aria-invalid={!!error}
                />
            ) : type === 'select' ? (
                <select
                    id={input_id}
                    name={name}
                    className={input_cls}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    aria-describedby={error ? error_id : undefined}
                    aria-invalid={!!error}
                >
                    <option value="">Select a service...</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={input_id}
                    name={name}
                    type={type}
                    className={input_cls}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    aria-describedby={error ? error_id : undefined}
                    aria-invalid={!!error}
                />
            )}
            {error && (
                <p id={error_id} className={s.formError} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
