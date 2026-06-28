import { createElement } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
    Wrench,
    Settings,
    Star,
    Shield,
    Zap,
    BarChart,
    Users,
    Globe,
    Layers,
    MessageSquare,
    Briefcase,
    Clock,
} from 'lucide-react';

// Every icon available for use via a string key (e.g. business-data.ts
// service entries). Add new icons here to make them selectable.
const ICON_LIBRARY = {
    wrench: Wrench,
    settings: Settings,
    star: Star,
    shield: Shield,
    zap: Zap,
    barChart: BarChart,
    users: Users,
    globe: Globe,
    layers: Layers,
    messageSquare: MessageSquare,
    briefcase: Briefcase,
    clock: Clock,
} as const satisfies Record<string, LucideIcon>;

export type IconLibrary = keyof typeof ICON_LIBRARY;

type IconProps = Readonly<{
    name: IconLibrary;
    size?: number;
    className?: string;
}>;

export function Icon({ name, size = 24, className }: IconProps) {
    return createElement(ICON_LIBRARY[name], { size, className });
}
