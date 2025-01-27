import { create } from 'zustand'
import { createSelectors } from './common';

/**
 * State Structure
 */
export interface ICompletedWorkoutState {
  // State values
  completedWorkouts: any[];
  setcompletedWorkouts: any;

}

const initialState: ICompletedWorkoutState = {
  completedWorkouts: [],
  setcompletedWorkouts: () => { },

};

/**
 * State hook definition
 */
export const useCompletedWorkoutsState = create<ICompletedWorkoutState>((set, get) => ({
  ...initialState,
  setcompletedWorkouts: (val: any) => set({ completedWorkouts: val }),
}));

/**
 * Selectors
 */
export const completedWorkoutsSelectors = createSelectors(initialState);
