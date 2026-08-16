import { useState } from 'react'
import AppHeader from '../components/AppHeader'
import MockQR from '../components/MockQR'
import { Button, Divider, Field, Pill, SectionTitle } from '../components/ui'
import {
  IconArrowRight,
  IconCheck,
  IconQR,
  IconShieldCheck,
  IconWallet,
} from '../components/Icons'
import { baht } from '../lib/catalog'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   4 · ซื้อ 3 ขั้นตอน
   1) ยืนยันข้อมูลส่วนตัว  2) เลือกวิธีชำระเงิน  3) ยืนยันสั่งซื้อ
   ไม่มีการยื่นเอกสารกระดาษในทุกขั้นตอน
   ═══════════════════════════════════════════════════════════════ */

const STEPS = ['ข้อมูลของคุณ', 'วิธีชำระเงิน', 'ยืนยันสั่งซื้อ']

const PLATFORMS = ['Grab', 'LINE MAN', 'Robinhood', 'Shopee Food', 'Lalamove', 'อื่น ๆ / อิสระ']

const PAY_METHODS = [
  {
    id: 'wallet',
    icon: IconWallet,
    name: 'กระเป๋าเงินอัตโนมัติ',
    desc: 'ตัดเฉพาะวันที่คุณเปิดความคุ้มครอง ไม่ต้องกดจ่ายเอง',
    tag: 'แนะนำสำหรับจ่ายรายวัน',
  },
  {
    id: 'qr',
    icon: IconQR,
    name: 'สแกน QR พร้อมเพย์',
    desc: 'จ่ายล่วงหน้าเป็นก้อน ใช้ได้จนกว่ายอดจะหมด',
    tag: null,
  },
]

export default function Buy() {
  const { push } = useNav()
  const {
    product,
    plan,
    quote,
    buyer,
    setBuyer,
    payMethod,
    setPayMethod,
    issuePolicy,
    buyStep: step,
    setBuyStep: setStep,
  } = useStore()
  const [touched, setTouched] = useState(false)

  /* ── ตรวจความถูกต้องของฟอร์มขั้นตอนที่ 1 ── */
  const errors = {
    fullName: buyer.fullName.trim().length < 3 ? 'กรอกชื่อ-นามสกุลตามบัตรประชาชน' : null,
    citizenId: /^\d{13}$/.test(buyer.citizenId.replace(/\D/g, ''))
      ? null
      : 'เลขบัตรประชาชนต้องมี 13 หลัก',
    phone: /^0\d{8,9}$/.test(buyer.phone.replace(/\D/g, ''))
      ? null
      : 'เบอร์มือถือ 10 หลัก ขึ้นต้นด้วย 0',
  }
  const step1Valid = !errors.fullName && !errors.citizenId && !errors.phone

  const goNext = () => {
    if (step === 0) {
      setTouched(true)
      if (!step1Valid) return
      setTouched(false)
      setStep(1)
      return
    }
    if (step === 1) {
      setStep(2)
      return
    }
    issuePolicy()
    push('success')
  }

  const ctaLabel = ['ไปเลือกวิธีชำระเงิน', 'ตรวจสอบคำสั่งซื้อ', 'ยืนยันและรับความคุ้มครอง'][step]

  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader title="สมัครความคุ้มครอง" subtitle={`${product.name} · ${plan.name}`} />

      {/* ── ตัวบอกขั้นตอน — ขั้นตอนเป็นลำดับจริง จึงใส่เลขกำกับได้ ── */}
      <div className="shrink-0 border-b border-mist-200 bg-white px-4 py-3">
        <ol className="flex items-center gap-2">
          {STEPS.map((label, i) => {
            const done = i < step
            const active = i === step
            return (
              <li key={label} className="flex flex-1 items-center gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg
                                font-display text-[13px] font-bold transition-colors duration-300
                                ${
                                  done
                                    ? 'bg-magenta-100 text-magenta-600'
                                    : active
                                      ? 'bg-magenta-500 text-white'
                                      : 'bg-mist-200 text-navy-400'
                                }`}
                  >
                    {done ? <IconCheck className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={`truncate text-[12.5px] font-semibold transition-colors duration-300
                                ${active ? 'text-navy-600' : 'text-navy-300'}`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`h-[3px] w-4 shrink-0 rounded-full transition-colors duration-300
                                ${done ? 'bg-magenta-400' : 'bg-mist-200'}`}
                    style={{ transform: 'skewX(-18deg)' }}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 py-5">
        {/* ── ขั้นตอนที่ 1 · ข้อมูลส่วนตัว ─────────────────── */}
        {step === 0 && (
          <div className="stagger space-y-4">
            <div className="tt-card p-4">
              <SectionTitle hint="ใช้ข้อมูลเท่านี้ ไม่ต้องส่งสำเนาเอกสารใด ๆ">
                ยืนยันตัวตนของคุณ
              </SectionTitle>

              <div className="space-y-4">
                <div>
                  <Field
                    id="fullName"
                    label="ชื่อ-นามสกุล"
                    placeholder="เช่น สมชาย ใจดี"
                    autoComplete="name"
                    value={buyer.fullName}
                    onChange={(e) => setBuyer({ ...buyer, fullName: e.target.value })}
                  />
                  <ErrorText show={touched} message={errors.fullName} />
                </div>

                <div>
                  <Field
                    id="citizenId"
                    label="เลขบัตรประชาชน"
                    placeholder="1 2345 67890 12 3"
                    inputMode="numeric"
                    maxLength={17}
                    value={buyer.citizenId}
                    onChange={(e) => setBuyer({ ...buyer, citizenId: e.target.value })}
                  />
                  <ErrorText show={touched} message={errors.citizenId} />
                </div>

                <div>
                  <Field
                    id="phone"
                    label="เบอร์มือถือ"
                    placeholder="08x xxx xxxx"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={12}
                    value={buyer.phone}
                    onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                    hint="ใช้รับกรมธรรม์และแจ้งเตือนความคุ้มครอง"
                  />
                  <ErrorText show={touched} message={errors.phone} />
                </div>
              </div>
            </div>

            {product.id === 'rider' && (
              <div className="tt-card p-4">
                <SectionTitle hint="ช่วยให้เราคำนวณความเสี่ยงและส่วนลดได้แม่นขึ้น">
                  คุณวิ่งงานกับแพลตฟอร์มไหน
                </SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((pf) => {
                    const active = buyer.platform === pf
                    return (
                      <button
                        key={pf}
                        type="button"
                        onClick={() => setBuyer({ ...buyer, platform: active ? '' : pf })}
                        aria-pressed={active}
                        className={`min-h-[44px] cursor-pointer rounded-xl border-2 px-3.5
                                    text-[14px] font-semibold transition-colors duration-200
                                    ${
                                      active
                                        ? 'border-magenta-500 bg-magenta-50 text-magenta-600'
                                        : 'border-mist-200 bg-white text-navy-400 active:bg-mist-100'
                                    }`}
                      >
                        {pf}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <p className="px-1 text-[12.5px] leading-relaxed text-navy-300">
              เราเก็บข้อมูลเท่าที่จำเป็นต่อการออกกรมธรรม์ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
              และไม่ส่งต่อให้บุคคลอื่นเพื่อการตลาด
            </p>
          </div>
        )}

        {/* ── ขั้นตอนที่ 2 · วิธีชำระเงิน ──────────────────── */}
        {step === 1 && (
          <div className="stagger space-y-3">
            <SectionTitle hint="เปลี่ยนวิธีจ่ายภายหลังได้ในหน้ากรมธรรม์">
              เลือกวิธีชำระเงิน
            </SectionTitle>

            {PAY_METHODS.map((m) => {
              const active = payMethod === m.id
              const Icon = m.icon
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  aria-pressed={active}
                  className={`flex w-full cursor-pointer items-start gap-3.5 rounded-card border-2 bg-white p-4
                              text-left transition-[border-color,box-shadow] duration-200
                              ${
                                active
                                  ? 'border-magenta-400 shadow-lift'
                                  : 'border-mist-200 shadow-card active:bg-mist-50'
                              }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                                transition-colors duration-200
                                ${active ? 'bg-magenta-500 text-white' : 'bg-mist-100 text-navy-400'}`}
                  >
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-[16px] font-semibold text-navy-600">
                        {m.name}
                      </span>
                      {m.tag && <Pill tone="pink">{m.tag}</Pill>}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-navy-300">
                      {m.desc}
                    </span>
                  </span>
                  <span
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2
                                ${active ? 'border-magenta-500 bg-magenta-500 text-white' : 'border-mist-300'}`}
                  >
                    {active && <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                </button>
              )
            })}

            {/* แสดง QR ทันทีเมื่อเลือกวิธีสแกนจ่าย */}
            {payMethod === 'qr' && (
              <div className="tt-card flex flex-col items-center p-5 text-center">
                <MockQR
                  value={`TT-PAY-${plan.id}-${quote.unitPrice}`}
                  className="w-[168px]"
                />
                <p className="mt-3 text-[13.5px] leading-relaxed text-navy-400">
                  เปิดแอปธนาคารแล้วสแกนเพื่อเติมเงินเข้ากระเป๋า TURBO TRUST
                </p>
                <p className="mt-1 text-[12px] text-navy-300">
                  QR ในต้นแบบนี้เป็นภาพจำลอง สแกนไม่ได้
                </p>
              </div>
            )}

            <div className="tt-card p-4">
              <div className="flex items-center gap-2.5">
                <IconShieldCheck className="h-5 w-5 shrink-0 text-live-500" />
                <p className="text-[13px] leading-snug text-navy-400">
                  ยกเลิกได้ตลอดเวลา ไม่มีค่าปรับ และไม่มีการผูกมัดขั้นต่ำ
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── ขั้นตอนที่ 3 · สรุปคำสั่งซื้อ ──────────────────── */}
        {step === 2 && (
          <div className="stagger space-y-4">
            <div className="tt-card overflow-hidden">
              <div className="bg-navy-700 px-4 py-4 text-white">
                <p className="font-display text-[12.5px] font-semibold uppercase tracking-[.14em] text-navy-200">
                  สรุปคำสั่งซื้อ
                </p>
                <p className="mt-1.5 font-display text-[19px] font-bold">{product.name}</p>
                <p className="text-[13.5px] text-navy-200">แผน {plan.name}</p>
              </div>

              <div className="px-4 py-3">
                <SummaryRow label="วิธีจ่าย" value={quote.mode.label} />
                <Divider />
                <SummaryRow
                  label="เบี้ยประกัน"
                  value={`${baht(quote.unitPrice)} ${quote.mode.unit}`}
                  strong
                />
                <Divider />
                <SummaryRow label="ประมาณต่อเดือน" value={`${baht(quote.perMonth)} บาท`} />
                <Divider />
                <SummaryRow
                  label="ชำระผ่าน"
                  value={PAY_METHODS.find((m) => m.id === payMethod)?.name}
                />
                <Divider />
                <SummaryRow label="ผู้เอาประกัน" value={buyer.fullName.trim() || 'สมชาย ใจดี'} />
                <Divider />
                <SummaryRow label="เบอร์ติดต่อ" value={buyer.phone.trim() || '08x-xxx-xx12'} />
              </div>

              <div className="border-t border-mist-200 bg-magenta-50 px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-navy-500">
                    ยอดที่ตัดครั้งแรก
                  </span>
                  <span className="num text-[22px] font-bold text-magenta-600">
                    {baht(quote.unitPrice)} บาท
                  </span>
                </div>
              </div>
            </div>

            <div className="tt-card p-4">
              <div className="flex items-start gap-2.5">
                <IconShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-live-500" />
                <p className="text-[13px] leading-relaxed text-navy-400">
                  กดยืนยันแล้วความคุ้มครองเริ่มทันที และกรมธรรม์อิเล็กทรอนิกส์จะเข้าแอปภายในไม่กี่วินาที
                  ไม่ต้องรออนุมัติและไม่ต้องส่งเอกสารเพิ่ม
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── ปุ่มดำเนินการ ─────────────────────────────────── */}
      <footer className="shrink-0 space-y-2 border-t border-mist-200 bg-white px-4 pt-3 app-footer">
        <Button onClick={goNext} iconRight={step === 2 ? IconShieldCheck : IconArrowRight}>
          {ctaLabel}
        </Button>
        {step > 0 && (
          <Button variant="quiet" onClick={() => setStep(step - 1)}>
            ย้อนกลับขั้นตอนก่อนหน้า
          </Button>
        )}
      </footer>
    </div>
  )
}

function ErrorText({ show, message }) {
  if (!show || !message) return null
  return (
    <p role="alert" className="mt-1.5 text-[12.5px] font-semibold text-magenta-600">
      {message}
    </p>
  )
}

function SummaryRow({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-[14px] text-navy-300">{label}</span>
      <span
        className={`num shrink-0 text-[14.5px] ${
          strong ? 'font-bold text-navy-600' : 'font-semibold text-navy-500'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
