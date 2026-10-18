import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card/Card';

export const NotFound: FC = () => (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="flex w-full max-w-sm flex-col items-center gap-3 p-6 text-center">
        <h1 className="text-h4 font-bold">404 - Halaman Tidak Ditemukan</h1>
        <p className="text-body text-gray-500">Rute yang Anda cari tidak tersedia.</p>
        <Link
            to="/"
            className="mt-2 inline-flex h-12 items-center rounded-lg border border-primary bg-primary px-6 font-semibold text-white hover:bg-primary-hover"
        >
            Kembali ke beranda
        </Link>
        </Card>
    </div>
);