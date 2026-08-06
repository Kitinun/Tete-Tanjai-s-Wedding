"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Wish = {
  id: number;
  name: string;
  message: string;
  date: string;
};

type WeddingData = {
  wishes: Wish[];
  rsvpTotal: number | null;
  isLoading: boolean;
  addWish: (wish: Wish) => void;
  incrementRsvp: (guests: number) => void;
};

const WeddingDataContext = createContext<WeddingData | undefined>(undefined);

export function WeddingDataProvider({ children }: { children: React.ReactNode }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [rsvpTotal, setRsvpTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
        if (!url) {
          setIsLoading(false);
          return;
        }
        
        const response = await fetch(url);
        const text = await response.text();
        
        // Handle case where script URL is not deployed or returns HTML
        if (text.trim().startsWith('<')) {
          console.warn("Google Script returned HTML (likely not deployed correctly). Skipping data fetch.");
          return;
        }
        
        const result = JSON.parse(text);
        
        if (result.status === "success") {
          if (result.data) setWishes(result.data);
          if (typeof result.rsvpTotal === "number") setRsvpTotal(result.rsvpTotal);
        }
      } catch (error) {
        console.error("Failed to fetch wedding data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addWish = (wish: Wish) => {
    setWishes(prev => [wish, ...prev]);
  };

  const incrementRsvp = (guests: number) => {
    setRsvpTotal(prev => (prev || 0) + guests);
  };

  return (
    <WeddingDataContext.Provider value={{ wishes, rsvpTotal, isLoading, addWish, incrementRsvp }}>
      {children}
    </WeddingDataContext.Provider>
  );
}

export function useWeddingData() {
  const context = useContext(WeddingDataContext);
  if (context === undefined) {
    throw new Error("useWeddingData must be used within a WeddingDataProvider");
  }
  return context;
}
