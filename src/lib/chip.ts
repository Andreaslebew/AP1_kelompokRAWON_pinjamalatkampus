import type { UnitCode } from '../types';

export const chipClass = (active: boolean) =>
    `h-9 shrink-0 rounded-full border px-4 text-body font-semibold transition-colors ${
        active ? 'border-primary bg-white text-primary' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
    }`;

export const UNIT_FILTER_ORDER: (UnitCode | 'semua')[] = ['semua', 'BAA', 'BAUK', 'KTI'];