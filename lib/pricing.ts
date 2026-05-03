export interface PricingConfig {
  usdRate: number;
  marginCoefficient: number;
  systemTurkey: number;
  systemGermany: number;
  fabricAcrylic: number;
  fabricPolyester: number;
  motor: number;
}

export const DEFAULT_PRICING: PricingConfig = {
  usdRate: 2.7,
  marginCoefficient: 1.9,
  systemTurkey: 90,
  systemGermany: 110,
  fabricAcrylic: 6.5,
  fabricPolyester: 5.5,
  motor: 55,
};

export type SystemType = 'turkey' | 'germany';
export type FabricType = 'acrylic' | 'polyester';
export type ControlType = 'manual' | 'motorized';

export interface CalculatorInput {
  width: number;
  extension: number;
  system: SystemType;
  fabric: FabricType;
  control: ControlType;
}

export const WIDTH_MIN = 2;
export const WIDTH_MAX = 6;
export const EXTENSION_MIN = 1.5;
export const EXTENSION_MAX = 3.5;
export const STEP = 0.5;

export function calculatePrice(input: CalculatorInput, pricing: PricingConfig): number {
  const { width: L, extension: W, system, fabric, control } = input;
  const S = L * W;

  const Psys = system === 'turkey' ? pricing.systemTurkey : pricing.systemGermany;
  const Pfab = fabric === 'acrylic' ? pricing.fabricAcrylic : pricing.fabricPolyester;
  const Pmotor = control === 'motorized' ? pricing.motor : 0;

  const usdCost = L * Psys + S * Pfab + Pmotor;
  const totalGel = usdCost * pricing.marginCoefficient * pricing.usdRate;

  return Math.ceil(totalGel / 10) * 10;
}

export function isValidDimensions(width: number, extension: number): boolean {
  return width >= extension + 0.5;
}
