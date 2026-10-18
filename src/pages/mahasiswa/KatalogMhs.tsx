import { useState, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FacilityCard } from '../../components/FacilityCard';
import { PageHeader } from '../../components/PageHeader';
import { UNITS } from '../../data/seed';
import { chipClass } from '../../lib/chip';
import { useAppData } from '../../store/useAppData';
import type { ItemStatus, UnitCode } from '../../types';

const STATUS_OPTIONS: { value: ItemStatus | 'semua'; label: string }[] = [
    { value: 'semua', label: 'Semua status' },
    { value: 'tersedia', label: 'Tersedia' },
    { value: 'dipinjam', label: 'Dipinjam' },
    { value: 'perawatan', label: 'Perawatan' },
];

export const KatalogMhs: FC = () => {
    const { facilities } = useAppData();
    const [params, setParams] = useSearchParams();
    const unitParam = params.get('unit') as UnitCode | null;
    const unit: UnitCode = unitParam && UNITS.some((u) => u.code === unitParam) ? unitParam : 'KTI';

    const [query, setQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [status, setStatus] = useState<ItemStatus | 'semua'>('semua');

    const q = query.trim().toLowerCase();
    const hasil = facilities.filter(
        (f) =>
        f.unit === unit &&
        (status === 'semua' || f.status === status) &&
        (!q || `${f.name} ${f.location}`.toLowerCase().includes(q)),
    );

    return (
        <div className="flex flex-col gap-4 px-4 pb-6">
        <PageHeader title="Katalog" />

        <label className="flex h-12 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-tint">
            <Search className="size-5 text-gray-400" aria-hidden />
            <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari fasilitas atau barang"
            className="flex-1 bg-transparent text-body outline-none placeholder:text-gray-400"
            />
        </label>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {UNITS.map((u) => (
            <button
                key={u.code}
                type="button"
                aria-pressed={unit === u.code}
                onClick={() => setParams({ unit: u.code })}
                className={chipClass(unit === u.code)}
            >
                {u.code}
            </button>
            ))}
            <button
            type="button"
            aria-pressed={showFilter}
            onClick={() => setShowFilter((v) => !v)}
            className={`${chipClass(showFilter)} inline-flex items-center gap-1.5`}
            >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filter
            </button>
        </div>

        {showFilter && (
            <div role="group" aria-label="Filter status" className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((s) => (
                <button
                key={s.value}
                type="button"
                aria-pressed={status === s.value}
                onClick={() => setStatus(s.value)}
                className={chipClass(status === s.value)}
                >
                {s.label}
                </button>
            ))}
            </div>
        )}

        <p className="text-caption text-gray-500">
            {hasil.length > 0 ? 'Fasilitas dan barang ditemukan' : 'Tidak ada fasilitas yang cocok dengan pencarian.'}
        </p>

        <div className="flex flex-col gap-2">
            {hasil.map((f) => (
            <FacilityCard key={f.id} facility={f} />
            ))}
        </div>
        </div>
    );
};