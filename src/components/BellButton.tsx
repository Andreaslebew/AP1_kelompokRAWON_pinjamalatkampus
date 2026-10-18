import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

export const BellButton: FC<{ to: string; count?: number }> = ({ to, count = 0 }) => (
    <Link
        to={to}
        aria-label={count > 0 ? `Notifikasi, ${count} baru` : 'Notifikasi'}
        className="relative flex size-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200"
    >
        <Bell className="size-6" aria-hidden />
        {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
            {count}
        </span>
        )}
    </Link>
);