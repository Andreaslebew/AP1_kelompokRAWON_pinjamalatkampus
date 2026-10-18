import type { FC } from 'react';

const LABELS = ['Diajukan', 'Diverifikasi', 'Dipinjam', 'Dikembalikan'];

export const LoanTimeline: FC<{ step: number }> = ({ step }) => (
    <ol className="grid grid-cols-4 gap-1 text-center">
        {LABELS.map((label, i) => {
        const done = i <= step;
        return (
            <li key={label} className="flex flex-col items-center gap-1.5">
            <span
                aria-hidden
                className={`size-3 rounded-full border-2 ${
                done ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                }`}
            />
            <span className={`text-caption ${i === step ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                {label}
            </span>
            </li>
        );
        })}
    </ol>
);