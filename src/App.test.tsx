import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from './App'

const teksNotFound = /404 - Halaman Tidak Ditemukan/

const ruteSah = [
  '/',
  '/mahasiswa/beranda',
  '/mahasiswa/katalog',
  '/mahasiswa/fasilitas/1',
  '/mahasiswa/peminjaman',
  '/mahasiswa/riwayat',
  '/staf/dashboard',
  '/staf/unit',
  '/staf/permintaan',
  '/staf/pengembalian',
  '/staf/barang',
]

function tampilkan(alamat: string) {
  return render(
    <MemoryRouter initialEntries={[alamat]}>
      <App />
    </MemoryRouter>,
  )
}

describe('routing', () => {
  it.each(ruteSah)('rute %s terbuka dan bukan halaman not found', (alamat) => {
    tampilkan(alamat)
    expect(screen.queryByText(teksNotFound)).not.toBeInTheDocument()
  })

  it('alamat tidak dikenal menampilkan halaman not found', () => {
    tampilkan('/alamat-ngawur')
    expect(screen.getByText(teksNotFound)).toBeInTheDocument()
  })

  it('alamat staf yang salah juga menampilkan not found', () => {
    tampilkan('/staf/tidak-ada')
    expect(screen.getByText(teksNotFound)).toBeInTheDocument()
  })
})