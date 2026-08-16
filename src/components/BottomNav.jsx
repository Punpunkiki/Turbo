import { useNav } from '../lib/nav'
import { IconHome, IconDoc, IconLifeRing, IconPin } from './Icons'

/* ═══════════════════════════════════════════════════════════════
   BOTTOM NAV — แถบล่าง 4 แท็บ ปรากฏหลังมีกรมธรรม์แล้ว
   แท็บที่เลือกอยู่ใช้ "ขีดความเร็ว" เป็นตัวชี้ แทนเส้นใต้ธรรมดา
   ═══════════════════════════════════════════════════════════════ */

const TABS = [
  { name: 'home', label: 'หน้าแรก', icon: IconHome },
  { name: 'policy', label: 'กรมธรรม์', icon: IconDoc },
  { name: 'claim', label: 'แจ้งเคลม', icon: IconLifeRing },
  { name: 'branches', label: 'สาขา', icon: IconPin },
]

export default function BottomNav({ active }) {
  const { reset } = useNav()

  return (
    <nav
      aria-label="เมนูหลัก"
      className="relative z-30 shrink-0 border-t border-mist-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="flex items-stretch">
        {TABS.map((tab) => {
          const isActive = active === tab.name
          const Icon = tab.icon
          return (
            <li key={tab.name} className="flex-1">
              <button
                type="button"
                onClick={() => reset(tab.name)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex w-full cursor-pointer flex-col items-center gap-1
                            px-1 pb-2.5 pt-3 transition-colors duration-200
                            ${isActive ? 'text-magenta-500' : 'text-navy-300 active:text-navy-500'}`}
              >
                {/* ตัวชี้แท็บ = ขีดความเร็วจากโลโก้ */}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-0 h-[3px] w-8 -translate-x-1/2 rounded-b-full
                              bg-magenta-500 transition-opacity duration-200
                              ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transform: 'translateX(-50%) skewX(-18deg)' }}
                />
                <Icon className="h-[23px] w-[23px]" />
                <span className="text-[11.5px] font-semibold leading-none">{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
