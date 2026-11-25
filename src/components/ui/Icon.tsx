import {
  Award,
  Building2,
  Cable,
  Clock,
  Compass,
  Construction,
  Cpu,
  Factory,
  Flame,
  Forklift,
  Gauge,
  Handshake,
  HardHat,
  Leaf,
  type LucideIcon,
  Ship,
  RefreshCw,
  Settings,
  ShieldCheck,
  Siren,
  TriangleAlert,
  Users,
  Wrench,
  Zap,
  Fuel,
  Atom,
  BadgeCheck,
} from 'lucide-react';
import type { ManpowerGroup } from '@/config/manpower';

/** Central icon registry so config files can reference icons by name. */
export const iconRegistry: Record<string, LucideIcon> = {
  Award,
  Building2,
  Cable,
  Clock,
  Compass,
  Construction,
  Cpu,
  Factory,
  Flame,
  Forklift,
  Gauge,
  Handshake,
  HardHat,
  Leaf,
  Ship,
  RefreshCw,
  Settings,
  ShieldCheck,
  Siren,
  TriangleAlert,
  Users,
  Wrench,
  Zap,
  Fuel,
  Atom,
  BadgeCheck,
};

export function getIcon(name?: string): LucideIcon {
  return (name && iconRegistry[name]) || BadgeCheck;
}

export const manpowerGroupIcons: Record<ManpowerGroup, LucideIcon> = {
  'Engineering & Safety': HardHat,
  'Mechanical & Fabrication': Wrench,
  'Electrical & Instrumentation': Zap,
  'Lifting & Access': Forklift,
  'Site & Turnaround Support': RefreshCw,
};

/** Icons for industry sectors, keyed by slug. */
export const industryIcons: Record<string, LucideIcon> = {
  'oil-and-gas': Fuel,
  petrochemical: Atom,
  'offshore-and-onshore-operations': Ship,
  'power-and-energy': Gauge,
  'industrial-construction': Construction,
  manufacturing: Factory,
};

/** Icons for HSE pillars, in order. */
export const hseIcons: LucideIcon[] = [ShieldCheck, Leaf, HardHat, TriangleAlert, Award];
