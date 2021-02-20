import { createContext, useContext, useState } from 'react';

type TThemeContext = {
  isLightTheme: boolean;
  setIsLightTheme: (value: boolean) => void;
};

type TProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<TThemeContext | undefined>(undefined);

export function ThemeContextProvider({ children }: TProps) {
  const [isLightTheme, setIsLightTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isLightTheme, setIsLightTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}