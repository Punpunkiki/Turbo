import Logo from './Logo'
import { IconArrowLeft } from './Icons'
import { useNav } from '../lib/nav'

/* ═══════════════════════════════════════════════════════════════
   APP HEADER — โลโก้เล็กมุมบนซ้ายทุกหน้า ตามข้อกำหนด CI
   variant: 'light' (พื้นขาว) | 'dark' (พื้นน้ำเงิน)
   ═══════════════════════════════════════════════════════════════ */

export default function AppHeader({ title, subtitle, variant = 'light', right, showBack = true }) {
  const { back, canGoBack } = useNav()
  const dark = variant === 'dark'

  return (
    <header
      className={`sticky top-0 z-30 shrink-0 app-header px-4 pb-3
                  ${dark ? 'bg-transparent' : 'border-b border-mist-200/80 bg-mist-100/92 backdrop-blur-md'}`}
    >
      <div className="flex items-center gap-3">
        {showBack && canGoBack ? (
          <button
            type="button"
            onClick={back}
            aria-label="ย้อนกลับ"
            className={`-ml-1.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center
                        rounded-full transition-colors duration-200
                        ${dark ? 'text-white active:bg-white/10' : 'text-navy-500 active:bg-mist-200'}`}
          >
            <IconArrowLeft className="h-[22px] w-[22px]" />
          </button>
        ) : (
          <Logo className="-ml-1 w-[74px] shrink-0" />
        )}

        <div className="min-w-0 flex-1">
          {title && (
            <h1
              className={`truncate font-display text-[17px] font-semibold leading-tight
                          ${dark ? 'text-white' : 'text-navy-600'}`}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              className={`truncate text-[12.5px] leading-tight
                          ${dark ? 'text-navy-200' : 'text-navy-300'}`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* โลโก้ยังอยู่มุมขวาเมื่อมีปุ่มย้อนกลับ เพื่อให้แบรนด์ปรากฏทุกหน้า */}
        {right ?? (showBack && canGoBack ? <Logo className="w-[64px] shrink-0 opacity-90" /> : null)}
      </div>
    </header>
  )
}
