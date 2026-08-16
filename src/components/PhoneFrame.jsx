import { LogoOnDark } from './Logo'
import { SpeedMark } from './ui'

/* ═══════════════════════════════════════════════════════════════
   PHONE FRAME
   • บนมือถือ  → เต็มจอ ไม่มีกรอบ
   • บนเดสก์ท็อป → เฟรมมือถือกลางจอบนพื้นน้ำเงินเข้ม สำหรับ demo สด
   ═══════════════════════════════════════════════════════════════ */

const DEMO_JUMPS = [
  { name: 'splash', label: 'เปิดแอป' },
  { name: 'products', label: 'เลือกผลิตภัณฑ์' },
  { name: 'quote', label: 'เทียบราคา' },
  { name: 'buy', label: 'ซื้อ 3 ขั้นตอน' },
  { name: 'home', label: 'หน้าแรกหลังซื้อ' },
  { name: 'branches', label: 'สาขาใกล้ฉัน' },
]

export default function PhoneFrame({ children, onJump, currentScreen, hasPolicy }) {
  return (
    <div className="stage-bg min-h-[100dvh] w-full">
      <div className="stage-lines min-h-[100dvh] w-full">
        <div
          className="mx-auto flex min-h-[100dvh] max-w-[1180px] items-center
                     justify-center gap-14 px-0 lg:px-10"
        >
          {/* ── แผงข้างสำหรับผู้นำเสนอ (เดสก์ท็อปเท่านั้น) ───────── */}
          <aside className="hidden w-[300px] shrink-0 py-12 lg:block">
            <LogoOnDark className="w-44" />

            <h1 className="mt-6 font-display text-[30px] font-bold leading-tight text-white">
              ประกันที่จ่ายตาม
              <br />
              วันที่คุณวิ่งจริง
            </h1>
            <p className="mt-3 max-w-[260px] text-[14.5px] leading-relaxed text-navy-200">
              ต้นแบบแอปพลิเคชันสำหรับการนำเสนอ ข้อมูลทั้งหมดเป็นข้อมูลจำลอง
              ยังไม่เชื่อมต่อระบบกรมธรรม์จริง
            </p>

            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 text-white/40">
                <SpeedMark className="text-magenta-400" />
                <span className="font-display text-[11.5px] font-semibold uppercase tracking-[.16em]">
                  ข้ามไปหน้า
                </span>
              </div>
              <nav className="flex flex-col gap-1">
                {DEMO_JUMPS.map((j) => {
                  const active = currentScreen === j.name
                  const locked = j.name === 'home' && !hasPolicy
                  return (
                    <button
                      key={j.name}
                      type="button"
                      onClick={() => onJump(j.name)}
                      className={`group flex min-h-[44px] cursor-pointer items-center justify-between
                                  rounded-xl px-3 py-2 text-left text-[14px] transition-colors duration-200
                                  ${
                                    active
                                      ? 'bg-white/10 font-semibold text-white'
                                      : 'text-navy-200 hover:bg-white/5 hover:text-white'
                                  }`}
                    >
                      <span>{j.label}</span>
                      {locked && (
                        <span className="text-[11px] text-navy-200">ยังไม่มีกรมธรรม์</span>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>

            <p className="mt-8 text-[12px] leading-relaxed text-white/30">
              TURBO TRUST เป็นแบรนด์นายหน้าประกันภัยดิจิทัลในเครือเงินเทอร์โบ
            </p>
          </aside>

          {/* ── ตัวเครื่อง ─────────────────────────────────────── */}
          <div className="relative w-full lg:w-auto lg:py-12">
            <div
              className="relative mx-auto h-[100dvh] w-full overflow-hidden bg-mist-100
                         lg:h-[844px] lg:w-[390px] lg:rounded-[46px] lg:p-[10px]
                         lg:bg-navy-800 lg:shadow-device"
            >
              <div className="relative h-full w-full overflow-hidden bg-mist-100 lg:rounded-[37px]">
                {/* รอยบากบนสุด (เดสก์ท็อปเท่านั้น) */}
                <div className="pointer-events-none absolute left-1/2 top-0 z-50 hidden h-[26px] w-[124px] -translate-x-1/2 rounded-b-[15px] bg-navy-800 lg:block" />
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
