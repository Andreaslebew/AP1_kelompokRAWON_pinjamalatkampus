import { useState, type FC } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { FacilityIcon } from '../../components/FacilityIcon';
import { IconTile } from '../../components/IconTile';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { chipClass, UNIT_FILTER_ORDER } from '../../lib/chip';
import { useAppData } from '../../store/useAppData';
import type { ItemStatus, UnitCode } from '../../types';

const STATUS_LABEL: Record<ItemStatus, string> = {
    tersedia: 'Tersedia',
    dipinjam: 'Dipinjam',
    perawatan: 'Perawatan',
};

export const BarangStaf: FC = () => {
    const { facilities, setItemStatus } = useAppData();
    const [query, setQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [unit, setUnit] = useState<UnitCode | 'semua'>('semua');
    const [notice, setNotice] = useState<string | null>(null);

    const q = query.trim().toLowerCase();
    const daftar = facilities.filter(
        (f) => (unit === 'semua' || f.unit === unit) && (!q || f.name.toLowerCase().includes(q)),
    );

    return (
        <div className="flex flex-col gap-4 px-4 pb-6">
        <PageHeader title="Barang" />

        <div className="flex gap-2">
            <label className="flex h-12 flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-tint">
            <Search className="size-5 text-gray-400" aria-hidden />
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari barang"
                className="flex-1 bg-transparent text-body outline-none placeholder:text-gray-400"
            />
            </label>
            <button
            type="button"
            aria-pressed={showFilter}
            onClick={() => setShowFilter((v) => !v)}
            aria-label="Filter"
            className={`flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white ${
                showFilter ? 'text-primary' : 'text-gray-600'
            }`}
            >
            <SlidersHorizontal className="size-5" aria-hidden />
            </button>
        </div>

        {showFilter && (
            <div role="group" aria-label="Filter unit" className="flex gap-2">
            {UNIT_FILTER_ORDER.map((u) => (
                <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)} className={chipClass(unit === u)}>
                {u === 'semua' ? 'Semua' : u}
                </button>
            ))}
            </div>
        )}

        <div className="flex flex-col gap-2">
            {daftar.map((f) => (
            <Card key={f.id} className="flex items-center gap-3">
                <IconTile>
                <FacilityIcon icon={f.icon} />
                </IconTile>
                <div className="min-w-0 flex-1">
                <p className="truncate text-h5 font-semibold">{f.name}</p>
                <p className="text-caption text-gray-500">{f.unit}</p>
                <div className="mt-1">
                    <StatusBadge status={f.status} />
                </div>
                </div>
                <label className="sr-only" htmlFor={`status-${f.id}`}>
                Ubah status {f.name}
                </label>
                <select
                id={`status-${f.id}`}
                value={f.status}
                onChange={(e) => setItemStatus(f.id, e.target.value as ItemStatus)}
                className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-caption font-semibold text-gray-700 focus-visible:outline-2 focus-visible:outline-primary"
                >
                {(Object.keys(STATUS_LABEL) as ItemStatus[]).map((s) => (
                    <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                    </option>
                ))}
                </select>
            </Card>
            ))}
        </div>

        <Button fullWidth onClick={() => setNotice('Form tambah barang belum tersedia di prototipe.')}>
            <Plus className="size-5" aria-hidden />
            Tambah Barang
        </Button>
        {notice && (
            <p role="status" className="text-caption text-gray-500">
            {notice}
            </p>
        )}
        </div>
    );
};