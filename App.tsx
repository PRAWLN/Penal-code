import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Charge, ChargeCategory, FleeingType, ScenarioState } from './types';
import { PENAL_CODE } from './data/penalCode';
import { ScenarioSelector } from './components/ScenarioSelector';
import { ChargeList } from './components/ChargeList';
import { DisclaimerModal } from './components/DisclaimerModal';
import { Shield, Search, Menu, X } from 'lucide-react';

export default function App() {
  const [manualCharges, setManualCharges] = useState<Record<string, number>>({});
  const [ignoredChargeIds, setIgnoredChargeIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const [scenarioState, setScenarioState] = useState<ScenarioState>({
    incidentType: [],
    fleeing: FleeingType.NONE,
    suspectDriver: null,
    recklessEvasionDamage: false,
    customNarrative: '',
    driverSpeed: '',
    speedLimit: 75,
    trafficVehicleDestroyed: null,
    boostVehicleDestroyed: null,
    boostGpsDisabled: null,
    boostIntentToKeep: null,
    vehicleSwaps: false,
    stolenRecovered: '',
    stolenDestroyed: '',
    vehicleTheftPrincipalRecovered: '',
    vehicleTheftPrincipalDestroyed: '',
    vehicleTheftAccessoryRecovered: '',
    vehicleTheftAccessoryDestroyed: '',
    shotsFiredVictim: 'none',
    shotsFiredVictimCount: '',
    shotsFiredGovtOnSceneCount: '',
    shotsFiredGovtOffSceneCount: '',
    shotsFiredGovtActive: false,
    shotsFiredRole: 'principal',
    hostageCount: '',
    hasHostages: false,
    hostageRole: 'principal',
    robberyInjury: false,
    robberyStolenGoods: false,
    warehouseStolenGoods: true,
    humaneLabsStolenGoods: true,
    beStolenGoods: false,
    beIntentTools: false,
    beHarm: false,
    beFirearmUsed: false,
    officerAttack: false,
    officerAttackGSR: false, 
    officerAttackCountWeapon: '',
    officerAttackCountNoWeapon: '',
    officerAttackCountTargeted: '',
    drugsFound: false,
    drugMarijuanaJoints: '',
    drugMarijuanaPlants: '',
    drugCocaineBaggies: '',
    drugCocaineBricks: '',
    drugMethBaggies: '',
    drugMethBricks: '',
    drugOxyCount: '',
    weaponPossessionClass1: false,
    weaponPossessionClass2: false,
    weaponPossessionClass3: false,
    governmentEquipmentPossession: false,
    fishingViolation: false,
    fishingHasLicense: true,
    fishingOffenseNumber: 1,
    fishLivePossession: false,
    fishInApprovedContainer: true,
    activelyFishing: true,
    huntingViolation: false,
    huntingInZone: true,
    huntingHasLicense: true,
    huntingProperWeapon: true,
    huntingProtectedSpecies: false,
    huntingMeatCount: '',
    unpaidTicketDays: '',
    litteringRepeated: false,
    litteringItemCount: '',
    drugManufacturingType: null,
  });

  const scenarioCharges = useMemo(() => {
    const counts: Record<string, number> = {};
    const add = (id: string, qty = 1) => {
        if (!id) return;
        counts[id] = (counts[id] || 0) + qty;
    };
    const incidents = scenarioState.incidentType;

    // 1. Fleeing & Resisting
    if (scenarioState.fleeing === FleeingType.FOOT) {
      add('resisting_arrest_principal'); 
    } else if (scenarioState.fleeing === FleeingType.VEHICLE) {
      if (scenarioState.suspectDriver === 'no') {
        add('evading_accessory');
      } else {
        if (scenarioState.recklessEvasionDamage) {
            add('reckless_evading_principal');
        } else {
            add('evading_principal');
        }
      }
    }

    if (scenarioState.fleeing === FleeingType.VEHICLE && (scenarioState.suspectDriver === 'yes' || scenarioState.suspectDriver === 'mixed') && !scenarioState.recklessEvasionDamage) {
       add('negligent_driving_principal');
    }

    // 2. Traffic / Speeding
    if (incidents.includes('traffic_speeding')) {
       const speedNum = Number(scenarioState.driverSpeed);
       const limitNum = Number(scenarioState.speedLimit);
       
       if (!isNaN(speedNum) && !isNaN(limitNum) && speedNum > limitNum) {
         const diff = speedNum - limitNum;
         
         if (diff >= 56) {
            add('first_degree_speeding_principal');
         } else if (diff >= 35) {
            add('second_degree_speeding_principal');
         } else if (diff >= 1) {
            add('third_degree_speeding_principal');
         }
       }
    }
    if (incidents.includes('traffic_illegal_turn')) add('illegal_turn_passing_principal');
    if (incidents.includes('traffic_dui')) add('driving_under_the_influence_dui_principal');
    if (incidents.includes('traffic_no_license')) add('driving_without_a_license_principal');
    if (incidents.includes('traffic_disobey')) add('disobeying_traffic_control_device_principal');

    // 3. Vehicle Theft
    if (scenarioState.suspectDriver === 'mixed') {
        const joyPrin = Number(scenarioState.vehicleTheftPrincipalRecovered) || 0;
        const gtaPrin = Number(scenarioState.vehicleTheftPrincipalDestroyed) || 0;
        const joyAcc = Number(scenarioState.vehicleTheftAccessoryRecovered) || 0;
        const gtaAcc = Number(scenarioState.vehicleTheftAccessoryDestroyed) || 0;
        if (joyPrin > 0) add('joyriding_principal', joyPrin);
        if (gtaPrin > 0) add('grand_theft_auto_principal', gtaPrin);
        if (joyAcc > 0) add('joyriding_accessory', joyAcc);
        if (gtaAcc > 0) add('grand_theft_auto_accessory', gtaAcc);
    } else {
        let joyridingCount = 0;
        let gtaCount = 0;
        
        if (incidents.includes('boost')) {
           const isGtaBoost = scenarioState.boostGpsDisabled === true || 
                             scenarioState.boostVehicleDestroyed === true || 
                             scenarioState.boostIntentToKeep === true;
                             
           const isJoyBoost = scenarioState.boostGpsDisabled === false && 
                             scenarioState.boostVehicleDestroyed === false && 
                             scenarioState.boostIntentToKeep === false;
           
           if (isGtaBoost) gtaCount += 1;
           else if (isJoyBoost) joyridingCount += 1;
        }

        if (incidents.includes('traffic_joyriding')) {
            if (scenarioState.trafficVehicleDestroyed === false) joyridingCount += 1;
            else if (scenarioState.trafficVehicleDestroyed === true) gtaCount += 1;
        }

        if (scenarioState.vehicleSwaps) {
            joyridingCount += Number(scenarioState.stolenRecovered) || 0;
            gtaCount += Number(scenarioState.stolenDestroyed) || 0;
        }

        const vehicleTheftRole = scenarioState.suspectDriver === 'no' ? 'accessory' : 'principal';
        if (joyridingCount > 0) add(`joyriding_${vehicleTheftRole}`, joyridingCount);
        if (gtaCount > 0) add(`grand_theft_auto_${vehicleTheftRole}`, gtaCount);
    }

    // 4. Weapons & Shots Fired
    if (incidents.includes('shots_fired')) {
       const victim = scenarioState.shotsFiredVictim;
       const role = scenarioState.shotsFiredRole;
       
       if (victim === 'local' || victim === 'none') {
         add('criminal_use_of_a_firearm_principal_2');
       } else if (victim === 'animal') {
         add('criminal_use_of_a_firearm_principal_2');
       } else if (victim === 'civilian') {
         const count = Number(scenarioState.shotsFiredVictimCount) || 1;
         add(`aggravated_assault_and_battery_${role}`, count);
       } else if (victim === 'govt') {
         const onScene = Number(scenarioState.shotsFiredGovtOnSceneCount) || 0;
         const offScene = Number(scenarioState.shotsFiredGovtOffSceneCount) || 0;
         
         if (onScene > 0) {
            add(`aggravated_assault_and_battery_${role}`, onScene);
         }
         if (offScene > 0) {
            add(`assault_on_a_government_official_${role}`, offScene);
         }
       }
    }

    if (scenarioState.weaponPossessionClass1) add('criminal_possession_of_a_firearm_class_1_principal');
    if (scenarioState.weaponPossessionClass2) add('criminal_possession_of_a_firearm_class_2_principal');
    if (scenarioState.weaponPossessionClass3) add('criminal_possession_of_a_firearm_class_3_principal');
    if (scenarioState.governmentEquipmentPossession) add('possession_of_government_equipment_principal');

    // 5. Robberies & High Risk
    if (incidents.includes('bank_truck')) {
       add('aggravated_robbery_principal');
    }

    // Specific Break and Enter logic
    if (incidents.includes('break_and_enter')) {
        const { beStolenGoods, beIntentTools, beHarm, beFirearmUsed } = scenarioState;

        if (beStolenGoods) {
            if (beHarm) {
                add('aggravated_robbery_principal');
            } else {
                add('robbery_principal');
            }
        } else if (beIntentTools) {
            if (beHarm && beFirearmUsed) {
                add('aggravated_robbery_attempted');
            } else {
                add('robbery_attempted');
            }
        } else {
            add('trespassing_principal');
            if (beHarm && beFirearmUsed) {
                add('criminal_use_of_a_firearm_principal_1');
            }
        }
    }

    // Robbery/Alarm logic for Comic Store, Money Loan, PDM Alarm, Warehouse Robbery
    if (incidents.includes('comic_store') || incidents.includes('money_loan') || incidents.includes('pdm_alarm') || incidents.includes('warehouse_robbery')) {
        const participated = scenarioState.robberyStolenGoods;
        const injured = scenarioState.robberyInjury;
        
        if (participated) {
            if (injured) {
                add('aggravated_robbery_principal');
            } else {
                add('robbery_principal');
            }
        } else {
            if (injured) {
                add('aggravated_robbery_attempted');
            } else {
                add('robbery_attempted');
            }
        }
    }

    if (incidents.includes('drug_trafficking_incident')) {
        add('reckless_endangerment_principal');
        if (scenarioState.officerAttackGSR) {
            add('criminal_use_of_a_firearm_principal_1');
        }
    }

    if (incidents.includes('drug_manufacturing')) {
      if (scenarioState.drugManufacturingType === 'weed') {
        add('manufacture_of_controlled_substance_marijuana_principal');
      } else if (scenarioState.drugManufacturingType === 'cocaine') {
        add('manufacture_of_controlled_substance_cocaine_principal');
      } else if (scenarioState.drugManufacturingType === 'meth') {
        add('manufacture_of_controlled_substance_meth_principal');
      }
    }

    if (incidents.includes('air_drops')) add('smuggling_international_goods_principal');
    if (incidents.includes('humane_labs')) {
        if (scenarioState.humaneLabsStolenGoods) add('humane_labs_robbery_principal');
        else add('humane_labs_robbery_accessory');
    }

    const hostageIncidents = ['money_loan', 'pdm_alarm', 'warehouse_robbery', 'comic_store', 'break_and_enter', 'drug_trafficking_incident', 'humane_labs', 'air_drops', 'bank_truck'];
    const hasAnyHostageIncident = incidents.some(it => hostageIncidents.includes(it));
    
    if (hasAnyHostageIncident && scenarioState.hasHostages && Number(scenarioState.hostageCount) > 0) {
        if (scenarioState.hostageRole === 'principal') {
            add('hostage_taking_principal', Number(scenarioState.hostageCount));
        } else {
            add('hostage_taking_accessory', Number(scenarioState.hostageCount));
        }
    }

    if (incidents.includes('littering')) {
        const itemQty = Number(scenarioState.litteringItemCount) || 1;
        const cappedQty = Math.min(itemQty, 5);
        if (scenarioState.litteringRepeated) {
            add('littering_principal_1', cappedQty);
        } else {
            add('littering_principal_2', cappedQty);
        }
    }

    // 6. Drugs
    if (scenarioState.drugsFound) {
        const mjJoints = Number(scenarioState.drugMarijuanaJoints) || 0;
        const mjPlants = Number(scenarioState.drugMarijuanaPlants) || 0;
        const cokeBags = Number(scenarioState.drugCocaineBaggies) || 0;
        const cokeBricks = Number(scenarioState.drugCocaineBricks) || 0;
        const methBags = Number(scenarioState.drugMethBaggies) || 0;
        const methBricks = Number(scenarioState.drugMethBricks) || 0;
        const oxy = Number(scenarioState.drugOxyCount) || 0;

        if (mjJoints >= 40 || mjPlants >= 5) add('possession_with_intent_to_distribute_marijuana_principal');
        else if (mjJoints >= 25 || mjPlants >= 3) add('possession_of_controlled_substance_marijuana_principal_1');
        else if (mjJoints >= 15 || mjPlants >= 2) add('possession_of_controlled_substance_marijuana_principal_2');
        else if (mjJoints >= 1 || mjPlants >= 1) add('possession_of_controlled_substance_marijuana_principal_3');

        if (cokeBags >= 40 || cokeBricks >= 1) add('possession_with_intent_to_distribute_cocaine_principal');
        else if (cokeBags >= 20) add('possession_of_controlled_substance_cocaine_principal_1');
        else if (cokeBags >= 10) add('possession_of_controlled_substance_cocaine_principal_2');
        else if (cokeBags >= 1) add('possession_of_controlled_substance_cocaine_principal_3');

        if (methBags >= 40 || methBricks >= 1) add('possession_with_intent_to_distribute_meth_principal');
        else if (methBags >= 10) add('possession_of_controlled_substance_meth_principal_1');
        else if (methBags >= 5) add('possession_of_controlled_substance_meth_principal_2');
        else if (methBags >= 1) add('possession_of_controlled_substance_meth_principal_3');

        if (oxy >= 20) add('possession_with_intent_to_distribute_oxy_principal');
        else if (oxy >= 10) add('possession_of_controlled_substance_oxy_principal_1');
        else if (oxy >= 5) add('possession_of_controlled_substance_oxy_principal_2');
        else if (oxy >= 1) add('possession_of_controlled_substance_oxy_principal_3');
    }

    // 7. Fishing & Hunting
    const isWildlifeMenuSelected = incidents.includes('fishing_hunting');
    const isAnimalShot = incidents.includes('shots_fired') && scenarioState.shotsFiredVictim === 'animal';

    if (isWildlifeMenuSelected && scenarioState.fishingViolation) {
        if (!scenarioState.fishingHasLicense) {
            if (scenarioState.fishingOffenseNumber === 3) add('fishing_without_a_license_principal_1');
            else if (scenarioState.fishingOffenseNumber === 2) add('fishing_without_a_license_principal_2');
            else add('fishing_without_a_license_principal_3');
        }

        if (scenarioState.fishLivePossession && !scenarioState.fishInApprovedContainer && !scenarioState.activelyFishing) {
            add('illegal_fish_handling_principal');
        }
    }

    if ((isWildlifeMenuSelected && scenarioState.huntingViolation) || isAnimalShot) {
        if (!scenarioState.huntingInZone) add('poaching_principal');
        else if (!scenarioState.huntingHasLicense || !scenarioState.huntingProperWeapon) add('hunting_without_a_license_or_proper_firearm_principal');
        if (scenarioState.huntingProtectedSpecies) add('illegal_poaching_principal');
        const meat = Number(scenarioState.huntingMeatCount) || 0;
        if (meat >= 60) add('hunting_over_limits_principal_1');
        else if (meat >= 50) add('hunting_over_limits_principal_2');
        else if (meat >= 41) add('hunting_over_limits_principal_3');
    }

    // 8. Tickets
    const ticketDays = Number(scenarioState.unpaidTicketDays);
    if (ticketDays > 0) {
        if (ticketDays >= 15) add('failure_to_pay_tickets_principal_1');
        else if (ticketDays >= 7) add('failure_to_pay_tickets_principal_2');
        else add('failure_to_pay_tickets_principal_3');
    }

    if (scenarioState.officerAttack) {
        const roleSuffix = scenarioState.officerAttackGSR ? 'principal' : 'accessory';
        const countWeapon = Number(scenarioState.officerAttackCountWeapon) || 0;
        if (countWeapon > 0) add(`aggravated_assault_and_battery_${roleSuffix}`, countWeapon);
        const countNoWeapon = Number(scenarioState.officerAttackCountNoWeapon) || 0;
        if (countNoWeapon > 0) add(`assault_and_battery_${roleSuffix}`, countNoWeapon);
        const countTargeted = Number(scenarioState.officerAttackCountTargeted) || 0;
        if (countTargeted > 0) add(`assault_on_a_government_official_${roleSuffix}`, countTargeted);
    }

    return counts;
  }, [scenarioState]);

  const prevScenarioChargesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const prev = prevScenarioChargesRef.current;
    Object.entries(scenarioCharges).forEach(([id, count]) => {
      if (prev[id] !== count) {
        setIgnoredChargeIds(current => current.filter(ignoredId => ignoredId !== id));
      }
    });
    prevScenarioChargesRef.current = scenarioCharges;
  }, [scenarioCharges]);

  const activeCharges = useMemo(() => {
    const merged = { ...manualCharges };
    Object.entries(scenarioCharges).forEach(([id, count]) => {
        merged[id] = (merged[id] || 0) + count;
    });

    return Object.entries(merged)
        .filter(([id]) => !ignoredChargeIds.includes(id))
        .map(([id, count]) => {
            const charge = PENAL_CODE.find(c => c.id === id);
            return charge ? { charge, count } : null;
        })
        .filter((c): c is { charge: Charge, count: number } => c !== null);
  }, [manualCharges, scenarioCharges, ignoredChargeIds]);

  const handleManualAdd = (id: string) => {
    if (ignoredChargeIds.includes(id)) setIgnoredChargeIds(prev => prev.filter(i => i !== id));
    setManualCharges(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveCharge = (id: string) => {
    if (manualCharges[id]) {
        setManualCharges(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }
    setIgnoredChargeIds(prev => {
        if (!prev.includes(id)) return [...prev, id];
        return prev;
    });
  };

  const handleScenarioUpdate = (update: Partial<ScenarioState>) => {
    setScenarioState(prev => ({ ...prev, ...update }));
  };

  const filteredPenalCode = useMemo(() => {
    if (!searchTerm) return [];
    const lower = searchTerm.toLowerCase();
    return PENAL_CODE.filter(c => c.title.toLowerCase().includes(lower) || (c.code && c.code.toLowerCase().includes(lower)));
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {showDisclaimer && <DisclaimerModal onConfirm={() => setShowDisclaimer(false)} />}
      
      <header className="flex-none h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 z-[60] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg"><Shield className="text-white w-6 h-6" /></div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white uppercase">LOS SANTOS</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Penal Code Calculator</p>
          </div>
        </div>
        <div className="hidden md:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input type="text" placeholder="Search Penal Code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500" />
          {searchTerm && (
            <div className="absolute top-12 left-0 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-2xl max-h-60 overflow-y-auto p-2 z-[70]">
               {filteredPenalCode.map(c => (
                 <button key={c.id} onClick={() => { handleManualAdd(c.id); setSearchTerm(''); }} className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center group">
                   <span className="text-sm font-medium">{c.code ? `${c.code} - ` : ''}{c.title}</span>
                   <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100">Add</span>
                 </button>
               ))}
            </div>
          )}
        </div>
        <button className="md:hidden text-slate-300 relative z-[70]" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? <X /> : <Menu />}</button>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className={`absolute inset-y-0 left-0 w-full md:relative md:w-5/12 lg:w-1/3 bg-slate-900 border-r border-slate-700 p-6 overflow-y-auto transition-transform duration-300 z-50 shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
           <ScenarioSelector scenarioState={scenarioState} onUpdate={handleScenarioUpdate} />
        </div>
        <div className="flex-1 bg-slate-950 p-4 md:p-6 lg:p-8 overflow-hidden z-0">
          <div className="h-full max-w-4xl mx-auto">
            <ChargeList charges={activeCharges} onRemoveCharge={handleRemoveCharge} scenarioState={scenarioState} />
          </div>
        </div>
      </main>
    </div>
  );
}