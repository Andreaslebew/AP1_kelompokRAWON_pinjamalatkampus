import { useContext } from 'react';
import { AppDataContext } from './appDataContext';

export function useAppData() {
    const ctx = useContext(AppDataContext);
    if (!ctx) throw new Error('useAppData harus dipakai di dalam AppDataProvider');
    return ctx;
}