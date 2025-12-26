export enum ChargeCategory {
  INFRACTION = 'Infraction',
  MISDEMEANOR = 'Misdemeanor',
  FELONY = 'Felony',
  CITATION = 'Citation',
}

export interface Charge {
  id: string;
  code: string;
  title: string;
  description: string;
  burdenOfProof: string;
  months: number;
  fine: number;
  category: ChargeCategory;
}

export enum FleeingType {
  NONE = 'none',
  FOOT = 'foot',
  VEHICLE = 'vehicle',
}

export type ShotsFiredVictim = 'none' | 'local' | 'civilian' | 'govt' | 'animal';

export interface AiAnalysisResult {
  suggestedChargeIds: string[];
  reasoning: string;
}

export interface ScenarioState {
  incidentType: string[];
  fleeing: FleeingType;
  suspectDriver: 'yes' | 'no' | 'mixed' | null;
  recklessEvasionDamage: boolean;
  customNarrative: string;
  driverSpeed: number | '';
  speedLimit: 75 | 90;
  trafficVehicleDestroyed: boolean | null;
  
  // Boost Details
  boostVehicleDestroyed: boolean | null; // Was vehicle blown up or water dumped?
  boostGpsDisabled: boolean | null;      // Was the GPS tracker disabled?
  boostIntentToKeep: boolean | null;     // Any info/items showing intent not to return?
  
  vehicleSwaps: boolean;
  stolenRecovered: number | ''; 
  stolenDestroyed: number | ''; 

  // Mixed Role Vehicle Theft Counts
  vehicleTheftPrincipalRecovered: number | '';
  vehicleTheftPrincipalDestroyed: number | '';
  vehicleTheftAccessoryRecovered: number | '';
  vehicleTheftAccessoryDestroyed: number | '';

  shotsFiredVictim: ShotsFiredVictim;
  shotsFiredVictimCount: number | '';
  shotsFiredGovtOnSceneCount: number | '';
  shotsFiredGovtOffSceneCount: number | '';
  shotsFiredGovtActive: boolean;
  shotsFiredRole: 'principal' | 'accessory';

  hostageCount: number | '';
  hasHostages: boolean;
  hostageRole: 'principal' | 'accessory';
  
  robberyInjury: boolean;
  robberyStolenGoods: boolean;
  warehouseStolenGoods: boolean;
  humaneLabsStolenGoods: boolean;

  officerAttack: boolean;
  officerAttackGSR: boolean;
  
  officerAttackCountWeapon: number | '';
  officerAttackCountNoWeapon: number | '';
  officerAttackCountTargeted: number | '';

  drugsFound: boolean;
  drugMarijuanaJoints: number | '';
  drugMarijuanaPlants: number | '';
  drugCocaineBaggies: number | '';
  drugCocaineBricks: number | '';
  drugMethBaggies: number | '';
  drugMethBricks: number | '';
  drugOxyCount: number | '';
  
  weaponPossessionClass1: boolean;
  weaponPossessionClass2: boolean;
  weaponPossessionClass3: boolean;
  
  governmentEquipmentPossession: boolean;

  fishingViolation: boolean;
  fishingHasLicense: boolean;
  fishingOffenseNumber: 1 | 2 | 3;
  fishLivePossession: boolean;
  fishInApprovedContainer: boolean;
  activelyFishing: boolean;

  huntingViolation: boolean;
  huntingInZone: boolean;
  huntingHasLicense: boolean;
  huntingProperWeapon: boolean;
  huntingProtectedSpecies: boolean;
  huntingMeatCount: number | '';

  unpaidTicketDays: number | '';
  litteringRepeated: boolean;
  litteringItemCount: number | '';

  // New Fields
  drugManufacturingType: 'weed' | 'cocaine' | 'meth' | null;
}