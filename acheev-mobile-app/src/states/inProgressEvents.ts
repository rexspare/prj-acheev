import { create } from 'zustand'
import { createSelectors } from './common';

/**
 * State Structure
 */
export interface IInprogressEventState {
  // State values
  inProgressEvents: any;
  setinProgressEvents: any;

}

const initialState: IInprogressEventState = {
  inProgressEvents: [],
  setinProgressEvents: () => { },

};

/**
 * State hook definition
 */
export const useInProgressEventsState = create<IInprogressEventState>((set, get) => ({
  ...initialState,
  setinProgressEvents: (val: any) => set({ inProgressEvents: val }),
}));

/**
 * Selectors
 */
export const inProgressEventsStateSelectors = createSelectors(initialState);
