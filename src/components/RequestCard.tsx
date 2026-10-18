import type { FC } from 'react';
import { Button } from './Button/Button';
import { Card } from './Card/Card';
import { FacilityIcon } from './FacilityIcon';
import { StatusBadge, type StatusKey } from './StatusBadge/StatusBadge';
import { formatJam, formatTanggal, initials } from '../lib/schedule';
import type { BookingRequest, Facility, RequestStage } from '../types';

const badgeFor = (stage: RequestStage): StatusKey => {
    if (stage === 'menunggu') return 'menunggu';
    if (stage === 'dikembalikan') return 'dikembalikan';
    if (stage === 'ditolak') return 'ditolak';
    return 'dipinjam';
};

interface RequestCardProps {
    request: BookingRequest;
    facility: Facility;
    onDecide?: (keputusan: 'setujui' | 'tolak') => void;
}

export const RequestCard: FC<RequestCardProps> = ({ request: r, facility: f, onDecide }) => (
    <Card className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
        <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-info-tint text-body font-bold text-info"
        >
            {initials(r.requester)}
        </span>
        <div className="min-w-0 flex-1">
            <p className="text-body font-semibold">{r.requester}</p>
            <p className="text-caption text-gray-500">Mahasiswa · {r.nim}</p>
        </div>
        <StatusBadge status={badgeFor(r.stage)} />
        </div>

        <p className="text-caption text-gray-500">
        {r.diajukan} · Keperluan: {r.purpose}
        </p>

        <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-3">
        <FacilityIcon icon={f.icon} className="size-5 text-primary" />
        <div>
            <p className="text-body font-semibold">{f.name}</p>
            <p className="text-caption text-gray-500">
            {f.unit} · {formatTanggal(r.date)} · {formatJam(r.start)}
            </p>
        </div>
        </div>

        {onDecide && (
        <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => onDecide('tolak')}>Tolak</Button>
            <Button onClick={() => onDecide('setujui')}>Setuju</Button>
        </div>
        )}
    </Card>
);