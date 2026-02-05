// Cart/Watchlist Context - For managing watched auctions
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartContextType {
  watchedAuctions: string[];
  addToWatchlist: (auctionId: string) => void;
  removeFromWatchlist: (auctionId: string) => void;
  isWatched: (auctionId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [watchedAuctions, setWatchedAuctions] = useState<string[]>([]);

  const addToWatchlist = (auctionId: string) => {
    setWatchedAuctions((prev) => {
      if (prev.includes(auctionId)) return prev;
      return [...prev, auctionId];
    });
  };

  const removeFromWatchlist = (auctionId: string) => {
    setWatchedAuctions((prev) => prev.filter((id) => id !== auctionId));
  };

  const isWatched = (auctionId: string) => {
    return watchedAuctions.includes(auctionId);
  };

  return (
    <CartContext.Provider
      value={{
        watchedAuctions,
        addToWatchlist,
        removeFromWatchlist,
        isWatched,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
