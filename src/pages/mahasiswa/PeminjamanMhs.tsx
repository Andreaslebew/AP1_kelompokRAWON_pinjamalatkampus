import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Card } from '../../components/Card/Card';
import { LoanTimeline } from '../../components/LoanTimeline';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { MAHASISWA } from '../../data/seed';
import { formatTanggal, rentangJam, stageStep } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';

type Tab = 'aktif' | 'menunggu';

export const PeminjamanMhs: FC = () => {
    const { facilities, requests } = useAppData();
    const [tab, setTab] = useState<Tab>('aktif');

    const milik = requests.filter((r) => r.requester === MAHASISWA.name);
    const daftar = milik.filter((r) => (tab === 'aktif' ? r.stage === 'dipinjam' : r.stage === 'menunggu'));

    return (
        <div className="flex flex-col gap-4 px-4 pb-6">
        <PageHeader title="Peminjaman" />

        <div role="tablist" className="grid grid-cols-2 gap-1 rounded-lg border border-gray-200 bg-white p-1">
            {(['aktif', 'menunggu'] as const).map((t) => (
            <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`h-10 rounded-md text-body font-semibold transition-colors ${
                tab === t ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
                {t === 'aktif' ? 'Aktif' : 'Menunggu'}
            </button>
            ))}
        </div>

        {daftar.length === 0 && (
            <p className="py-8 text-center text-body text-gray-500">
            {tab === 'aktif' ? 'Tidak ada peminjaman aktif.' : 'Tidak ada pengajuan yang menunggu.'}
            </p>
        )}

        {daftar.map((r) => {
            const f = facilities.find((x) => x.id === r.facilityId);
            if (!f) return null;
            return (
            <Card key={r.id} className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-caption font-semibold text-gray-500">{f.unit}</p>
                    <p className="text-h5 font-semibold">{f.name}</p>
                </div>
                <StatusBadge status={r.stage === 'menunggu' ? 'menunggu' : 'dipinjam'} />
                </div>

                <LoanTimeline step={stageStep(r.stage)} />

                <div className="flex items-center justify-between text-body">
                <span className="flex items-center gap-2 text-gray-500">
                    <Calendar className="size-4" aria-hidden />
                    Periode
                </span>
                <span className="font-semibold">
                    {formatTanggal(r.date)} · {rentangJam(r.start, r.end)}
                </span>
                </div>

                <Link
                to={`/mahasiswa/fasilitas/${f.id}`}
                className="flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white font-semibold hover:bg-gray-50"
                >
                Lihat detail
                </Link>
            </Card>
            );
        })}
        </div>
    );
};