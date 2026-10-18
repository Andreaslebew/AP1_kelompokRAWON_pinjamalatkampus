import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card } from './Card/Card';
import { FacilityIcon } from './FacilityIcon';
import { IconTile } from './IconTile';
import { StatusBadge } from './StatusBadge/StatusBadge';
import type { Facility } from '../types';

export const FacilityCard: FC<{ facility: Facility }> = ({ facility: f }) => (
    <Link
        to={`/mahasiswa/fasilitas/${f.id}`}
        className="block rounded-lg transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
        <Card className="flex items-center gap-4">
        <IconTile>
            <FacilityIcon icon={f.icon} />
        </IconTile>
        <div className="min-w-0 flex-1">
            <p className="text-caption font-semibold text-gray-500">{f.unit}</p>
            <p className="truncate text-h5 font-semibold text-gray-800">{f.name}</p>
            <p className="text-caption text-gray-500">{f.location}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
            <StatusBadge status={f.status} />
            <ChevronRight className="size-5 text-gray-400" aria-hidden />
        </div>
        </Card>
    </Link>
);