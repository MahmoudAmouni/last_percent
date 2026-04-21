import { useMemo } from 'react';
import { useTheme } from './useTheme';

export function useStyles<T>(createStyles: (colors: any) => T): T {
  const { colors } = useTheme();
  
  return useMemo(() => {
    return createStyles(colors);
  }, [colors, createStyles]);
}
