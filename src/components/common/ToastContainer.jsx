import React from 'react';
import { useSOC } from '../../context/SOCContext';
import { AlertTriangle, CheckCircle2, Info, X, ShieldAlert } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useSOC();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isCritical = toast.type === 'critical' || toast.type === 'error';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-right-8 ${
              isCritical
                ? 'bg-red-950/90 border-red-500/50 text-red-100 shadow-red-900/30'
                : isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-900/30'
                : 'bg-slate-900/90 border-cyan-500/40 text-slate-100 shadow-cyan-950/40'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isCritical ? (
                <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs uppercase tracking-wider font-mono">
                  {toast.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{toast.time}</span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
