
import { writable, derived } from 'svelte/store';
import { dataStore } from './dataStore';

// Store for selected drug options
export const drugStore = writable(["Alcohol", "Nicotene", "Cannabis", "Unspecified"]); 
export const genderStore = writable([]); 

// Derived store: filtered data based on drugStore
export const filteredData = derived(
  [dataStore, drugStore, genderStore],
  ([$dataStore, $drugStore, $genderStore]) => {
    let result = $dataStore;

    // Drug filter
    if ($drugStore.length > 0) {
      result = result.filter(item =>
        $drugStore.includes(item.drug)
      );
    }

    // Gender filter
    if ($genderStore.length > 0) {
      result = result.filter(item =>
        $genderStore.includes(item.gender)
      );
    }

    return result;
  }
);