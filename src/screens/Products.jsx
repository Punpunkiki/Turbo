import AppHeader from '../components/AppHeader'
import { PRODUCT_ICONS, IconChevronRight } from '../components/Icons'
import { Eyebrow, Pill } from '../components/ui'
import { PRODUCT_LIST } from '../lib/catalog'
import { useNav } from '../lib/nav'
import { useStore } from '../lib/store'

/* ═══════════════════════════════════════════════════════════════
   2 · เลือกกลุ่มผลิตภัณฑ์
   การ์ดใหญ่ กดง่าย มีไอคอนสื่อความหมายชัดเจน
   ═══════════════════════════════════════════════════════════════ */

export default function Products() {
  const { push } = useNav()
  const { selectProduct, policy } = useStore()

  const choose = (id) => {
    selectProduct(id)
    push('quote')
  }

  return (
    <div className="flex h-full flex-col bg-mist-100">
      <AppHeader />

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-8">
        <div className="stagger">
          <div className="pt-1">
            <Eyebrow>เลือกความคุ้มครอง</Eyebrow>
            <h1 className="mt-2 font-display text-[27px] font-bold leading-tight text-navy-600">
              วันนี้อยากคุ้มครองอะไร
            </h1>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-300">
              เลือกได้มากกว่าหนึ่งแบบ และเปลี่ยนแผนเมื่อไหร่ก็ได้
            </p>
          </div>

          {PRODUCT_LIST.map((p) => {
            const Icon = PRODUCT_ICONS[p.id]
            const isRider = p.id === 'rider'
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p.id)}
                className="group mt-3 flex w-full cursor-pointer items-stretch gap-4 rounded-card
                           bg-white p-4 text-left shadow-card transition-[box-shadow,border-color]
                           duration-200 hover:shadow-lift active:bg-mist-50
                           border-2 border-transparent hover:border-magenta-100"
              >
                {/* ไอคอนผลิตภัณฑ์ */}
                <span
                  className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl
                              ${
                                isRider
                                  ? 'bg-gradient-to-br from-magenta-400 to-magenta-600 text-white'
                                  : 'bg-navy-50 text-navy-500'
                              }`}
                >
                  <Icon className="h-8 w-8" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-[17.5px] font-semibold text-navy-600">
                      {p.name}
                    </span>
                    {isRider && <Pill tone="pink">แนะนำ</Pill>}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-snug text-navy-300">
                    {p.blurb}
                  </span>
                  <span className="mt-2.5 flex items-baseline gap-1">
                    <span className="text-[12.5px] text-navy-300">เริ่มต้น</span>
                    <span className="num text-[20px] font-bold text-magenta-500">
                      {p.startFrom}
                    </span>
                    <span className="text-[12.5px] font-medium text-navy-400">{p.startUnit}</span>
                  </span>
                </span>

                <span className="flex items-center text-navy-300 transition-colors duration-200 group-hover:text-magenta-500">
                  <IconChevronRight className="h-5 w-5" />
                </span>
              </button>
            )
          })}

          {/* ทางลัดกลับหน้าแรก เมื่อมีกรมธรรม์อยู่แล้ว — กันทางตัน */}
          {policy && (
            <button
              type="button"
              onClick={() => push('home')}
              className="mt-5 w-full cursor-pointer rounded-2xl border-2 border-mist-200 bg-white
                         px-4 py-3.5 text-[14.5px] font-semibold text-navy-500
                         transition-colors duration-200 active:bg-mist-100"
            >
              กลับไปหน้ากรมธรรม์ของฉัน
            </button>
          )}
        </div>

        {/* บันทึกความน่าเชื่อถือ */}
        <p className="mt-6 text-center text-[12px] leading-relaxed text-navy-300">
          รับประกันภัยโดยบริษัทประกันภัยพันธมิตรที่ได้รับใบอนุญาตจาก คปภ.
        </p>
      </main>
    </div>
  )
}
