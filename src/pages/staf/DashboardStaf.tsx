import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, CircleCheck, CirclePlus, Clock, FileText, ScanLine, TriangleAlert, Undo2 } from 'lucide-react';
import { BellButton } from '../../components/BellButton';
import { Card } from '../../components/Card/Card';
import { IconTile } from '../../components/IconTile';
import { PageHeader } from '../../components/PageHeader';
import { RequestCard } from '../../components/RequestCard';
import { STAF } from '../../data/seed';
import { DEMO_TODAY, firstName, formatTanggalPanjang, greeting, isLate } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';

const TILE = 'flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-caption font-semibold text-gray-700';

export const DashboardStaf: FC = () => {
    const { facilities, requests, decideRequest } = useAppData();
    const menunggu = requests.filter((r) => r.stage === 'menunggu');
    const dipinjam = requests.filter((r) => r.stage === 'dipinjam');
    const pengembalianHariIni = dipinjam.filter((r) => r.date === DEMO_TODAY);
    const terlambat = dipinjam.filter((r) => isLate(r));

    const stats = [
        { label: 'Pengembalian', value: pengembalianHariIni.length, icon: Undo2, tone: 'primary' as const, valueClass: 'text-gray-800' },
        { label: 'Sedang Dipinjam', value: dipinjam.length, icon: ArrowUpRight, tone: 'warning' as const, valueClass: 'text-gray-800' },
        { label: 'Terlambat', value: terlambat.length, icon: TriangleAlert, tone: 'danger' as const, valueClass: 'text-danger' },
        { label: 'Menunggu', value: menunggu.length, icon: Clock, tone: 'info' as const, valueClass: 'text-info' },
    ];

    const aksi = [
        { label: 'Setujui Cepat', icon: CircleCheck, to: '/staf/permintaan' },
        { label: 'Scan', icon: ScanLine, to: null },
        { label: 'Tambah Barang', icon: CirclePlus, to: '/staf/barang' },
        { label: 'Laporan', icon: FileText, to: null },
    ];

    return (
        <div className="flex flex-col gap-6 px-4 pb-6">
        <PageHeader
            title={`${greeting()}, ${firstName(STAF.name)}`}
            subtitle={formatTanggalPanjang(DEMO_TODAY)}
            action={<BellButton to="/staf/permintaan" count={menunggu.length} />}
        />

        <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary px-3 py-1 text-caption font-semibold text-primary">
            {STAF.unit} <Check className="size-3.5" aria-hidden />
            </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
            <Card key={s.label} className="flex flex-col gap-2">
                <IconTile tone={s.tone}>
                <s.icon className="size-5" aria-hidden />
                </IconTile>
                <p className={`text-h2 font-bold ${s.valueClass}`}>{s.value}</p>
                <p className="text-caption text-gray-500">{s.label}</p>
            </Card>
            ))}
        </div>

        <section aria-labelledby="aksi" className="flex flex-col gap-3">
            <h2 id="aksi" className="text-h5 font-semibold">Aksi Cepat</h2>
            <div className="grid grid-cols-4 gap-2">
            {aksi.map((a) =>
                a.to ? (
                <Link key={a.label} to={a.to} className={TILE}>
                    <IconTile tone="primary">
                    <a.icon className="size-5" aria-hidden />
                    </IconTile>
                    {a.label}
                </Link>
                ) : (
                <span
                    key={a.label}
                    aria-disabled="true"
                    title="Belum tersedia di prototipe"
                    className={`${TILE} cursor-not-allowed opacity-50`}
                >
                    <IconTile>
                    <a.icon className="size-5" aria-hidden />
                    </IconTile>
                    {a.label}
                </span>
                ),
            )}
            </div>
        </section>

        <section aria-labelledby="ditinjau" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <h2 id="ditinjau" className="text-h5 font-semibold">Perlu Ditinjau</h2>
            <Link to="/staf/permintaan" className="text-body font-semibold text-primary">
                Lihat semua ({menunggu.length})
            </Link>
            </div>

            {menunggu.length === 0 && <p className="text-body text-gray-500">Tidak ada permintaan yang perlu ditinjau.</p>}

            {menunggu.map((r) => {
            const f = facilities.find((x) => x.id === r.facilityId);
            if (!f) return null;
            return (
                <RequestCard key={r.id} request={r} facility={f} onDecide={(k) => decideRequest(r.id, k)} />
            );
            })}
        </section>
        </div>
    );
};