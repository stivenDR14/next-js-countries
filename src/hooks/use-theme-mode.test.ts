import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useThemeMode } from "@/hooks/use-theme-mode";

describe("useThemeMode hook", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    // Reset store before each test
    localStorageMock.clear();
  });

  afterEach(() => {
    // clean up
    vi.clearAllMocks();
  });

  it("should initialize with light mode by default", () => {
    const { result } = renderHook(() => useThemeMode());
    expect(result.current.mode).toBe("light");
  });

  it("should initialize with the mode from localStorage if available", () => {
    localStorageMock.setItem("themeMode", "dark");
    const { result } = renderHook(() => useThemeMode());
    expect(result.current.mode).toBe("dark");
  });

  it("should toggle from light to dark mode", () => {
    const { result } = renderHook(() => useThemeMode());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe("dark");
    expect(localStorageMock.getItem("themeMode")).toBe("dark");
  });

  it("should toggle from dark to light mode", () => {
    localStorageMock.setItem("themeMode", "dark");
    const { result } = renderHook(() => useThemeMode());

    expect(result.current.mode).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe("light");
    expect(localStorageMock.getItem("themeMode")).toBe("light");
  });
});
