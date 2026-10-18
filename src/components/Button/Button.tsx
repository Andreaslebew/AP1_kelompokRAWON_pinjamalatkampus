import { forwardRef, type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 'primary' = aksi utama (mis. "Setuju"); 'secondary' = outline putih (mis. "Tolak"). */
    variant?: ButtonVariant;
    fullWidth?: boolean;
}

const base =
    'inline-flex h-12 items-center justify-center gap-2 rounded-lg px-4 text-body font-semibold transition-colors ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
    'disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
    primary:
        'border border-primary bg-primary text-white hover:bg-primary-hover active:bg-primary-active ' +
        'disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500',
    secondary:
        'border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 ' +
        'disabled:border-gray-200 disabled:text-gray-400',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', fullWidth = false, className = '', type = 'button', children, ...rest }, ref) => (
        <button
        ref={ref}
        type={type}
        className={[base, variants[variant], fullWidth ? 'w-full' : '', className].join(' ')}
        {...rest}
        >
        {children}
        </button>
    ),
);
Button.displayName = 'Button';