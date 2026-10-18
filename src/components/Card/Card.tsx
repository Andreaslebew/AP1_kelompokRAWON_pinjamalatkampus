import { forwardRef, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'default';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ padding = 'default', className = '', children, ...rest }, ref) => (
        <div
        ref={ref}
        className={[
            'rounded-lg border border-gray-200 bg-white',
            padding === 'default' ? 'p-4' : '',
            className,
        ].join(' ')}
        {...rest}
        >
        {children}
        </div>
    ),
);
Card.displayName = 'Card';