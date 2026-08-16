/* ═══════════════════════════════════════════════════════════════
   UI PRIMITIVES — ปุ่ม, ป้าย, ขีดความเร็ว, ตัวคั่น
   ทุกปุ่มสูงอย่างน้อย 52px (เป้ากดใหญ่กว่า 44px ตามมาตรฐาน)
   ═══════════════════════════════════════════════════════════════ */

/** "ขีดความเร็ว" — อุปกรณ์โครงสร้างที่หยิบมาจากเส้นในโลโก้ */
export function SpeedMark({ className = 'text-magenta-400' }) {
  return (
    <span className={`speed-mark ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

/** หัวข้อย่อยแบบมีขีดความเร็วนำหน้า */
export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SpeedMark />
      <span className="font-display text-[12px] font-semibold uppercase tracking-[.14em] text-magenta-600">
        {children}
      </span>
    </div>
  )
}

const variants = {
  primary:
    'text-white bg-gradient-to-b from-magenta-500 to-magenta-600 shadow-cta active:from-magenta-600 active:to-magenta-700',
  navy: 'text-white bg-navy-500 active:bg-navy-600',
  ghost: 'text-navy-500 bg-white border-2 border-mist-200 active:bg-mist-100',
  quiet: 'text-navy-400 bg-mist-100 active:bg-mist-200',
}

export function Button({
  children,
  variant = 'primary',
  full = true,
  className = '',
  icon: Icon,
  iconRight: IconRight,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2
                  rounded-2xl px-6 font-display text-[17px] font-semibold
                  transition-[background-color,box-shadow,transform] duration-200
                  active:scale-[.985] disabled:cursor-not-allowed disabled:opacity-40
                  disabled:shadow-none disabled:active:scale-100
                  ${full ? 'w-full' : ''} ${variants[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
      {IconRight && <IconRight className="h-5 w-5" />}
    </button>
  )
}

/** ป้ายสถานะเล็ก */
export function Pill({ children, tone = 'pink', className = '' }) {
  const tones = {
    pink: 'bg-magenta-50 text-magenta-600',
    navy: 'bg-navy-50 text-navy-500',
    live: 'bg-live-500/10 text-live-600',
    ghost: 'bg-white/20 text-white',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
                  font-display text-[12px] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/** แถวรายการผลประโยชน์ */
export function BenefitRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-[14px] leading-snug text-navy-400">{label}</span>
      <span className="num shrink-0 text-[14px] font-semibold text-navy-600">{value}</span>
    </div>
  )
}

/** หัวข้อของแต่ละบล็อกในหน้าจอ */
export function SectionTitle({ children, hint }) {
  return (
    <div className="mb-3">
      <h2 className="font-display text-[19px] font-semibold text-navy-600">{children}</h2>
      {hint && <p className="mt-0.5 text-[13px] leading-relaxed text-navy-300">{hint}</p>}
    </div>
  )
}

/** ตัวหารเส้นบาง */
export const Divider = ({ className = '' }) => (
  <hr className={`border-0 border-t border-mist-200 ${className}`} />
)

/** ช่องกรอกข้อมูลพร้อม label ที่ผูกกับ input จริง */
export function Field({ id, label, hint, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-navy-500">
        {label}
      </label>
      <input id={id} className="tt-input" {...rest} />
      {hint && <p className="mt-1.5 text-[12.5px] text-navy-300">{hint}</p>}
    </div>
  )
}
