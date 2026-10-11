import React from 'react';
import { Link } from 'react-router-dom';
export const BerandaMhs: React.FC = () => (
    <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Selamat Pagi, Andrean Satria Bagaskara 👋</h2>
            <p className="text-slate-600 mb-6">Apa yang ingin kamu pinjam hari ini? Cari fasilitas atau alat di BAA, BAUK, atau KTI.</p>
            <Link to="/mahasiswa/katalog" className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg font-medium">Buka Katalog</Link>
        </div>
    </div>
);