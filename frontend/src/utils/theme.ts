export type ThemePreference = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

function isStoredTheme(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'dark'
}

export function getPreferredTheme(): ThemePreference {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (isStoredTheme(stored)) return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyThemePreference(theme: ThemePreference): ThemePreference {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
  return theme
}

export function initThemePreference(): ThemePreference {
  return applyThemePreference(getPreferredTheme())
}

export function setThemePreference(theme: ThemePreference): ThemePreference {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
  return applyThemePreference(theme)
}

export function toggleThemePreference(currentIsDark?: boolean): ThemePreference {
  const isDark = currentIsDark ?? document.documentElement.classList.contains('dark')
  return setThemePreference(isDark ? 'light' : 'dark')
}
