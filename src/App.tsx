import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';

import { BerandaMhs } from './pages/mahasiswa/BerandaMhs';
import { KatalogMhs } from './pages/mahasiswa/KatalogMhs';
import { DetailFasilitasMhs } from './pages/mahasiswa/DetailFasilitasMhs';
import { PeminjamanMhs } from './pages/mahasiswa/PeminjamanMhs';
import { RiwayatMhs } from './pages/mahasiswa/RiwayatMhs';

import { DashboardStaf } from './pages/staf/DashboardStaf';
import { UnitStaf } from './pages/staf/UnitStaf';
import { PermintaanStaf } from './pages/staf/PermintaanStaf';
import { PengembalianStaf } from './pages/staf/PengembalianStaf';
import { BarangStaf } from './pages/staf/BarangStaf';

import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      <HeaderNav />
      <main>
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
      </main>
    </div>
  );
};

export default App;