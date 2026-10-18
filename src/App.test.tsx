import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

const teksNotFound = /404 - Halaman Tidak Ditemukan/;
const TIMEOUT = 5000;

const tampilkan = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('routing', () => {
  afterEach(() => {
    cleanup();
  });

  it('rute / mengarahkan ke beranda mahasiswa', async () => {
    tampilkan('/');
    expect(
      await screen.findByText(/Apa yang ingin kamu pinjam/, {}, { timeout: TIMEOUT }),
    ).toBeInTheDocument();
  });

  it.each([
    ['/mahasiswa/beranda', /Apa yang ingin kamu pinjam/],
    ['/mahasiswa/katalog', /Fasilitas dan barang ditemukan|Tidak ada fasilitas/],
    ['/mahasiswa/fasilitas/lab-b', /Jadwal peminjaman/],
    ['/mahasiswa/peminjaman', /Lihat detail|Tidak ada peminjaman aktif|Tidak ada pengajuan/],
    ['/mahasiswa/riwayat', /Riwayat peminjaman/],
    ['/staf/dashboard', /Perlu Ditinjau/],
    ['/staf/unit', /Unit pengelola dan katalog awal/],
    ['/staf/permintaan', /Tidak ada permintaan|Tolak|Setuju/],
    ['/staf/pengembalian', /Tidak ada barang|Kirim Pengingat|Tandai Dikembalikan/],
    ['/staf/barang', /Tambah Barang/],
  ])('rute %s terbuka dan tidak menampilkan not found', async (path, penanda) => {
    tampilkan(path);
    // findAllByText: aman bila teks muncul lebih dari sekali
    const hasil = await screen.findAllByText(penanda, {}, { timeout: TIMEOUT });
    expect(hasil.length).toBeGreaterThan(0);
    expect(screen.queryByText(teksNotFound)).not.toBeInTheDocument();
  });

  it('alamat tidak dikenal menampilkan halaman not found', async () => {
    tampilkan('/alamat-ngawur');
    expect(await screen.findByText(teksNotFound, {}, { timeout: TIMEOUT })).toBeInTheDocument();
  });

  it('alamat staf yang salah juga menampilkan not found', async () => {
    tampilkan('/staf/tidak-ada');
    expect(await screen.findByText(teksNotFound, {}, { timeout: TIMEOUT })).toBeInTheDocument();
  });
});

describe('navigasi', () => {
  it('bottom nav mahasiswa tampil', async () => {
    tampilkan('/mahasiswa/beranda');
    expect(await screen.findByRole('navigation', { name: 'Navigasi utama' })).toBeInTheDocument();
  });
});