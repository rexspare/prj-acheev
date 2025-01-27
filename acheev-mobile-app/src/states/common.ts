type ISelectors<T> = {
    [K in keyof T]: (state: T) => T[K];
  };
  
  export const createSelectors = <T extends Record<string, any>>(
    state: T
  ): ISelectors<T> => {
    return Object.keys(state).reduce(
      (selectors, key) => ({
        ...selectors,
        [key]: (state: T) => state[key],
      }),
      {} as ISelectors<T>
    );
  };
  