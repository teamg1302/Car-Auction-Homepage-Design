// Bid Form Component
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/utils/formatters';
import { isValidBidAmount } from '@/utils/validators';
import type { Auction } from '@/types';

interface BidFormProps {
  auction: Auction;
  onBidSubmit: (amount: number) => void;
  isLoading?: boolean;
}

export function BidForm({ auction, onBidSubmit, isLoading = false }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  const minBid = auction.currentBid + 100; // Minimum increment of $100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount)) {
      setError('Please enter a valid bid amount');
      return;
    }

    if (!isValidBidAmount(amount, auction.currentBid, 100)) {
      setError(`Bid must be at least ${formatPrice(minBid)}`);
      return;
    }

    onBidSubmit(amount);
    setBidAmount('');
  };

  const handleQuickBid = (increment: number) => {
    const newBid = auction.currentBid + increment;
    setBidAmount(newBid.toString());
    setError('');
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-white font-display font-semibold text-lg mb-4">
        Place Your Bid
      </h3>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/50">Current bid</span>
          <span className="text-lg font-bold text-racing-red">
            {formatPrice(auction.currentBid)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">Minimum bid</span>
          <span className="text-sm font-semibold text-white">
            {formatPrice(minBid)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="bidAmount" className="text-white/70 mb-2 block">
            Your bid amount
          </Label>
          <Input
            id="bidAmount"
            type="number"
            value={bidAmount}
            onChange={(e) => {
              setBidAmount(e.target.value);
              setError('');
            }}
            placeholder={minBid.toString()}
            min={minBid}
            step="100"
            className="bg-white/5 border-white/10 text-white"
          />
          {error && (
            <p className="text-sm text-red-400 mt-1">{error}</p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickBid(100)}
            className="flex-1 min-w-[80px] border-white/10 text-white/70 hover:text-white"
          >
            +$100
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickBid(500)}
            className="flex-1 min-w-[80px] border-white/10 text-white/70 hover:text-white"
          >
            +$500
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickBid(1000)}
            className="flex-1 min-w-[80px] border-white/10 text-white/70 hover:text-white"
          >
            +$1,000
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickBid(5000)}
            className="flex-1 min-w-[80px] border-white/10 text-white/70 hover:text-white"
          >
            +$5,000
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full bg-racing-red hover:bg-racing-dark text-white font-semibold"
          disabled={isLoading || !bidAmount}
        >
          {isLoading ? 'Placing bid...' : 'Place Bid'}
        </Button>
      </form>

      <p className="text-xs text-white/40 mt-4 text-center">
        By placing a bid, you agree to our terms and conditions
      </p>
    </div>
  );
}
