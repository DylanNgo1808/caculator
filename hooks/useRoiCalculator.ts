
import { useMemo } from 'react';
import { CalculatorInputs, CalculatedResults, TierBreakdown } from '../types';

export const useRoiCalculator = (inputs: CalculatorInputs): CalculatedResults => {
  return useMemo(() => {
    const {
      currentAov,
      monthlyOrders,
      aovIncreasePercent,
      holidayMultiplier,
      tiers,
    } = inputs;

    const effectiveOrders = monthlyOrders * holidayMultiplier;
    
    const projectedAov = currentAov * (1 + aovIncreasePercent / 100);
    const currentRevenue = currentAov * effectiveOrders;
    const projectedRevenue = projectedAov * effectiveOrders;
    const additionalMonthlyRevenue = projectedRevenue - currentRevenue;

    // Sort tiers from highest threshold to lowest to calculate costs correctly
    const tiersWithThresholds = tiers
        .map(tier => ({
            ...tier,
            thresholdAmount: currentAov * (1 + tier.thresholdPercent / 100)
        }))
        .sort((a, b) => b.thresholdAmount - a.thresholdAmount);

    let totalGiftCost = 0;
    let percentageAlreadyQualified = 0;
    const tierBreakdown: TierBreakdown[] = [];

    // Use a logistic function for a more realistic qualification curve.
    // As projected AOV approaches the threshold, qualification rate increases smoothly.
    const getQualificationPercentage = (aov: number, threshold: number) => {
        if (threshold <= 0) return 1;
        const k = 0.1; // Steepness factor of the curve
        return 1 / (1 + Math.exp(-k * (aov - threshold)));
    };

    for (const tier of tiersWithThresholds) {
        const percentageQualifyingForThisTier = getQualificationPercentage(projectedAov, tier.thresholdAmount);
        
        const percentageForThisTierOnly = Math.max(0, percentageQualifyingForThisTier - percentageAlreadyQualified);
        const ordersForThisTier = effectiveOrders * percentageForThisTierOnly;
        const costForThisTier = ordersForThisTier * tier.giftCost;

        totalGiftCost += costForThisTier;

        if (costForThisTier > 0 || ordersForThisTier > 0) {
            tierBreakdown.push({
                thresholdAmount: tier.thresholdAmount,
                giftCost: tier.giftCost,
                costForTier: costForThisTier,
                ordersQualifying: ordersForThisTier,
            });
        }
        
        percentageAlreadyQualified = percentageQualifyingForThisTier;
    }
    
    const projectedProfitBoost = additionalMonthlyRevenue - totalGiftCost;
    const roi = totalGiftCost > 0 ? (projectedProfitBoost / totalGiftCost) * 100 : 0;
    // Calculate payback period in days
    const paybackPeriod = additionalMonthlyRevenue > 0 ? totalGiftCost / (additionalMonthlyRevenue / 30) : 0;

    return {
      projectedProfitBoost,
      roi: isFinite(roi) ? roi : 0,
      projectedAov,
      projectedRevenue,
      totalGiftCost,
      additionalMonthlyRevenue,
      paybackPeriod: isFinite(paybackPeriod) ? paybackPeriod : 0,
      tierBreakdown: tierBreakdown.sort((a,b) => a.thresholdAmount - b.thresholdAmount), // sort back for display
      overallQualificationRate: percentageAlreadyQualified * 100,
    };
  }, [inputs]);
};
