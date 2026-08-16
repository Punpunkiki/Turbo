import AppHeader from '../components/AppHeader'
import { Pill } from '../components/ui'
import { IconChevronRight, IconPhone, IconPin } from '../components/Icons'
import { BRANCHES } from '../lib/catalog'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   สาขาใกล้ฉัน (Community Layer)
   ซื้อออนไลน์ได้ แต่ยังเดินเข้าไปคุยกับคนจริงที่สาขาเงินเทอร์โบได้
   ═══════════════════════════════════════════════════════════════ */

export default function Branches() {
  const { showToast } = useStore()

  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader title="สาขาใกล้ฉัน" subtitle="กรุงเทพฯ · ลาดพร้าว" showBack={false} />

      <main className="no-scrollbar flex-1 overflow-y-auto pb-6">
        {/* ── แผนที่จำลอง ─────────────────────────────────── */}
        <div className="relative mx-4 mb-4 h-[150px] overflow-hidden rounded-card bg-navy-50">
          <MapSketch />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-700/85 to-transparent px-4 pb-3 pt-8">
            <p className="text-[13px] font-semibold text-white">
              มีสาขาเงินเทอร์โบ {BRANCHES.length} แห่งในรัศมี 7 กม.
            </p>
          </div>
        </div>

        {/* ── รายการสาขา ──────────────────────────────────── */}
        <div className="space-y-3 px-4">
          {BRANCHES.map((b) => (
            <article key={b.id} className="tt-card p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-magenta-50 text-magenta-500">
                  <IconPin className="h-[22px] w-[22px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-[15.5px] font-semibold leading-snug text-navy-600">
                      {b.name}
                    </h2>
                    <span className="num shrink-0 text-[13px] font-semibold text-magenta-500">
                      {b.distanceKm} กม.
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-navy-300">{b.hours}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Pill tone={b.open ? 'live' : 'navy'}>{b.open ? 'เปิดอยู่' : 'ปิดแล้ววันนี้'}</Pill>
                    {b.services.slice(0, 2).map((s) => (
                      <Pill key={s} tone="navy">
                        {s}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => showToast(`กำลังโทรหา ${b.name}`)}
                  className="flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl
                             border-2 border-mist-200 bg-white text-[14px] font-semibold text-navy-500
                             transition-colors duration-200 active:bg-mist-100"
                >
                  <IconPhone className="h-[17px] w-[17px]" />
                  โทร
                </button>
                <button
                  type="button"
                  onClick={() => showToast('เปิดเส้นทางไปสาขาในแอปแผนที่')}
                  className="flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl
                             bg-navy-500 text-[14px] font-semibold text-white
                             transition-colors duration-200 active:bg-navy-600"
                >
                  นำทาง
                  <IconChevronRight className="h-[17px] w-[17px]" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 px-6 text-center text-[12.5px] leading-relaxed text-navy-300">
          สาขาและระยะทางในต้นแบบนี้เป็นข้อมูลจำลอง
        </p>
      </main>
    </div>
  )
}

/* ── ภาพแผนที่แบบเวกเตอร์ (วาดเอง ไม่ใช้ภาพภายนอก) ────────── */
function MapSketch() {
  return (
    <svg viewBox="0 0 340 150" className="h-full w-full" aria-hidden="true">
      <rect width="340" height="150" fill="#EEF2FB" />
      {/* บล็อกอาคาร */}
      {[
        [12, 14, 60, 34],
        [86, 10, 48, 26],
        [150, 18, 70, 30],
        [240, 8, 54, 36],
        [20, 66, 44, 30],
        [80, 60, 66, 40],
        [166, 62, 40, 26],
        [222, 58, 74, 34],
        [30, 112, 70, 26],
        [120, 110, 56, 28],
        [196, 106, 48, 30],
        [262, 104, 60, 28],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#DCE4F6" />
      ))}
      {/* ถนน */}
      <path d="M0 54h340M0 100h340M74 0v150M212 0v150" stroke="#fff" strokeWidth="7" />
      {/* เส้นทางไปสาขาที่ใกล้ที่สุด */}
      <path
        d="M74 128 L74 100 L150 100 L150 54 L212 54"
        stroke="#EC3F8C"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="7 6"
      />
      {/* ตำแหน่งของฉัน */}
      <circle cx="74" cy="128" r="7" fill="#16307A" />
      <circle cx="74" cy="128" r="12" fill="#16307A" opacity=".18" />
      {/* หมุดสาขา */}
      <g transform="translate(203 34)">
        <path
          d="M9 26s9-8.4 9-15A9 9 0 1 0 0 11c0 6.6 9 15 9 15z"
          fill="#DE1A73"
        />
        <circle cx="9" cy="10.6" r="3.4" fill="#fff" />
      </g>
    </svg>
  )
}
