import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import defaultShopData from "@/data/shopData.json";

type SocialMedia = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
};

export type ShopInfo = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  mapEmbedUrl: string;
  socialMedia?: SocialMedia;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // slug without extension (e.g. "momos")
  category: string;
  featured: boolean;
};

export type ShopData = {
  shopInfo: ShopInfo;
  menuItems: MenuItem[];
};

const STORAGE_KEY = "swiftMenuPro.shopData";

type ContextValue = {
  shopData: ShopData;
  setShopData: (next: ShopData) => void;
  resetToDefault: () => void;
};

const ShopDataContext = createContext<ContextValue | undefined>(undefined);

function readFromStorage(): ShopData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShopData) : null;
  } catch {
    return null;
  }
}

function writeToStorage(value: ShopData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore storage write errors
  }
}

export const ShopDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [shopData, setShopDataState] = useState<ShopData>(() => {
    return readFromStorage() ?? (defaultShopData as ShopData);
  });

  useEffect(() => {
    writeToStorage(shopData);
  }, [shopData]);

  const value = useMemo<ContextValue>(() => ({
    shopData,
    setShopData: (next) => setShopDataState(next),
    resetToDefault: () => setShopDataState(defaultShopData as ShopData),
  }), [shopData]);

  return (
    <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>
  );
};

export function useShopData() {
  const ctx = useContext(ShopDataContext);
  if (!ctx) {
    throw new Error("useShopData must be used within a ShopDataProvider");
  }
  return ctx;
}