import { useState } from 'react'
import AppHeader from '../components/AppHeader'
import { Button, Eyebrow, SectionTitle } from '../components/ui'
import {
  IconCamera,
  IconCheck,
  IconClock,
  IconLifeRing,
  IconPhone,
  IconPin,
} from '../components/Icons'
import { CLAIM_TYPES } from '../lib/catalog'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   แจ้งเคลม — ยื่นเรื่องผ่านแอปใน 3 การกด
   ═══════════════════════════════════════════════════════════════ */

export default function Claim() {
  const { push } = useNav()
  const { policy, addClaim, showToast } = useStore()
  const [typeId, setTypeId] = useState(null)
  const [photos, setPhotos] = useState(0)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const type = CLAIM_TYPES.find((t) => t.id === typeId)

  const submit = () => {
    const entry = addClaim({ typeLabel: type.label, photos, note })
    setSubmitted(entry)
  }

  /* ── ยื่นเรื่องแล้ว ─────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="flex h-full flex-col bg-mist-100">
        <AppHeader title="แจ้งเคลม" showBack={false} />
        <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
          <div className="stagger">
            <div className="tt-card mt-2 p-5 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-live-500 text-white">
                <IconCheck className="h-9 w-9" strokeWidth={2.4} />
              </span>
              <h2 className="mt-4 font-display text-[21px] font-bold text-navy-600">
                รับเรื่องแล้ว
              </h2>
              <p className="num mt-1 text-[13.5px] text-navy-300">เลขที่เคลม {submitted.id}</p>
              <p className="mx-auto mt-3 max-w-[280px] text-[14px] leading-relaxed text-navy-400">
                เจ้าหน้าที่จะโทรกลับภายใน 24 ชั่วโมง คุณติดตามสถานะได้จากหน้าแรก
              </p>
            </div>

            <div className="tt-card mt-4 p-4">
              <SectionTitle>ขั้นตอนต่อจากนี้</SectionTitle>
              <Timeline
                steps={[
                  { label: 'รับเรื่องเข้าระบบ', desc: 'เสร็จแล้ว', done: true },
                  { label: 'เจ้าหน้าที่ตรวจสอบ', desc: 'ภายใน 24 ชั่วโมง', done: false },
                  { label: 'โอนค่าสินไหม', desc: 'ภายใน 3 วันทำการ', done: false },
                ]}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="ghost" icon={IconPhone} onClick={() => showToast('กำลังโทรหา 1489')}>
                โทรหาเรา
              </Button>
              <Button variant="ghost" icon={IconPin} onClick={() => push('branches')}>
                เข้าสาขา
              </Button>
            </div>
          </div>
        </main>

        <footer className="shrink-0 border-t border-mist-200 bg-white px-4 pt-3 app-footer">
          <Button onClick={() => push('home')}>กลับหน้าแรก</Button>
        </footer>
      </div>
    )
  }

  /* ── ยังไม่มีกรมธรรม์ ───────────────────────────────────── */
  if (!policy) {
    return (
      <div className="flex h-full flex-col bg-mist-100">
        <AppHeader title="แจ้งเคลม" showBack={false} />
        <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist-200 text-navy-300">
            <IconLifeRing className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-display text-[19px] font-semibold text-navy-600">
            ยังไม่มีความคุ้มครองให้เคลม
          </h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-navy-300">
            สมัครความคุ้มครองก่อน แล้วคุณจะแจ้งเคลมจากหน้านี้ได้ทันที
          </p>
          <div className="mt-6 w-full">
            <Button onClick={() => push('products')}>เลือกความคุ้มครอง</Button>
          </div>
        </main>
      </div>
    )
  }

  /* ── ฟอร์มแจ้งเคลม ──────────────────────────────────────── */
  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader title="แจ้งเคลม" subtitle={policy.planName} showBack={false} />

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="stagger space-y-4">
          <div className="pt-1">
            <Eyebrow>เกิดอะไรขึ้น</Eyebrow>
            <p className="mt-2 text-[14.5px] leading-relaxed text-navy-300">
              เลือกเรื่องที่ตรงที่สุด เราจะถามเฉพาะสิ่งที่จำเป็น
            </p>
          </div>

          <div className="space-y-2.5">
            {CLAIM_TYPES.map((t) => {
              const active = t.id === typeId
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTypeId(t.id)}
                  aria-pressed={active}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-card border-2 bg-white p-4
                              text-left transition-[border-color,box-shadow] duration-200
                              ${active ? 'border-magenta-400 shadow-lift' : 'border-mist-200 shadow-card active:bg-mist-50'}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2
                                ${active ? 'border-magenta-500 bg-magenta-500 text-white' : 'border-mist-300'}`}
                  >
                    {active && <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-navy-600">{t.label}</span>
                    <span className="block text-[12.5px] text-navy-300">{t.hint}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {typeId && (
            <>
              <div className="tt-card animate-fade-up p-4">
                <SectionTitle hint="ยิ่งมีรูป เรื่องยิ่งอนุมัติเร็ว">แนบรูปหลักฐาน</SectionTitle>
                <div className="flex flex-wrap gap-2.5">
                  {Array.from({ length: photos }).map((_, i) => (
                    <div
                      key={i}
                      className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-navy-50 text-navy-400"
                    >
                      <IconCamera className="h-6 w-6" />
                    </div>
                  ))}
                  {photos < 4 && (
                    <button
                      type="button"
                      onClick={() => setPhotos((n) => n + 1)}
                      className="flex h-[72px] w-[72px] cursor-pointer flex-col items-center justify-center
                                 gap-1 rounded-xl border-2 border-dashed border-mist-300 bg-mist-50
                                 text-navy-300 transition-colors duration-200 active:bg-mist-100"
                    >
                      <IconCamera className="h-5 w-5" />
                      <span className="text-[11px] font-semibold">เพิ่มรูป</span>
                    </button>
                  )}
                </div>
                {photos > 0 && (
                  <p className="mt-2.5 text-[12.5px] text-navy-300">แนบแล้ว {photos} รูป</p>
                )}
              </div>

              <div className="tt-card animate-fade-up p-4">
                <label
                  htmlFor="claim-note"
                  className="mb-1.5 block font-display text-[15.5px] font-semibold text-navy-600"
                >
                  เล่าให้เราฟังสั้น ๆ
                </label>
                <textarea
                  id="claim-note"
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="เช่น รถล้มที่ถนนลาดพร้าว ระหว่างส่งอาหาร เวลาประมาณ 19:30 น."
                  className="w-full rounded-2xl border-2 border-mist-200 bg-mist-50 p-3.5 text-[15px]
                             leading-relaxed text-navy-700 placeholder:text-navy-300
                             transition-colors duration-200 focus:border-magenta-400 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-start gap-2.5 rounded-2xl bg-navy-50 px-4 py-3.5">
                <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-navy-400" />
                <p className="text-[13px] leading-relaxed text-navy-500">
                  เคลมส่วนใหญ่ได้รับการติดต่อกลับภายใน 24 ชั่วโมง หากเป็นเรื่องฉุกเฉิน
                  โทรสายด่วน 1489 ได้ตลอด 24 ชั่วโมง
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="shrink-0 border-t border-mist-200 bg-white px-4 pt-3 app-footer">
        {!typeId && (
          <p className="mb-2 text-center text-[13px] text-navy-300">
            เลือกเรื่องที่ต้องการเคลมเพื่อไปต่อ
          </p>
        )}
        <Button onClick={submit} disabled={!typeId}>
          ส่งเรื่องเคลม
        </Button>
      </footer>
    </div>
  )
}

/* ── ไทม์ไลน์สถานะเคลม ─────────────────────────────────── */
function Timeline({ steps }) {
  return (
    <ol className="relative space-y-4 pl-1">
      {steps.map((s, i) => (
        <li key={s.label} className="relative flex gap-3.5">
          <span className="relative flex flex-col items-center">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full
                          ${s.done ? 'bg-live-500 text-white' : 'border-2 border-mist-300 bg-white'}`}
            >
              {s.done && <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
            {i < steps.length - 1 && (
              <span className="mt-1 h-6 w-[2px] rounded-full bg-mist-200" aria-hidden="true" />
            )}
          </span>
          <span className="-mt-0.5">
            <span className="block text-[14.5px] font-semibold text-navy-600">{s.label}</span>
            <span className="block text-[12.5px] text-navy-300">{s.desc}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
