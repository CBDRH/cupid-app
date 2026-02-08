import { writable } from 'svelte/store';

export const dataStore = writable([]); // full dataset
export const activityStore = writable([]); // full activty list
