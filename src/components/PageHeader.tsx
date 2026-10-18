import type { FC, ReactNode } from 'react';

export const PageHeader: FC<{ title: string; subtitle?: string; action?: ReactNode }> = ({
    title,
    subtitle,
    action,
}) => (
    <header className="flex items-start justify-between gap-4 px-4 pt-6">
        <div className="min-w-0">
        <h1 className="text-h4 font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-body text-gray-500">{subtitle}</p>}
        </div>
        {action}
    </header>   
);