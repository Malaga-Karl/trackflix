import React, { createContext, useContext, useRef, type ReactNode } from "react";

type SearchContextType = {
  focusSearch: () => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <SearchContext.Provider value={{ focusSearch, searchInputRef }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
