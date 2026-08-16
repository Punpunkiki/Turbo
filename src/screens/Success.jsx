import PolicyCard from '../components/PolicyCard'
import { Button } from '../components/ui'
import { IconArrowRight, IconDoc, IconPhone } from '../components/Icons'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   5 · ยืนยันสำเร็จ + กรมธรรม์อิเล็กทรอนิกส์
   สื่อว่า "ได้รับความคุ้มครองแล้วตั้งแต่วินาทีนี้"
   ═══════════════════════════════════════════════════════════════ */

export default function Success() {
  const { replace } = useNav()
  const { policy, coverageOn, showToast } = useStore()

  return (
    <div className="flex h-full flex-col bg-mist-100">
      {/* ── หัวเรื่องบนพื้นน้ำเงิน ─────────────────────────── */}
      <div className="relative shrink-0 overflow-hidden bg-navy-700 app-safe-top px-5 pb-9 text-center">
        <div
          aria-hidden="true"
          className="stage-lines pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 50% 0%, rgba(236,63,140,.38) 0%, transparent 62%)',
          }}
        />

        <div className="relative">
          {/* เครื่องหมายถูกที่วาดเส้นเอง */}
          <span className="relative mx-auto flex h-[84px] w-[84px] items-center justify-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-live-400" />
            <span className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full bg-live-500 shadow-lift">
              <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
                <path
                  d="M13 24.5 21 32.5 35.5 17"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="60"
                  className="animate-draw-check"
                />
              </svg>
            </span>
          </span>

          <h1 className="mt-5 font-display text-[28px] font-bold leading-tight text-white">
            คุ้มครองแล้ว
          </h1>
          <p className="mx-auto mt-2 max-w-[280px] text-[14.5px] leading-relaxed text-navy-200">
            กรมธรรม์อิเล็กทรอนิกส์ของคุณพร้อมใช้งานทันที ไม่ต้องรอเอกสารทางไปรษณีย์
          </p>
        </div>
      </div>

      {/* ── บัตรกรมธรรม์ ──────────────────────────────────── */}
      <main className="no-scrollbar -mt-5 flex-1 overflow-y-auto px-4 pb-6">
        <div className="stagger">
          <PolicyCard policy={policy} active={coverageOn} />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <QuickAction
              icon={IconDoc}
              label="บันทึกไว้ในเครื่อง"
              onClick={() => showToast('บันทึกกรมธรรม์ลงเครื่องแล้ว')}
            />
            <QuickAction
              icon={IconPhone}
              label="ส่งเข้า SMS"
              onClick={() => showToast(`ส่งลิงก์กรมธรรม์ไปที่ ${policy?.phone} แล้ว`)}
            />
          </div>

          <div className="mt-4 rounded-card border-2 border-magenta-100 bg-magenta-50 p-4">
            <h2 className="font-display text-[15.5px] font-semibold text-navy-600">
              ต่อไปทำอะไรได้บ้าง
            </h2>
            <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-navy-400">
              <li>· กดเปิด-ปิดความคุ้มครองเองได้ทุกวันจากหน้าแรก</li>
              <li>· แจ้งเคลมผ่านแอป หรือเดินเข้าสาขาเงินเทอร์โบใกล้บ้าน</li>
              <li>· เปลี่ยนแผนหรือยกเลิกได้ตลอดเวลา ไม่มีค่าปรับ</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="shrink-0 border-t border-mist-200 bg-white px-4 pt-3 app-footer">
        <Button onClick={() => replace('home')} iconRight={IconArrowRight}>
          ไปหน้าแรกของฉัน
        </Button>
      </footer>
    </div>
  )
}

function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[54px] cursor-pointer items-center justify-center gap-2 rounded-2xl
                 border-2 border-mist-200 bg-white px-3 text-[14px] font-semibold text-navy-500
                 transition-colors duration-200 active:bg-mist-100"
    >
      <Icon className="h-[18px] w-[18px]" />
      {label}
    </button>
  )
}
