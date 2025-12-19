
import React, { useState } from 'react';
import { Charge, ChargeCategory } from '../types';
import { Trash2, AlertCircle, DollarSign, Clock, HelpCircle, Layers } from 'lucide-react';

interface ChargeWithCount {
  charge: Charge;
  count: number;
}

interface ChargeListProps {
  charges: ChargeWithCount[];
  onRemoveCharge: (id: string) => void;
}

export const ChargeList: React.FC<ChargeListProps> = ({ charges, onRemoveCharge }) => {
  const [expandedProof, setExpandedProof] = useState<string | null>(null);
  
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
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
          Sentencing Guidelines
        </h2>
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

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {charges.map(({ charge, count }) => {
          const chargeType = getChargeType(charge.id);
          
          // Clean the title: Remove the charge type text if it appears (e.g. " (Accessory)")
          let displayTitle = charge.title;
          if (chargeType) {
             // Regex matches optional space, optional parenthesis, type, optional parenthesis, case insensitive
             const regex = new RegExp(`\\s*\\(?${chargeType}\\)?`, 'i');
             displayTitle = displayTitle.replace(regex, '').trim();
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
                  {charge.code && <span className="font-mono text-blue-400 font-bold">{charge.code}</span>}
                  
                  {/* Count Badge */}
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
        })}
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
