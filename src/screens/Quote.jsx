import AppHeader from '../components/AppHeader'
import { BenefitRow, Button, Eyebrow, Pill, SectionTitle } from '../components/ui'
import { IconArrowRight, IconCheck, IconInfo } from '../components/Icons'
import { baht } from '../lib/catalog'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   3 · QUOTE / เทียบราคา
   เลือกแผน → เลือกวิธีจ่าย → ปรับการใช้งานจริง
   เบี้ยอัปเดตทันทีทุกครั้งที่เปลี่ยนตัวเลือก (mock calculation)
   ═══════════════════════════════════════════════════════════════ */

export default function Quote() {
  const { push } = useNav()
  const { product, plan, planId, setPlanId, modeId, setModeId, usage, setUsage, quote, setBuyStep } =
    useStore()

  /* เริ่มขั้นตอนการซื้อที่ขั้นที่ 1 เสมอเมื่อเข้ามาจากหน้านี้ */
  const startBuy = () => {
    setBuyStep(0)
    push('buy')
  }

  const showDaysSlider = modeId === 'daily' || modeId === 'trip'
  const showTripsSlider = modeId === 'trip'

  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader title={product.name} subtitle={product.badge} />

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="stagger">
          {/* ── 1. เลือกแผน ─────────────────────────────────── */}
          <div className="pt-1">
            <Eyebrow>แผนความคุ้มครอง</Eyebrow>
            <p className="mt-2 text-[14.5px] leading-relaxed text-navy-300">
              เลือกระดับความคุ้มครองที่เหมาะกับงานของคุณ
            </p>
          </div>

          <div className="mt-3 space-y-2.5">
            {product.plans.map((p) => {
              const selected = p.id === planId
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlanId(p.id)}
                  aria-pressed={selected}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-card border-2 bg-white
                              p-4 text-left transition-[border-color,box-shadow] duration-200
                              ${
                                selected
                                  ? 'border-magenta-400 shadow-lift'
                                  : 'border-mist-200 shadow-card active:bg-mist-50'
                              }`}
                >
                  {/* วงกลมสถานะ — ไม่ใช้สีอย่างเดียวบอกสถานะ มีเครื่องหมายถูกด้วย */}
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2
                                transition-colors duration-200
                                ${
                                  selected
                                    ? 'border-magenta-500 bg-magenta-500 text-white'
                                    : 'border-mist-300 bg-white'
                                }`}
                  >
                    {selected && <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-[16px] font-semibold text-navy-600">
                        {p.name}
                      </span>
                      {p.popular && <Pill tone="pink">คนเลือกมากที่สุด</Pill>}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-navy-300">
                      {p.tagline}
                    </span>
                  </span>

                  <span className="shrink-0 text-right">
                    <span className="num block text-[19px] font-bold text-navy-600">
                      {baht(p.price[modeId])}
                    </span>
                    <span className="block text-[11.5px] text-navy-300">
                      {quote.mode.unit}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── 2. วิธีจ่าย ─────────────────────────────────── */}
          <div className="mt-7">
            <SectionTitle hint={quote.mode.note}>คุณอยากจ่ายแบบไหน</SectionTitle>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-mist-200 p-1.5">
              {product.modes.map((m) => {
                const active = m.id === modeId
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModeId(m.id)}
                    aria-pressed={active}
                    className={`cursor-pointer rounded-xl px-3 py-3 font-display text-[15px] font-semibold
                                transition-colors duration-200
                                ${
                                  active
                                    ? 'bg-white text-navy-600 shadow-card'
                                    : 'text-navy-400 active:bg-white/60'
                                }`}
                  >
                    {m.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── 3. การใช้งานจริง ───────────────────────────── */}
          {showDaysSlider && (
            <div className="mt-6 tt-card p-4">
              <SectionTitle hint="เลื่อนให้ตรงกับงานจริงของคุณ เพื่อดูค่าใช้จ่ายที่จะเกิดขึ้นจริง">
                คุณใช้งานบ่อยแค่ไหน
              </SectionTitle>

              <Slider
                id="days-per-week"
                label="จำนวนวันที่วิ่งงานต่อสัปดาห์"
                value={usage.daysPerWeek}
                min={1}
                max={7}
                step={1}
                suffix="วัน / สัปดาห์"
                onChange={(v) => setUsage((u) => ({ ...u, daysPerWeek: v }))}
              />

              {showTripsSlider && (
                <div className="mt-5">
                  <Slider
                    id="trips-per-day"
                    label="จำนวนเที่ยวที่รับต่อวัน"
                    value={usage.tripsPerDay}
                    min={2}
                    max={30}
                    step={1}
                    suffix="เที่ยว / วัน"
                    onChange={(v) => setUsage((u) => ({ ...u, tripsPerDay: v }))}
                  />
                </div>
              )}
            </div>
          )}

          {/* ── 4. สรุปเบี้ยแบบเรียลไทม์ ────────────────────── */}
          <div className="mt-6 overflow-hidden rounded-card bg-navy-700 text-white shadow-lift">
            <div className="px-5 pb-5 pt-5">
              <p className="font-display text-[12.5px] font-semibold uppercase tracking-[.14em] text-navy-200">
                เบี้ยของคุณ
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="num text-[46px] font-bold leading-none text-white">
                  {baht(quote.unitPrice)}
                </span>
                <span className="pb-1.5 text-[15px] font-medium text-navy-200">
                  {quote.mode.unit}
                </span>
              </div>
              <p className="mt-2 text-[13px] text-navy-200">{quote.usageNote}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label="ประมาณต่อเดือน" value={`${baht(quote.perMonth)} บาท`} />
                <Stat label="ประมาณต่อปี" value={`${baht(quote.perYear)} บาท`} />
              </div>
            </div>

            {/* ── เทียบกับประกันรายปี — บอกตามจริงทั้งสองทาง ────────
                ถ้าลูกค้าใช้งานหนัก ประกันรายปีคุ้มกว่า แอปก็บอกตรง ๆ
                พร้อมบอกจุดคุ้มทุน เพื่อให้ตัดสินใจได้เอง                 */}
            <div className="border-t border-white/10 bg-white/5 px-5 py-4">
              <div className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white
                              ${quote.saving > 0 ? 'bg-magenta-500' : 'bg-navy-400'}`}
                >
                  <IconInfo className="h-4 w-4" />
                </span>

                {quote.usageBased ? (
                  <div className="text-[13.5px] leading-relaxed text-white/85">
                    {quote.saving > 0 ? (
                      <p>
                        กรมธรรม์รายปีที่คุ้มครองใกล้เคียงกันอยู่ที่{' '}
                        <span className="num font-semibold">{baht(quote.traditional)}</span> บาท/ปี
                        — ที่การใช้งานเท่านี้ คุณจ่ายน้อยกว่า{' '}
                        <span className="num font-semibold text-magenta-300">
                          {baht(quote.saving)} บาท
                        </span>{' '}
                        ({quote.savingPct}%)
                      </p>
                    ) : (
                      <p>
                        ที่การใช้งานเท่านี้ กรมธรรม์รายปี{' '}
                        <span className="num font-semibold">{baht(quote.traditional)}</span> บาท/ปี
                        จะคุ้มกว่าราว{' '}
                        <span className="num font-semibold">{baht(Math.abs(quote.saving))} บาท</span>{' '}
                        — เราบอกตามจริง เพราะคุณควรจ่ายเท่าที่ใช้จริง
                      </p>
                    )}

                    {quote.breakEvenDays && (
                      <p className="mt-1.5 text-white/60">
                        จ่ายแบบนี้คุ้มกว่าถ้าคุณวิ่งไม่เกิน{' '}
                        <span className="num font-semibold text-white/85">
                          {quote.breakEvenDays} วัน/สัปดาห์
                        </span>
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-[13.5px] leading-relaxed text-white/85">
                    ผ่อน 12 งวดรวม{' '}
                    <span className="num font-semibold">{baht(quote.installmentTotal)}</span> บาท
                    เทียบกับจ่ายรายปีครั้งเดียว{' '}
                    <span className="num font-semibold">{baht(quote.lumpSum)}</span> บาท
                    เลือกได้ตามสภาพคล่องของคุณ ไม่มีดอกเบี้ยแฝง
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── 5. สิ่งที่คุ้มครอง ─────────────────────────── */}
          <div className="mt-6 tt-card p-4">
            <SectionTitle>แผน {plan.name} คุ้มครองอะไรบ้าง</SectionTitle>
            <div className="divide-y divide-mist-200">
              {plan.benefits.map((b) => (
                <BenefitRow key={b.label} label={b.label} value={b.value} />
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-mist-100 px-3 py-2.5 text-[12.5px] leading-relaxed text-navy-300">
              ตัวเลขทั้งหมดเป็นข้อมูลจำลองสำหรับต้นแบบ เงื่อนไขจริงเป็นไปตามกรมธรรม์
            </p>
          </div>
        </div>
      </main>

      {/* ── ปุ่มดำเนินการ (ตรึงล่าง) ─────────────────────────── */}
      <footer className="shrink-0 border-t border-mist-200 bg-white px-4 pt-3 app-footer">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[13.5px] text-navy-400">{plan.name}</span>
          <span className="num text-[16px] font-semibold text-navy-600">
            {baht(quote.unitPrice)}{' '}
            <span className="text-[12.5px] font-medium text-navy-300">{quote.mode.unit}</span>
          </span>
        </div>
        <Button onClick={startBuy} iconRight={IconArrowRight}>
          เลือกแผนนี้
        </Button>
      </footer>
    </div>
  )
}

/* ── ตัวเลื่อนปรับการใช้งาน ──────────────────────────────── */
function Slider({ id, label, value, min, max, step, suffix, onChange }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-semibold text-navy-500">
          {label}
        </label>
        <span className="num shrink-0 text-[15px] font-bold text-magenta-500">
          {value} <span className="text-[12px] font-medium text-navy-300">{suffix}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tt-range h-11 w-full cursor-pointer"
        style={{ '--pct': `${pct}%` }}
      />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 px-3.5 py-3">
      <p className="text-[12px] text-navy-200">{label}</p>
      <p className="num mt-1 text-[17px] font-bold text-white">{value}</p>
    </div>
  )
}
