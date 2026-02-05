// Auction service - handles auction-related operations
// Currently using mock data, will be replaced with API calls in the future
import { mockAuctions } from '@/constants/mockData';
import type { Auction, Bid } from '@/types';

class AuctionService {
  // Get auction by ID
  async getAuctionById(id: string): Promise<Auction | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAuctions.find(auction => auction.id === id) || null;
  }

  // Get bids for an auction
  async getBids(auctionId: string): Promise<Bid[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const auction = mockAuctions.find(a => a.id === auctionId);
    return auction?.bids || [];
  }

  // Place a bid (mock implementation)
  async placeBid(auctionId: string, amount: number, userId: string): Promise<Bid> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would make an API call
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      auctionId,
      userId,
      user: {
        id: userId,
        username: 'current_user',
        email: 'user@example.com',
        memberSince: new Date().toISOString(),
      },
      amount,
      timestamp: new Date().toISOString(),
      isWinning: true,
    };

    // Update mock auction
    const auction = mockAuctions.find(a => a.id === auctionId);
    if (auction) {
      auction.currentBid = amount;
      auction.bidCount += 1;
      auction.bids.push(newBid);
    }

    return newBid;
  }

  // Watch/unwatch an auction (mock implementation)
  async watchAuction(auctionId: string, watch: boolean): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const auction = mockAuctions.find(a => a.id === auctionId);
    if (auction) {
      auction.watchers += watch ? 1 : -1;
    }
  }
}

export const auctionService = new AuctionService();
