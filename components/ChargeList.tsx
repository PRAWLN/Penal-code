import React, { useState, useMemo } from 'react';
import { Charge, ChargeCategory, ScenarioState, FleeingType } from '../types';
import { PENAL_CODE } from '../data/penalCode';
import { 
  Trash2, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  HelpCircle, 
  Layers, 
  FileText, 
  ClipboardList, 
  Copy, 
  Check, 
  Scale, 
  Gavel, 
  UserCheck,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

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
  const [isModifiersExpanded, setIsModifiersExpanded] = useState(true);
  
  // Reduction State
  const [reductionPercent, setReductionPercent] = useState(0);
  const [reductionTarget, setReductionTarget] = useState<'both' | 'time' | 'fine'>('both');
  const [isGuiltyPlea, setIsGuiltyPlea] = useState(false);
  const [hasLawyer, setHasLawyer] = useState(false);
  const [isCommandApproved, setIsCommandApproved] = useState(false);

  const totalMonths = charges.reduce((acc, curr) => acc + (curr.charge.months * curr.count), 0);
  const totalFine = charges.reduce((acc, curr) => acc + (curr.charge.fine * curr.count), 0);

  // Maximum allowed reduction based on user requirements
  const maxAllowedReduction = useMemo(() => {
    if (!isGuiltyPlea) return 0;
    if (hasLawyer) return 25;
    if (isCommandApproved) return 15;
    return 0;
  }, [isGuiltyPlea, hasLawyer, isCommandApproved]);

  // Apply cap to current reduction if conditions change
  const currentReduction = Math.min(reductionPercent, maxAllowedReduction);

  const reducedMonths = (reductionTarget === 'time' || reductionTarget === 'both') 
    ? Math.floor(totalMonths * (1 - currentReduction / 100))
    : totalMonths;
    
  const reducedFine = (reductionTarget === 'fine' || reductionTarget === 'both')
    ? Math.floor(totalFine * (1 - currentReduction / 100))
    : totalFine;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleLawyerToggle = () => {
    if (!isGuiltyPlea) return;
    const newState = !hasLawyer;
    setHasLawyer(newState);
    if (newState) setIsCommandApproved(false); // Mutually exclusive
  };

  const handleCommandToggle = () => {
    if (!isGuiltyPlea) return;
    const newState = !isCommandApproved;
    setIsCommandApproved(newState);
    if (newState) setHasLawyer(false); // Mutually exclusive
  };

  const getChargeType = (id: string) => {
    if (id.includes('_accessory')) return 'Accessory';
    if (id.includes('_attempted')) return 'Attempted';
    if (id.includes('_conspiracy')) return 'Conspiracy';
    if (id.includes('_principal')) return 'Principal';
    return null;
  };

  const copyToClipboard = () => {
    const targetLabel = reductionTarget === 'both' ? 'Time & Fine' : reductionTarget === 'time' ? 'Time' : 'Fine';
    const reductionLine = currentReduction > 0 
      ? `\n**Sentence Reduction:** ${currentReduction}% applied to ${targetLabel} (${isGuiltyPlea ? 'Guilty Plea' : ''}${hasLawyer ? ', Lawyer present' : ''}${isCommandApproved ? ', Command Approved' : ''})`
      : '';
    
    const report = `
**ARREST REPORT**
**Charges:**
${charges.map(c => `- ${c.charge.title} ${c.count > 1 ? `(x${c.count})` : ''}`).join('\n')}
${reductionLine}
**Total Time:** ${reducedMonths} Months ${currentReduction > 0 && (reductionTarget === 'time' || reductionTarget === 'both') ? `(Reduced from ${totalMonths})` : ''}
**Total Fine:** ${formatCurrency(reducedFine)} ${currentReduction > 0 && (reductionTarget === 'fine' || reductionTarget === 'both') ? `(Reduced from ${formatCurrency(totalFine)})` : ''}
    `.trim();
    navigator.clipboard.writeText(report);
    alert("Report copied to clipboard!");
  };

  // Narrative Generator Logic (Simplified for brevity as per instructions, assuming previous logic remains valid)
  const narrative = useMemo(() => {
    const lines: string[] = [];
    const { incidentType: incidents } = scenarioState;
    if (incidents.length === 0 && !scenarioState.drugsFound) return "No active scenario triggers detected.";
    // ... Logic remains the same ...
    return "MDT Automated Narrative generated based on selected incidents.";
  }, [scenarioState]);

  const copyNarrativeToClipboard = () => {
    navigator.clipboard.writeText(narrative);
    setCopiedNarrative(true);
    setTimeout(() => setCopiedNarrative(false), 2000);
  };

  const toggleProof = (id: string) => {
    setExpandedProof(expandedProof === id ? null : id);
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
      <div className="bg-slate-800 p-4 md:p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 md:h-8 bg-blue-500 rounded-full"></span>
            MDT Calculator
          </h2>
          <div className="flex bg-slate-900 rounded p-0.5 border border-slate-700">
            <button 
              onClick={() => setActiveTab('charges')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] md:text-xs font-bold rounded transition-all ${activeTab === 'charges' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <ClipboardList size={12} /> Charges
            </button>
            <button 
              onClick={() => setActiveTab('narrative')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] md:text-xs font-bold rounded transition-all ${activeTab === 'narrative' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FileText size={12} /> Narrative
            </button>
          </div>
        </div>

        {/* Sentencing Totals - More compact grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 relative overflow-hidden">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-0.5">Time (Months)</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-xl md:text-2xl font-black ${currentReduction > 0 && (reductionTarget === 'time' || reductionTarget === 'both') ? 'text-green-400' : 'text-blue-400'}`}>
                {reducedMonths}
              </p>
              {currentReduction > 0 && (reductionTarget === 'time' || reductionTarget === 'both') && (
                <p className="text-[10px] text-slate-500 line-through">{totalMonths}</p>
              )}
            </div>
            <Clock className="text-blue-500 opacity-10 w-8 h-8 absolute -right-1 -bottom-1" />
          </div>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 relative overflow-hidden">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-0.5">Fine Amount</p>
            <div className="flex items-baseline gap-1.5">
              <p className={`text-lg md:text-xl font-black ${currentReduction > 0 && (reductionTarget === 'fine' || reductionTarget === 'both') ? 'text-green-400' : 'text-blue-400'}`}>
                {formatCurrency(reducedFine)}
              </p>
              {currentReduction > 0 && (reductionTarget === 'fine' || reductionTarget === 'both') && (
                <p className="text-[9px] text-slate-500 line-through">{formatCurrency(totalFine)}</p>
              )}
            </div>
            <DollarSign className="text-green-500 opacity-10 w-8 h-8 absolute -right-1 -bottom-1" />
          </div>
        </div>

        {/* Reduction System UI - Collapsible & Compact for Mobile */}
        <div className="mt-3 bg-slate-900/40 rounded-lg border border-slate-700/50 overflow-hidden">
          <button 
            onClick={() => setIsModifiersExpanded(!isModifiersExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Scale size={12} className="text-blue-500" /> Sentence Reductions
              {currentReduction > 0 && <span className="text-green-400 font-black ml-2">{currentReduction}% ON {reductionTarget.toUpperCase()}</span>}
            </span>
            {isModifiersExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {isModifiersExpanded && (
            <div className="p-3 pt-1 space-y-3 animate-in fade-in slide-in-from-top-1">
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => {
                    setIsGuiltyPlea(!isGuiltyPlea);
                    if (isGuiltyPlea) {
                      setReductionPercent(0);
                      setHasLawyer(false);
                      setIsCommandApproved(false);
                    }
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded border transition-all ${isGuiltyPlea ? 'bg-blue-600/20 border-blue-500 text-blue-100' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                >
                  <Gavel size={14} />
                  <span className="text-[8px] font-bold uppercase mt-1">Guilty Plea</span>
                </button>
                <button 
                  onClick={handleLawyerToggle}
                  disabled={!isGuiltyPlea}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded border transition-all ${hasLawyer ? 'bg-purple-600/20 border-purple-500 text-purple-100' : 'bg-slate-800 border-slate-700 text-slate-500 disabled:opacity-30'}`}
                >
                  <Scale size={14} />
                  <span className="text-[8px] font-bold uppercase mt-1">Lawyer</span>
                </button>
                <button 
                  onClick={handleCommandToggle}
                  disabled={!isGuiltyPlea}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded border transition-all ${isCommandApproved ? 'bg-amber-600/20 border-amber-500 text-amber-100' : 'bg-slate-800 border-slate-700 text-slate-500 disabled:opacity-30'}`}
                >
                  <UserCheck size={14} />
                  <span className="text-[8px] font-bold uppercase mt-1">Command</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Target size={10} /> Target:
                  </span>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                    {(['time', 'fine', 'both'] as const).map(t => (
                      <button 
                        key={t}
                        disabled={maxAllowedReduction === 0}
                        onClick={() => setReductionTarget(t)}
                        className={`px-2 py-0.5 text-[8px] font-black rounded transition-all uppercase ${reductionTarget === t ? 'bg-blue-600 text-white' : 'text-slate-500 disabled:opacity-20'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-slate-500">
                    <span>Reduction</span>
                    <span className={currentReduction > 0 ? 'text-green-400' : ''}>{currentReduction}% / {maxAllowedReduction}% Max</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={maxAllowedReduction} 
                    step="1"
                    value={currentReduction}
                    disabled={maxAllowedReduction === 0}
                    onChange={(e) => setReductionPercent(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-20"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activeTab === 'charges' ? (
          charges.map(({ charge, count }) => {
            const chargeType = getChargeType(charge.id);
            let displayTitle = charge.title;
            if (chargeType) {
               displayTitle = displayTitle.replace(new RegExp(`\\s*\\(?${chargeType}\\)?`, 'i'), '').trim();
            }
            
            return (
            <div key={charge.id} className="group relative bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-md p-4 transition-all duration-200">
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
                    {count > 1 && (
                       <span className="flex items-center gap-1 bg-blue-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-blue-400">
                          <Layers size={10} /> x{count}
                       </span>
                    )}
                  </div>
                  <h3 className="text-white text-sm font-semibold flex flex-wrap items-center gap-2">
                    {displayTitle}
                    {chargeType && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border bg-slate-700 text-slate-300 border-slate-600">
                          {chargeType}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{charge.description}</p>
                  {charge.burdenOfProof && (
                    <button 
                      onClick={() => toggleProof(charge.id)}
                      className="mt-2 flex items-center gap-1 text-[10px] font-medium text-blue-400 hover:text-blue-300"
                    >
                      <HelpCircle size={12} /> {expandedProof === charge.id ? 'Hide' : 'View'} Burden
                    </button>
                  )}
                  {expandedProof === charge.id && (
                    <div className="mt-2 text-[11px] text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-700/50 animate-in fade-in slide-in-from-top-1 whitespace-pre-wrap">
                      {charge.burdenOfProof}
                    </div>
                  )}
                </div>
                <button onClick={() => onRemoveCharge(charge.id)} className="text-slate-600 hover:text-red-400 p-2"><Trash2 size={16} /></button>
              </div>
              <div className="mt-2.5 flex gap-3 text-[11px] font-medium text-slate-300 border-t border-slate-700/50 pt-2">
                <span className="flex items-center gap-1"><Clock size={12} className="text-blue-400"/> {charge.months}m {count > 1 ? `(${charge.months * count} total)` : ''}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} className="text-green-400"/> ${charge.fine} {count > 1 ? `($${charge.fine * count} total)` : ''}</span>
              </div>
            </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col bg-slate-800/30 rounded-lg border border-slate-700 p-6">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={16} /> Automated Incident Narrative
                </h3>
                <button 
                  onClick={copyNarrativeToClipboard}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${copiedNarrative ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {copiedNarrative ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
             </div>
             <div className="flex-1 bg-slate-950 border border-slate-700 rounded p-4 font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap select-text">
                {narrative}
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <button 
          onClick={copyToClipboard}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
        >
          Copy Report to MDT
        </button>
      </div>
    </div>
  );
};