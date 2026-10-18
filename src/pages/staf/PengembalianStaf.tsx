import { useState, type FC } from 'react';
import { ChevronDown, Clock } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { chipClass, UNIT_FILTER_ORDER } from '../../lib/chip';
import { DEMO_TODAY, formatJam, formatTanggal, isLate } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';
import type { UnitCode } from '../../types';

export const PengembalianStaf: FC = () => {
    const { facilities, requests, markReturned } = useAppData();
    const [hariIni, setHariIni] = useState(true);
    const [hanyaTerlambat, setHanyaTerlambat] = useState(false);
    const [unit, setUnit] = useState<UnitCode | 'semua'>('semua');
    const [diingatkan, setDiingatkan] = useState<string[]>([]);

    const dipinjam = requests.filter((r) => r.stage === 'dipinjam');
    const jumlahTerlambat = dipinjam.filter((r) => isLate(r)).length;

    const daftar = dipinjam
        .map((r) => ({ r, f: facilities.find((x) => x.id === r.facilityId) }))
        .filter(({ r, f }) => {
        if (!f) return false;
        if (hariIni && r.date !== DEMO_TODAY) return false;
        if (hanyaTerlambat && !isLate(r)) return false;
        if (unit !== 'semua' && f.unit !== unit) return false;
        return true;
        });

    const nextUnit = () =>
        setUnit((prev) => UNIT_FILTER_ORDER[(UNIT_FILTER_ORDER.indexOf(prev) + 1) % UNIT_FILTER_ORDER.length]);

    return (
        <div className="flex flex-col gap-4 px-4 pb-6">
        <PageHeader title="Pengembalian" />

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            <button type="button" aria-pressed={hariIni} onClick={() => setHariIni((v) => !v)} className={chipClass(hariIni)}>
            Hari ini
            </button>
            <button
            type="button"
            aria-pressed={hanyaTerlambat}
            onClick={() => setHanyaTerlambat((v) => !v)}
            className={chipClass(hanyaTerlambat)}
            >
            Terlambat {jumlahTerlambat}
            </button>
            <button
            type="button"
            onClick={nextUnit}
            className={`${chipClass(unit !== 'semua')} inline-flex items-center gap-1`}
            aria-label={`Filter unit, saat ini ${unit === 'semua' ? 'semua unit' : unit}`}
            >
            {unit === 'semua' ? 'Unit' : unit}
            <ChevronDown className="size-4" aria-hidden />
            </button>
        </div>

        {daftar.length === 0 && <p className="py-8 text-center text-body text-gray-500">Tidak ada barang yang perlu dikembalikan.</p>}

        {daftar.map(({ r, f }) => {
            if (!f) return null;
            const late = isLate(r);
            const sudahDiingatkan = diingatkan.includes(r.id);
            return (
            <div
                key={r.id}
                className={`flex flex-col gap-3 rounded-lg border p-4 ${
                late ? 'border-danger/40 bg-danger-tint' : 'border-gray-200 bg-white'
                }`}
            >
                <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-h6 font-semibold">{f.name}</p>
                    <p className="text-caption text-gray-500">
                    {r.requester} · {f.unit}
                    </p>
                </div>
                <StatusBadge status={late ? 'terlambat' : 'dipinjam'} />
                </div>

                <div className="flex items-center justify-between text-body">
                <span className="flex items-center gap-2 text-gray-500">
                    <Clock className="size-4" aria-hidden />
                    Batas
                </span>
                <span className="font-semibold">
                    {r.date === DEMO_TODAY ? 'Hari ini' : formatTanggal(r.date)} · {formatJam(r.end)}
                </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                <Button
                    variant="secondary"
                    disabled={sudahDiingatkan}
                    onClick={() => setDiingatkan((prev) => [...prev, r.id])}
                >
                    {sudahDiingatkan ? 'Terkirim' : 'Kirim Pengingat'}
                </Button>
                <Button onClick={() => markReturned(r.id)}>Tandai Dikembalikan</Button>
                </div>

                {sudahDiingatkan && (
                <p role="status" className="text-caption text-info">
                    Pengingat ditandai terkirim (simulasi prototipe).
                </p>
                )}
            </div>
            );
        })}
        </div>
    );
};