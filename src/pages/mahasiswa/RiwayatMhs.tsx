import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, ChevronRight, ListFilter } from 'lucide-react';
import { Card } from '../../components/Card/Card'; 
import { FacilityIcon } from '../../components/FacilityIcon';
import { IconButton } from '../../components/IconButton';
import { IconTile } from '../../components/IconTile';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { MAHASISWA } from '../../data/seed';
import { chipClass } from '../../lib/chip';
import { formatTanggalLengkap } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';

type Filter = 'semua' | 'dikembalikan' | 'ditolak';

export const RiwayatMhs: FC = () => {
    const { facilities, requests, notifications, markAllNotificationsRead } = useAppData();
    const [filter, setFilter] = useState<Filter>('semua');
    const [showFilter, setShowFilter] = useState(false);

    const riwayat = requests.filter(
        (r) =>
        r.requester === MAHASISWA.name &&
        (r.stage === 'dikembalikan' || r.stage === 'ditolak') &&
        (filter === 'semua' || r.stage === filter),
    );

    return (
        <div className="flex flex-col gap-6 px-4 pb-6">
        <PageHeader
            title="Riwayat"
            action={
            <IconButton label="Tandai semua sudah dibaca" onClick={markAllNotificationsRead}>
                <CheckCheck className="size-5" aria-hidden />
            </IconButton>
            }
        />

        <section aria-label="Notifikasi" className="flex flex-col gap-2">
            {notifications.map((n) => (
            <Card key={n.id} className="flex gap-3">
                <IconTile tone="primary">
                <Bell className="size-5" aria-hidden />
                </IconTile>
                <div className="min-w-0 flex-1">
                <p className="text-body font-semibold">{n.title}</p>
                <p className="text-body text-gray-600">{n.body}</p>
                <p className="text-caption text-gray-500">{n.waktu}</p>
                </div>
                {!n.read && <span aria-label="Belum dibaca" className="mt-1 size-2 shrink-0 rounded-full bg-info" />}
            </Card>
            ))}
        </section>

        <section aria-labelledby="riwayat-title" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <h2 id="riwayat-title" className="text-h5 font-semibold">Riwayat peminjaman</h2>
            <button
                type="button"
                aria-pressed={showFilter}
                onClick={() => setShowFilter((v) => !v)}
                className="inline-flex items-center gap-1 text-body font-semibold text-primary"
            >
                <ListFilter className="size-4" aria-hidden />
                Filter
            </button>
            </div>

            {showFilter && (
            <div role="group" aria-label="Filter riwayat" className="flex gap-2">
                {(['semua', 'dikembalikan', 'ditolak'] as const).map((value) => (
                <button
                    key={value}
                    type="button"
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                    className={chipClass(filter === value)}
                >
                    {value === 'semua' ? 'Semua' : value === 'dikembalikan' ? 'Dikembalikan' : 'Ditolak'}
                </button>
                ))}
            </div>
            )}

            {riwayat.length === 0 && <p className="text-body text-gray-500">Belum ada riwayat peminjaman.</p>}

            {riwayat.map((r) => {
            const f = facilities.find((x) => x.id === r.facilityId);
            if (!f) return null;
            return (
                <Link key={r.id} to={`/mahasiswa/fasilitas/${f.id}`} className="block rounded-lg">
                <Card className="flex items-center gap-4 hover:bg-gray-50">
                    <IconTile>
                    <FacilityIcon icon={f.icon} />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-caption font-semibold uppercase tracking-wide text-gray-500">
                        {f.unit} · {formatTanggalLengkap(r.date)}
                        </p>
                        <StatusBadge status={r.stage === 'ditolak' ? 'ditolak' : 'dikembalikan'} />
                    </div>
                    <p className="text-h5 font-semibold">{f.name}</p>
                    <p className="text-caption text-gray-500">
                        {r.catatan ?? (r.stage === 'ditolak' ? 'Ditolak oleh staf' : '-')}
                    </p>
                    </div>
                    <ChevronRight className="size-5 text-gray-400" aria-hidden />
                </Card>
                </Link>
            );
            })}
        </section>
        </div>
    );
};