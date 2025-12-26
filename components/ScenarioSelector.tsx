import React from 'react';
import { FleeingType, ScenarioState, ShotsFiredVictim } from '../types';
import { 
  Car, 
  User, 
  AlertTriangle, 
  Siren, 
  RefreshCcw, 
  Briefcase, 
  Ticket, 
  ShieldAlert, 
  Gauge, 
  PackageSearch, 
  Info, 
  Target, 
  Users, 
  Fish, 
  Trash2, 
  Truck, 
  FlaskConical, 
  Crosshair,
  Home,
  Store
} from 'lucide-react';

interface ScenarioSelectorProps {
  scenarioState: ScenarioState;
  onUpdate: (newState: Partial<ScenarioState>) => void;
}

const INCIDENT_TYPES = [
  { id: 'littering', label: 'Littering' },
  { id: 'traffic_stop', label: 'Traffic Stop' },
  { id: 'fishing_hunting', label: 'Fishing / Hunting Violation' },
  { id: 'bank_truck', label: 'Bank Truck' },
  { id: 'drug_manufacturing', label: 'Drug Manufacturing' },
  { id: 'shots_fired', label: 'Shots Fired' },
  { id: 'break_and_enter', label: 'Break and Enter' },
  { id: 'boost', label: 'Boost' },
  { id: 'drug_trafficking_incident', label: 'Drug Trafficking' },
  { id: 'money_loan', label: 'Money Loan Alarm' },
  { id: 'pdm_alarm', label: 'PDM Alarm' },
  { id: 'warehouse_robbery', label: 'Warehouse Robbery' },
  { id: 'comic_store', label: 'Comic Store Alarm' },
  { id: 'air_drops', label: 'Unauthorized Air Drops' },
  { id: 'humane_labs', label: 'Humane Labs Alarm' },
];

const TRAFFIC_VIOLATIONS = [
  { id: 'traffic_speeding', label: 'Speeding' },
  { id: 'traffic_illegal_turn', label: 'Illegal Turn/Passing' },
  { id: 'traffic_dui', label: 'Driving under the influence (DUI)' },
  { id: 'traffic_no_license', label: 'Driving without a license' },
  { id: 'traffic_disobey', label: 'Disobeying Traffic Control Device' },
  { id: 'traffic_joyriding', label: 'Stolen Vehicle' },
];

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ 
  scenarioState, 
  onUpdate
}) => {
  const toggleIncident = (id: string) => {
    const current = scenarioState.incidentType;
    
    if (current.includes(id)) {
      let nextIncidents = current.filter(i => i !== id);
      const update: Partial<ScenarioState> = {};

      if (id === 'traffic_stop') {
        const trafficIds = TRAFFIC_VIOLATIONS.map(t => t.id);
        nextIncidents = nextIncidents.filter(i => !trafficIds.includes(i));
        update.driverSpeed = '';
        update.trafficVehicleDestroyed = null;
      }

      if (id === 'traffic_speeding') update.driverSpeed = '';
      if (id === 'traffic_joyriding') update.trafficVehicleDestroyed = null;
      if (id === 'boost') {
          update.boostVehicleDestroyed = null;
          update.boostGpsDisabled = null;
          update.boostIntentToKeep = null;
      }
      
      if (id === 'shots_fired') {
        update.shotsFiredVictim = 'none';
        update.shotsFiredVictimCount = '';
        update.shotsFiredGovtOnSceneCount = '';
        update.shotsFiredGovtOffSceneCount = '';
        update.shotsFiredGovtActive = false;
        update.shotsFiredRole = 'principal';
      }
      
      if (id === 'littering') {
          update.litteringRepeated = false;
          update.litteringItemCount = '';
      }

      if (id === 'fishing_hunting') {
          update.fishingViolation = false;
          update.huntingViolation = false;
          update.huntingMeatCount = '';
          update.fishLivePossession = false;
          update.fishInApprovedContainer = true;
          update.activelyFishing = true;
      }

      if (id === 'drug_manufacturing') {
        update.drugManufacturingType = null;
      }

      if (id === 'break_and_enter') {
        update.beStolenGoods = false;
        update.beIntentTools = false;
        update.beHarm = false;
        update.beFirearmUsed = false;
      }

      const alarmIds = ['money_loan', 'comic_store', 'pdm_alarm', 'break_and_enter', 'bank_truck'];
      const remainingAlarms = nextIncidents.filter(i => alarmIds.includes(i));
      if (remainingAlarms.length === 0 && alarmIds.includes(id)) {
          update.hostageCount = '';
          update.hasHostages = false;
          update.robberyInjury = false;
          update.robberyStolenGoods = false;
      }

      if (id === 'warehouse_robbery') update.warehouseStolenGoods = true;
      if (id === 'humane_labs') update.humaneLabsStolenGoods = true;

      const vehicleCrimes = ['boost', 'traffic_joyriding'];
      const stillHasVehicleCrime = nextIncidents.some(ni => vehicleCrimes.includes(ni));
      if (!stillHasVehicleCrime && scenarioState.fleeing !== FleeingType.VEHICLE) {
         update.suspectDriver = null;
      }

      if (nextIncidents.length === 0) {
          update.fleeing = FleeingType.NONE;
          update.suspectDriver = null;
          update.recklessEvasionDamage = false;
          update.vehicleSwaps = false;
          update.stolenRecovered = '';
          update.stolenDestroyed = '';
          update.vehicleTheftPrincipalRecovered = '';
          update.vehicleTheftPrincipalDestroyed = '';
          update.vehicleTheftAccessoryRecovered = '';
          update.vehicleTheftAccessoryDestroyed = '';
          update.officerAttack = false;
          update.officerAttackGSR = true;
          update.officerAttackCountWeapon = '';
          update.officerAttackCountNoWeapon = '';
          update.officerAttackCountTargeted = '';
          update.drugsFound = false;
          update.drugMarijuanaJoints = '';
          update.drugMarijuanaPlants = '';
          update.drugCocaineBaggies = '';
          update.drugCocaineBricks = '';
          update.drugMethBaggies = '';
          update.drugMethBricks = '';
          update.drugOxyCount = '';
          update.weaponPossessionClass1 = false;
          update.weaponPossessionClass2 = false;
          update.weaponPossessionClass3 = false;
          update.governmentEquipmentPossession = false;
          update.unpaidTicketDays = '';
          update.warehouseStolenGoods = true;
          update.humaneLabsStolenGoods = true;
          update.robberyStolenGoods = false;
          update.boostVehicleDestroyed = null;
          update.boostGpsDisabled = null;
          update.boostIntentToKeep = null;
          update.hasHostages = false;
          update.hostageCount = '';
          update.drugManufacturingType = null;
      }

      update.incidentType = nextIncidents;
      onUpdate(update);
    } else {
      onUpdate({ incidentType: [...current, id] });
    }
  };

  const handleFleeingChange = (val: FleeingType) => {
    const update: Partial<ScenarioState> = { fleeing: val };
    if (val !== FleeingType.VEHICLE) {
      update.recklessEvasionDamage = false;
      update.vehicleSwaps = false;
      update.stolenRecovered = '';
      update.stolenDestroyed = '';
      const vehicleCrimes = ['boost', 'traffic_joyriding'];
      const hasVehicleCrime = scenarioState.incidentType.some(it => vehicleCrimes.includes(it));
      if (!hasVehicleCrime) {
          update.suspectDriver = null;
      }
    }
    onUpdate(update);
  };

  const handleVehicleSwapsChange = (val: boolean) => {
    const update: Partial<ScenarioState> = { vehicleSwaps: val };
    if (!val) {
      update.stolenRecovered = '';
      update.stolenDestroyed = '';
    }
    onUpdate(update);
  };

  const handleRoleChange = (role: 'no' | 'yes' | 'mixed') => {
    const update: Partial<ScenarioState> = { suspectDriver: role };
    if (role === 'mixed' && scenarioState.fleeing !== FleeingType.VEHICLE) {
      update.fleeing = FleeingType.VEHICLE;
    }
    onUpdate(update);
  };

  const hostageIncidents = ['money_loan', 'pdm_alarm', 'warehouse_robbery', 'comic_store', 'break_and_enter', 'drug_trafficking_incident', 'humane_labs', 'air_drops', 'bank_truck'];
  const showHostageSection = scenarioState.incidentType.some(it => hostageIncidents.includes(it));

  const hasActiveIncidents = scenarioState.incidentType.length > 0;
  const vehicleCrimes = ['boost', 'traffic_joyriding'];
  const hasVehicleCrime = scenarioState.incidentType.some(it => vehicleCrimes.includes(it));
  const showRoleSection = hasVehicleCrime || scenarioState.fleeing === FleeingType.VEHICLE;
  const isRoleMissing = showRoleSection && scenarioState.suspectDriver === null;

  const isWildlifeMenuSelected = scenarioState.incidentType.includes('fishing_hunting');
  const isAnimalShot = scenarioState.incidentType.includes('shots_fired') && scenarioState.shotsFiredVictim === 'animal';
  const showWildlifeCard = isWildlifeMenuSelected || isAnimalShot;
  const showHuntingDetails = (isWildlifeMenuSelected && scenarioState.huntingViolation) || isAnimalShot;
  const showFishingDetails = isWildlifeMenuSelected && scenarioState.fishingViolation;

  const robberyAlarmsSelected = scenarioState.incidentType.some(it => ['comic_store', 'pdm_alarm', 'money_loan'].includes(it));

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={16} /> Incident Context
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INCIDENT_TYPES.map(type => (
              <label 
                key={type.id} 
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${scenarioState.incidentType.includes(type.id) 
                    ? 'bg-blue-900/30 border-blue-500 text-white' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'}
                `}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={scenarioState.incidentType.includes(type.id)}
                  onChange={() => toggleIncident(type.id)}
                />
                <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${scenarioState.incidentType.includes(type.id) ? 'bg-blue-500 border-blue-500' : 'border-slate-500'}`}>
                  {scenarioState.incidentType.includes(type.id) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Robbery Alarm Details Card (Comic, PDM, Money Loan) */}
        {robberyAlarmsSelected && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Store size={16} /> Robbery Alarm Details
            </h4>
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-xs text-slate-300 block">Did the suspect participate in the robbery or found with stolen goods?</span>
                <div className="flex gap-2">
                  <button onClick={() => onUpdate({ robberyStolenGoods: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.robberyStolenGoods ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                  <button onClick={() => onUpdate({ robberyStolenGoods: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.robberyStolenGoods ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                </div>
              </div>

              {scenarioState.robberyStolenGoods && (
                <div className="space-y-2 animate-in slide-in-from-top-1">
                  <span className="text-xs text-slate-300 block">Was the victim, a hostage, or a third party injured by a weapon during the robbery?</span>
                  <div className="flex gap-2">
                    <button onClick={() => onUpdate({ robberyInjury: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.robberyInjury ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                    <button onClick={() => onUpdate({ robberyInjury: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.robberyInjury ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Break and Enter Card */}
        {scenarioState.incidentType.includes('break_and_enter') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Home size={16} /> Break and Enter Details
            </h4>
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-xs text-slate-300 block">Did you find any stolen goods on your suspect?</span>
                <div className="flex gap-2">
                  <button onClick={() => onUpdate({ beStolenGoods: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.beStolenGoods ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                  <button onClick={() => onUpdate({ beStolenGoods: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.beStolenGoods ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-300 block">Did any of the suspects have tools or intent to rob the property?</span>
                <div className="flex gap-2">
                  <button onClick={() => onUpdate({ beIntentTools: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.beIntentTools ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                  <button onClick={() => onUpdate({ beIntentTools: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.beIntentTools ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-300 block">Were any locals harmed inside?</span>
                <div className="flex gap-2">
                  <button onClick={() => onUpdate({ beHarm: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.beHarm ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                  <button onClick={() => onUpdate({ beHarm: false, beFirearmUsed: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.beHarm ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                </div>
              </div>

              {scenarioState.beHarm && (
                <div className="space-y-2 animate-in slide-in-from-top-1">
                  <span className="text-xs text-slate-300 block font-semibold text-amber-400">Was a firearm used?</span>
                  <div className="flex gap-2">
                    <button onClick={() => onUpdate({ beFirearmUsed: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.beFirearmUsed ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                    <button onClick={() => onUpdate({ beFirearmUsed: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.beFirearmUsed ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shots Fired Details Card */}
        {scenarioState.incidentType.includes('shots_fired') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Crosshair size={16} /> Shots Fired Investigation
            </h4>
            <div className="space-y-4">
               <div className="space-y-2">
                 <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block">Who / What was shot?</span>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'none', label: 'None/Object' },
                      { id: 'animal', label: 'Animal' },
                      { id: 'local', label: 'Local (NPC)' },
                      { id: 'civilian', label: 'Civilian' },
                      { id: 'govt', label: 'Govt Employee' },
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => onUpdate({ shotsFiredVictim: opt.id as ShotsFiredVictim })} 
                        className={`py-2 text-[10px] font-bold rounded border transition-all ${scenarioState.shotsFiredVictim === opt.id ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                      >{opt.label}</button>
                    ))}
                 </div>
               </div>

               {scenarioState.shotsFiredVictim === 'civilian' && (
                 <div className="p-3 bg-slate-900/40 rounded border border-slate-700 space-y-3 animate-in zoom-in-95">
                    <div className="flex items-center justify-between">
                       <label className="text-[11px] text-slate-300">How many victims were shot?</label>
                       <input 
                         type="number" 
                         min="1"
                         placeholder="1"
                         className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-500" 
                         value={scenarioState.shotsFiredVictimCount} 
                         onChange={e => onUpdate({ shotsFiredVictimCount: e.target.value === '' ? '' : parseInt(e.target.value) })} 
                       />
                    </div>
                 </div>
               )}

               {scenarioState.shotsFiredVictim === 'govt' && (
                 <div className="p-3 bg-slate-900/40 rounded border border-slate-700 space-y-4 animate-in zoom-in-95">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <label className="text-[11px] text-slate-300 flex-1 leading-tight">Victims engaged in active enforcement at scene?</label>
                        <input 
                          type="number" 
                          min="0"
                          placeholder="0"
                          className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-500 flex-none" 
                          value={scenarioState.shotsFiredGovtOnSceneCount} 
                          onChange={e => onUpdate({ shotsFiredGovtOnSceneCount: e.target.value === '' ? '' : parseInt(e.target.value) })} 
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <label className="text-[11px] text-slate-300 flex-1 leading-tight">Victims NOT performing active enforcement/Off-scene?</label>
                        <input 
                          type="number" 
                          min="0"
                          placeholder="0"
                          className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-500 flex-none" 
                          value={scenarioState.shotsFiredGovtOffSceneCount} 
                          onChange={e => onUpdate({ shotsFiredGovtOffSceneCount: e.target.value === '' ? '' : parseInt(e.target.value) })} 
                        />
                      </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* Drug Manufacturing Card */}
        {scenarioState.incidentType.includes('drug_manufacturing') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <FlaskConical size={16} /> Drug Manufacturing
            </h4>
            <div className="space-y-3">
               <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block">Select Drug Being Manufactured:</span>
               <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => onUpdate({ drugManufacturingType: 'weed' })} 
                    className={`py-2 text-[10px] font-bold rounded border transition-all ${scenarioState.drugManufacturingType === 'weed' ? 'bg-green-600 border-green-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                  >Weed</button>
                  <button 
                    onClick={() => onUpdate({ drugManufacturingType: 'cocaine' })} 
                    className={`py-2 text-[10px] font-bold rounded border transition-all ${scenarioState.drugManufacturingType === 'cocaine' ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                  >Cocaine</button>
                  <button 
                    onClick={() => onUpdate({ drugManufacturingType: 'meth' })} 
                    className={`py-2 text-[10px] font-bold rounded border transition-all ${scenarioState.drugManufacturingType === 'meth' ? 'bg-purple-600 border-purple-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                  >Meth</button>
               </div>
            </div>
          </div>
        )}

        {/* Littering Details Card */}
        {scenarioState.incidentType.includes('littering') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Trash2 size={16} /> Littering Violation
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Littering Violation History</span>
                <div className="flex bg-slate-900 rounded p-0.5 border border-slate-700">
                  <button onClick={() => onUpdate({ litteringRepeated: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.litteringRepeated ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}>Under 5</button>
                  <button onClick={() => onUpdate({ litteringRepeated: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.litteringRepeated ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}>5+</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-300">Items Littered (Max 5 items fine cap)</label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="0" 
                  className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500" 
                  value={scenarioState.litteringItemCount} 
                  onChange={e => onUpdate({ litteringItemCount: e.target.value === '' ? '' : parseInt(e.target.value) })} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Fishing & Hunting Details Card */}
        {showWildlifeCard && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Fish size={16} /> Wildlife Violations
            </h4>
            
            {isWildlifeMenuSelected && (
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => onUpdate({ fishingViolation: !scenarioState.fishingViolation })}
                  className={`flex-1 py-2 text-[10px] font-bold rounded border transition-all ${scenarioState.fishingViolation ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                >Fishing</button>
                <button 
                  onClick={() => onUpdate({ huntingViolation: !scenarioState.huntingViolation })}
                  className={`flex-1 py-2 text-[10px] font-bold rounded border transition-all ${scenarioState.huntingViolation ? 'bg-orange-600 border-orange-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                >Hunting</button>
              </div>
            )}

            {showFishingDetails && (
              <div className="p-3 bg-slate-900/40 rounded border border-slate-700 space-y-3 animate-in zoom-in-95">
                <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Fishing Details</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Has License?</span>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                    <button onClick={() => onUpdate({ fishingHasLicense: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.fishingHasLicense ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Yes</button>
                    <button onClick={() => onUpdate({ fishingHasLicense: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.fishingHasLicense ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>No</button>
                  </div>
                </div>
                {!scenarioState.fishingHasLicense && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Offense Number</span>
                    <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                      {[1, 2, 3].map(n => (
                        <button key={n} onClick={() => onUpdate({ fishingOffenseNumber: n as any })} className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.fishingOffenseNumber === n ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>{n === 3 ? '3+' : n}</button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-2 mt-2 border-t border-slate-800 space-y-3">
                   <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">Handling & Possession Diagnostic</span>
                   
                   <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300">Found with live fish?</span>
                    <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                      <button onClick={() => onUpdate({ fishLivePossession: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.fishLivePossession ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Yes</button>
                      <button onClick={() => onUpdate({ fishLivePossession: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.fishLivePossession ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>No</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300">In approved cooler?</span>
                    <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                      <button onClick={() => onUpdate({ fishInApprovedContainer: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.fishInApprovedContainer ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Yes</button>
                      <button onClick={() => onUpdate({ fishInApprovedContainer: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.fishInApprovedContainer ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>No</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300">Actively fishing?</span>
                    <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                      <button onClick={() => onUpdate({ activelyFishing: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.activelyFishing ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Yes</button>
                      <button onClick={() => onUpdate({ activelyFishing: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.activelyFishing ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showHuntingDetails && (
              <div className="p-3 bg-slate-900/40 rounded border border-slate-700 space-y-3 animate-in zoom-in-95">
                <span className="text-[10px] text-orange-400 uppercase font-bold tracking-wider">Hunting Details</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">In Hunting Zone?</span>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                    <button onClick={() => onUpdate({ huntingInZone: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.huntingInZone ? 'bg-green-600 text-white shadow-sm' : 'text-slate-500'}`}>In Zone</button>
                    <button onClick={() => onUpdate({ huntingInZone: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.huntingInZone ? 'bg-red-700 text-white shadow-sm' : 'text-slate-500'}`}>Outside</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Valid License?</span>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                    <button onClick={() => onUpdate({ huntingHasLicense: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.huntingHasLicense ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}>Yes</button>
                    <button onClick={() => onUpdate({ huntingHasLicense: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.huntingHasLicense ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}>No</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Proper Firearm?</span>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                    <button onClick={() => onUpdate({ huntingProperWeapon: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.huntingProperWeapon ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}>Yes</button>
                    <button onClick={() => onUpdate({ huntingProperWeapon: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.huntingProperWeapon ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}>No</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Protected Species?</span>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                    <button onClick={() => onUpdate({ huntingProtectedSpecies: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.huntingProtectedSpecies ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500'}`}>Yes</button>
                    <button onClick={() => onUpdate({ huntingProtectedSpecies: false })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.huntingProtectedSpecies ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}>No</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-400">Meat Count</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-20 bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-xs text-white" 
                    value={scenarioState.huntingMeatCount} 
                    onChange={e => onUpdate({ huntingMeatCount: e.target.value === '' ? '' : parseInt(e.target.value) })} 
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hostage Situation Card */}
        {showHostageSection && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Users size={16} /> Hostage Information
            </h4>
            <div className="flex items-center justify-between mb-2">
               <span className="text-xs text-slate-300">Any hostages taken?</span>
               <div className="flex bg-slate-900 rounded p-0.5 border border-slate-700">
                  <button onClick={() => onUpdate({ hasHostages: true })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.hasHostages ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}>Yes</button>
                  <button onClick={() => onUpdate({ hasHostages: false, hostageCount: '' })} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!scenarioState.hasHostages ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}>No</button>
               </div>
            </div>

            {scenarioState.hasHostages && (
              <div className="space-y-4 animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                   <label className="text-[10px] text-slate-400 uppercase font-bold">Hostage Count</label>
                   <input 
                     type="number" 
                     min="1" 
                     placeholder="0" 
                     className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                     value={scenarioState.hostageCount}
                     onChange={(e) => onUpdate({hostageCount: e.target.value === '' ? '' : parseInt(e.target.value)})}
                   />
                </div>
                <div>
                   <label className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Suspect's Interaction</label>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => onUpdate({ hostageRole: 'principal' })} 
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded border transition-all ${scenarioState.hostageRole === 'principal' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 text-slate-500 border-slate-700'}`}
                      >Held Hostage (Principal)</button>
                      <button 
                        onClick={() => onUpdate({ hostageRole: 'accessory' })} 
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded border transition-all ${scenarioState.hostageRole === 'accessory' ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-slate-900 text-slate-500 border-slate-700'}`}
                      >At Scene (Accessory)</button>
                   </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drug Trafficking Details */}
        {scenarioState.incidentType.includes('drug_trafficking_incident') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
             <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Target size={16} /> Ballistics & Evidence
            </h4>
            <div className="space-y-3">
               <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">GSR or Ballistics Match Found?</span>
               <div className="flex gap-2">
                  <button 
                    onClick={() => onUpdate({ officerAttackGSR: true })} 
                    className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.officerAttackGSR ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}
                  >Yes (Match)</button>
                  <button 
                    onClick={() => onUpdate({ officerAttackGSR: false })} 
                    className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.officerAttackGSR ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}
                  >No Match</button>
               </div>
            </div>
          </div>
        )}

        {/* Traffic Stop Details Card */}
        {scenarioState.incidentType.includes('traffic_stop') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 space-y-4">
            <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Car size={16} /> Traffic Stop Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TRAFFIC_VIOLATIONS.map(v => (
                <button
                  key={v.id}
                  onClick={() => toggleIncident(v.id)}
                  className={`py-2 px-3 rounded border text-[10px] font-bold uppercase transition-all ${scenarioState.incidentType.includes(v.id) ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-300'}`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {scenarioState.incidentType.includes('traffic_speeding') && (
              <div className="p-3 bg-slate-900/60 rounded border border-slate-700 space-y-3 animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                   <label className="text-[10px] text-slate-400 uppercase font-bold">Speed Limit</label>
                   <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                      {[75, 90].map(limit => (
                        <button 
                          key={limit}
                          onClick={() => onUpdate({speedLimit: limit as any})} 
                          className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${scenarioState.speedLimit === limit ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
                        >{limit}</button>
                      ))}
                   </div>
                </div>
                <div className="flex items-center justify-between">
                   <label className="text-[10px] text-slate-400 uppercase font-bold">Driver Speed (mph)</label>
                   <div className="relative w-24">
                      <Gauge size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-400" />
                      <input 
                        type="number" 
                        min="0" 
                        placeholder="0" 
                        className="w-full bg-slate-800 border border-slate-600 rounded pl-7 pr-2 py-1.5 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                        value={scenarioState.driverSpeed}
                        onChange={(e) => onUpdate({driverSpeed: e.target.value === '' ? '' : parseInt(e.target.value)})}
                      />
                   </div>
                </div>
              </div>
            )}

            {scenarioState.incidentType.includes('traffic_joyriding') && (
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Vehicle Outcome (Joyriding)</span>
                <div className="flex gap-2">
                  <button onClick={() => onUpdate({ trafficVehicleDestroyed: false })} className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all border ${scenarioState.trafficVehicleDestroyed === false ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>Recovered</button>
                  <button onClick={() => onUpdate({ trafficVehicleDestroyed: true })} className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all border ${scenarioState.trafficVehicleDestroyed === true ? 'bg-red-600 border-red-500 text-white' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>Destroyed</button>
                </div>
              </div>
            )}
          </div>
        )}

        {scenarioState.incidentType.includes('boost') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Car size={16} /> Boost Recovery Status
            </h4>
            <div className="flex flex-col gap-5">
              <div className="space-y-2">
                <span className="text-xs text-slate-300">Was the GPS tracker disabled?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdate({ boostGpsDisabled: false })}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-colors ${scenarioState.boostGpsDisabled === false ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                  >No (Joyriding)</button>
                  <button
                    onClick={() => onUpdate({ boostGpsDisabled: true })}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-colors ${scenarioState.boostGpsDisabled === true ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                  >Yes (GTA)</button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-300">Was the vehicle blown up or water dumped?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdate({ boostVehicleDestroyed: false })}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-colors ${scenarioState.boostVehicleDestroyed === false ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                  >No (Joyriding)</button>
                  <button
                    onClick={() => onUpdate({ boostVehicleDestroyed: true })}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-colors ${scenarioState.boostVehicleDestroyed === true ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                  >Yes (GTA)</button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-300">Was there any info / items to show intent of not returning the vehicle?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdate({ boostIntentToKeep: false })}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-colors ${scenarioState.boostIntentToKeep === false ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                  <button
                    onClick={() => onUpdate({ boostIntentToKeep: true })}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-colors ${scenarioState.boostIntentToKeep === true ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasActiveIncidents && (
          <>
            <div className="h-px bg-slate-700 my-4" />
            
            {showRoleSection && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} /> Suspect Role
                </h3>
                <div className={`p-4 bg-slate-800/40 rounded-lg border transition-all duration-500 space-y-4 ${isRoleMissing ? 'border-amber-500/50 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)] animate-pulse' : 'border-slate-700'}`}>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Your Suspects Vehicle Involvement</span>
                      {isRoleMissing && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 animate-bounce">
                           <Info size={10} /> REQUIRED
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleRoleChange('no')} className={`flex-1 py-2 px-2 rounded border text-xs font-bold uppercase transition-all ${scenarioState.suspectDriver === 'no' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Passenger (Accessory)</button>
                      <button onClick={() => handleRoleChange('yes')} className={`flex-1 py-2 px-2 rounded border text-xs font-bold uppercase transition-all ${scenarioState.suspectDriver === 'yes' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Driver (Principal)</button>
                      <button onClick={() => handleRoleChange('mixed')} className={`flex-1 py-2 px-2 rounded border text-xs font-bold uppercase transition-all ${scenarioState.suspectDriver === 'mixed' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Both (Switched)</button>
                    </div>
                  </div>

                  {scenarioState.suspectDriver === 'mixed' && (
                    <div className="bg-slate-900/60 rounded border border-slate-700 p-3 animate-in fade-in zoom-in-95">
                      <h5 className="text-[10px] text-slate-400 uppercase font-bold mb-1">Stolen Swap Vehicles</h5>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2 border-b border-slate-800 pb-3">
                          <span className="text-[9px] font-bold text-blue-400 block mb-1 uppercase tracking-tighter">As Driver (Principal)</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[8px] text-slate-500 uppercase font-bold">Recovered</label>
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftPrincipalRecovered} onChange={(e) => onUpdate({ vehicleTheftPrincipalRecovered: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-1 text-xs text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[8px] text-slate-500 uppercase font-bold">Destroyed</label>
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftPrincipalDestroyed} onChange={(e) => onUpdate({ vehicleTheftPrincipalDestroyed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-1 text-xs text-white focus:border-red-500 outline-none" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold text-amber-200 block mb-1 uppercase tracking-tighter">As Passenger (Accessory)</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[8px] text-slate-500 uppercase font-bold">Recovered</label>
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftAccessoryRecovered} onChange={(e) => onUpdate({ vehicleTheftAccessoryRecovered: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-1 text-xs text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[8px] text-slate-500 uppercase font-bold">Destroyed</label>
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftAccessoryDestroyed} onChange={(e) => onUpdate({ vehicleTheftAccessoryDestroyed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-1 text-xs text-white focus:border-red-500 outline-none" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Siren size={16} /> Fleeing Behavior
              </h3>
              
              <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700 space-y-4">
                <div>
                  <div className="flex gap-2">
                    {[
                      { val: FleeingType.NONE, label: 'Did Not Flee' },
                      { val: FleeingType.FOOT, label: 'Foot Pursuit' },
                      { val: FleeingType.VEHICLE, label: 'Vehicle Pursuit' }
                    ].map((opt) => (
                      <button key={opt.val} onClick={() => handleFleeingChange(opt.val)} className={`flex-1 py-2 px-3 rounded-md border text-xs font-bold uppercase transition-all ${scenarioState.fleeing === opt.val ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-700'}`}>{opt.label}</button>
                    ))}
                  </div>
                </div>

                {scenarioState.fleeing === FleeingType.VEHICLE && (
                  <div className="pt-4 border-t border-slate-700 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Pursuit Details</h4>
                    
                    <div>
                      <span className="text-xs text-slate-300 block mb-2">Did chase cause significant damage?</span>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdate({ recklessEvasionDamage: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.recklessEvasionDamage ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No</button>
                        <button onClick={() => onUpdate({ recklessEvasionDamage: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.recklessEvasionDamage ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes (Reckless)</button>
                      </div>
                    </div>

                    {scenarioState.suspectDriver !== 'mixed' && (
                      <div className="pt-2">
                        <span className="text-xs text-slate-300 block mb-2 flex items-center gap-1">Any documented getaway swaps?</span>
                        <div className="flex gap-2 mb-3">
                          <button onClick={() => handleVehicleSwapsChange(false)} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.vehicleSwaps ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No</button>
                          <button onClick={() => handleVehicleSwapsChange(true)} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.vehicleSwaps ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                        </div>
                        {scenarioState.vehicleSwaps && (
                          <div className="bg-slate-900/60 p-3 rounded border border-slate-700 animate-in fade-in zoom-in-95">
                            <h5 className="text-[9px] text-slate-400 uppercase font-bold mb-1">Swap Vehicles</h5>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[8px] text-slate-500 uppercase font-bold">Recovered</label>
                                <div className="flex items-center gap-1">
                                  <RefreshCcw size={10} className="text-blue-400" />
                                  <input type="number" min="0" placeholder="0" value={scenarioState.stolenRecovered} onChange={(e) => onUpdate({ stolenRecovered: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] text-slate-500 uppercase font-bold">Destroyed</label>
                                <div className="flex items-center gap-1">
                                  <AlertTriangle size={10} className="text-red-400" />
                                  <input type="number" min="0" placeholder="0" value={scenarioState.stolenDestroyed} onChange={(e) => onUpdate({ stolenDestroyed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:border-red-500 outline-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 mt-6 border-t border-slate-700 pt-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={16} /> Officer Safety
              </h3>
              <div className="bg-slate-800/30 p-3 rounded border border-slate-700">
                <div className="flex flex-col gap-3 mb-3">
                  <span className="text-sm font-medium text-slate-200">Was an officer attacked?</span>
                  <div className="flex gap-2">
                    <button onClick={() => onUpdate({ officerAttack: false, officerAttackCountWeapon: '', officerAttackCountNoWeapon: '', officerAttackCountTargeted: '', officerAttackGSR: true })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.officerAttack ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No</button>
                    <button onClick={() => onUpdate({ officerAttack: true })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.officerAttack ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes</button>
                  </div>
                </div>
                {scenarioState.officerAttack && (
                  <div className="mt-4 pl-1 space-y-4 animate-in fade-in slide-in-from-top-1 border-t border-slate-700/50 pt-3">
                    <div>
                      <span className="text-xs text-slate-400 font-bold block mb-2">Did suspect attack/test positive for GSR?</span>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdate({ officerAttackGSR: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.officerAttackGSR ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes (Principal)</button>
                        <button onClick={() => onUpdate({ officerAttackGSR: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.officerAttackGSR ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No (Accessory)</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Attacked with Weapon</label>
                        <div className="relative">
                          <input type="number" min="0" value={scenarioState.officerAttackCountWeapon} onChange={(e) => onUpdate({ officerAttackCountWeapon: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-red-500 outline-none pl-8" placeholder="0" />
                          <ShieldAlert size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Attacked without Weapon</label>
                        <input type="number" min="0" value={scenarioState.officerAttackCountNoWeapon} onChange={(e) => onUpdate({ officerAttackCountNoWeapon: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-orange-500 outline-none" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Targeted Official (Off-scene)</label>
                        <input type="number" min="0" value={scenarioState.officerAttackCountTargeted} onChange={(e) => onUpdate({ officerAttackCountTargeted: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-blue-500 outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 mt-6 border-t border-slate-700 pt-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <PackageSearch size={16} /> Arrest Processing
              </h3>
              
              <div className="flex flex-col gap-3">
                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">Illegal Drugs Found</span>
                  <div className="flex bg-slate-900/80 rounded border border-slate-600 p-0.5">
                    <button 
                      onClick={() => onUpdate({ drugsFound: true })} 
                      className={`px-4 py-1 text-xs font-bold rounded transition-all ${scenarioState.drugsFound ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                    >Yes</button>
                    <button 
                      onClick={() => onUpdate({ drugsFound: false })} 
                      className={`px-4 py-1 text-xs font-bold rounded transition-all ${!scenarioState.drugsFound ? 'bg-slate-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                    >No</button>
                  </div>
                </div>

                {scenarioState.drugsFound && (
                  <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/40 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <span className="text-[10px] text-green-400 font-bold block mb-1">Marijuana</span>
                      <input placeholder="Joints" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs mb-1" value={scenarioState.drugMarijuanaJoints} onChange={e => onUpdate({drugMarijuanaJoints: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                      <input placeholder="Plants / Seeds" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugMarijuanaPlants} onChange={e => onUpdate({drugMarijuanaPlants: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <span className="text-[10px] text-white font-bold block mb-1">Cocaine</span>
                      <input placeholder="Baggies" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs mb-1" value={scenarioState.drugCocaineBaggies} onChange={e => onUpdate({drugCocaineBaggies: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                      <input placeholder="Bricks" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugCocaineBricks} onChange={e => onUpdate({drugCocaineBricks: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 font-bold block mb-1">Meth</span>
                      <input placeholder="Baggies" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs mb-1" value={scenarioState.drugMethBaggies} onChange={e => onUpdate({drugMethBaggies: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                      <input placeholder="Bricks" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugMethBricks} onChange={e => onUpdate({drugMethBricks: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <span className="text-[10px] text-orange-300 font-bold block mb-1">Oxy</span>
                      <input placeholder="Count" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-xs" value={scenarioState.drugOxyCount} onChange={e => onUpdate({drugOxyCount: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                  </div>
                )}

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60 space-y-3">
                  <span className="text-sm font-medium text-slate-200 block">Illegal Weapon Possession (No use)</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onUpdate({ weaponPossessionClass1: !scenarioState.weaponPossessionClass1 })} 
                      className={`flex-1 py-1.5 text-xs rounded border font-bold transition-all ${scenarioState.weaponPossessionClass1 ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                    >Class 1</button>
                    <button 
                      onClick={() => onUpdate({ weaponPossessionClass2: !scenarioState.weaponPossessionClass2 })} 
                      className={`flex-1 py-1.5 text-xs rounded border font-bold transition-all ${scenarioState.weaponPossessionClass2 ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                    >Class 2</button>
                    <button 
                      onClick={() => onUpdate({ weaponPossessionClass3: !scenarioState.weaponPossessionClass3 })} 
                      className={`flex-1 py-1.5 text-xs rounded border font-bold transition-all ${scenarioState.weaponPossessionClass3 ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'}`}
                    >Class 3</button>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">Government Equipment Found</span>
                  <div className="flex bg-slate-900/80 rounded border border-slate-600 p-0.5">
                    <button 
                      onClick={() => onUpdate({ governmentEquipmentPossession: true })} 
                      className={`px-4 py-1 text-xs font-bold rounded transition-all ${scenarioState.governmentEquipmentPossession ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                    >Yes</button>
                    <button 
                      onClick={() => onUpdate({ governmentEquipmentPossession: false })} 
                      className={`px-4 py-1 text-xs font-bold rounded transition-all ${!scenarioState.governmentEquipmentPossession ? 'bg-slate-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                    >No</button>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket size={18} className="text-yellow-500" />
                    <span className="text-sm font-medium text-slate-200">Unpaid Tickets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Days Overdue</span>
                    <input 
                      type="number" 
                      placeholder="0" 
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-right text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                      value={scenarioState.unpaidTicketDays} 
                      onChange={e => onUpdate({ unpaidTicketDays: e.target.value === '' ? '' : parseInt(e.target.value) })} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
