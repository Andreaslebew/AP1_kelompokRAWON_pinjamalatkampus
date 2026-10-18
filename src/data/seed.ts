import type { AppNotification, BookingRequest, Facility, Unit } from '../types';

export const MAHASISWA = { name: 'Andrean Satria Bagaskara', nim: '251-111-012' };
export const STAF = { name: 'Devan Aldo Vobiscum', unit: 'KTI' as const };

export const UNITS: Unit[] = [
    { code: 'BAA', name: 'Biro Administrasi Akademik' },
    { code: 'BAUK', name: 'Biro Administrasi Umum & Kepegawaian' },
    { code: 'KTI', name: 'Komputasi dan Teknologi Informasi' },
];

// Lokasi di sini contoh; divalidasi ulang dengan staf sesuai proposal.
export const FACILITIES: Facility[] = [
    { id: 'lab-b', name: 'Lab B', unit: 'KTI', icon: 'monitor', location: 'Gedung C lantai 3', status: 'tersedia' },
    { id: 'lab-c', name: 'Lab C', unit: 'KTI', icon: 'monitor', location: 'Gedung C lantai 3', status: 'tersedia' },
    { id: 'lab-f', name: 'Lab F', unit: 'KTI', icon: 'monitor', location: 'Gedung C lantai 3', status: 'tersedia' },
    { id: 'kamera-sony-a6400', name: 'Kamera Sony A6400', unit: 'KTI', icon: 'camera', location: 'Gudang Elektronik KTI', status: 'perawatan' },
    { id: 'proyektor', name: 'Proyektor', unit: 'KTI', icon: 'projector', location: 'Gudang Elektronik KTI', status: 'dipinjam' },
    { id: 'creative-zone-a', name: 'Creative Zone A', unit: 'BAA', icon: 'palette', location: 'Gedung A lantai 2', status: 'tersedia' },
    { id: 'ruang-seminar', name: 'Ruang Seminar', unit: 'BAA', icon: 'door', location: 'Gedung A lantai 1', status: 'tersedia' },
    { id: 'sport-hall', name: 'Sport Hall', unit: 'BAUK', icon: 'dumbbell', location: 'Area olahraga kampus', status: 'tersedia' },
];

export const REQUESTS: BookingRequest[] = [
    {
        id: 'r-001', facilityId: 'lab-f', requester: "Jovan Ni'am Fairuz Zaky", nim: '251-111-015',
        date: '2026-10-05', start: '13:00', end: '15:00', purpose: 'Pemrograman Web I',
        stage: 'menunggu', diajukan: '5 menit lalu',
    },
    {
        id: 'r-002', facilityId: 'proyektor', requester: MAHASISWA.name, nim: MAHASISWA.nim,
        date: '2026-10-04', start: '09:00', end: '16:00', purpose: 'Presentasi kelompok',
        stage: 'dipinjam', diajukan: '4 Okt, 08.10',
    },
    {
        id: 'r-003', facilityId: 'kamera-sony-a6400', requester: MAHASISWA.name, nim: MAHASISWA.nim,
        date: '2026-10-04', start: '08:00', end: '12:00', purpose: 'Dokumentasi kegiatan',
        stage: 'dipinjam', diajukan: '4 Okt, 07.40',
    },
    {
        id: 'r-004', facilityId: 'lab-f', requester: MAHASISWA.name, nim: MAHASISWA.nim,
        date: '2026-10-02', start: '08:00', end: '10:00', purpose: 'Praktikum Basis Data',
        stage: 'dikembalikan', diajukan: '1 Okt', catatan: 'Dikembalikan tepat waktu',
    },
    {
        id: 'r-005', facilityId: 'sport-hall', requester: MAHASISWA.name, nim: MAHASISWA.nim,
        date: '2026-09-18', start: '16:00', end: '18:00', purpose: 'Turnamen futsal',
        stage: 'dikembalikan', diajukan: '15 Sep', catatan: 'Selesai · 18.00 WIB',
    },
];

export const NOTIFICATIONS: AppNotification[] = [
    {
        id: 'n-001',
        title: 'Pengajuan disetujui',
        body: 'Creative Zone A tersedia pada 8 Oktober, 13.00–15.00.',
        waktu: '10 menit lalu',
        read: false,
    },
];