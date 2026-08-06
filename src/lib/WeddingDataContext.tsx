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

export function WeddingDataProvider({ 
  children,
  initialWishes = [],
  initialRsvpTotal = null
}: { 
  children: React.ReactNode;
  initialWishes?: Wish[];
  initialRsvpTotal?: number | null;
}) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [rsvpTotal, setRsvpTotal] = useState<number | null>(initialRsvpTotal);
  // Only load on client if we didn't get initial data
  const [isLoading, setIsLoading] = useState(initialWishes.length === 0 && initialRsvpTotal === null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
        if (!url) {
          setIsLoading(false);
          return;
        }
        
        // If we already have initial data, we can optionally skip client fetch 
        // or let it run to get the absolute latest data silently.
        // Let's run it silently to ensure freshness if user stays on page.
        
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
