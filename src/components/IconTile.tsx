import type { FC, ReactNode } from 'react';

type Tone = 'neutral' | 'primary' | 'warning' | 'danger' | 'info';

const TONE: Record<Tone, string> = {
    neutral: 'bg-gray-100 text-primary',
    primary: 'bg-primary-tint text-primary',
    warning: 'bg-warning-tint text-warning',
    danger: 'bg-danger-tint text-danger',
    info: 'bg-info-tint text-info',
};

export const IconTile: FC<{ children: ReactNode; tone?: Tone; className?: string }> = ({
    children,
    tone = 'neutral',
    className = '',
}) => (
    <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${TONE[tone]} ${className}`}>
        {children}
    </div>
);