import AppHeader from '../components/AppHeader'
import CoverageSwitch from '../components/CoverageSwitch'
import { Eyebrow, Pill } from '../components/ui'
import {
  IconChevronRight,
  IconDoc,
  IconLifeRing,
  IconPin,
  IconPlus,
  IconRider,
} from '../components/Icons'
import { baht } from '../lib/catalog'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   6 · หน้าแรกหลังสมัคร (Dashboard)
   หัวใจของหน้านี้คือสวิตช์เปิด-ปิดความคุ้มครองรายวัน (Pay-As-You-Ride)
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const { push } = useNav()
  const {
    policy,
    coverageOn,
    coverageSince,
    toggleCoverage,
    tripsToday,
    addTrip,
    claims,
    quote,
  } = useStore()

  const perTripMode = policy?.unitSuffix?.includes('เที่ยว')
  const costToday = perTripMode
    ? tripsToday * (policy?.unitPrice ?? 0)
    : coverageOn
      ? (policy?.unitPrice ?? 0)
      : 0

  const firstName = (policy?.holder || 'สมชาย ใจดี').split(' ')[0]

  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader
        title={`สวัสดี ${firstName}`}
        subtitle={coverageOn ? 'ความคุ้มครองกำลังทำงาน' : 'พร้อมออกวิ่งเมื่อไหร่ กดเปิดได้เลย'}
        showBack={false}
      />

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="stagger space-y-4">
          {/* ── สวิตช์ความคุ้มครอง (signature) ───────────────── */}
          <CoverageSwitch
            on={coverageOn}
            since={coverageSince}
            onToggle={toggleCoverage}
            unitPrice={policy?.unitPrice ?? quote.unitPrice}
            unitSuffix={policy?.unitSuffix ?? quote.mode.unit}
          />

          {/* ── สรุปวันนี้ ─────────────────────────────────── */}
          <section className="tt-card p-4">
            <div className="flex items-center justify-between">
              <Eyebrow>สรุปของวันนี้</Eyebrow>
              {perTripMode && (
                <button
                  type="button"
                  onClick={addTrip}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-full
                             bg-mist-100 px-3 text-[12.5px] font-semibold text-navy-500
                             transition-colors duration-200 active:bg-mist-200"
                >
                  <IconPlus className="h-4 w-4" />
                  จำลองรับงาน
                </button>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <Metric
                label="ค่าเบี้ยวันนี้"
                value={baht(costToday)}
                unit="บาท"
                highlight
              />
              <Metric
                label={perTripMode ? 'เที่ยวที่คุ้มครอง' : 'สถานะวันนี้'}
                value={perTripMode ? String(tripsToday) : coverageOn ? 'เปิด' : 'ปิด'}
                unit={perTripMode ? 'เที่ยว' : ''}
              />
              <Metric label="เคลมที่ยื่นไว้" value={String(claims.length)} unit="รายการ" />
            </div>

            <p className="mt-3 rounded-xl bg-mist-100 px-3 py-2.5 text-[12.5px] leading-relaxed text-navy-400">
              {coverageOn
                ? 'ระบบตัดเบี้ยเฉพาะวันที่คุณเปิดความคุ้มครอง ปิดเมื่อไหร่ก็หยุดตัดทันที'
                : 'วันนี้ยังไม่ถูกตัดเบี้ย เพราะคุณยังไม่ได้เปิดความคุ้มครอง'}
            </p>
          </section>

          {/* ── ทางลัด ─────────────────────────────────────── */}
          <section>
            <div className="grid grid-cols-2 gap-3">
              <ActionCard
                icon={IconLifeRing}
                title="แจ้งเคลม"
                desc="ถ่ายรูป ส่งเรื่อง รู้ผลใน 24 ชม."
                onClick={() => push('claim')}
                tone="magenta"
              />
              <ActionCard
                icon={IconPin}
                title="สาขาใกล้ฉัน"
                desc="เดินเข้าไปคุยกับพนักงานได้"
                onClick={() => push('branches')}
              />
            </div>
          </section>

          {/* ── กรมธรรม์ที่ถืออยู่ ─────────────────────────── */}
          <section>
            <h2 className="mb-2.5 font-display text-[17px] font-semibold text-navy-600">
              กรมธรรม์ที่ถืออยู่
            </h2>

            <button
              type="button"
              onClick={() => push('policy')}
              className="flex w-full cursor-pointer items-center gap-3.5 rounded-card bg-white p-4
                         text-left shadow-card transition-shadow duration-200 hover:shadow-lift
                         active:bg-mist-50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-magenta-400 to-magenta-600 text-white">
                <IconRider className="h-7 w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate font-display text-[16px] font-semibold text-navy-600">
                    {policy?.productName}
                  </span>
                  <Pill tone={coverageOn ? 'live' : 'navy'}>
                    {coverageOn ? 'คุ้มครองอยู่' : 'พักอยู่'}
                  </Pill>
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-navy-300">
                  แผน {policy?.planName} · {policy?.number}
                </span>
              </span>
              <IconChevronRight className="h-5 w-5 shrink-0 text-navy-300" />
            </button>

            {/* เพิ่มความคุ้มครองอื่น — ทางไปหน้าเลือกผลิตภัณฑ์ */}
            <button
              type="button"
              onClick={() => push('products')}
              className="mt-3 flex w-full cursor-pointer items-center gap-3 rounded-card border-2
                         border-dashed border-mist-300 bg-white/60 p-4 text-left
                         transition-colors duration-200 active:bg-white"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist-100 text-navy-400">
                <IconPlus className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[15px] font-semibold text-navy-500">
                  เพิ่มความคุ้มครองอื่น
                </span>
                <span className="block text-[12.5px] text-navy-300">
                  ประกันร้านค้า · ประกันรถยนต์ / พ.ร.บ.
                </span>
              </span>
              <IconChevronRight className="h-5 w-5 shrink-0 text-navy-300" />
            </button>
          </section>

          {/* ── เคลมล่าสุด ─────────────────────────────────── */}
          {claims.length > 0 && (
            <section>
              <h2 className="mb-2.5 font-display text-[17px] font-semibold text-navy-600">
                เคลมล่าสุด
              </h2>
              <div className="space-y-2.5">
                {claims.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-card bg-white p-3.5 shadow-card">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-magenta-50 text-magenta-500">
                      <IconDoc className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-semibold text-navy-600">
                        {c.typeLabel}
                      </p>
                      <p className="num text-[12.5px] text-navy-300">
                        เลขที่ {c.id} · รับเรื่องแล้ว
                      </p>
                    </div>
                    <Pill tone="live">กำลังตรวจสอบ</Pill>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

function Metric({ label, value, unit, highlight }) {
  return (
    <div className={`rounded-2xl px-3 py-3 ${highlight ? 'bg-magenta-50' : 'bg-mist-100'}`}>
      <p className="text-[11.5px] leading-tight text-navy-300">{label}</p>
      <p className="mt-1.5 flex items-baseline gap-1">
        <span
          className={`num text-[21px] font-bold leading-none ${
            highlight ? 'text-magenta-600' : 'text-navy-600'
          }`}
        >
          {value}
        </span>
        {unit && <span className="text-[11.5px] text-navy-300">{unit}</span>}
      </p>
    </div>
  )
}

function ActionCard({ icon: Icon, title, desc, onClick, tone }) {
  const magenta = tone === 'magenta'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer flex-col items-start gap-2 rounded-card p-4 text-left
                  shadow-card transition-shadow duration-200 hover:shadow-lift
                  ${magenta ? 'bg-gradient-to-br from-magenta-500 to-magenta-600 text-white' : 'bg-white'}`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl
                    ${magenta ? 'bg-white/20 text-white' : 'bg-navy-50 text-navy-500'}`}
      >
        <Icon className="h-[21px] w-[21px]" />
      </span>
      <span>
        <span
          className={`block font-display text-[15.5px] font-semibold ${
            magenta ? 'text-white' : 'text-navy-600'
          }`}
        >
          {title}
        </span>
        <span
          className={`mt-0.5 block text-[12.5px] leading-snug ${
            magenta ? 'text-white/80' : 'text-navy-300'
          }`}
        >
          {desc}
        </span>
      </span>
    </button>
  )
}
