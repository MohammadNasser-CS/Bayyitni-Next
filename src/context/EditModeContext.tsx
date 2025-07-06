// src/context/EditModeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type EditModeContextType = {
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
};

const EditModeContext = createContext<EditModeContextType | undefined>(
  undefined
);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context)
    throw new Error("useEditMode must be used within EditModeProvider");
  return context;
}
