
import React from 'react';
import { FleeingType, ScenarioState } from '../types';
import { Car, User, AlertTriangle, Siren, Gauge, RefreshCcw, Crosshair, Users, Briefcase, Anchor, Ticket, ShieldAlert, Trash2 } from 'lucide-react';

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
      update.suspectDriver = null;
      update.recklessEvasionDamage = false;
      update.vehicleSwaps = false;
      update.stolenRecovered = '';
      update.stolenDestroyed = '';
    }
    onUpdate(update);
  };

  const handleVehicleSwapsChange = (hasSwaps: boolean) => {
    const update: Partial<ScenarioState> = { vehicleSwaps: hasSwaps };
    if (!hasSwaps) {
      update.stolenRecovered = '';
      update.stolenDestroyed = '';
    }
    onUpdate(update);
  };

  const calculateSpeedDiff = () => {
    if (scenarioState.driverSpeed === '' || !scenarioState.driverSpeed) return 0;
    return scenarioState.driverSpeed - scenarioState.speedLimit;
  };
  const speedDiff = calculateSpeedDiff();

  const showHostageSection = scenarioState.incidentType.some(id => ['money_loan', 'comic_store', 'pdm_alarm', 'break_and_enter'].includes(id));
  const hasActiveIncidents = scenarioState.incidentType.length > 0;

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

        {scenarioState.incidentType.includes('warehouse_robbery') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Briefcase size={16} /> Warehouse Robbery Details
            </h4>
            <div className="flex flex-col gap-3">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Was suspect found with stolen goods?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({ warehouseStolenGoods: true })}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.warehouseStolenGoods ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                >Yes (Principal)</button>
                <button
                  onClick={() => onUpdate({ warehouseStolenGoods: false })}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.warehouseStolenGoods ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                >No (Accessory)</button>
              </div>
            </div>
          </div>
        )}

        {scenarioState.incidentType.includes('humane_labs') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Briefcase size={16} /> Humane Labs Details
            </h4>
            <div className="flex flex-col gap-3">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Was suspect found with stolen goods?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({ humaneLabsStolenGoods: true })}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.humaneLabsStolenGoods ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                >Yes (Principal)</button>
                <button
                  onClick={() => onUpdate({ humaneLabsStolenGoods: false })}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.humaneLabsStolenGoods ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                >No (Accessory)</button>
              </div>
            </div>
          </div>
        )}

        {scenarioState.incidentType.includes('littering') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-teal-400 mb-3 flex items-center gap-2">
              <Trash2 size={16} /> Littering Details
            </h4>
            <div className="flex flex-col gap-3">
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <label className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-200">Is this a 5th+ Violation?</span>
                  <div className="flex bg-slate-800 rounded border border-slate-600">
                    <button 
                      onClick={() => onUpdate({ litteringRepeated: false })} 
                      className={`px-3 py-1 text-xs font-bold transition-colors ${!scenarioState.litteringRepeated ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >No</button>
                    <button 
                      onClick={() => onUpdate({ litteringRepeated: true })} 
                      className={`px-3 py-1 text-xs font-bold transition-colors ${scenarioState.litteringRepeated ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >Yes</button>
                  </div>
                </label>
                <p className="text-[10px] text-slate-500 mt-2 italic">5th+ violation upgrades the charge to a Misdemeanor.</p>
              </div>
            </div>
          </div>
        )}

        {scenarioState.incidentType.includes('fishing_hunting') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Anchor size={16} /> Fishing / Hunting Violation
            </h4>
            <div className="flex flex-col gap-3">
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <label className="flex items-center cursor-pointer mb-2">
                  <input type="checkbox" className="mr-2" checked={scenarioState.fishingViolation} onChange={(e) => onUpdate({ fishingViolation: e.target.checked })} />
                  <span className="text-sm font-bold text-slate-200">Fishing Violation</span>
                </label>
                {scenarioState.fishingViolation && (
                  <div className="pl-6 space-y-3 animate-in fade-in slide-in-from-top-1">
                    <label className="flex items-center justify-between text-xs text-slate-400">
                      <span>Has Valid License?</span>
                      <div className="flex bg-slate-800 rounded border border-slate-600">
                        <button onClick={() => onUpdate({ fishingHasLicense: true })} className={`px-2 py-0.5 ${scenarioState.fishingHasLicense ? 'bg-green-600 text-white' : 'text-slate-500'}`}>Yes</button>
                        <button onClick={() => onUpdate({ fishingHasLicense: false })} className={`px-2 py-0.5 ${!scenarioState.fishingHasLicense ? 'bg-red-600 text-white' : 'text-slate-500'}`}>No</button>
                      </div>
                    </label>
                    {!scenarioState.fishingHasLicense && (
                      <label className="flex items-center justify-between text-xs text-slate-400">
                        <span>Offense #</span>
                        <select className="bg-slate-800 border border-slate-600 rounded px-1 py-0.5 text-white" value={scenarioState.fishingOffenseNumber} onChange={(e) => onUpdate({ fishingOffenseNumber: parseInt(e.target.value) as 1|2|3 })}>
                          <option value={1}>1st</option>
                          <option value={2}>2nd</option>
                          <option value={3}>3rd+</option>
                        </select>
                      </label>
                    )}
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-2" checked={scenarioState.fishingContainerViolation} onChange={(e) => onUpdate({ fishingContainerViolation: e.target.checked })} />
                      <span className="text-xs text-slate-300">Over Limit / Bad Container</span>
                    </label>
                  </div>
                )}
              </div>
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <label className="flex items-center cursor-pointer mb-2">
                  <input type="checkbox" className="mr-2" checked={scenarioState.huntingViolation} onChange={(e) => onUpdate({ huntingViolation: e.target.checked })} />
                  <span className="text-sm font-bold text-slate-200">Hunting Violation</span>
                </label>
                {scenarioState.huntingViolation && (
                  <div className="pl-6 space-y-3 animate-in fade-in slide-in-from-top-1">
                    <label className="flex items-center justify-between text-xs text-slate-400">
                      <span>In Hunting Zone?</span>
                      <div className="flex bg-slate-800 rounded border border-slate-600">
                        <button onClick={() => onUpdate({ huntingInZone: true })} className={`px-2 py-0.5 ${scenarioState.huntingInZone ? 'bg-green-600 text-white' : 'text-slate-500'}`}>Yes</button>
                        <button onClick={() => onUpdate({ huntingInZone: false })} className={`px-2 py-0.5 ${!scenarioState.huntingInZone ? 'bg-red-600 text-white' : 'text-slate-500'}`}>No</button>
                      </div>
                    </label>
                    <label className="flex items-center justify-between text-xs text-slate-400">
                      <span>Protected Species?</span>
                      <div className="flex bg-slate-800 rounded border border-slate-600">
                        <button onClick={() => onUpdate({ huntingProtectedSpecies: true })} className={`px-2 py-0.5 ${scenarioState.huntingProtectedSpecies ? 'bg-red-600 text-white' : 'text-slate-500'}`}>Yes</button>
                        <button onClick={() => onUpdate({ huntingProtectedSpecies: false })} className={`px-2 py-0.5 ${!scenarioState.huntingProtectedSpecies ? 'bg-red-600 text-white' : 'text-slate-500'}`}>No</button>
                      </div>
                    </label>
                    {scenarioState.huntingInZone && (
                      <>
                        <label className="flex items-center justify-between text-xs text-slate-400">
                          <span>Has Valid License?</span>
                          <div className="flex bg-slate-800 rounded border border-slate-600">
                            <button onClick={() => onUpdate({ huntingHasLicense: true })} className={`px-2 py-0.5 ${scenarioState.huntingHasLicense ? 'bg-green-600 text-white' : 'text-slate-500'}`}>Yes</button>
                            <button onClick={() => onUpdate({ huntingHasLicense: false })} className={`px-2 py-0.5 ${!scenarioState.huntingHasLicense ? 'bg-red-600 text-white' : 'text-slate-500'}`}>No</button>
                          </div>
                        </label>
                        <label className="flex items-center justify-between text-xs text-slate-400">
                          <span>Proper Hunting Weapon?</span>
                          <div className="flex bg-slate-800 rounded border border-slate-600">
                            <button onClick={() => onUpdate({ huntingProperWeapon: true })} className={`px-2 py-0.5 ${scenarioState.huntingProperWeapon ? 'bg-green-600 text-white' : 'text-slate-500'}`}>Yes</button>
                            <button onClick={() => onUpdate({ huntingProperWeapon: false })} className={`px-2 py-0.5 ${!scenarioState.huntingProperWeapon ? 'bg-red-600 text-white' : 'text-slate-500'}`}>No</button>
                          </div>
                        </label>
                      </>
                    )}
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">Unprocessed Meat Found</label>
                      <input type="number" min="0" value={scenarioState.huntingMeatCount} onChange={(e) => onUpdate({ huntingMeatCount: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-white focus:border-green-500 focus:outline-none" placeholder="Amount" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showHostageSection && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <Users size={16} /> Robbery & Hostage Details
            </h4>
            <div className="flex flex-col gap-3 mb-4 border-b border-slate-700 pb-4">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Was suspect found with stolen goods?</label>
              <div className="flex gap-2">
                <button onClick={() => onUpdate({ robberyStolenGoods: true })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.robberyStolenGoods ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes (Principal)</button>
                <button onClick={() => onUpdate({ robberyStolenGoods: false })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.robberyStolenGoods ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No (Accessory)</button>
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-4 border-b border-slate-700 pb-4">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Was anyone injured by a weapon?</label>
              <div className="flex gap-2">
                <button onClick={() => onUpdate({ robberyInjury: false })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.robberyInjury ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No</button>
                <button onClick={() => onUpdate({ robberyInjury: true })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.robberyInjury ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes</button>
              </div>
              {scenarioState.robberyInjury && <p className="text-[10px] text-red-400 italic">Upgrades to Aggravated Robbery.</p>}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Were there hostages?</label>
              <div className="flex gap-2">
                <button onClick={() => onUpdate({ hasHostages: false, hostageCount: '' })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${!scenarioState.hasHostages ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No</button>
                <button onClick={() => onUpdate({ hasHostages: true, hostageCount: (typeof scenarioState.hostageCount === 'number' && scenarioState.hostageCount > 0) ? scenarioState.hostageCount : 1 })} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${scenarioState.hasHostages ? 'bg-orange-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes</button>
              </div>
              {scenarioState.hasHostages && (
                <div className="animate-in fade-in slide-in-from-top-1">
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">How many hostages?</label>
                  <input type="number" min="1" value={scenarioState.hostageCount} onChange={(e) => onUpdate({ hostageCount: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-orange-500 focus:outline-none" placeholder="1" />
                </div>
              )}
            </div>
          </div>
        )}

        {scenarioState.incidentType.includes('traffic_stop') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <Siren size={16} /> Traffic Violations
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {TRAFFIC_VIOLATIONS.map((violation) => (
                <React.Fragment key={violation.id}>
                  <label className={`flex items-center p-2 rounded cursor-pointer transition-colors ${scenarioState.incidentType.includes(violation.id) ? 'bg-slate-700/50 text-white' : 'text-slate-400 hover:text-slate-300'}`}>
                    <input type="checkbox" className="hidden" checked={scenarioState.incidentType.includes(violation.id)} onChange={() => toggleIncident(violation.id)} />
                    <div className={`w-3.5 h-3.5 rounded border mr-3 flex items-center justify-center ${scenarioState.incidentType.includes(violation.id) ? 'bg-amber-500 border-amber-500' : 'border-slate-500'}`}>
                      {scenarioState.incidentType.includes(violation.id) && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                    </div>
                    <span className="text-sm">{violation.label}</span>
                  </label>
                  {violation.id === 'traffic_speeding' && scenarioState.incidentType.includes('traffic_speeding') && (
                    <div className="ml-8 mb-2 p-3 bg-slate-900 rounded border border-slate-700 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 uppercase font-bold">Zone Limit</span>
                        <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                          <button onClick={() => onUpdate({ speedLimit: 75 })} className={`px-3 py-1 text-xs font-bold rounded transition-colors ${scenarioState.speedLimit === 75 ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>75</button>
                          <button onClick={() => onUpdate({ speedLimit: 90 })} className={`px-3 py-1 text-xs font-bold rounded transition-colors ${scenarioState.speedLimit === 90 ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>90</button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-xs text-slate-400 uppercase font-bold">Driver Speed</span>
                        <div className="relative w-24">
                          <input type="number" value={scenarioState.driverSpeed} onChange={(e) => onUpdate({ driverSpeed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-sm font-mono text-white focus:outline-none focus:border-amber-500" placeholder="0" />
                          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">mph</span>
                        </div>
                      </div>
                      {speedDiff > 0 && (
                        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-900/20 p-2 rounded justify-center">
                          <Gauge size={14} /> {speedDiff} MPH over limit
                        </div>
                      )}
                    </div>
                  )}
                  {violation.id === 'traffic_joyriding' && scenarioState.incidentType.includes('traffic_joyriding') && scenarioState.suspectDriver !== 'mixed' && (
                    <div className="ml-8 mb-2 p-3 bg-slate-900 rounded border border-slate-700 animate-in fade-in slide-in-from-top-1">
                      <span className="text-xs text-slate-400 font-bold block mb-2">Was vehicle destroyed / ocean dumped?</span>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdate({ trafficVehicleDestroyed: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.trafficVehicleDestroyed === false ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>No (Joyriding)</button>
                        <button onClick={() => onUpdate({ trafficVehicleDestroyed: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.trafficVehicleDestroyed === true ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Yes (GTA)</button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {scenarioState.incidentType.includes('shots_fired') && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
              <Crosshair size={16} /> Shots Fired Details
            </h4>
            <div className="mb-4">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Who / What was shot?</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'None/Object' },
                  { id: 'animal', label: 'Animal' },
                  { id: 'local', label: 'Local (NPC)' },
                  { id: 'civilian', label: 'Civilian' },
                  { id: 'govt', label: 'Govt Employee' },
                ].map(opt => (
                  <button key={opt.id} onClick={() => onUpdate({ shotsFiredVictim: opt.id as any })} className={`py-2 px-3 text-xs font-semibold rounded border transition-all ${scenarioState.shotsFiredVictim === opt.id ? 'bg-red-900/50 border-red-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'} ${opt.id === 'govt' ? 'col-span-2' : ''}`}>{opt.label}</button>
                ))}
              </div>
            </div>
            {(scenarioState.shotsFiredVictim === 'civilian' || scenarioState.shotsFiredVictim === 'govt') && (
              <div className="mb-4 p-3 bg-slate-900 rounded border border-slate-700 animate-in fade-in slide-in-from-top-1 space-y-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Number of Victims</label>
                  <input type="number" min="1" value={scenarioState.shotsFiredVictimCount} onChange={(e) => onUpdate({ shotsFiredVictimCount: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-white focus:border-red-500 focus:outline-none" placeholder="1" />
                </div>
                {scenarioState.shotsFiredVictim === 'govt' && (
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-2">Was official engaging the suspect?</span>
                    <div className="flex gap-2">
                      <button onClick={() => onUpdate({ shotsFiredGovtActive: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.shotsFiredGovtActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>No (Assault Govt)</button>
                      <button onClick={() => onUpdate({ shotsFiredGovtActive: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.shotsFiredGovtActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Yes (Agg Assault)</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="pt-2 border-t border-slate-700">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Suspect Role</span>
              <div className="flex gap-2">
                <button onClick={() => onUpdate({ shotsFiredRole: 'principal' })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.shotsFiredRole === 'principal' ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Shooter (Principal)</button>
                <button onClick={() => onUpdate({ shotsFiredRole: 'accessory' })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.shotsFiredRole === 'accessory' ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Accessory</button>
              </div>
            </div>
          </div>
        )}

        {hasActiveIncidents && (
          <>
            <div className="h-px bg-slate-700 my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User size={16} /> Suspect Behavior
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-300 mb-2">Did they flee?</p>
                <div className="flex gap-2">
                  {[
                    { val: FleeingType.NONE, label: 'No' },
                    { val: FleeingType.FOOT, label: 'Foot Chase' },
                    { val: FleeingType.VEHICLE, label: 'Vehicle' }
                  ].map((opt) => (
                    <button key={opt.val} onClick={() => handleFleeingChange(opt.val)} className={`flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-all ${scenarioState.fleeing === opt.val ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>{opt.label}</button>
                  ))}
                </div>
              </div>
              {scenarioState.fleeing === FleeingType.VEHICLE && (
                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Car size={16} /> Vehicle Details
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <span className="text-sm text-slate-300 block mb-2">Was suspect driving?</span>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdate({ suspectDriver: 'no' })} className={`flex-1 py-1.5 px-2 rounded border text-xs font-semibold uppercase tracking-wide transition-colors ${scenarioState.suspectDriver === 'no' ? 'bg-red-900/40 border-red-500 text-red-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>No (Passenger)</button>
                        <button onClick={() => onUpdate({ suspectDriver: 'yes' })} className={`flex-1 py-1.5 px-2 rounded border text-xs font-semibold uppercase tracking-wide transition-colors ${scenarioState.suspectDriver === 'yes' ? 'bg-red-900/40 border-red-500 text-red-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Yes (Driver)</button>
                        <button onClick={() => onUpdate({ suspectDriver: 'mixed' })} className={`flex-1 py-1.5 px-2 rounded border text-xs font-semibold uppercase tracking-wide transition-colors ${scenarioState.suspectDriver === 'mixed' ? 'bg-red-900/40 border-red-500 text-red-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}`}>Both (Switched)</button>
                      </div>
                    </div>
                    {scenarioState.suspectDriver === 'mixed' && (
                      <div className="mt-2 bg-slate-900 rounded border border-slate-700 p-3 animate-in fade-in slide-in-from-top-1">
                        <h5 className="text-[10px] text-slate-400 uppercase font-bold mb-3 border-b border-slate-800 pb-1">Mixed Role Vehicle Counts (Total)</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2 border-r border-slate-800 pr-2">
                            <span className="text-[10px] font-bold text-red-400 block mb-1">As Driver (Principal)</span>
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-0.5">Recovered</label>
                              <div className="flex items-center gap-1">
                                <RefreshCcw size={10} className="text-blue-400" />
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftPrincipalRecovered} onChange={(e) => onUpdate({ vehicleTheftPrincipalRecovered: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-xs text-white focus:border-blue-500 focus:outline-none" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-0.5">Destroyed</label>
                              <div className="flex items-center gap-1">
                                <AlertTriangle size={10} className="text-red-400" />
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftPrincipalDestroyed} onChange={(e) => onUpdate({ vehicleTheftPrincipalDestroyed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-xs text-white focus:border-red-500 focus:outline-none" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-amber-200 block mb-1">As Passenger (Accessory)</span>
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-0.5">Recovered</label>
                              <div className="flex items-center gap-1">
                                <RefreshCcw size={10} className="text-blue-400" />
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftAccessoryRecovered} onChange={(e) => onUpdate({ vehicleTheftAccessoryRecovered: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-xs text-white focus:border-blue-500 focus:outline-none" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-0.5">Destroyed</label>
                              <div className="flex items-center gap-1">
                                <AlertTriangle size={10} className="text-red-400" />
                                <input type="number" min="0" placeholder="0" value={scenarioState.vehicleTheftAccessoryDestroyed} onChange={(e) => onUpdate({ vehicleTheftAccessoryDestroyed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-xs text-white focus:border-red-500 focus:outline-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {(scenarioState.suspectDriver === 'yes' || scenarioState.suspectDriver === 'mixed') && (
                      <div className="mt-2 p-3 bg-slate-900 rounded border border-slate-700 animate-in fade-in slide-in-from-top-1">
                        <span className="text-xs text-slate-400 font-bold block mb-2">Did chase cause significant damage or injury?</span>
                        <div className="flex gap-2">
                          <button onClick={() => onUpdate({ recklessEvasionDamage: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.recklessEvasionDamage ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>No</button>
                          <button onClick={() => onUpdate({ recklessEvasionDamage: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.recklessEvasionDamage ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Yes (Reckless)</button>
                        </div>
                      </div>
                    )}
                    {scenarioState.suspectDriver !== 'mixed' && (
                      <div className="pt-2 border-t border-slate-700">
                        <span className="text-sm text-slate-300 block mb-2">Was any vehicles during this pursuit stolen and documented?</span>
                        <div className="flex gap-2 mb-3">
                          <button onClick={() => handleVehicleSwapsChange(false)} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.vehicleSwaps ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>No</button>
                          <button onClick={() => handleVehicleSwapsChange(true)} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.vehicleSwaps ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Yes</button>
                        </div>
                        {scenarioState.vehicleSwaps && (
                          <div className="bg-slate-900 p-3 rounded border border-slate-700 animate-in fade-in slide-in-from-top-1">
                            <h5 className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-wider border-b border-slate-700 pb-1">Vehicle Recovered / Unrecoverable</h5>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Recovered</label>
                                <div className="flex items-center gap-1">
                                  <RefreshCcw size={12} className="text-blue-400" />
                                  <input type="number" min="0" placeholder="0" value={scenarioState.stolenRecovered} onChange={(e) => onUpdate({ stolenRecovered: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:border-blue-500 focus:outline-none" />
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Unrecoverable</label>
                                <div className="flex items-center gap-1">
                                  <AlertTriangle size={12} className="text-red-400" />
                                  <input type="number" min="0" placeholder="0" value={scenarioState.stolenDestroyed} onChange={(e) => onUpdate({ stolenDestroyed: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:border-red-500 focus:outline-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
                      <span className="text-xs text-slate-400 font-bold block mb-2">Was the suspect witnessed attacking, have fire arm forensics come back positive or test positive for GSR?</span>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdate({ officerAttackGSR: true })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${scenarioState.officerAttackGSR ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>Yes (Principal)</button>
                        <button onClick={() => onUpdate({ officerAttackGSR: false })} className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${!scenarioState.officerAttackGSR ? 'bg-slate-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>No (Accessory)</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Officers Attacked with Weapon</label>
                        <div className="relative">
                          <input type="number" min="0" value={scenarioState.officerAttackCountWeapon} onChange={(e) => onUpdate({ officerAttackCountWeapon: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-red-500 focus:outline-none pl-8" placeholder="0" />
                          <ShieldAlert size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Officers Attacked without Weapon</label>
                        <input type="number" min="0" value={scenarioState.officerAttackCountNoWeapon} onChange={(e) => onUpdate({ officerAttackCountNoWeapon: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-orange-500 focus:outline-none" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Officers Attacked not apart of the scene</label>
                        <input type="number" min="0" value={scenarioState.officerAttackCountTargeted} onChange={(e) => onUpdate({ officerAttackCountTargeted: e.target.value === '' ? '' : parseInt(e.target.value) })} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-6 border-t border-slate-700 pt-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={16} /> Contraband & Civil
              </h3>
              <div className="bg-slate-800/30 p-3 rounded border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-200">Illegal Drugs Found</span>
                  <div className="flex bg-slate-900 rounded border border-slate-600">
                    <button onClick={() => onUpdate({ drugsFound: true })} className={`px-3 py-1 text-xs font-bold ${scenarioState.drugsFound ? 'bg-green-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Yes</button>
                    <button onClick={() => onUpdate({ drugsFound: false })} className={`px-3 py-1 text-xs font-bold ${!scenarioState.drugsFound ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>No</button>
                  </div>
                </div>
                {scenarioState.drugsFound && (
                  <div className="grid grid-cols-2 gap-3 pl-2 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <span className="text-[10px] text-green-400 font-bold block mb-1">Marijuana</span>
                      <input placeholder="Joints" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs mb-1" value={scenarioState.drugMarijuanaJoints} onChange={e => onUpdate({drugMarijuanaJoints: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                      <input placeholder="Plants" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugMarijuanaPlants} onChange={e => onUpdate({drugMarijuanaPlants: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <span className="text-[10px] text-white font-bold block mb-1">Cocaine</span>
                      <input placeholder="Baggies" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs mb-1" value={scenarioState.drugCocaineBaggies} onChange={e => onUpdate({drugCocaineBaggies: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                      <input placeholder="Bricks" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugCocaineBricks} onChange={e => onUpdate({drugCocaineBricks: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 font-bold block mb-1">Meth</span>
                      <input placeholder="Baggies" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs mb-1" value={scenarioState.drugMethBaggies} onChange={e => onUpdate({drugMethBaggies: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                      <input placeholder="Bricks" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugMethBricks} onChange={e => onUpdate({drugMethBricks: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <span className="text-[10px] text-orange-300 font-bold block mb-1">Oxy</span>
                      <input placeholder="Count" type="number" className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs" value={scenarioState.drugOxyCount} onChange={e => onUpdate({drugOxyCount: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-slate-800/30 p-3 rounded border border-slate-700">
                <span className="text-xs font-bold text-slate-400 mb-2 block">Illegal Weapon Possession (No use)</span>
                <div className="flex gap-2">
                  <button onClick={() => onUpdate({ weaponPossessionClass1: !scenarioState.weaponPossessionClass1 })} className={`flex-1 py-1 text-xs rounded border ${scenarioState.weaponPossessionClass1 ? 'bg-red-900/50 border-red-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>Class 1</button>
                  <button onClick={() => onUpdate({ weaponPossessionClass2: !scenarioState.weaponPossessionClass2 })} className={`flex-1 py-1 text-xs rounded border ${scenarioState.weaponPossessionClass2 ? 'bg-red-900/50 border-red-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>Class 2</button>
                  <button onClick={() => onUpdate({ weaponPossessionClass3: !scenarioState.weaponPossessionClass3 })} className={`flex-1 py-1 text-xs rounded border ${scenarioState.weaponPossessionClass3 ? 'bg-red-900/50 border-red-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>Class 3</button>
                </div>
              </div>
              <div className="bg-slate-800/30 p-3 rounded border border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">Government Equipment Found</span>
                  <div className="flex bg-slate-900 rounded border border-slate-600">
                    <button onClick={() => onUpdate({ governmentEquipmentPossession: true })} className={`px-3 py-1 text-xs font-bold ${scenarioState.governmentEquipmentPossession ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Yes</button>
                    <button onClick={() => onUpdate({ governmentEquipmentPossession: false })} className={`px-3 py-1 text-xs font-bold ${!scenarioState.governmentEquipmentPossession ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>No</button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/30 p-3 rounded border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket size={16} className="text-yellow-500" />
                  <span className="text-sm text-slate-300">Unpaid Tickets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 uppercase">Days Overdue</span>
                  <input type="number" placeholder="0" className="w-16 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs text-right" value={scenarioState.unpaidTicketDays} onChange={e => onUpdate({ unpaidTicketDays: e.target.value === '' ? '' : parseInt(e.target.value) })} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
