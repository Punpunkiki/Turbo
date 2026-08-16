import { useEffect, useState } from 'react'
import { IconBolt, IconShieldCheck } from './Icons'

/* ═══════════════════════════════════════════════════════════════
   COVERAGE SWITCH — องค์ประกอบเด่นของแอป (signature element)

   สวิตช์เปิด-ปิดความคุ้มครองแบบ "บิดกุญแจสตาร์ท" คือหัวใจของ
   Pay-As-You-Ride: ไรเดอร์กดเปิดตอนออกวิ่ง กดปิดตอนพัก
   จ่ายเฉพาะวันที่เปิดเท่านั้น
   ═══════════════════════════════════════════════════════════════ */

/** นับเวลาที่คุ้มครองมาแล้วในวันนี้ */
function useElapsed(since, active) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [active])

  if (!active || !since) return { h: 0, m: 0, s: 0 }
  const total = Math.max(0, Math.floor((now - since) / 1000))
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  }
}

const pad = (n) => String(n).padStart(2, '0')

export default function CoverageSwitch({ on, since, onToggle, unitPrice, unitSuffix }) {
  const { h, m, s } = useElapsed(since, on)

  return (
    <section
      className={`relative overflow-hidden rounded-card p-5 text-white shadow-lift
                  transition-colors duration-500
                  ${on ? 'bg-gradient-to-br from-navy-500 to-navy-700' : 'bg-navy-700'}`}
    >
      {on && <span className="streak-layer" aria-hidden="true" />}

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`relative flex h-2.5 w-2.5 items-center justify-center rounded-full
                          ${on ? 'bg-live-400' : 'bg-navy-200'}`}
            >
              {on && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-live-400" />
              )}
            </span>
            <span className="font-display text-[13px] font-semibold uppercase tracking-[.12em] text-white/70">
              {on ? 'กำลังคุ้มครอง' : 'ยังไม่เปิดคุ้มครอง'}
            </span>
          </div>

          <p className="num mt-2 text-[38px] font-bold leading-none">
            {on ? (
              <>
                {pad(h)}
                <span className="text-white/45">:</span>
                {pad(m)}
                <span className="text-[22px] text-white/45">:{pad(s)}</span>
              </>
            ) : (
              <span className="text-white/40">00:00:00</span>
            )}
          </p>
          <p className="mt-1.5 text-[13px] text-navy-200">
            {on ? 'คุ้มครองต่อเนื่องวันนี้' : 'กดเปิดเมื่อคุณเริ่มออกวิ่ง'}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="num text-[15px] font-semibold">
            {unitPrice} <span className="text-[12px] font-medium text-navy-200">{unitSuffix}</span>
          </p>
          <p className="mt-1 text-[12px] text-navy-200">{on ? 'ตัดวันนี้แล้ว' : 'ยังไม่ถูกตัด'}</p>
        </div>
      </div>

      {/* ── ตัวสวิตช์ ─────────────────────────────────────────── */}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={on ? 'ปิดความคุ้มครอง' : 'เปิดความคุ้มครอง'}
        onClick={onToggle}
        className={`relative mt-5 flex h-[64px] w-full cursor-pointer items-center
                    rounded-[18px] p-[6px] transition-colors duration-300
                    ${on ? 'bg-live-500/25' : 'bg-white/10'}`}
      >
        {/* ป้ายบนราง */}
        <span
          className={`pointer-events-none absolute inset-y-0 flex items-center
                      font-display text-[15px] font-semibold transition-opacity duration-200
                      ${on ? 'left-6 opacity-100' : 'left-6 opacity-0'}`}
        >
          <span className="text-live-400">คุ้มครองอยู่</span>
        </span>
        <span
          className={`pointer-events-none absolute inset-y-0 right-6 flex items-center
                      font-display text-[15px] font-semibold text-white/60
                      transition-opacity duration-200 ${on ? 'opacity-0' : 'opacity-100'}`}
        >
          แตะเพื่อเปิด
        </span>

        {/* ลูกบิด — เลื่อนด้วย transform ล้วน (ไม่ขยับ layout)
            translateX(calc(100% - 52px)) = ความกว้างราง − ความกว้างลูกบิด */}
        <span className="pointer-events-none absolute inset-[6px] z-10">
          <span
            className="block h-full w-full transition-transform duration-300 ease-[cubic-bezier(.22,.9,.28,1)]"
            style={{ transform: on ? 'translateX(calc(100% - 52px))' : 'translateX(0)' }}
          >
            <span
              className={`flex h-[52px] w-[52px] items-center justify-center rounded-[14px]
                          shadow-lg transition-colors duration-300
                          ${on ? 'bg-live-500 text-white' : 'bg-white text-navy-500'}`}
            >
              {on ? <IconShieldCheck className="h-6 w-6" /> : <IconBolt className="h-6 w-6" />}
            </span>
          </span>
        </span>
      </button>
    </section>
  )
}
