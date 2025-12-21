
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Charge, ChargeCategory, FleeingType, ScenarioState } from './types';
import { PENAL_CODE } from './data/penalCode';
import { ScenarioSelector } from './components/ScenarioSelector';
import { ChargeList } from './components/ChargeList';
import { Shield, Search, Menu, X } from 'lucide-react';

export default function App() {
  const [manualCharges, setManualCharges] = useState<Record<string, number>>({});
  const [ignoredChargeIds, setIgnoredChargeIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [scenarioState, setScenarioState] = useState<ScenarioState>({
    incidentType: [],
    fleeing: FleeingType.NONE,
    suspectDriver: null,
    recklessEvasionDamage: false,
    customNarrative: '',
    driverSpeed: '',
    speedLimit: 75,
    trafficVehicleDestroyed: null,
    vehicleSwaps: false,
    stolenRecovered: '',
    stolenDestroyed: '',
    vehicleTheftPrincipalRecovered: '',
    vehicleTheftPrincipalDestroyed: '',
    vehicleTheftAccessoryRecovered: '',
    vehicleTheftAccessoryDestroyed: '',
    shotsFiredVictim: 'none',
    shotsFiredVictimCount: '',
    shotsFiredGovtActive: false,
    shotsFiredRole: 'principal',
    hostageCount: '',
    hasHostages: false,
    robberyInjury: false,
    robberyStolenGoods: true,
    warehouseStolenGoods: true,
    humaneLabsStolenGoods: true,
    officerAttack: false,
    officerAttackGSR: true,
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
    fishingContainerViolation: false,
    huntingViolation: false,
    huntingInZone: true,
    huntingHasLicense: true,
    huntingProperWeapon: true,
    huntingProtectedSpecies: false,
    huntingMeatCount: '',
    unpaidTicketDays: '',
    litteringRepeated: false,
  });

  const scenarioCharges = useMemo(() => {
    const counts: Record<string, number> = {};
    const add = (id: string, qty = 1) => {
        if (!id) return;
        counts[id] = (counts[id] || 0) + qty;
    };
    const incidents = scenarioState.incidentType;

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

    if (incidents.includes('traffic_speeding')) {
       const speed = typeof scenarioState.driverSpeed === 'number' ? scenarioState.driverSpeed : 0;
       const limit = scenarioState.speedLimit;
       if (speed > 0) {
          const diff = speed - limit;
          if (diff > 55) add('first_degree_speeding_principal');
          else if (diff >= 35) add('second_degree_speeding_principal');
          else add('third_degree_speeding_principal');
       } else {
          add('third_degree_speeding_principal');
       }
    }
    if (incidents.includes('traffic_illegal_turn')) add('illegal_turn_passing_principal');
    if (incidents.includes('traffic_dui')) add('driving_under_the_influence_dui_principal');
    if (incidents.includes('traffic_no_license')) add('driving_without_a_license_principal');
    if (incidents.includes('traffic_disobey')) add('disobeying_traffic_control_device_principal');

    if (scenarioState.suspectDriver === 'mixed') {
        const joyPrin = typeof scenarioState.vehicleTheftPrincipalRecovered === 'number' ? scenarioState.vehicleTheftPrincipalRecovered : 0;
        const gtaPrin = typeof scenarioState.vehicleTheftPrincipalDestroyed === 'number' ? scenarioState.vehicleTheftPrincipalDestroyed : 0;
        const joyAcc = typeof scenarioState.vehicleTheftAccessoryRecovered === 'number' ? scenarioState.vehicleTheftAccessoryRecovered : 0;
        const gtaAcc = typeof scenarioState.vehicleTheftAccessoryDestroyed === 'number' ? scenarioState.vehicleTheftAccessoryDestroyed : 0;
        if (joyPrin > 0) add('joyriding_principal', joyPrin);
        if (gtaPrin > 0) add('grand_theft_auto_principal', gtaPrin);
        if (joyAcc > 0) add('joyriding_accessory', joyAcc);
        if (gtaAcc > 0) add('grand_theft_auto_accessory', gtaAcc);
    } else {
        let joyridingCount = 0;
        if (incidents.includes('traffic_joyriding') && scenarioState.trafficVehicleDestroyed === false) joyridingCount += 1;
        if (scenarioState.vehicleSwaps && typeof scenarioState.stolenRecovered === 'number') joyridingCount += scenarioState.stolenRecovered;
        let gtaCount = 0;
        if (incidents.includes('traffic_joyriding') && scenarioState.trafficVehicleDestroyed === true) gtaCount += 1;
        if (incidents.includes('boost')) gtaCount += 1;
        if (scenarioState.vehicleSwaps && typeof scenarioState.stolenDestroyed === 'number') gtaCount += scenarioState.stolenDestroyed;
        const vehicleTheftRole = scenarioState.suspectDriver === 'no' ? 'accessory' : 'principal';
        if (joyridingCount > 0) add(`joyriding_${vehicleTheftRole}`, joyridingCount);
        if (gtaCount > 0) add(`grand_theft_auto_${vehicleTheftRole}`, gtaCount);
    }

    if (incidents.includes('shots_fired')) {
       const victim = scenarioState.shotsFiredVictim;
       const role = scenarioState.shotsFiredRole;
       const count = (typeof scenarioState.shotsFiredVictimCount === 'number' && scenarioState.shotsFiredVictimCount > 0) ? scenarioState.shotsFiredVictimCount : 1;
       if (victim === 'local' || victim === 'none') add('criminal_use_of_a_firearm_principal_2');
       else if (victim === 'animal') {
         add('animal_cruelty_principal');
         add('criminal_use_of_a_firearm_principal_2');
       } else if (victim === 'civilian') {
         if (role === 'principal') add('aggravated_assault_and_battery_principal', count);
         else add('aggravated_assault_and_battery_accessory', count);
       } else if (victim === 'govt') {
         if (scenarioState.shotsFiredGovtActive) {
            if (role === 'principal') add('aggravated_assault_and_battery_principal', count);
            else add('aggravated_assault_and_battery_accessory', count);
         } else {
            if (role === 'principal') add('assault_on_a_government_official_principal', count);
            else add('assault_on_a_government_official_accessory', count);
         }
       }
    }

    if (scenarioState.weaponPossessionClass1) add('criminal_possession_of_a_firearm_class_1_principal');
    if (scenarioState.weaponPossessionClass2) add('criminal_possession_of_a_firearm_class_2_principal');
    if (scenarioState.weaponPossessionClass3) add('criminal_possession_of_a_firearm_class_3_principal');
    if (scenarioState.governmentEquipmentPossession) add('possession_of_government_equipment_principal');

    if (incidents.includes('warehouse_robbery')) {
        if (scenarioState.warehouseStolenGoods) add('aggravated_robbery_principal');
        else add('aggravated_robbery_accessory');
    }

    if (incidents.includes('comic_store') || incidents.includes('money_loan') || incidents.includes('pdm_alarm') || incidents.includes('break_and_enter')) {
        const hasInjury = scenarioState.robberyInjury || (incidents.includes('shots_fired') && ['local', 'civilian', 'govt'].includes(scenarioState.shotsFiredVictim));
        if (scenarioState.robberyStolenGoods) {
            if (hasInjury) add('aggravated_robbery_principal');
            else add('robbery_principal');
        } else {
            if (hasInjury) add('aggravated_robbery_accessory');
            else add('robbery_accessory');
        }
        if (typeof scenarioState.hostageCount === 'number' && scenarioState.hostageCount > 0) add('hostage_taking_principal', scenarioState.hostageCount);
    }

    if (incidents.includes('drug_trafficking_incident')) add('drug_trafficking_court_charge_principal');
    if (incidents.includes('air_drops')) add('smuggling_international_goods_principal');
    if (incidents.includes('humane_labs')) {
        if (scenarioState.humaneLabsStolenGoods) add('humane_labs_robbery_principal');
        else add('humane_labs_robbery_accessory');
    }
    if (incidents.includes('littering')) {
        if (scenarioState.litteringRepeated) add('littering_principal_1');
        else add('littering_principal_2');
    }

    if (scenarioState.drugsFound) {
        const mjJoints = typeof scenarioState.drugMarijuanaJoints === 'number' ? scenarioState.drugMarijuanaJoints : 0;
        const mjPlants = typeof scenarioState.drugMarijuanaPlants === 'number' ? scenarioState.drugMarijuanaPlants : 0;
        const cokeBags = typeof scenarioState.drugCocaineBaggies === 'number' ? scenarioState.drugCocaineBaggies : 0;
        const cokeBricks = typeof scenarioState.drugCocaineBricks === 'number' ? scenarioState.drugCocaineBricks : 0;
        const methBags = typeof scenarioState.drugMethBaggies === 'number' ? scenarioState.drugMethBaggies : 0;
        const methBricks = typeof scenarioState.drugMethBricks === 'number' ? scenarioState.drugMethBricks : 0;
        const oxy = typeof scenarioState.drugOxyCount === 'number' ? scenarioState.drugOxyCount : 0;

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

    if (incidents.includes('fishing_hunting') && scenarioState.fishingViolation) {
        if (!scenarioState.fishingHasLicense) {
            if (scenarioState.fishingOffenseNumber === 3) add('fishing_without_a_license_principal_1');
            else if (scenarioState.fishingOffenseNumber === 2) add('fishing_without_a_license_principal_2');
            else add('fishing_without_a_license_principal_3');
        }
        if (scenarioState.fishingContainerViolation) add('exceeding_legal_fish_limit_principal');
    }

    if (incidents.includes('fishing_hunting') && scenarioState.huntingViolation) {
        if (!scenarioState.huntingInZone) add('poaching_principal');
        else if (!scenarioState.huntingHasLicense || !scenarioState.huntingProperWeapon) add('hunting_without_a_license_or_proper_firearm_principal');
        if (scenarioState.huntingProtectedSpecies) add('illegal_poaching_principal');
        const meat = typeof scenarioState.huntingMeatCount === 'number' ? scenarioState.huntingMeatCount : 0;
        if (meat >= 60) add('hunting_over_limits_principal_1');
        else if (meat >= 50) add('hunting_over_limits_principal_2');
        else if (meat >= 41) add('hunting_over_limits_principal_3');
    }

    if (typeof scenarioState.unpaidTicketDays === 'number') {
        if (scenarioState.unpaidTicketDays >= 15) add('failure_to_pay_tickets_principal_1');
        else if (scenarioState.unpaidTicketDays >= 7) add('failure_to_pay_tickets_principal_2');
        else if (scenarioState.unpaidTicketDays > 0) add('failure_to_pay_tickets_principal_3');
    }

    if (scenarioState.officerAttack) {
        const roleSuffix = scenarioState.officerAttackGSR ? 'principal' : 'accessory';
        const countWeapon = (typeof scenarioState.officerAttackCountWeapon === 'number' && scenarioState.officerAttackCountWeapon > 0) ? scenarioState.officerAttackCountWeapon : 0;
        if (countWeapon > 0) add(`aggravated_assault_and_battery_${roleSuffix}`, countWeapon);
        const countNoWeapon = (typeof scenarioState.officerAttackCountNoWeapon === 'number' && scenarioState.officerAttackCountNoWeapon > 0) ? scenarioState.officerAttackCountNoWeapon : 0;
        if (countNoWeapon > 0) add(`assault_and_battery_${roleSuffix}`, countNoWeapon);
        const countTargeted = (typeof scenarioState.officerAttackCountTargeted === 'number' && scenarioState.officerAttackCountTargeted > 0) ? scenarioState.officerAttackCountTargeted : 0;
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
      <header className="flex-none h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg"><Shield className="text-white w-6 h-6" /></div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">LSPD MDT</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Penal Code Calculator</p>
          </div>
        </div>
        <div className="hidden md:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input type="text" placeholder="Search Penal Code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500" />
          {searchTerm && (
            <div className="absolute top-12 left-0 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-2xl max-h-60 overflow-y-auto p-2 z-50">
               {filteredPenalCode.map(c => (
                 <button key={c.id} onClick={() => { handleManualAdd(c.id); setSearchTerm(''); }} className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center group">
                   <span className="text-sm font-medium">{c.code ? `${c.code} - ` : ''}{c.title}</span>
                   <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100">Add</span>
                 </button>
               ))}
            </div>
          )}
        </div>
        <button className="md:hidden text-slate-300" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? <X /> : <Menu />}</button>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className={`absolute inset-y-0 left-0 w-full md:relative md:w-5/12 lg:w-1/3 bg-slate-900 border-r border-slate-700 p-6 overflow-y-auto transition-transform duration-300 z-10 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
           <ScenarioSelector scenarioState={scenarioState} onUpdate={handleScenarioUpdate} />
        </div>
        <div className="flex-1 bg-slate-950 p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="h-full max-w-4xl mx-auto">
            <ChargeList charges={activeCharges} onRemoveCharge={handleRemoveCharge} />
          </div>
        </div>
      </main>
    </div>
  );
}
