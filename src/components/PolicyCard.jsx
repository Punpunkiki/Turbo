import MockQR from './MockQR'
import Logo from './Logo'
import { SpeedMark } from './ui'
import { IconShieldCheck } from './Icons'

/* ═══════════════════════════════════════════════════════════════
   POLICY CARD — กรมธรรม์อิเล็กทรอนิกส์ (e-Policy)
   ใช้ทั้งในหน้ายืนยันสำเร็จและหน้ากรมธรรม์ของฉัน
   ═══════════════════════════════════════════════════════════════ */

const thaiDate = (iso) =>
  new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))

export default function PolicyCard({ policy, active }) {
  if (!policy) return null

  return (
    <article className="overflow-hidden rounded-card bg-white shadow-lift">
      {/* หัวบัตร */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-500 to-navy-700 px-4 pb-4 pt-4">
        <div
          aria-hidden="true"
          className="stage-lines pointer-events-none absolute inset-0 opacity-60"
        />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-white/60">
              <SpeedMark className="text-magenta-400" />
              <span className="font-display text-[11px] font-semibold uppercase tracking-[.16em]">
                กรมธรรม์อิเล็กทรอนิกส์
              </span>
            </div>
            <h3 className="mt-2 truncate font-display text-[19px] font-bold text-white">
              {policy.productName}
            </h3>
            <p className="truncate text-[13.5px] text-navy-200">แผน {policy.planName}</p>
          </div>
          <div className="shrink-0 rounded-xl bg-white/95 p-1.5">
            <Logo className="w-[52px]" />
          </div>
        </div>

        <div className="relative mt-3.5 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
                        font-display text-[12px] font-semibold
                        ${active ? 'bg-live-500 text-white' : 'bg-white/15 text-white/70'}`}
          >
            <IconShieldCheck className="h-3.5 w-3.5" />
            {active ? 'คุ้มครองอยู่' : 'พักการคุ้มครอง'}
          </span>
          <span className="num text-[12.5px] text-navy-200">{policy.number}</span>
        </div>
      </div>

      {/* รอยปรุแบบตั๋ว */}
      <div className="relative h-0">
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-mist-100" />
        <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-mist-100" />
        <span className="absolute inset-x-4 top-0 border-t-2 border-dashed border-mist-200" />
      </div>

      {/* ตัวบัตร */}
      <div className="flex gap-4 px-4 pb-4 pt-5">
        <div className="min-w-0 flex-1 space-y-2.5">
          <Row label="ผู้เอาประกัน" value={policy.holder} />
          <Row label="เบอร์ติดต่อ" value={policy.phone} />
          <Row label="เบี้ยประกัน" value={`${policy.unitPrice} ${policy.unitSuffix}`} />
          <Row label="เริ่มคุ้มครอง" value={thaiDate(policy.issuedAt)} />
        </div>
        <div className="shrink-0 text-center">
          <MockQR value={policy.number} className="w-[92px]" />
          <p className="mt-1.5 text-[11px] leading-tight text-navy-300">
            แสดง QR นี้
            <br />
            ที่โรงพยาบาลหรือสาขา
          </p>
        </div>
      </div>
    </article>
  )
}

function Row({ label, value }) {
  return (
    <div>
      <p className="text-[11.5px] leading-none text-navy-300">{label}</p>
      <p className="num mt-1 truncate text-[14px] font-semibold text-navy-600">{value}</p>
    </div>
  )
}
