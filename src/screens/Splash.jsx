import { LogoOnDark } from '../components/Logo'
import { Button } from '../components/ui'
import { IconArrowRight, IconBolt, IconShieldCheck, IconWallet } from '../components/Icons'
import { useNav } from '../lib/nav'

/* ═══════════════════════════════════════════════════════════════
   1 · SPLASH / ONBOARDING
   โลโก้ใหญ่กลางจอ + tagline + ปุ่มเริ่มต้นใช้งาน
   เส้นความเร็วจากโลโก้วิ่งเข้าหาศูนย์กลางตอนเปิดแอป
   ═══════════════════════════════════════════════════════════════ */

const POINTS = [
  { icon: IconBolt, text: 'สมัครเสร็จใน 3 ขั้นตอน ไม่ต้องใช้เอกสารกระดาษ' },
  { icon: IconWallet, text: 'เริ่มต้นวันละ 10 บาท เปิด-ปิดความคุ้มครองเอง' },
  { icon: IconShieldCheck, text: 'ได้กรมธรรม์อิเล็กทรอนิกส์ทันทีที่จ่าย' },
]

export default function Splash() {
  const { push } = useNav()

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-navy-700">
      {/* เส้นความเร็วเป็นฉากหลัง */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 78% 8%, rgba(236,63,140,.42) 0%, transparent 58%),' +
            'radial-gradient(90% 60% at 10% 100%, rgba(62,92,172,.55) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="stage-lines pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="relative flex h-full flex-col app-safe-top px-6 pb-8">
        {/* ส่วนกลางเลื่อนได้ เพื่อให้ปุ่มไม่หลุดจอบนมือถือจอเตี้ย */}
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          {/* ── โลโก้ + tagline ───────────────────────────────── */}
          <div className="stagger flex flex-col items-center pt-[3vh] text-center">
            <LogoOnDark className="w-[228px]" />

            <h1 className="mt-7 font-display text-[32px] font-bold leading-[1.15] text-white">
              ประกันที่จ่ายตาม
              <br />
              <span className="text-magenta-300">วันที่คุณวิ่งจริง</span>
            </h1>

            <p className="mt-3 max-w-[300px] text-[15.5px] leading-relaxed text-navy-200">
              เปิดความคุ้มครองตอนออกรอบ ปิดตอนพัก วันไหนไม่ได้วิ่ง วันนั้นไม่ต้องจ่าย
            </p>
          </div>

          {/* ── สามเหตุผล ─────────────────────────────────────── */}
          <ul className="stagger mt-8 space-y-3 pb-6">
            {POINTS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-magenta-500/90 text-white">
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                <span className="text-[14px] leading-snug text-white/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── ปุ่มเริ่มต้น (ตรึงล่างเสมอ) ───────────────────────── */}
        <div
          className="animate-fade-up shrink-0 space-y-3 pt-3"
          style={{ animationDelay: '.42s' }}
        >
          <Button onClick={() => push('products')} iconRight={IconArrowRight}>
            เริ่มต้นใช้งาน
          </Button>
          <p className="text-center text-[12px] leading-relaxed text-white/40">
            TURBO TRUST เป็นนายหน้าประกันภัยในเครือเงินเทอร์โบ · ต้นแบบเพื่อการนำเสนอ
          </p>
        </div>
      </div>
    </div>
  )
}
