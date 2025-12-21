
import React from 'react';
import { FleeingType, ScenarioState } from '../types';
import { Car, User, AlertTriangle, Siren, RefreshCcw, Briefcase, Ticket, ShieldAlert } from 'lucide-react';

interface ScenarioSelectorProps {
  scenarioState: ScenarioState;
  onUpdate: (newState: Partial<ScenarioState>) => void;
}

const INCIDENT_TYPES = [
  { id: 'traffic_stop', label: 'Traffic Stop' },
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
  { id: 'littering', label: 'Littering' },
  { id: 'fishing_hunting', label: 'Fishing / Hunting Violation' },
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
      if (id === 'boost') update.boostVehicleDestroyed = null;
      
      if (id === 'shots_fired') {
        update.shotsFiredVictim = 'none';
        update.shotsFiredVictimCount = '';
        update.shotsFiredGovtActive = false;
        update.shotsFiredRole = 'principal';
      }
      
      if (id === 'littering') update.litteringRepeated = false;

      if (id === 'fishing_hunting') {
          update.fishingViolation = false;
          update.huntingViolation = false;
          update.huntingMeatCount = '';
      }

      const alarmIds = ['money_loan', 'comic_store', 'pdm_alarm', 'break_and_enter'];
      const remainingAlarms = nextIncidents.filter(i => alarmIds.includes(i));
      if (remainingAlarms.length === 0 && alarmIds.includes(id)) {
          update.hostageCount = '';
          update.hasHostages = false;
          update.robberyInjury = false;
          update.robberyStolenGoods = true;
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
          update.robberyStolenGoods = true;
          update.boostVehicleDestroyed = null;
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

  const handleRoleChange = (role: 'no' | 'yes' | 'mixed') => {
    const update: Partial<ScenarioState> = { suspectDriver: role };
    if (role === 'mixed' && scenarioState.fleeing !== FleeingType.VEHICLE) {
      update.fleeing = FleeingType.VEHICLE;
    }
    onUpdate(update);
  };

  const handleVehicleSwapsChange = (hasSwaps: boolean) => {
    const update: Partial<ScenarioState> = { vehicleSwaps: hasSwaps };
    if (hasSwaps && scenarioState.fleeing !== FleeingType.VEHICLE) {
      update.fleeing = FleeingType.VEHICLE;
    }
    if (!hasSwaps) {
      update.stolenRecovered = '';
      update.stolenDestroyed = '';
    }
    onUpdate(update);
  };

  const hasActiveIncidents = scenarioState.incidentType.length > 0;
  const vehicleCrimes = ['boost', 'traffic_joyriding'];
  const hasVehicleCrime = scenarioState.incidentType.some(it => vehicleCrimes.includes(it));
  const showRoleSection = hasVehicleCrime || scenarioState.fleeing === FleeingType.VEHICLE;

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
                <span className="text-sm font-medium">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {scenarioState.incidentType.includes('boost') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Car size={16} /> Boost Recovery Status
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({ boostVehicleDestroyed: false })}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.boostVehicleDestroyed === false ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                >Recovered (Joyriding)</button>
                <button
                  onClick={() => onUpdate({ boostVehicleDestroyed: true })}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.boostVehicleDestroyed === true ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                >Destroyed (GTA)</button>
              </div>
            </div>
          </div>
        )}

        {hasActiveIncidents && (
          <>
            <div className="h-px bg-slate-700 my-4" />
            
            {/* Suspect Role Selection */}
            {showRoleSection && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} /> Suspect Role
                </h3>
                <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700 space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-3">Your Suspects Vehicle Involvement (Including Swaps)</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleRoleChange('no')} className={`flex-1 py-2 px-2 rounded border text-xs font-bold uppercase transition-all ${scenarioState.suspectDriver === 'no' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Passenger (Accessory)</button>
                      <button onClick={() => handleRoleChange('yes')} className={`flex-1 py-2 px-2 rounded border text-xs font-bold uppercase transition-all ${scenarioState.suspectDriver === 'yes' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Driver (Principal)</button>
                      <button onClick={() => handleRoleChange('mixed')} className={`flex-1 py-2 px-2 rounded border text-xs font-bold uppercase transition-all ${scenarioState.suspectDriver === 'mixed' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Both (Switched)</button>
                    </div>
                  </div>

                  {scenarioState.suspectDriver === 'mixed' && (
                    <div className="bg-slate-900/60 rounded border border-slate-700 p-3 animate-in fade-in zoom-in-95">
                      <h5 className="text-[10px] text-slate-400 uppercase font-bold mb-1">Your Suspects Stolen Swap Vehicles</h5>
                      <p className="text-[9px] text-red-400 font-medium mb-3">Exclude personal vehicles.</p>
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

            {/* Behavior & Pursuit Details */}
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
                      <span className="text-xs text-slate-300 block mb-2">Did chase cause significant damage or injury?</span>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdate({ recklessEvasionDamage: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.recklessEvasionDamage ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                        <button onClick={() => onUpdate({ recklessEvasionDamage: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.recklessEvasionDamage ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes (Reckless)</button>
                      </div>
                    </div>

                    {scenarioState.suspectDriver !== 'mixed' && (
                      <div className="pt-2">
                        <span className="text-xs text-slate-300 block mb-2 flex items-center gap-1">Any documented getaway swaps?</span>
                        <div className="flex gap-2 mb-3">
                          <button onClick={() => handleVehicleSwapsChange(false)} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.vehicleSwaps ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>No</button>
                          <button onClick={() => handleVehicleSwapsChange(true)} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.vehicleSwaps ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>Yes</button>
                        </div>
                        {scenarioState.vehicleSwaps && (
                          <div className="bg-slate-900/60 p-3 rounded border border-slate-700 animate-in fade-in zoom-in-95">
                            <h5 className="text-[9px] text-slate-400 uppercase font-bold mb-1">Your Suspects Stolen Swap Vehicles</h5>
                            <p className="text-[8px] text-red-400 mb-3">Exclude personal vehicles.</p>
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

            {/* Officer Safety */}
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
                          <input type="number" min="0" value={scenarioState.officerAttackCountWeapon} onChange={(e) => onUpdate({ officerAttackCountWeapon: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-red-500 outline-none pl-8" placeholder="0" />
                          <ShieldAlert size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Attacked without Weapon</label>
                        <input type="number" min="0" value={scenarioState.officerAttackCountNoWeapon} onChange={(e) => onUpdate({ officerAttackCountNoWeapon: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-orange-500 outline-none" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Targeted Official (Off-scene)</label>
                        <input type="number" min="0" value={scenarioState.officerAttackCountTargeted} onChange={(e) => onUpdate({ officerAttackCountTargeted: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-blue-500 outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Arrest Processing Section */}
            <div className="space-y-4 mt-6 border-t border-slate-700 pt-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={16} /> Arrest Processing (If Applicable)
              </h3>
              
              <div className="flex flex-col gap-3">
                {/* Illegal Drugs Card */}
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
                      <input placeholder="Plants" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugMarijuanaPlants} onChange={e => onUpdate({drugMarijuanaPlants: e.target.value === '' ? '' : parseInt(e.target.value)})} />
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
                      <input placeholder="Count" type="number" className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugOxyCount} onChange={e => onUpdate({drugOxyCount: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                  </div>
                )}

                {/* Weapons Search Card */}
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

                {/* Gov Equip Card */}
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

                {/* Unpaid Tickets Card */}
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
