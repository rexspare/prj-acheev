import { create } from 'zustand'
import { createSelectors } from './common';
import { ProgramFieldsFragment } from '../types/gqlReactTypings.generated.d';

/**
 * State Structure
 */
export interface ICommunityState {
  // State values
  selectedProgram: ProgramFieldsFragment | null;
  setselectedProgram: any;

}

const initialState: ICommunityState = {
  selectedProgram: null,
  setselectedProgram: () => { },

};

/**
 * State hook definition
 */
export const useCommunityState = create<ICommunityState>((set, get) => ({
  ...initialState,
  setselectedProgram: (val: any) => set({ selectedProgram: val }),
}));

/**
 * Selectors
 */
export const communityStateSelectors = createSelectors(initialState);
