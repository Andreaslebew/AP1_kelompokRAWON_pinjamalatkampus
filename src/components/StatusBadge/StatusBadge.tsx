import type { FC } from 'react';

export type StatusKey =
    | 'tersedia' | 'dipinjam' | 'perawatan'
    | 'menunggu' | 'dikembalikan' | 'ditolak' | 'terlambat';

const STYLE: Record<StatusKey, { label: string; text: string; bg: string; dot: string }> = {
    tersedia: { label: 'Tersedia', text: 'text-success', bg: 'bg-success-tint', dot: 'bg-success' },
    dipinjam: { label: 'Dipinjam', text: 'text-warning', bg: 'bg-warning-tint', dot: 'bg-warning' },
    perawatan: { label: 'Perawatan', text: 'text-gray-600', bg: 'bg-gray-100', dot: 'bg-gray-500' },
    menunggu: { label: 'Menunggu', text: 'text-info', bg: 'bg-info-tint', dot: 'bg-info' },
    dikembalikan: { label: 'Dikembalikan', text: 'text-success', bg: 'bg-success-tint', dot: 'bg-success' },
    ditolak: { label: 'Ditolak', text: 'text-danger', bg: 'bg-danger-tint', dot: 'bg-danger' },
    terlambat: { label: 'Terlambat', text: 'text-danger', bg: 'bg-danger-tint', dot: 'bg-danger' },
};

export const StatusBadge: FC<{ status: StatusKey }> = ({ status }) => {
    const s = STYLE[status];
    return (
        <span
        className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-caption font-semibold ${s.bg} ${s.text}`}
        >
        <span aria-hidden className={`size-1.5 rounded-full ${s.dot}`} />
        {s.label}
        </span>
    );
};