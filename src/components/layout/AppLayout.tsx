import type { FC, ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    Box, Building2, ClipboardList, History, Home, Inbox, LayoutDashboard, LayoutGrid, Undo2,
    type LucideIcon,
} from 'lucide-react';

interface NavItem {
    to: string;
    label: string;
    icon: LucideIcon;
}

const MAHASISWA_NAV: NavItem[] = [
    { to: '/mahasiswa/beranda', label: 'Beranda', icon: Home },
    { to: '/mahasiswa/katalog', label: 'Katalog', icon: LayoutGrid },
    { to: '/mahasiswa/peminjaman', label: 'Peminjaman', icon: ClipboardList },
    { to: '/mahasiswa/riwayat', label: 'Riwayat', icon: History },
];

const STAF_NAV: NavItem[] = [
    { to: '/staf/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/staf/unit', label: 'Unit', icon: Building2 },
    { to: '/staf/permintaan', label: 'Permintaan', icon: Inbox },
    { to: '/staf/pengembalian', label: 'Pengembalian', icon: Undo2 },
    { to: '/staf/barang', label: 'Barang', icon: Box },
];

const roleLink = (to: string, label: string, active: boolean) => (
    <Link
        to={to}
        aria-current={active ? 'page' : undefined}
        className={`flex-1 rounded-md px-3 py-1.5 text-center text-caption font-semibold transition-colors ${
        active ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
        }`}
    >
        {label}
    </Link>
);

export const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const { pathname } = useLocation();
    const isStaf = pathname.startsWith('/staf');
    const nav = isStaf ? STAF_NAV : MAHASISWA_NAV;

    return (
        <div className="min-h-screen bg-gray-200">
        <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-gray-100 shadow-sm">
            {/* Pemilih peran untuk prototipe (sesuai proposal: peran dipilih lewat header) */}
            <div className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-2">
            <div role="group" aria-label="Pilih peran (prototipe)" className="flex gap-1 rounded-lg bg-gray-100 p-1">
                {roleLink('/mahasiswa/beranda', 'Mahasiswa', !isStaf)}
                {roleLink('/staf/dashboard', 'Staf', isStaf)}
            </div>
            </div>

            <main className="flex-1 pb-24 pt-2">{children}</main>

            <nav
            aria-label="Navigasi utama"
            className="fixed bottom-0 left-1/2 z-40 flex h-16 w-full max-w-[420px] -translate-x-1/2 border-t border-gray-200 bg-white px-2" 
            >
            {nav.map((item) => (
                <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                    `flex flex-1 flex-col items-center justify-center gap-1 rounded-lg text-caption font-medium transition-colors ${
                    isActive ? 'bg-primary-tint text-primary' : 'text-gray-500 hover:text-gray-800'
                    }`
                }
                >
                <item.icon className="size-6" aria-hidden />
                {item.label}
                </NavLink>
            ))}
            </nav>
        </div>
        </div>
    );
};