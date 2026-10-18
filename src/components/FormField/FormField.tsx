import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    /** Opsional; jika kosong dibuat otomatis. */
    id?: string;
    error?: string;
    helperText?: string;
    icon?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, id, error, helperText, icon, required, className = '', ...rest }, ref) => {
        const autoId = useId();
        const inputId = id ?? autoId;
        const describedBy = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

        return (
        <div className="flex w-full flex-col gap-1">
            <label htmlFor={inputId} className="text-sm font-semibold text-gray-800">
            {label}
            {required && <span className="text-danger"> *</span>}
            </label>

            <div
            className={[
                'flex h-12 items-center gap-2 rounded-lg border bg-white px-4 focus-within:ring-2',
                error
                ? 'border-danger focus-within:ring-danger-tint'
                : 'border-gray-200 focus-within:border-primary focus-within:ring-primary-tint',
            ].join(' ')}
            >
            {icon && <span className="flex items-center text-gray-400">{icon}</span>}
            <input
                ref={ref}
                id={inputId}
                required={required}
                aria-invalid={!!error}
                aria-describedby={describedBy}
                className={[
                'flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400',
                'disabled:cursor-not-allowed disabled:text-gray-400',
                className,
                ].join(' ')}
                {...rest}
            />
            </div>

            {error ? (
            <p id={`${inputId}-error`} className="text-xs text-danger">{error}</p>
            ) : helperText ? (
            <p id={`${inputId}-helper`} className="text-xs text-gray-500">{helperText}</p>
            ) : null}
        </div>
        );
    },
);
FormField.displayName = 'FormField';