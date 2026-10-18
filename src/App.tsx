import { lazy, Suspense, type FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AppDataProvider } from './store/AppDataProvider';

const BerandaMhs = lazy(() =>
  import('./pages/mahasiswa/BerandaMhs').then((m) => ({ default: m.BerandaMhs })),
);
const KatalogMhs = lazy(() =>
  import('./pages/mahasiswa/KatalogMhs').then((m) => ({ default: m.KatalogMhs })),
);
const DetailFasilitasMhs = lazy(() =>
  import('./pages/mahasiswa/DetailFasilitasMhs').then((m) => ({ default: m.DetailFasilitasMhs })),
);
const PeminjamanMhs = lazy(() =>
  import('./pages/mahasiswa/PeminjamanMhs').then((m) => ({ default: m.PeminjamanMhs })),
);
const RiwayatMhs = lazy(() =>
  import('./pages/mahasiswa/RiwayatMhs').then((m) => ({ default: m.RiwayatMhs })),
);

const DashboardStaf = lazy(() =>
  import('./pages/staf/DashboardStaf').then((m) => ({ default: m.DashboardStaf })),
);
const UnitStaf = lazy(() =>
  import('./pages/staf/UnitStaf').then((m) => ({ default: m.UnitStaf })),
);
const PermintaanStaf = lazy(() =>
  import('./pages/staf/PermintaanStaf').then((m) => ({ default: m.PermintaanStaf })),
);
const PengembalianStaf = lazy(() =>
  import('./pages/staf/PengembalianStaf').then((m) => ({ default: m.PengembalianStaf })),
);
const BarangStaf = lazy(() =>
  import('./pages/staf/BarangStaf').then((m) => ({ default: m.BarangStaf })),
);

const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound })),
);

const PageFallback: FC = () => (
  <p role="status" className="px-4 py-6 text-body text-gray-500">
    Memuat halaman…
  </p>
);

export const App: FC = () => (
  <AppDataProvider>
    <AppLayout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/mahasiswa/beranda" replace />} />

          <Route path="/mahasiswa/beranda" element={<BerandaMhs />} />
          <Route path="/mahasiswa/katalog" element={<KatalogMhs />} />
          <Route path="/mahasiswa/fasilitas/:id" element={<DetailFasilitasMhs />} />
          <Route path="/mahasiswa/peminjaman" element={<PeminjamanMhs />} />
          <Route path="/mahasiswa/riwayat" element={<RiwayatMhs />} />

          <Route path="/staf/dashboard" element={<DashboardStaf />} />
          <Route path="/staf/unit" element={<UnitStaf />} />
          <Route path="/staf/permintaan" element={<PermintaanStaf />} />
          <Route path="/staf/pengembalian" element={<PengembalianStaf />} />
          <Route path="/staf/barang" element={<BarangStaf />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppLayout>
  </AppDataProvider>
);

export default App;