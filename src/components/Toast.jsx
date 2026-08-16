import { IconCheck, IconShieldCheck } from './Icons'

/* ═══════════════════════════════════════════════════════════════
   TOAST — แจ้งผลการกระทำสั้น ๆ ลอยเหนือแถบเมนูล่าง
   ═══════════════════════════════════════════════════════════════ */

export default function Toast({ toast }) {
  if (!toast) return null
  const live = toast.tone === 'live'
  const Icon = live ? IconShieldCheck : IconCheck

  return (
    <div
      role="status"
      aria-live="polite"
      key={toast.id}
      className="pointer-events-none absolute inset-x-4 bottom-[86px] z-40 animate-fade-up"
    >
      <div
        className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-white shadow-lift
                    ${live ? 'bg-live-600' : 'bg-navy-700'}`}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <p className="text-[14px] font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  )
}
