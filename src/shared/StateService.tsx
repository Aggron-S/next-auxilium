import { createContext, useContext, useState, FC, ReactNode } from 'react';

export interface AppState {
  darkMode: boolean;
  isAuthenticated: boolean;
  text_color: string;
  bg_color: string;
  header_color: string;
  card_color: string;
}

type StateServiceType = {
  state: AppState;
  setState: <K extends keyof AppState>(
    key: K,
    value: AppState[K]
  ) => void;
};

const StateServiceContext = createContext<StateServiceType | undefined>(undefined);

// To be called outside to access / change initial state
export const useStateService = () => {
  const context = useContext(StateServiceContext);
  if (!context) {
    throw new Error('useStateService must be used within a StateServiceProvider');
  }
  return context;
};

export const StateServiceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    // Initial State Properties
    darkMode: false,
    isAuthenticated: false,
    text_color: 'text-black',
    bg_color: 'bg-slate-200',
    header_color: 'bg-slate-200',
    card_color: 'bg-[#202027]'
  });

  const updateState = <K extends keyof AppState>(
    key: K,
    value: AppState[K]
  ) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const contextValue = {
    state,
    setState: updateState,
  };

  return (
    <StateServiceContext.Provider value={contextValue}>
      {children}
    </StateServiceContext.Provider>
  );
};
