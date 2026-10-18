export type UnitCode = 'BAA' | 'BAUK' | 'KTI';
export type ItemStatus = 'tersedia' | 'dipinjam' | 'perawatan';
export type RequestStage = 'menunggu' | 'dipinjam' | 'dikembalikan' | 'ditolak';
export type FacilityIconKey = 'monitor' | 'projector' | 'camera' | 'palette' | 'dumbbell' | 'door';

export interface Unit {
    code: UnitCode;
    name: string;
}

export interface Facility {
    id: string;
    name: string;
    unit: UnitCode;
    icon: FacilityIconKey;
    location: string;
    status: ItemStatus;
}

export interface BookingRequest {
    id: string;
    facilityId: string;
    requester: string;
    nim: string;
    date: string;   // yyyy-mm-dd
    start: string;  // HH:mm
    end: string;    // HH:mm
    purpose: string;
    stage: RequestStage;
    diajukan: string;
    catatan?: string;
}

export interface AppNotification {
    id: string;
    title: string;
    body: string;
    waktu: string;
    read: boolean;
}