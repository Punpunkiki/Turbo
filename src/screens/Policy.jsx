import AppHeader from '../components/AppHeader'
import PolicyCard from '../components/PolicyCard'
import { BenefitRow, Button, Divider, SectionTitle } from '../components/ui'
import { IconRefresh, IconSliders, IconLifeRing } from '../components/Icons'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   กรมธรรม์ของฉัน — ดูรายละเอียดและจัดการแผน
   ═══════════════════════════════════════════════════════════════ */

export default function Policy() {
  const { push } = useNav()
  const { policy, coverageOn, showToast } = useStore()

  if (!policy) {
    return (
      <div className="flex h-full flex-col bg-mist-100">
        <AppHeader title="กรมธรรม์ของฉัน" showBack={false} />
        <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist-200 text-navy-300">
            <IconSliders className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-display text-[19px] font-semibold text-navy-600">
            ยังไม่มีกรมธรรม์
          </h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-navy-300">
            เลือกความคุ้มครองที่ตรงกับงานของคุณ แล้วเริ่มคุ้มครองได้ภายในไม่กี่นาที
          </p>
          <div className="mt-6 w-full">
            <Button onClick={() => push('products')}>เลือกความคุ้มครอง</Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader title="กรมธรรม์ของฉัน" subtitle={policy.number} showBack={false} />

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="stagger space-y-4">
          <PolicyCard policy={policy} active={coverageOn} />

          <section className="tt-card p-4">
            <SectionTitle>ความคุ้มครองในแผนนี้</SectionTitle>
            <div className="divide-y divide-mist-200">
              {policy.benefits.map((b) => (
                <BenefitRow key={b.label} label={b.label} value={b.value} />
              ))}
            </div>
          </section>

          <section className="tt-card p-4">
            <SectionTitle hint="เปลี่ยนได้ตลอดเวลา มีผลกับรอบการตัดเงินถัดไป">
              จัดการแผน
            </SectionTitle>

            <ManageRow
              icon={IconSliders}
              label="เปลี่ยนแผนความคุ้มครอง"
              desc="อัปเกรดหรือลดระดับความคุ้มครอง"
              onClick={() => push('quote')}
            />
            <Divider />
            <ManageRow
              icon={IconRefresh}
              label="เปลี่ยนวิธีชำระเงิน"
              desc={
                policy.payMethod === 'qr' ? 'ตอนนี้: สแกน QR พร้อมเพย์' : 'ตอนนี้: กระเป๋าเงินอัตโนมัติ'
              }
              onClick={() => showToast('เปิดหน้าตั้งค่าการชำระเงินแล้ว')}
            />
            <Divider />
            <ManageRow
              icon={IconLifeRing}
              label="แจ้งเคลม"
              desc="ยื่นเรื่องผ่านแอปได้ทันที"
              onClick={() => push('claim')}
            />
          </section>

          <p className="px-1 text-center text-[12px] leading-relaxed text-navy-300">
            เอกสารและตัวเลขทั้งหมดในต้นแบบนี้เป็นข้อมูลจำลองเพื่อการนำเสนอ
          </p>
        </div>
      </main>
    </div>
  )
}

function ManageRow({ icon: Icon, label, desc, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left
                 transition-colors duration-200 active:bg-mist-50"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist-100 text-navy-500">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-semibold text-navy-600">{label}</span>
        <span className="block text-[12.5px] text-navy-300">{desc}</span>
      </span>
      <span className="text-[13px] font-semibold text-magenta-500">เปิด</span>
    </button>
  )
}
