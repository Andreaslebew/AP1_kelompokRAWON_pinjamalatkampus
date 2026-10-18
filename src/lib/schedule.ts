import type { BookingRequest, RequestStage } from '../types';

// Jam dan tanggal demo, disamakan dengan mockup (Sabtu/Minggu 4 Okt 2026, 12.40 WIB).
export const DEMO_TODAY = '2026-10-04';
export const DEMO_NOW = new Date(2026, 9, 4, 12, 40);

const BULAN_PENDEK = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const BULAN_PANJANG = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const parseTanggal = (date: string) => {
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d);
};

export const formatTanggal = (date: string) => {
    const d = parseTanggal(date);
    return `${d.getDate()} ${BULAN_PENDEK[d.getMonth()]}`;
};

export const formatTanggalLengkap = (date: string) => {
    const d = parseTanggal(date);
    return `${d.getDate()} ${BULAN_PANJANG[d.getMonth()]}`;
};

export const formatTanggalPanjang = (date: string) => {
    const d = parseTanggal(date);
    return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN_PANJANG[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatJam = (hhmm: string) => `${hhmm.replace(':', '.')} WIB`;
export const rentangJam = (start: string, end: string) =>
    `${start.replace(':', '.')}–${end.replace(':', '.')}`;

export const greeting = (now: Date = new Date()) => {
    const h = now.getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 18) return 'Selamat sore';
    return 'Selamat malam';
};

export const firstName = (name: string) => name.split(' ')[0];
export const initials = (name: string) =>
    name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// Langkah timeline: 0 = Diajukan, 1 = Diverifikasi, 2 = Dipinjam, 3 = Dikembalikan
const STAGE_STEP: Record<RequestStage, number> = {
    menunggu: 0,
    dipinjam: 2,
    dikembalikan: 3,
    ditolak: -1,
};
export const stageStep = (stage: RequestStage) => STAGE_STEP[stage];

const AKTIF: RequestStage[] = ['menunggu', 'dipinjam'];

export const endAt = (r: BookingRequest) => new Date(`${r.date}T${r.end}:00`);

export const isLate = (r: BookingRequest, now: Date = DEMO_NOW) =>
    r.stage === 'dipinjam' && endAt(r) < now;

export function sisaWaktu(r: BookingRequest, now: Date = DEMO_NOW): string {
    const menit = Math.round((endAt(r).getTime() - now.getTime()) / 60000);
    if (menit <= 0) return 'Batas pengembalian sudah lewat';
    const jam = Math.floor(menit / 60);
    const sisa = menit % 60;
    return `Sisa ${jam > 0 ? `${jam} jam ` : ''}${sisa} menit sebelum batas pengembalian`;
}

export function hasConflict(
    requests: BookingRequest[],
    input: { facilityId: string; date: string; start: string; end: string },
): boolean {
    return requests.some(
        (r) =>
        r.facilityId === input.facilityId &&
        r.date === input.date &&
        AKTIF.includes(r.stage) &&
        input.start < r.end &&
        r.start < input.end,
    );
}