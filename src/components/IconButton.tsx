import type { FC, ReactNode } from 'react';

export const IconButton: FC<{
    label: string;
    onClick?: () => void;
    pressed?: boolean;
    children: ReactNode;
}> = ({ label, onClick, pressed, children }) => (
    <button
        type="button"
        aria-label={label}
        aria-pressed={pressed}
        onClick={onClick}
        className={`flex size-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200 ${
        pressed ? 'bg-gray-200 text-primary' : ''
        }`}
    >
        {children}
    </button>
);