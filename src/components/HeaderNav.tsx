import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, LayoutDashboard, Search, FileText, Clock, CheckSquare, RotateCcw, Box } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const location = useLocation();
  const isStaf = location.pathname.startsWith('/staf');

  return (
    <header className="bg-[#4F46E5] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-[#4F46E5] px-2.5 py-1.5 rounded-lg font-extrabold text-lg">RAWON</div>
          <div>
            <h1 className="font-bold text-base leading-tight">Pinjam Alat Kampus</h1>
            <p className="text-xs text-indigo-200">Sistem Terintegrasi (BAA, BAUK, KTI)</p>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          {!isStaf ? (
            <>
              <Link to="/mahasiswa/beranda" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/mahasiswa/beranda' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}>
                <Package className="w-4 h-4" /> Beranda
              </Link>
              <Link to="/mahasiswa/katalog" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/mahasiswa/katalog' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}>
                <Search className="w-4 h-4" /> Katalog
              </Link>
              <Link to="/mahasiswa/peminjaman" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/mahasiswa/peminjaman' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}>
                <FileText className="w-4 h-4" /> Peminjaman
              </Link>
              <Link to="/mahasiswa/riwayat" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/mahasiswa/riwayat' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}>
                <Clock className="w-4 h-4" /> Riwayat
              </Link>
              <div className="h-6 w-px bg-indigo-400 mx-2"></div>
              <Link to="/staf/dashboard" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-800 text-indigo-100 hover:bg-indigo-900 transition">
                Switch ke Mode Staf ➔
              </Link>
            </>
          ) : (
            <>
              <Link to="/staf/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/staf/dashboard' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/staf/permintaan" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/staf/permintaan' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}>
                <CheckSquare className="w-4 h-4" /> Permintaan
              </Link>
              <Link to="/staf/pengembalian" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/staf/pengembalian' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}>
                <RotateCcw className="w-4 h-4" /> Pengembalian
              </Link>
              <Link to="/staf/barang" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/staf/barang' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}>
                <Box className="w-4 h-4" /> Barang
              </Link>
              <div className="h-6 w-px bg-indigo-400 mx-2"></div>
              <Link to="/mahasiswa/beranda" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-700 text-white hover:bg-indigo-600 transition">
                ➔ Switch ke Mahasiswa
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};