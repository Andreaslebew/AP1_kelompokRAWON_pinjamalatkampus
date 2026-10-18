import { useState, type FC } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import { IconButton } from '../../components/IconButton';
import { PageHeader } from '../../components/PageHeader';
import { RequestCard } from '../../components/RequestCard';
import { chipClass, UNIT_FILTER_ORDER } from '../../lib/chip';
import { DEMO_TODAY } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';
import type { BookingRequest, Facility, RequestStage, UnitCode } from '../../types';

type Tab = 'menunggu' | 'disetujui' | 'ditolak';

const TABS: { value: Tab; label: string }[] = [
    { value: 'menunggu', label: 'Menunggu' },
    { value: 'disetujui', label: 'Disetujui' },
    { value: 'ditolak', label: 'Ditolak' },
];

const masuk = (tab: Tab, stage: RequestStage) =>
    tab === 'menunggu'
        ? stage === 'menunggu'
        : tab === 'disetujui'
        ? stage === 'dipinjam' || stage === 'dikembalikan'
        : stage === 'ditolak';

export const PermintaanStaf: FC = () => {
    const { facilities, requests, decideRequest } = useAppData();
    const [tab, setTab] = useState<Tab>('menunggu');
    const [unit, setUnit] = useState<UnitCode | 'semua'>('semua');
    const [hariIni, setHariIni] = useState(false);
    const [terbaruDulu, setTerbaruDulu] = useState(true);
    const [mencari, setMencari] = useState(false);
    const [query, setQuery] = useState('');

    const q = query.trim().toLowerCase();
    const daftar = requests
        .map((r) => ({ r, f: facilities.find((x) => x.id === r.facilityId) }))
        .filter(
        (x): x is { r: BookingRequest; f: Facility } =>
            !!x.f &&
            masuk(tab, x.r.stage) &&
            (unit === 'semua' || x.f.unit === unit) &&
            (!hariIni || x.r.date === DEMO_TODAY) &&
            (!q || `${x.r.requester} ${x.f.name}`.toLowerCase().includes(q)),
        )
        .sort((a, b) => {
        const ka = a.r.date + a.r.start;
        const kb = b.r.date + b.r.start;
        return terbaruDulu ? kb.localeCompare(ka) : ka.localeCompare(kb);
        });

    const jumlah = (t: Tab) => requests.filter((r) => masuk(t, r.stage)).length;

    return (
        <div className="flex flex-col gap-4 px-4 pb-6">
        <PageHeader
            title="Permintaan"
            action={
            <IconButton label="Cari permintaan" pressed={mencari} onClick={() => setMencari((v) => !v)}>
                <Search className="size-6" aria-hidden />
            </IconButton>
            }
        />

        {mencari && (
            <label className="flex h-12 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-tint">
            <Search className="size-5 text-gray-400" aria-hidden />
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama atau fasilitas"
                className="flex-1 bg-transparent text-body outline-none placeholder:text-gray-400"
            />
            </label>
        )}

        <div role="tablist" className="grid grid-cols-3 gap-1 rounded-lg border border-gray-200 bg-white p-1">
            {TABS.map((t) => (
            <button
                key={t.value}
                type="button"
                role="tab"
                aria-selected={tab === t.value}
                onClick={() => setTab(t.value)}
                className={`h-10 rounded-md text-body font-semibold transition-colors ${
                tab === t.value ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
                {t.label} {jumlah(t.value)}
            </button>
            ))}
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {UNIT_FILTER_ORDER.map((u) => (
            <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={chipClass(unit === u)}
            >
                {u === 'semua' ? 'Semua unit' : u}
            </button>
            ))}
            <button type="button" aria-pressed={hariIni} onClick={() => setHariIni((v) => !v)} className={chipClass(hariIni)}>
            Hari ini
            </button>
            <button
            type="button"
            onClick={() => setTerbaruDulu((v) => !v)}
            className={`${chipClass(false)} inline-flex items-center gap-1.5`}
            >
            <ArrowUpDown className="size-4" aria-hidden />
            {terbaruDulu ? 'Terbaru' : 'Terlama'}
            </button>
        </div>

        {daftar.length === 0 && <p className="py-8 text-center text-body text-gray-500">Tidak ada permintaan.</p>}

        {daftar.map(({ r, f }) => (
            <RequestCard
            key={r.id}
            request={r}
            facility={f}
            onDecide={r.stage === 'menunggu' ? (k) => decideRequest(r.id, k) : undefined}
            />
        ))}
        </div>
    );
};