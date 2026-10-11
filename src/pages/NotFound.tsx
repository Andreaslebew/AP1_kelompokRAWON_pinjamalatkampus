import React from 'react';
import { Link } from 'react-router-dom';
export const NotFound: React.FC = () => (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">404 - Halaman Tidak Ditemukan</h2>
            <p className="text-slate-600 text-sm mb-6">Maaf, rute halaman yang Anda cari tidak ada.</p>
            <Link to="/" className="inline-block bg-[#4F46E5] text-white px-6 py-2.5 rounded-lg font-semibold">Kembali</Link>
        </div>
    </div>
);