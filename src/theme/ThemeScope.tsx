import React, { useEffect, useState } from 'react';
import { Theme } from '@/types';
import { getResolvedTheme, getThemeVariables } from './applyTheme';
import { loadFontPair } from '@/data/fonts';

interface ThemeScopeProps {
  theme: Theme;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export const ThemeScope: React.FC<ThemeScopeProps> = ({
  theme,
  children,
  className = '',
  as: Component = 'div',
  style = {},
}) => {
  const { style: styleDef } = getResolvedTheme(theme);
  const themeVars = getThemeVariables(theme);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setFontLoaded(false);

    loadFontPair(theme.fontId).then(() => {
      if (isMounted) {
        setFontLoaded(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [theme.fontId]);

  return (
    <Component
      data-style={styleDef.variant}
      data-motion={theme.motion}
      className={`theme-scope font-body ${className}`}
      style={{
        ...themeVars,
        ...style,
        opacity: fontLoaded ? 1 : 0.95,
        transition: theme.motion === 'none' 
          ? 'none' 
          : 'background-color .3s ease, color .3s ease, border-color .3s ease, border-radius .3s ease, box-shadow .3s ease, opacity .2s ease',
      }}
    >
      {styleDef.customCss && (
        <style dangerouslySetInnerHTML={{ __html: styleDef.customCss }} />
      )}
      {children}
    </Component>
  );
};

