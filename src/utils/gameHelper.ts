export const getDamageEnermy = (minDamage: number, maxDamage: number): number => Math.random() * (maxDamage - minDamage) + minDamage