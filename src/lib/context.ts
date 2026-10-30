import { createContext } from 'svelte';
import type { IsModeLight } from '#types/ui';

// Getter so consumers stay in sync when the layout data changes during client navigation
export const [getIsModeLight, setIsModeLight] = createContext<() => IsModeLight>();
