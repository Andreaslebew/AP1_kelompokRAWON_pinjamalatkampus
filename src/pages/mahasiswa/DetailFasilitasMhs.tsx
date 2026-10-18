import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button, Card, FormField } from '../../components';
import { FacilityIcon } from '../../components/FacilityIcon';
import { IconTile } from '../../components/IconTile';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { UNITS } from '../../data/seed';
import { DEMO_TODAY, formatTanggal, rentangJam } from '../../lib/schedule';
import { useAppData } from '../../store/useAppData';

type FormState = { date: string; start: string; end: string; purpose: string };

export const DetailFasilitasMhs: FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { facilities, requests, submitRequest } = useAppData();

  const [form, setForm] = useState<FormState>({
    date: DEMO_TODAY,
    start: '09:00',
    end: '11:00',
    purpose: '',
  });
  const [error, setError] = useState<string | null>(null);

  const facility = facilities.find((f) => f.id === id);

  if (!facility) {
    return (
      <div className="flex flex-col gap-3 px-4 py-6">
        <p className="text-body">Fasilitas tidak ditemukan.</p>
        <Link to="/mahasiswa/katalog" className="font-semibold text-primary">
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  const bisaDipinjam = facility.status !== 'perawatan';
  const jadwal = requests
    .filter(
      (r) =>
        r.facilityId === facility.id && (r.stage === 'menunggu' || r.stage === 'dipinjam'),
    )
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const unitName = UNITS.find((u) => u.code === facility.unit)?.name ?? facility.unit;

  const ubah = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasil = submitRequest({ facilityId: facility.id, ...form });
    if (!hasil.ok) {
      setError(hasil.error);
      return;
    }
    navigate('/mahasiswa/peminjaman');
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-6">
      <header className="flex items-center gap-3 pt-6">
        <Link
          to="/mahasiswa/katalog"
          aria-label="Kembali"
          className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-200"
        >
          <ChevronLeft className="size-6" aria-hidden />
        </Link>
        <h1 className="text-h4 font-bold">Detail</h1>
      </header>

      <Card className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <IconTile tone="primary">
            <FacilityIcon icon={facility.icon} />
          </IconTile>
          <div className="min-w-0 flex-1">
            <p className="text-caption font-semibold text-gray-500">
              {facility.unit} · {unitName}
            </p>
            <h2 className="text-h4 font-bold">{facility.name}</h2>
            <p className="text-body text-gray-500">{facility.location}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body text-gray-500">Status</span>
          <StatusBadge status={facility.status} />
        </div>
      </Card>

      <section aria-labelledby="jadwal" className="flex flex-col gap-3">
        <h2 id="jadwal" className="text-h5 font-semibold">
          Jadwal peminjaman
        </h2>
        {jadwal.length === 0 && (
          <p className="text-body text-gray-500">Belum ada jadwal peminjaman.</p>
        )}
        {jadwal.map((r) => (
          <Card key={r.id} className="flex items-center justify-between gap-3">
            <p className="text-body">
              {formatTanggal(r.date)} ·{' '}
              <span className="font-semibold">{rentangJam(r.start, r.end)}</span>
            </p>
            <StatusBadge status={r.stage === 'menunggu' ? 'menunggu' : 'dipinjam'} />
          </Card>
        ))}
      </section>

      <section aria-labelledby="ajukan" className="flex flex-col gap-3">
        <h2 id="ajukan" className="text-h5 font-semibold">
          Ajukan peminjaman
        </h2>
        <Card className="flex flex-col gap-4">
          {!bisaDipinjam && (
            <p className="rounded-lg bg-warning-tint p-3 text-caption text-warning">
              Fasilitas sedang dalam perawatan sehingga belum bisa diajukan.
            </p>
          )}
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <FormField
              label="Tanggal"
              type="date"
              min={DEMO_TODAY}
              value={form.date}
              onChange={ubah('date')}
              required
              disabled={!bisaDipinjam}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Jam mulai"
                type="time"
                value={form.start}
                onChange={ubah('start')}
                required
                disabled={!bisaDipinjam}
              />
              <FormField
                label="Jam selesai"
                type="time"
                value={form.end}
                onChange={ubah('end')}
                required
                disabled={!bisaDipinjam}
              />
            </div>
            <FormField
              label="Keperluan"
              placeholder="Contoh: Pemrograman Web I"
              value={form.purpose}
              onChange={ubah('purpose')}
              disabled={!bisaDipinjam}
            />
            {error && (
              <p role="alert" className="rounded-lg bg-danger-tint p-3 text-caption text-danger">
                {error}
              </p>
            )}
            <Button type="submit" fullWidth disabled={!bisaDipinjam}>
              Ajukan Peminjaman
            </Button>
          </form>
        </Card>
      </section>
    </div>
  );
};