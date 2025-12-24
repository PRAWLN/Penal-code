import React, { useState, useMemo } from 'react';
import { Charge, ChargeCategory, ScenarioState, FleeingType } from '../types';
import { PENAL_CODE } from '../data/penalCode';
import { Trash2, AlertCircle, DollarSign, Clock, HelpCircle, Layers, FileText, ClipboardList, Copy, Check } from 'lucide-react';

interface ChargeWithCount {
  charge: Charge;
  count: number;
}

interface ChargeListProps {
  charges: ChargeWithCount[];
  onRemoveCharge: (id: string) => void;
  scenarioState: ScenarioState;
}

export const ChargeList: React.FC<ChargeListProps> = ({ charges, onRemoveCharge, scenarioState }) => {
  const [activeTab, setActiveTab] = useState<'charges' | 'narrative'>('charges');
  const [expandedProof, setExpandedProof] = useState<string | null>(null);
  const [copiedNarrative, setCopiedNarrative] = useState(false);
  
  const totalMonths = charges.reduce((acc, curr) => acc + (curr.charge.months * curr.count), 0);
  const totalFine = charges.reduce((acc, curr) => acc + (curr.charge.fine * curr.count), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getChargeType = (id: string) => {
    if (id.includes('_accessory')) return 'Accessory';
    if (id.includes('_attempted')) return 'Attempted';
    if (id.includes('_conspiracy')) return 'Conspiracy';
    if (id.includes('_principal')) return 'Principal';
    return null;
  };

  const copyToClipboard = () => {
    const report = `
**ARREST REPORT**
**Charges:**
${charges.map(c => `- ${c.charge.title} ${c.count > 1 ? `(x${c.count})` : ''}`).join('\n')}

**Total Time:** ${totalMonths} Months
**Total Fine:** ${formatCurrency(totalFine)}
    `.trim();
    navigator.clipboard.writeText(report);
    alert("Report copied to clipboard!");
  };

  // Narrative Generator Logic
  const narrative = useMemo(() => {
    const lines: string[] = [];
    const { incidentType: incidents, fleeing, suspectDriver, recklessEvasionDamage, driverSpeed, speedLimit, hasHostages, hostageCount, robberyInjury, hostageRole, boostGpsDisabled, boostVehicleDestroyed, boostIntentToKeep, trafficVehicleDestroyed, vehicleSwaps, stolenRecovered, stolenDestroyed } = scenarioState;

    if (incidents.length === 0 && !scenarioState.drugsFound) return "No active scenario triggers detected. Please select incidents to generate narrative.";

    // 1. Core Incident & Robberies
    const robberyIds = ['money_loan', 'comic_store', 'pdm_alarm', 'break_and_enter', 'warehouse_robbery', 'humane_labs'];
    const activeRobberies = incidents.filter(i => robberyIds.includes(i));
    
    if (activeRobberies.length > 0) {
       activeRobberies.forEach(id => {
         const label = id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
         lines.push(`Suspect was involved in a ${label} incident.`);
       });

       if (hasHostages && Number(hostageCount) > 0) {
          const condition = (robberyInjury || scenarioState.shotsFiredVictim !== 'none') ? "injured" : "unharmed";
          const interaction = hostageRole === 'principal' ? "directly taking them hostage" : "being an accessory at the scene";
          lines.push(`During the robbery, ${hostageCount} hostage(s) were held, who remained ${condition}. Suspect was involved by ${interaction}.`);
       }
    }

    // 2. Traffic & Speeding
    if (incidents.includes('traffic_speeding') && driverSpeed !== '') {
       const diff = Number(driverSpeed) - Number(speedLimit);
       let degree = "3rd";
       if (diff >= 56) degree = "1st";
       else if (diff >= 35) degree = "2nd";
       
       lines.push(`${degree} degree Speeding: Suspect was traveling at ${driverSpeed}mph in a ${speedLimit}mph limit (${diff}mph over the speed limit).`);
    }

    const trafficViolations = incidents.filter(i => i.startsWith('traffic_') && i !== 'traffic_speeding' && i !== 'traffic_stop' && i !== 'traffic_joyriding');
    if (trafficViolations.length > 0) {
       trafficViolations.forEach(id => {
          const label = id.replace('traffic_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          lines.push(`Suspect committed a traffic violation: ${label}.`);
       });
    }

    // 3. Fleeing
    if (fleeing === FleeingType.FOOT) {
      lines.push("Suspect resisted a lawful order and fled from officers on foot.");
    } else if (fleeing === FleeingType.VEHICLE) {
      const reckless = recklessEvasionDamage ? " and operated the vehicle recklessly, causing significant damage/injury" : "";
      const role = suspectDriver === 'no' ? "as a passenger" : "as the driver";
      lines.push(`Suspect evaded law enforcement in a vehicle ${role}${reckless}.`);
    }

    // 4. Vehicle Theft / Boost
    if (incidents.includes('boost')) {
       const reasons: string[] = [];
       if (boostGpsDisabled) reasons.push("disabling the GPS tracker");
       if (boostVehicleDestroyed) reasons.push("destroying or ocean-dumping the vehicle");
       if (boostIntentToKeep) reasons.push("showing clear intent not to return the vehicle");
       
       if (reasons.length > 0) {
          lines.push(`Boost Incident (Grand Theft Auto): Suspect was in possession of a stolen vehicle and escalated the crime by ${reasons.join(' and ')}.`);
       } else if (boostGpsDisabled === false) {
          lines.push("Boost Incident (Joyriding): Suspect was in possession of a stolen vehicle, but GPS remained active and no destruction occurred.");
       }
    }

    if (incidents.includes('traffic_joyriding')) {
       const status = trafficVehicleDestroyed ? "Destroyed (GTA Charge)" : "Recovered (Joyriding Charge)";
       lines.push(`Suspect was found operating a stolen vehicle which was subsequently ${status}.`);
    }

    if (vehicleSwaps) {
       if (Number(stolenRecovered) > 0) lines.push(`During the pursuit, suspect utilized ${stolenRecovered} documented swap vehicle(s) which were recovered.`);
       if (Number(stolenDestroyed) > 0) lines.push(`Suspect utilized ${stolenDestroyed} documented swap vehicle(s) which were destroyed/dumped (GTA counts).`);
    }

    // 5. Violence & Officer Safety
    if (scenarioState.officerAttack) {
       const role = scenarioState.officerAttackGSR ? "Principal (GSR Match/Direct Attack)" : "Accessory";
       const weapon = Number(scenarioState.officerAttackCountWeapon) > 0 ? `using a weapon (${scenarioState.officerAttackCountWeapon} count[s])` : "without a weapon";
       lines.push(`Officer Safety Violation: Suspect attacked government officials ${weapon}. Suspect's involvement categorized as ${role}.`);
    }

    if (incidents.includes('shots_fired')) {
       const victim = scenarioState.shotsFiredVictim === 'none' ? 'the air/ground' : scenarioState.shotsFiredVictim;
       lines.push(`Shots Fired: Suspect discharged a firearm towards ${victim}.`);
    }

    // 6. Contraband & Drugs
    if (scenarioState.drugsFound) {
       const drugSummary: string[] = ["Suspect was found in possession of illegal narcotics during processing."];
       
       // Marijuana
       const mjJoints = Number(scenarioState.drugMarijuanaJoints) || 0;
       const mjPlants = Number(scenarioState.drugMarijuanaPlants) || 0;
       if (mjJoints > 0 || mjPlants > 0) {
         let chargeId = '';
         if (mjJoints >= 40 || mjPlants >= 5) chargeId = 'possession_with_intent_to_distribute_marijuana_principal';
         else if (mjJoints >= 25 || mjPlants >= 3) chargeId = 'possession_of_controlled_substance_marijuana_principal_1';
         else if (mjJoints >= 15 || mjPlants >= 2) chargeId = 'possession_of_controlled_substance_marijuana_principal_2';
         else if (mjJoints >= 1 || mjPlants >= 1) chargeId = 'possession_of_controlled_substance_marijuana_principal_3';
         
         const charge = PENAL_CODE.find(c => c.id === chargeId);
         const items = [];
         if (mjJoints > 0) items.push(`${mjJoints} Marijuana Joint(s)`);
         if (mjPlants > 0) items.push(`${mjPlants} Marijuana Plant/Seed(s)`);
         drugSummary.push(`- ${items.join(' and ')}: ${charge?.title || 'Applied Marijuana Possession'}`);
       }

       // Cocaine
       const cokeBags = Number(scenarioState.drugCocaineBaggies) || 0;
       const cokeBricks = Number(scenarioState.drugCocaineBricks) || 0;
       if (cokeBags > 0 || cokeBricks > 0) {
         let chargeId = '';
         if (cokeBags >= 40 || cokeBricks >= 1) chargeId = 'possession_with_intent_to_distribute_cocaine_principal';
         else if (cokeBags >= 20) chargeId = 'possession_of_controlled_substance_cocaine_principal_1';
         else if (cokeBags >= 10) chargeId = 'possession_of_controlled_substance_cocaine_principal_2';
         else if (cokeBags >= 1) chargeId = 'possession_of_controlled_substance_cocaine_principal_3';
         
         const charge = PENAL_CODE.find(c => c.id === chargeId);
         const items = [];
         if (cokeBags > 0) items.push(`${cokeBags} Cocaine Baggie(s)`);
         if (cokeBricks > 0) items.push(`${cokeBricks} Cocaine Brick(s)`);
         drugSummary.push(`- ${items.join(' and ')}: ${charge?.title || 'Applied Cocaine Possession'}`);
       }

       // Meth
       const methBags = Number(scenarioState.drugMethBaggies) || 0;
       const methBricks = Number(scenarioState.drugMethBricks) || 0;
       if (methBags > 0 || methBricks > 0) {
         let chargeId = '';
         if (methBags >= 40 || methBricks >= 1) chargeId = 'possession_with_intent_to_distribute_meth_principal';
         else if (methBags >= 10) chargeId = 'possession_of_controlled_substance_meth_principal_1';
         else if (methBags >= 5) chargeId = 'possession_of_controlled_substance_meth_principal_2';
         else if (methBags >= 1) chargeId = 'possession_of_controlled_substance_meth_principal_3';
         
         const charge = PENAL_CODE.find(c => c.id === chargeId);
         const items = [];
         if (methBags > 0) items.push(`${methBags} Meth Baggie(s)`);
         if (methBricks > 0) items.push(`${methBricks} Meth Brick(s)`);
         drugSummary.push(`- ${items.join(' and ')}: ${charge?.title || 'Applied Meth Possession'}`);
       }

       // Oxy
       const oxy = Number(scenarioState.drugOxyCount) || 0;
       if (oxy > 0) {
         let chargeId = '';
         if (oxy >= 20) chargeId = 'possession_with_intent_to_distribute_oxy_principal';
         else if (oxy >= 10) chargeId = 'possession_of_controlled_substance_oxy_principal_1';
         else if (oxy >= 5) chargeId = 'possession_of_controlled_substance_oxy_principal_2';
         else if (oxy >= 1) chargeId = 'possession_of_controlled_substance_oxy_principal_3';
         
         const charge = PENAL_CODE.find(c => c.id === chargeId);
         drugSummary.push(`- ${oxy} Oxy Count: ${charge?.title || 'Applied Oxy Possession'}`);
       }

       lines.push(drugSummary.join('\n'));
    }

    if (scenarioState.weaponPossessionClass1 || scenarioState.weaponPossessionClass2 || scenarioState.weaponPossessionClass3) {
       lines.push("Suspect was found in possession of unlicensed or illegal class-category firearms.");
    }

    return lines.join('\n\n');
  }, [scenarioState]);

  const copyNarrativeToClipboard = () => {
    navigator.clipboard.writeText(narrative);
    setCopiedNarrative(true);
    setTimeout(() => setCopiedNarrative(false), 2000);
  };

  const toggleProof = (id: string) => {
    if (expandedProof === id) {
      setExpandedProof(null);
    } else {
      setExpandedProof(id);
    }
  };

  if (charges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/50">
        <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">No charges selected</p>
        <p className="text-sm">Select incident triggers or add charges manually.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
      {/* Header totals */}
      <div className="bg-slate-800 p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            MDT Calculator
          </h2>
          <div className="flex bg-slate-900 rounded p-1 border border-slate-700">
            <button 
              onClick={() => setActiveTab('charges')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded transition-all ${activeTab === 'charges' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <ClipboardList size={14} /> Charges
            </button>
            <button 
              onClick={() => setActiveTab('narrative')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded transition-all ${activeTab === 'narrative' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FileText size={14} /> Narrative
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Time</p>
              <p className="text-2xl font-bold text-blue-400">{totalMonths} <span className="text-sm text-slate-500">Months</span></p>
            </div>
            <Clock className="text-blue-500 opacity-20 w-8 h-8" />
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Fine</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(totalFine)}</p>
            </div>
            <DollarSign className="text-green-500 opacity-20 w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activeTab === 'charges' ? (
          charges.map(({ charge, count }) => {
            const chargeType = getChargeType(charge.id);
            let displayTitle = charge.title;
            if (chargeType) {
               const regex = new RegExp(`\\s*\\(?${chargeType}\\)?`, 'i');
               displayTitle = displayTitle.replace(regex, '').trim();
            }
            
            return (
            <div key={charge.id} className="group relative bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-md p-4 transition-all duration-200 animate-in fade-in slide-in-from-right-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      charge.category === ChargeCategory.FELONY 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {charge.category}
                    </span>
                    {charge.code && <span className="font-mono text-blue-400 font-bold">{charge.code}</span>}
                    {count > 1 && (
                       <span className="flex items-center gap-1 bg-blue-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-blue-400">
                          <Layers size={10} /> x{count}
                       </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold flex flex-wrap items-center gap-2">
                    {displayTitle}
                    {chargeType && (
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border tracking-wider ${
                          chargeType === 'Principal' ? 'bg-slate-700 text-slate-400 border-slate-600' :
                          chargeType === 'Accessory' ? 'bg-amber-900/30 text-amber-200 border-amber-500/50' :
                          chargeType === 'Attempted' ? 'bg-purple-900/30 text-purple-200 border-purple-500/50' :
                          'bg-slate-700 text-slate-300 border-slate-600'
                      }`}>
                          {chargeType}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{charge.description}</p>
                  
                  {charge.burdenOfProof && (
                    <div className="mt-2">
                      <button 
                        onClick={() => toggleProof(charge.id)}
                        className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
                      >
                        <HelpCircle size={12} />
                        {expandedProof === charge.id ? 'Hide Burden of Proof' : 'View Burden of Proof'}
                      </button>
                      
                      {expandedProof === charge.id && (
                         <div className="mt-2 text-xs text-slate-300 bg-slate-900/50 p-3 rounded border border-slate-700/50 whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-top-1">
                            <span className="block font-bold text-slate-500 text-[10px] uppercase tracking-wider mb-1">Burden of Proof</span>
                            {charge.burdenOfProof}
                         </div>
                      )}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onRemoveCharge(charge.id)}
                  className="text-slate-600 hover:text-red-400 p-2 transition-colors self-start"
                  title="Remove Charge"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="mt-3 flex gap-3 text-xs font-medium text-slate-300 border-t border-slate-700/50 pt-2">
                <span className="flex items-center gap-1"><Clock size={12} className="text-blue-400"/> {charge.months} Months {count > 1 ? `(x${count} = ${charge.months * count})` : ''}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} className="text-green-400"/> ${charge.fine} {count > 1 ? `(x${count} = ${charge.fine * count})` : ''}</span>
              </div>
            </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col bg-slate-800/30 rounded-lg border border-slate-700 p-6 animate-in fade-in slide-in-from-left-2">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={16} /> Automated Incident Narrative
                </h3>
                <button 
                  onClick={copyNarrativeToClipboard}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${copiedNarrative ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {copiedNarrative ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy Narrative</>}
                </button>
             </div>
             <div className="flex-1 bg-slate-950 border border-slate-700 rounded p-4 font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap select-text">
                {narrative}
             </div>
             <p className="mt-4 text-[10px] text-slate-500 italic">
               Note: This narrative is generated based on selected incident triggers. Review and modify as necessary before submitting your report.
             </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <button 
          onClick={copyToClipboard}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Copy Report to MDT
        </button>
      </div>
    </div>
  );
};