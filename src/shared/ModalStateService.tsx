import { createContext, useContext, useState, FC, ReactNode } from 'react';

export interface ModalState {
  isDisplayModal: boolean;
}

type ModalStateServiceType = {
  modalState: ModalState;
  setModalState: <K extends keyof ModalState>(
    key: K,
    value: ModalState[K]
  ) => void;
};

const ModalStateServiceContext = createContext<ModalStateServiceType | undefined>(undefined);

// To be called outside to access / change initial state
export const useModalStateService = () => {
  const context = useContext(ModalStateServiceContext);
  if (!context) {
    throw new Error('useModalStateService must be used within a ModalStateServiceProvider');
  }
  return context;
};

export const ModalStateServiceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({
    // Initial State Properties
    isDisplayModal: false
  });

  const updateState = <K extends keyof ModalState>(
    key: K,
    value: ModalState[K]
  ) => {
    setModalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const contextValue = {
    modalState,
    setModalState: updateState,
  };

  return (
    <ModalStateServiceContext.Provider value={contextValue}>
      {children}
    </ModalStateServiceContext.Provider>
  );
};
