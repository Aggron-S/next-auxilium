import { createContext, useContext, useState, FC, ReactNode } from 'react';

export interface AppState {
  darkMode: boolean;
  isAuthenticated: boolean;
  isSmallScreen: boolean;
  text_color: string;
  icon_color: string;
  bg_color: string;
  card_color: string;
  currentModeIcon: string;
  header_color: string;
  subHeaderName: string;
  shouldDisplaySearch: boolean;
  userQuery: string;
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
    isSmallScreen: false,
    text_color: 'text-black',
    icon_color: '#323232',
    bg_color: 'bg-slate-200',
    card_color: 'bg-[#ced7e0]',
    currentModeIcon: 'light',
    header_color: 'bg-slate-200',
    subHeaderName: '',
    shouldDisplaySearch: false,
    userQuery: '',
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
