import type { FC } from 'react';
import { Card } from '../../components/Card/Card';
import { IconTile } from '../../components/IconTile';
import { UnitIcon } from '../../components/FacilityIcon';
import { PageHeader } from '../../components/PageHeader';
import { UNITS } from '../../data/seed';
import { useAppData } from '../../store/useAppData';

export const UnitStaf: FC = () => {
  const { facilities } = useAppData();

  return (
    <div className="flex flex-col gap-4 px-4 pb-6">
      <PageHeader title="Unit" subtitle="Unit pengelola dan katalog awal" />

      {UNITS.map((u) => {
        const daftar = facilities.filter((f) => f.unit === u.code);
        return (
          <Card key={u.code} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <IconTile tone="primary">
                <UnitIcon unit={u.code} />
              </IconTile>
              <div>
                <p className="text-h5 font-semibold">{u.code}</p>
                <p className="text-caption text-gray-500">{u.name}</p>
              </div>
            </div>

            <ul className="divide-y divide-gray-200">
              {daftar.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-3 py-2 text-body">
                  <span className="font-semibold">{f.name}</span>
                  <span className="text-caption text-gray-500">{f.location}</span>
                </li>
              ))}
            </ul>

            <p className="text-caption text-gray-500">
              {daftar.length} fasilitas · Penanggung jawab divalidasi bersama staf
            </p>
          </Card>
        );
      })}
    </div>
  );
};