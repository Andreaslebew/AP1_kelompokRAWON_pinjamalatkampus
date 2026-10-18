import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react';
import { AppDataContext, type AppData, type NewRequestInput, type SubmitResult } from './appDataContext';
import { FACILITIES, MAHASISWA, NOTIFICATIONS, REQUESTS } from '../data/seed';
import { DEMO_TODAY, formatTanggal, hasConflict } from '../lib/schedule';
import type { AppNotification, BookingRequest, Facility, ItemStatus } from '../types';

export const AppDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [facilities, setFacilities] = useState<Facility[]>(FACILITIES);
    const [requests, setRequests] = useState<BookingRequest[]>(REQUESTS);
    const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);

    const submitRequest = useCallback(
        (input: NewRequestInput): SubmitResult => {
        const facility = facilities.find((f) => f.id === input.facilityId);
        if (!facility) return { ok: false, error: 'Fasilitas tidak ditemukan.' };
        if (facility.status === 'perawatan')
            return { ok: false, error: 'Fasilitas sedang dalam perawatan dan belum bisa dipinjam.' };
        if (!input.date) return { ok: false, error: 'Tanggal wajib diisi.' };
        if (input.date < DEMO_TODAY)
            return { ok: false, error: 'Tanggal peminjaman tidak boleh sebelum hari ini.' };
        if (!input.start || !input.end) return { ok: false, error: 'Jam mulai dan jam selesai wajib diisi.' };
        if (input.end <= input.start) return { ok: false, error: 'Jam selesai harus setelah jam mulai.' };
        if (hasConflict(requests, input))
            return { ok: false, error: 'Jadwal bentrok dengan peminjaman lain pada rentang waktu ini.' };

        const id = `r-${Date.now()}`;
        setRequests((prev) => [
            {
            id,
            facilityId: input.facilityId,
            requester: MAHASISWA.name,
            nim: MAHASISWA.nim,
            date: input.date,
            start: input.start,
            end: input.end,
            purpose: input.purpose.trim() || '-',
            stage: 'menunggu',
            diajukan: 'Baru saja',
            },
            ...prev,
        ]);
        return { ok: true, id };
        },
        [facilities, requests],
    );

    const decideRequest = useCallback(
        (id: string, keputusan: 'setujui' | 'tolak') => {
        const target = requests.find((r) => r.id === id);
        if (!target) return;
        const stage = keputusan === 'setujui' ? 'dipinjam' : 'ditolak';
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, stage } : r)));

        if (target.requester === MAHASISWA.name) {
            const nama = facilities.find((f) => f.id === target.facilityId)?.name ?? 'Fasilitas';
            setNotifications((prev) => [
            {
                id: `n-${Date.now()}`,
                title: keputusan === 'setujui' ? 'Pengajuan disetujui' : 'Pengajuan ditolak',
                body: `${nama} pada ${formatTanggal(target.date)}, ${target.start}–${target.end}.`,
                waktu: 'Baru saja',
                read: false,
            },
            ...prev,
            ]);
        }
        },
        [facilities, requests],
    );

    const markReturned = useCallback(
        (id: string) => {
        const target = requests.find((r) => r.id === id);
        if (!target) return;
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, stage: 'dikembalikan', catatan: 'Dikembalikan hari ini' } : r)),
        );
        setFacilities((prev) =>
            prev.map((f) => (f.id === target.facilityId && f.status === 'dipinjam' ? { ...f, status: 'tersedia' } : f)),
        );
        },
        [requests],
    );

    const setItemStatus = useCallback((facilityId: string, status: ItemStatus) => {
        setFacilities((prev) => prev.map((f) => (f.id === facilityId ? { ...f, status } : f)));
    }, []);

    const markAllNotificationsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    const value = useMemo<AppData>(
        () => ({
        facilities,
        requests,
        notifications,
        submitRequest,
        decideRequest,
        markReturned,
        setItemStatus,
        markAllNotificationsRead,
        }),
        [facilities, requests, notifications, submitRequest, decideRequest, markReturned, setItemStatus, markAllNotificationsRead],
    );

    return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};