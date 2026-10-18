import { createContext } from 'react';
import type { AppNotification, BookingRequest, Facility, ItemStatus } from '../types';

export interface NewRequestInput {
    facilityId: string;
    date: string;
    start: string;
    end: string;
    purpose: string;
}

export type SubmitResult = { ok: true; id: string } | { ok: false; error: string };

export interface AppData {
    facilities: Facility[];
    requests: BookingRequest[];
    notifications: AppNotification[];
    submitRequest: (input: NewRequestInput) => SubmitResult;
    decideRequest: (id: string, keputusan: 'setujui' | 'tolak') => void;
    markReturned: (id: string) => void;
    setItemStatus: (facilityId: string, status: ItemStatus) => void;
    markAllNotificationsRead: () => void;
}

export const AppDataContext = createContext<AppData | null>(null);