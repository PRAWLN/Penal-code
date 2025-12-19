
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

export interface ScenarioState {
  incidentType: string[];
  fleeing: FleeingType;
  suspectDriver: 'yes' | 'no' | 'mixed' | null;
  recklessEvasionDamage: boolean; // New field for Reckless Evading logic
  customNarrative: string;
  driverSpeed: number | '';
  speedLimit: 75 | 90;
  trafficVehicleDestroyed: boolean | null;
  
  // New Vehicle Swap Logic
  vehicleSwaps: boolean;
  stolenRecovered: number | ''; // Joyriding counts (Single Role)
  stolenDestroyed: number | ''; // GTA counts (Single Role)

  // Mixed Role Vehicle Theft Counts
  vehicleTheftPrincipalRecovered: number | '';
  vehicleTheftPrincipalDestroyed: number | '';
  vehicleTheftAccessoryRecovered: number | '';
  vehicleTheftAccessoryDestroyed: number | '';

  // Shots Fired Logic
  shotsFiredVictim: ShotsFiredVictim;
  shotsFiredVictimCount: number | '';
  shotsFiredGovtActive: boolean; // "In active scene / On duty?"
  shotsFiredRole: 'principal' | 'accessory';

  // Hostage Logic
  hostageCount: number | '';
  hasHostages: boolean;
  
  // Robbery Logic
  robberyInjury: boolean;
  robberyStolenGoods: boolean; // New field for Robbery Principal vs Accessory
  warehouseStolenGoods: boolean; // New field for Warehouse Robbery
  humaneLabsStolenGoods: boolean; // New field for Humane Labs Robbery

  // --- NEW FIELDS ---
  // Officer Safety
  officerAttack: boolean; // Master Switch
  officerAttackGSR: boolean; // Witnessed / GSR Positive -> Principal vs Accessory
  
  officerAttackCountWeapon: number | ''; // Aggravated Assault
  officerAttackCountNoWeapon: number | ''; // Assault & Battery
  officerAttackCountTargeted: number | ''; // Assault on Govt Official

  // Drugs
  drugsFound: boolean;
  drugMarijuanaJoints: number | '';
  drugMarijuanaPlants: number | '';
  drugCocaineBaggies: number | '';
  drugCocaineBricks: number | '';
  drugMethBaggies: number | '';
  drugMethBricks: number | '';
  drugOxyCount: number | '';
  
  // Weapon Possession (Simple possession, not use)
  weaponPossessionClass1: boolean;
  weaponPossessionClass2: boolean;
  weaponPossessionClass3: boolean;
  
  // Government Equipment
  governmentEquipmentPossession: boolean;

  // Fishing
  fishingViolation: boolean;
  fishingHasLicense: boolean;
  fishingOffenseNumber: 1 | 2 | 3; // 1 = 1st Offense, etc.
  fishingContainerViolation: boolean; // Improper container or over limit

  // Hunting
  huntingViolation: boolean;
  huntingInZone: boolean;
  huntingHasLicense: boolean;
  huntingProperWeapon: boolean;
  huntingProtectedSpecies: boolean;
  huntingMeatCount: number | '';

  // Tickets
  unpaidTicketDays: number | ''; // Days overdue

  // Littering
  litteringRepeated: boolean; // 5th+ violation
}

export interface AiAnalysisResult {
  suggestedChargeIds: string[];
  reasoning: string;
}
