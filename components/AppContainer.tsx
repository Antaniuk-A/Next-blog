import { useEffect, useRef, ReactNode } from "react";
import { useThemeContext } from '../context/state';
import ButtonThemeSwitch from './ButtonThemeSwitch';

type TProps = {
  children: ReactNode
}

export default function AppContainer({ children }: TProps) {
  const { isLightTheme } = useThemeContext();
  const container = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLightTheme) container.current.className = "dark";
    else container.current.className = "";
  }, [isLightTheme])

  return (
    <div ref={container}>
      <div className="bg-white text-grey-900 dark:text-white dark:bg-gray-900">
        <header className="flex justify-end">
          <ButtonThemeSwitch />
        </header>
        {children}
      </div>
    </div>
  )
}
