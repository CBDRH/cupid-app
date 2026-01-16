
import { writable, derived } from 'svelte/store';
import { dataStore } from './dataStore';

// Store for selected drug options
export const drugStore = writable([]); 
export const genderStore = writable([]); 
export const lifestagesStore = writable([]); 
export const priorityStore = writable([]); 
export const continentStore = writable([]); 
export const urbanicityStore = writable([]); 
export const settingStore = writable([]); 

// Derived store: filtered data based on drugStore
export const filteredData = derived(
  [dataStore, drugStore, genderStore, lifestagesStore, priorityStore, continentStore, urbanicityStore, settingStore],
  ([$dataStore, $drugStore, $genderStore, $lifestagesStore, $priorityStore, $continentStore, $urbanicityStore, $settingStore]) => {
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

    // Lifestages filter
    if ($lifestagesStore.length > 0) {
      result = result.filter(item =>
        $lifestagesStore.includes(item.lifestages)
      );
    }

    // Priority populations filter
    if ($priorityStore.length > 0) {
      result = result.filter(item =>
        $priorityStore.includes(item.priority)
      );
    } 
    
    // Continent filter
    if ($continentStore.length > 0) {
      result = result.filter(item =>
        $continentStore.includes(item.continent)
      );
    }        

    // Urbanicity filter
    if ($urbanicityStore.length > 0) {
      result = result.filter(item =>
        $urbanicityStore.includes(item.urbanicity)
      );
    }     

    // Setting filter
    if ($settingStore.length > 0) {
      result = result.filter(item =>
        $settingStore.includes(item.setting)
      );
    }    

    return result;
  }
);