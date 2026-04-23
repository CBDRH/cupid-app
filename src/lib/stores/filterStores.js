
import { writable, derived } from 'svelte/store';
import { dataStore, activityStore } from './dataStore';

// Store for selected drug options
export const drugStore = writable([]); 
export const sexStore = writable([]); 
export const lifestagesStore = writable([]); 
export const priorityStore = writable([]); 
export const continentStore = writable([]); 
export const urbanicityStore = writable([]); 
export const settingStore = writable([]); 
export const selectedLabel = writable("Mobilisation");
export const selectedOption = writable("Alternative activities");
export const selectedOption2 = writable("1.1 Alternative activities");
export const selectedActivity = writable("mobilisation_activity___1");


// Derived store: filtered data based on drugStore
export const filteredData = derived(
  [selectedActivity, dataStore, drugStore, sexStore, lifestagesStore, priorityStore, continentStore, 
    urbanicityStore, settingStore],
  ([$selectedActivity, $dataStore, $drugStore, $sexStore, $lifestagesStore, $priorityStore, $continentStore, 
    $urbanicityStore, $settingStore]) => {
    let result = $dataStore;

    // Activity filter
    if ($selectedActivity.length > 0) {
      result = result.filter(item =>
        item[$selectedActivity] === 1
      );
    }

    // Drug filter
    if ($drugStore.length > 0) {
      result = result.filter(item =>
        $drugStore.includes(item.drug)
      );
    }

    // Sex filter
    if ($sexStore.length > 0) {
      result = result.filter(item =>
        $sexStore.includes(item.gender)
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

export const filteredActivity = derived(
  [activityStore, filteredData, selectedOption2],
  ([$activityStore, $filteredData, $selectedOption2]) => {
    // 1. Get all record_id2 values from filteredData
    const validRecordIds = new Set(
      $filteredData.map(item => item.record_id)
    );

    let result = $activityStore;

    // 2. Keep only activities belonging to filtered studies
    result = result.filter(activity =>
      validRecordIds.has(activity.record_id)
    );

    // 3. Apply selected activity filter
    if ($selectedOption2.length > 0) {
      result = result.filter(item =>
        item.activity === $selectedOption2
      );
    }

    return result;
  }
);