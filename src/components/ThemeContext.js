import { createContext, useContext } from "react";

/**
 * Shared light/dark theme context.
 *
 * Lives in its own module so both Hero.js (the provider) and sibling
 * components can consume it without importing each other.
 */
export const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

/** Tiny classname joiner used across components. */
export const cx = (...cls) => cls.filter(Boolean).join(" ");
