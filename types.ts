
export interface GiftTier {
  id: number;
  thresholdPercent: number;
  giftCost: number;
}

export interface CalculatorInputs {
  currentAov: number;
  monthlyOrders: number;
  aovIncreasePercent: number;
  holidayMultiplier: number;
  tiers: GiftTier[];
}

export interface TierBreakdown {
    thresholdAmount: number;
    giftCost: number;
    costForTier: number;
    ordersQualifying: number;
}

export interface CalculatedResults {
  projectedProfitBoost: number;
  roi: number;
  projectedAov: number;
  projectedRevenue: number;
  totalGiftCost: number;
  additionalMonthlyRevenue: number;
  paybackPeriod: number;
  tierBreakdown: TierBreakdown[];
  overallQualificationRate: number;
}
