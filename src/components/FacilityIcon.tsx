import type { FC } from 'react';
import {
    Building2, Camera, Cpu, DoorOpen, Dumbbell, Landmark, Monitor, Palette, Presentation,
    type LucideIcon,
} from 'lucide-react';
import type { FacilityIconKey, UnitCode } from '../types';

const FACILITY_ICON: Record<FacilityIconKey, LucideIcon> = {
    monitor: Monitor,
    projector: Presentation,
    camera: Camera,
    palette: Palette,
    dumbbell: Dumbbell,
    door: DoorOpen,
};

const UNIT_ICON: Record<UnitCode, LucideIcon> = {
    BAA: Building2,
    BAUK: Landmark,
    KTI: Cpu,
};

export const FacilityIcon: FC<{ icon: FacilityIconKey; className?: string }> = ({
    icon,
    className = 'size-6',
}) => {
    const Icon = FACILITY_ICON[icon];
    return <Icon className={className} aria-hidden />;
};

export const UnitIcon: FC<{ unit: UnitCode; className?: string }> = ({ unit, className = 'size-6' }) => {
    const Icon = UNIT_ICON[unit];
    return <Icon className={className} aria-hidden />;
};