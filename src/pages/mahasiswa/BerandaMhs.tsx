import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CircleHelp, Search } from 'lucide-react';
import { Card } from '../../components/Card/Card';
import { BellButton } from '../../components/BellButton';
import { FacilityIcon, UnitIcon } from '../../components/FacilityIcon';
import { IconTile } from '../../components/IconTile';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { MAHASISWA, UNITS } from '../../data/seed';
import { DEMO_TODAY, firstName, formatJam, formatTanggal, greeting, isLate, sisaWaktu } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';

export const BerandaMhs: FC = () => {
    const { facilities, requests, notifications } = useAppData();
    const aktif = requests.filter((r) => r.requester === MAHASISWA.name && r.stage === 'dipinjam');
    const belumDibaca = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex flex-col gap-6 px-4 pb-6">
        <PageHeader
            title={`${greeting()}, ${firstName(MAHASISWA.name)}`}
            subtitle="Apa yang ingin kamu pinjam?"
            action={<BellButton to="/mahasiswa/riwayat" count={belumDibaca} />}
        />

        <Link
            to="/mahasiswa/katalog"
            className="flex h-12 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 text-body text-gray-400 hover:border-primary"
        >
            <Search className="size-5" aria-hidden />
            Cari ruang atau alat
        </Link>

        <section aria-labelledby="jelajahi" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <h2 id="jelajahi" className="text-h5 font-semibold">Jelajahi unit</h2>
            <Link to="/mahasiswa/katalog" className="text-body font-semibold text-primary">Lihat semua</Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
            {UNITS.map((u) => (
                <Link
                key={u.code}
                to={`/mahasiswa/katalog?unit=${u.code}`}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-primary"
                >
                <IconTile tone="primary">
                    <UnitIcon unit={u.code} />
                </IconTile>
                <span className="text-body font-bold text-gray-800">{u.code}</span>
                </Link>
            ))}
            </div>
        </section>

        <section aria-labelledby="aktif" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <h2 id="aktif" className="text-h5 font-semibold">Peminjaman aktif</h2>
            <span className="text-body font-semibold text-primary">{aktif.length} aktif</span>
            </div>

            {aktif.length === 0 && <p className="text-body text-gray-500">Belum ada peminjaman aktif.</p>}

            {aktif.map((r) => {
            const f = facilities.find((x) => x.id === r.facilityId);
            if (!f) return null;
            const late = isLate(r);
            return (
                <Card key={r.id} className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                    <IconTile tone={late ? 'danger' : 'warning'}>
                    <FacilityIcon icon={f.icon} />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                    <p className="text-caption font-semibold text-gray-500">{f.unit}</p>
                    <p className="text-h5 font-semibold">{f.name}</p>
                    <p className="text-caption text-gray-500">
                        Kembali {r.date === DEMO_TODAY ? 'hari ini' : formatTanggal(r.date)} · {formatJam(r.end)}
                    </p>
                    </div>
                    <StatusBadge status={late ? 'terlambat' : 'dipinjam'} />
                </div>
                <p
                    className={`rounded-lg px-3 py-2 text-caption font-semibold ${
                    late ? 'bg-danger-tint text-danger' : 'bg-warning-tint text-warning'
                    }`}
                >
                    {late ? 'Melewati batas pengembalian, segera kembalikan.' : sisaWaktu(r)}
                </p>
                </Card>
            );
            })}
        </section>

        <details className="group rounded-lg border border-gray-200 bg-white p-4">
            <summary className="flex cursor-pointer list-none items-center gap-3">
            <CircleHelp className="size-6 text-primary" aria-hidden />
            <div className="flex-1">
                <p className="text-body font-semibold">Butuh bantuan?</p>
                <p className="text-caption text-gray-500">Lihat panduan peminjaman alat kampus.</p>
            </div>
            <ChevronRight className="size-5 text-gray-400 transition-transform group-open:rotate-90" aria-hidden />
            </summary>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-body text-gray-600">
            <li>Pilih unit (BAA, BAUK, atau KTI) di Katalog.</li>
            <li>Buka fasilitas, lalu periksa status dan jadwalnya.</li>
            <li>Isi tanggal, jam, dan keperluan, lalu ajukan peminjaman.</li>
            <li>Pantau statusnya di menu Peminjaman.</li>
            </ol>
        </details>
        </div>
    );
};