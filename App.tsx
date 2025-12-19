
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Charge, ChargeCategory, FleeingType, ScenarioState } from './types';
import { PENAL_CODE } from './data/penalCode';
import { analyzeScenarioWithGemini } from './services/geminiService';
import { ScenarioSelector } from './components/ScenarioSelector';
import { ChargeList } from './components/ChargeList';
import { Shield, Search, Menu, X } from 'lucide-react';

export default function App() {
  // --- State ---
  // We use three sets of charges: Manual (user added), AI (analyzed), and Scenario (auto calculated)
  // Maps Charge ID -> Count
  const [manualCharges, setManualCharges] = useState<Record<string, number>>({});
  const [aiCharges, setAiCharges] = useState<Record<string, number>>({});
  // List of IDs that the user explicitly removed, even if the scenario suggests them
  const [ignoredChargeIds, setIgnoredChargeIds] = useState<string[]>([]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

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
    
    // Mixed role init
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
    robberyStolenGoods: true, // Default to principal logic
    warehouseStolenGoods: true, // Default to principal logic
    humaneLabsStolenGoods: true, // Default to principal logic
    
    // New Fields Init
    officerAttack: false,
    officerAttackGSR: true, // Default to principal logic
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
    
    // Fishing
    fishingViolation: false,
    fishingHasLicense: true,
    fishingOffenseNumber: 1,
    fishingContainerViolation: false,

    // Hunting
    huntingViolation: false,
    huntingInZone: true,
    huntingHasLicense: true,
    huntingProperWeapon: true,
    huntingProtectedSpecies: false,
    huntingMeatCount: '',

    unpaidTicketDays: '',
    litteringRepeated: false,
  });

  // --- Logic ---

  // Auto-calculate Scenario Charges based on inputs
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
        // Driver logic (Yes or Mixed): Check for Reckless Evading vs Standard Evading
        if (scenarioState.recklessEvasionDamage) {
            add('reckless_evading_principal');
        } else {
            add('evading_principal');
        }
      }
    }

    // 2. Negligent Driving (if fleeing in vehicle and driving at some point)
    // Only applied if NOT reckless evasion (significant damage/injury)
    if (scenarioState.fleeing === FleeingType.VEHICLE && (scenarioState.suspectDriver === 'yes' || scenarioState.suspectDriver === 'mixed') && !scenarioState.recklessEvasionDamage) {
       add('negligent_driving_principal');
    }

    // 3. Traffic Violations
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

    // 4. Vehicle Theft Logic (GTA vs Joyriding)
    if (scenarioState.suspectDriver === 'mixed') {
        // --- MIXED ROLE LOGIC ---
        // Uses explicit user inputs for counts
        const joyPrin = typeof scenarioState.vehicleTheftPrincipalRecovered === 'number' ? scenarioState.vehicleTheftPrincipalRecovered : 0;
        const gtaPrin = typeof scenarioState.vehicleTheftPrincipalDestroyed === 'number' ? scenarioState.vehicleTheftPrincipalDestroyed : 0;
        const joyAcc = typeof scenarioState.vehicleTheftAccessoryRecovered === 'number' ? scenarioState.vehicleTheftAccessoryRecovered : 0;
        const gtaAcc = typeof scenarioState.vehicleTheftAccessoryDestroyed === 'number' ? scenarioState.vehicleTheftAccessoryDestroyed : 0;

        if (joyPrin > 0) add('joyriding_principal', joyPrin);
        if (gtaPrin > 0) add('grand_theft_auto_principal', gtaPrin);
        if (joyAcc > 0) add('joyriding_accessory', joyAcc);
        if (gtaAcc > 0) add('grand_theft_auto_accessory', gtaAcc);

    } else {
        // --- SINGLE ROLE LOGIC ---
        // Auto-calculates based on incident list + simple swap counts
        let joyridingCount = 0;
        if (incidents.includes('traffic_joyriding') && scenarioState.trafficVehicleDestroyed === false) {
            joyridingCount += 1;
        }
        if (scenarioState.vehicleSwaps && typeof scenarioState.stolenRecovered === 'number') {
            joyridingCount += scenarioState.stolenRecovered;
        }
        
        let gtaCount = 0;
        if (incidents.includes('traffic_joyriding') && scenarioState.trafficVehicleDestroyed === true) {
            gtaCount += 1;
        }
        if (incidents.includes('boost')) gtaCount += 1;
        if (scenarioState.vehicleSwaps && typeof scenarioState.stolenDestroyed === 'number') {
            gtaCount += scenarioState.stolenDestroyed;
        }

        const vehicleTheftRole = scenarioState.suspectDriver === 'no' ? 'accessory' : 'principal';
        if (joyridingCount > 0) add(`joyriding_${vehicleTheftRole}`, joyridingCount);
        if (gtaCount > 0) add(`grand_theft_auto_${vehicleTheftRole}`, gtaCount);
    }


    // 5. Weapon Offenses (Shots Fired Logic)
    if (incidents.includes('shots_fired')) {
       const victim = scenarioState.shotsFiredVictim;
       const role = scenarioState.shotsFiredRole;
       const count = (typeof scenarioState.shotsFiredVictimCount === 'number' && scenarioState.shotsFiredVictimCount > 0) 
                     ? scenarioState.shotsFiredVictimCount 
                     : 1;

       if (victim === 'local' || victim === 'none') {
         add('criminal_use_of_a_firearm_principal_2'); // 10 months
       } else if (victim === 'animal') {
         // Animal Shooting without specific hunting context implies potential animal cruelty or criminal use
         // If "Hunting Violation" is selected, those charges take precedence/specificity.
         // If just shooting an animal:
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

    // 5.b Weapon Possession (Static)
    if (scenarioState.weaponPossessionClass1) add('criminal_possession_of_a_firearm_class_1_principal');
    if (scenarioState.weaponPossessionClass2) add('criminal_possession_of_a_firearm_class_2_principal');
    if (scenarioState.weaponPossessionClass3) add('criminal_possession_of_a_firearm_class_3_principal');
    
    // 5.c Government Equipment
    if (scenarioState.governmentEquipmentPossession) add('possession_of_government_equipment_principal');


    // 6. Robbery / Burglary Contexts
    
    // Warehouse Robbery (Conditional Principal/Accessory)
    if (incidents.includes('warehouse_robbery')) {
        if (scenarioState.warehouseStolenGoods) {
            add('aggravated_robbery_principal');
        } else {
            add('aggravated_robbery_accessory');
        }
    }

    // Robbery logic for Alarm Heists AND Break & Enter
    if (incidents.includes('comic_store') || incidents.includes('money_loan') || incidents.includes('pdm_alarm') || incidents.includes('break_and_enter')) {
        const hasInjury = scenarioState.robberyInjury || 
            (incidents.includes('shots_fired') && ['local', 'civilian', 'govt'].includes(scenarioState.shotsFiredVictim));

        if (scenarioState.robberyStolenGoods) {
            if (hasInjury) {
                add('aggravated_robbery_principal');
            } else {
                add('robbery_principal');
            }
        } else {
            if (hasInjury) {
                add('aggravated_robbery_accessory');
            } else {
                add('robbery_accessory');
            }
        }
        
        if (typeof scenarioState.hostageCount === 'number' && scenarioState.hostageCount > 0) {
            add('hostage_taking_principal', scenarioState.hostageCount);
        }
    }

    if (incidents.includes('drug_trafficking_incident')) add('drug_trafficking_court_charge_principal');
    if (incidents.includes('air_drops')) add('smuggling_international_goods_principal');
    
    // Humane Labs Logic
    if (incidents.includes('humane_labs')) {
        if (scenarioState.humaneLabsStolenGoods) {
            add('humane_labs_robbery_principal');
        } else {
            add('humane_labs_robbery_accessory');
        }
        // Removed government_trespassing_principal
    }
    
    // Littering Logic
    if (incidents.includes('littering')) {
        if (scenarioState.litteringRepeated) {
             add('littering_principal_1'); // Misdemeanor
        } else {
             add('littering_principal_2'); // Citation
        }
    }

    // 7. DRUG LOGIC
    if (scenarioState.drugsFound) {
        // Quantities
        const mjJoints = typeof scenarioState.drugMarijuanaJoints === 'number' ? scenarioState.drugMarijuanaJoints : 0;
        const mjPlants = typeof scenarioState.drugMarijuanaPlants === 'number' ? scenarioState.drugMarijuanaPlants : 0;
        const cokeBags = typeof scenarioState.drugCocaineBaggies === 'number' ? scenarioState.drugCocaineBaggies : 0;
        const cokeBricks = typeof scenarioState.drugCocaineBricks === 'number' ? scenarioState.drugCocaineBricks : 0;
        const methBags = typeof scenarioState.drugMethBaggies === 'number' ? scenarioState.drugMethBaggies : 0;
        const methBricks = typeof scenarioState.drugMethBricks === 'number' ? scenarioState.drugMethBricks : 0;
        const oxy = typeof scenarioState.drugOxyCount === 'number' ? scenarioState.drugOxyCount : 0;

        // Marijuana
        // Intent: 40+ joints OR 5+ plants OR Brick (not tracked in state, assuming plants/joints cover it or user adds manually)
        if (mjJoints >= 40 || mjPlants >= 5) {
            add('possession_with_intent_to_distribute_marijuana_principal');
        } else if (mjJoints >= 25 || mjPlants >= 3) {
            add('possession_of_controlled_substance_marijuana_principal_1');
        } else if (mjJoints >= 15 || mjPlants >= 2) {
            add('possession_of_controlled_substance_marijuana_principal_2');
        } else if (mjJoints >= 1 || mjPlants >= 1) {
            add('possession_of_controlled_substance_marijuana_principal_3');
        }

        // Cocaine
        // Intent: 40+ bags OR 1+ brick
        if (cokeBags >= 40 || cokeBricks >= 1) {
             add('possession_with_intent_to_distribute_cocaine_principal');
        } else if (cokeBags >= 20) {
             add('possession_of_controlled_substance_cocaine_principal_1');
        } else if (cokeBags >= 10) {
             add('possession_of_controlled_substance_cocaine_principal_2');
        } else if (cokeBags >= 1) {
             add('possession_of_controlled_substance_cocaine_principal_3');
        }

        // Meth
        // Intent: 40+ bags OR 1+ brick
        if (methBags >= 40 || methBricks >= 1) {
            add('possession_with_intent_to_distribute_meth_principal');
        } else if (methBags >= 10) {
            add('possession_of_controlled_substance_meth_principal_1');
        } else if (methBags >= 5) {
            add('possession_of_controlled_substance_meth_principal_2');
        } else if (methBags >= 1) {
            add('possession_of_controlled_substance_meth_principal_3');
        }

        // Oxy
        // Intent: 20+ Oxy
        if (oxy >= 20) {
            add('possession_with_intent_to_distribute_oxy_principal');
        } else if (oxy >= 10) {
            add('possession_of_controlled_substance_oxy_principal_1');
        } else if (oxy >= 5) {
            add('possession_of_controlled_substance_oxy_principal_2');
        } else if (oxy >= 1) {
            add('possession_of_controlled_substance_oxy_principal_3');
        }
    }

    // 8. FISHING LOGIC
    if (incidents.includes('fishing_hunting') && scenarioState.fishingViolation) {
        if (!scenarioState.fishingHasLicense) {
            if (scenarioState.fishingOffenseNumber === 3) add('fishing_without_a_license_principal_1'); // 3rd offense
            else if (scenarioState.fishingOffenseNumber === 2) add('fishing_without_a_license_principal_2');
            else add('fishing_without_a_license_principal_3'); // 1st offense
        }
        if (scenarioState.fishingContainerViolation) {
            add('exceeding_legal_fish_limit_principal'); // Usually carries higher fine/time than illegal handling
        }
    }

    // 9. HUNTING LOGIC
    if (incidents.includes('fishing_hunting') && scenarioState.huntingViolation) {
        // Poaching vs Hunting
        if (!scenarioState.huntingInZone) {
            add('poaching_principal');
        } else {
             // In zone but...
             if (!scenarioState.huntingHasLicense || !scenarioState.huntingProperWeapon) {
                 add('hunting_without_a_license_or_proper_firearm_principal');
             }
        }

        // Illegal Poaching (Protected Species)
        if (scenarioState.huntingProtectedSpecies) {
            add('illegal_poaching_principal');
        }

        // Over Limits
        const meat = typeof scenarioState.huntingMeatCount === 'number' ? scenarioState.huntingMeatCount : 0;
        if (meat >= 60) add('hunting_over_limits_principal_1');
        else if (meat >= 50) add('hunting_over_limits_principal_2');
        else if (meat >= 41) add('hunting_over_limits_principal_3');
    }

    // 10. TICKETS
    if (typeof scenarioState.unpaidTicketDays === 'number') {
        if (scenarioState.unpaidTicketDays >= 15) add('failure_to_pay_tickets_principal_1');
        else if (scenarioState.unpaidTicketDays >= 7) add('failure_to_pay_tickets_principal_2');
        else if (scenarioState.unpaidTicketDays > 0) add('failure_to_pay_tickets_principal_3');
    }

    // 11. OFFICER SAFETY
    if (scenarioState.officerAttack) {
        // Determine Role Suffix (Principal or Accessory)
        const roleSuffix = scenarioState.officerAttackGSR ? 'principal' : 'accessory';

        // 1. Aggravated Assault (Weapon)
        const countWeapon = (typeof scenarioState.officerAttackCountWeapon === 'number' && scenarioState.officerAttackCountWeapon > 0) 
            ? scenarioState.officerAttackCountWeapon : 0;
        if (countWeapon > 0) {
            add(`aggravated_assault_and_battery_${roleSuffix}`, countWeapon);
        }

        // 2. Assault & Battery (No Weapon)
        const countNoWeapon = (typeof scenarioState.officerAttackCountNoWeapon === 'number' && scenarioState.officerAttackCountNoWeapon > 0)
            ? scenarioState.officerAttackCountNoWeapon : 0;
        if (countNoWeapon > 0) {
            add(`assault_and_battery_${roleSuffix}`, countNoWeapon);
        }

        // 3. Assault on Govt Official (Targeted/Not Active)
        const countTargeted = (typeof scenarioState.officerAttackCountTargeted === 'number' && scenarioState.officerAttackCountTargeted > 0)
            ? scenarioState.officerAttackCountTargeted : 0;
        if (countTargeted > 0) {
            add(`assault_on_a_government_official_${roleSuffix}`, countTargeted);
        }
    }

    return counts;
  }, [scenarioState]);

  // Ref to track previous scenario calculation to detect changes
  const prevScenarioChargesRef = useRef<Record<string, number>>({});

  // Effect to clear ignored status if the scenario charge count changes
  useEffect(() => {
    const prev = prevScenarioChargesRef.current;
    
    Object.entries(scenarioCharges).forEach(([id, count]) => {
      // If the count for this charge has changed compared to the previous calculation
      // We un-ignore it so the user sees the updated value
      if (prev[id] !== count) {
        setIgnoredChargeIds(current => current.filter(ignoredId => ignoredId !== id));
      }
    });

    prevScenarioChargesRef.current = scenarioCharges;
  }, [scenarioCharges]);

  // Merge Manual, AI, and Scenario charges for display
  const activeCharges = useMemo(() => {
    // Start with manual charges
    const merged = { ...manualCharges };
    
    // Add AI charges
    Object.entries(aiCharges).forEach(([id, count]) => {
      merged[id] = (merged[id] || 0) + count;
    });

    // Add scenario charges
    Object.entries(scenarioCharges).forEach(([id, count]) => {
        merged[id] = (merged[id] || 0) + count;
    });

    // Convert to array format for UI
    return Object.entries(merged)
        .filter(([id]) => !ignoredChargeIds.includes(id)) // Filter ignored charges
        .map(([id, count]) => {
            const charge = PENAL_CODE.find(c => c.id === id);
            return charge ? { charge, count } : null;
        })
        .filter((c): c is { charge: Charge, count: number } => c !== null);
  }, [manualCharges, aiCharges, scenarioCharges, ignoredChargeIds]);


  const handleAiAnalyze = async (narrative: string) => {
    setIsAnalyzing(true);
    setAiReasoning(null);
    try {
      const result = await analyzeScenarioWithGemini(narrative);
      
      // Always replace the AI charges with the new result
      // This prevents "stacking" of charges when re-analyzing
      const newAiCharges: Record<string, number> = {};
      
      if (result.suggestedChargeIds.length > 0) {
        result.suggestedChargeIds.forEach(id => {
             // Ensure we un-ignore if it was previously ignored so it reappears
             setIgnoredChargeIds(current => current.filter(i => i !== id));
             newAiCharges[id] = (newAiCharges[id] || 0) + 1;
        });
        setAiReasoning(result.reasoning);
      } else {
        alert("AI could not identify specific charges.");
      }
      
      setAiCharges(newAiCharges);

    } catch (e) {
      alert("Error analyzing narrative.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualAdd = (id: string) => {
    // Un-ignore if previously ignored
    if (ignoredChargeIds.includes(id)) {
        setIgnoredChargeIds(prev => prev.filter(i => i !== id));
    }
    // Increment manual count
    setManualCharges(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemoveCharge = (id: string) => {
    // 1. Remove from manual if present
    if (manualCharges[id]) {
        setManualCharges(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }
    
    // 2. Remove from AI if present
    if (aiCharges[id]) {
        setAiCharges(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }
    
    // 3. Add to ignore list so scenario charges (and any others) are hidden
    setIgnoredChargeIds(prev => {
        if (!prev.includes(id)) return [...prev, id];
        return prev;
    });
  };

  const handleScenarioUpdate = (update: Partial<ScenarioState>) => {
    setScenarioState(prev => ({ ...prev, ...update }));
    if (aiReasoning) setAiReasoning(null);
  };

  const filteredPenalCode = useMemo(() => {
    if (!searchTerm) return [];
    const lower = searchTerm.toLowerCase();
    return PENAL_CODE.filter(c => 
      c.title.toLowerCase().includes(lower) || 
      (c.code && c.code.toLowerCase().includes(lower))
    );
  }, [searchTerm]);


  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* Top Navigation */}
      <header className="flex-none h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">LSPD MDT</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Penal Code Calculator</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search Penal Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
          />
          {searchTerm && (
            <div className="absolute top-12 left-0 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-2xl max-h-60 overflow-y-auto p-2 z-50">
               {filteredPenalCode.map(c => (
                 <button 
                  key={c.id}
                  onClick={() => {
                    handleManualAdd(c.id);
                    setSearchTerm('');
                  }}
                  className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center group"
                 >
                   <span className="text-sm font-medium">{c.code ? `${c.code} - ` : ''}{c.title}</span>
                   <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100">Add</span>
                 </button>
               ))}
               {filteredPenalCode.length === 0 && (
                 <div className="p-2 text-xs text-slate-500 text-center">No charges found.</div>
               )}
            </div>
          )}
        </div>

        <button 
          className="md:hidden text-slate-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Left Panel: Inputs */}
        <div className={`
          absolute inset-y-0 left-0 w-full md:relative md:w-5/12 lg:w-1/3 bg-slate-900 border-r border-slate-700 p-6 overflow-y-auto transition-transform duration-300 z-10
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
           <div className="md:hidden mb-6">
              <h2 className="text-lg font-bold mb-4">Incident Report</h2>
           </div>
           
           <ScenarioSelector 
             scenarioState={scenarioState}
             onUpdate={handleScenarioUpdate}
             onAiAnalyze={handleAiAnalyze}
             isAnalyzing={isAnalyzing}
           />

           {aiReasoning && (
             <div className="mt-6 p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg text-sm text-slate-300">
               <h4 className="text-purple-400 font-bold mb-2 text-xs uppercase tracking-wider">AI Analysis</h4>
               <p className="italic leading-relaxed">"{aiReasoning}"</p>
             </div>
           )}
        </div>

        {/* Right Panel: Results */}
        <div className="flex-1 bg-slate-950 p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="h-full max-w-4xl mx-auto">
            <ChargeList 
              charges={activeCharges}
              onRemoveCharge={handleRemoveCharge}
            />
          </div>
        </div>

      </main>
    </div>
  );
}
