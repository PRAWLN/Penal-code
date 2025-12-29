import React from 'react';
import { ShieldAlert, Gavel, CheckCircle } from 'lucide-react';

interface DisclaimerModalProps {
  onConfirm: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-md w-full bg-slate-900 border-2 border-blue-500 rounded-xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-blue-600 p-4 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <ShieldAlert size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-black uppercase tracking-tighter text-lg leading-tight">Officer Notice</h2>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Departmental Disclaimer</p>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-none pt-1">
              <Gavel className="text-amber-500" size={24} />
            </div>
            <div className="space-y-2">
              <p className="text-slate-200 text-sm leading-relaxed font-semibold">
                Attention Officer,
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                This Penal Code Calculator is a tool designed to <span className="text-blue-400 font-bold underline underline-offset-4 decoration-blue-500/30">assist</span> in processing arrests. Automated charge suggestions are based on provided scenarios and must be verified.
              </p>
              <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                <p className="text-amber-400 text-xs font-bold flex items-center gap-2 uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  Officer Responsibility:
                </p>
                <p className="text-slate-300 text-[11px] mt-1 italic">
                  It is your primary duty to ensure that the <span className="text-white font-bold">Burden of Proof</span> is fully met for every charge added to the arrest report. Incorrectly charged citizens may lead to a law suit or IA investigation.
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={onConfirm}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            ACKNOWLEDGE & PROCEED
            <CheckCircle size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-center text-[9px] text-slate-600 uppercase font-black tracking-widest">
            SASP • LSPD • BCSO • SAPR
          </p>
        </div>
      </div>
    </div>
  );
};