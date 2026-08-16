/* ═══════════════════════════════════════════════════════════════
   ICONS — SVG ที่วาดเองทั้งหมด (ไม่ใช้ emoji เป็นไอคอน)
   ทุกตัวใช้ viewBox 24×24, stroke 1.7, currentColor
   ═══════════════════════════════════════════════════════════════ */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

const Svg = ({ children, className = 'h-6 w-6', ...rest }) => (
  <svg {...base} className={className} {...rest}>
    {children}
  </svg>
)

/* ── ผลิตภัณฑ์ ─────────────────────────────────────────────── */

/** มอเตอร์ไซค์ส่งของ — ตัวแทนกลุ่มไรเดอร์ */
export const IconRider = (p) => (
  <Svg {...p}>
    <circle cx="5.5" cy="17" r="3" />
    <circle cx="18.5" cy="17" r="3" />
    <path d="M8.5 17h7" />
    <path d="M5.5 17 9 10h4" />
    <path d="M13 10h3.2l2.3 7" />
    <path d="M11.5 6.5h3.2c.9 0 1.6.7 1.6 1.6V10" />
    <rect x="15.4" y="4.6" width="5.2" height="4.2" rx="1" />
  </Svg>
)

/** หน้าร้านค้ารายย่อย */
export const IconShop = (p) => (
  <Svg {...p}>
    <path d="M3.6 9.5h16.8v9.6a1.4 1.4 0 0 1-1.4 1.4H5a1.4 1.4 0 0 1-1.4-1.4z" />
    <path d="M3 9.5 4.7 4.4A1.4 1.4 0 0 1 6 3.5h12a1.4 1.4 0 0 1 1.3.9L21 9.5" />
    <path d="M8 9.5a2 2 0 0 1-4 0M12 9.5a2 2 0 0 1-4 0M16 9.5a2 2 0 0 1-4 0M20 9.5a2 2 0 0 1-4 0" />
    <path d="M9.5 20.5v-5h5v5" />
  </Svg>
)

/** รถยนต์ — พ.ร.บ./ประกันภาคสมัครใจ */
export const IconCar = (p) => (
  <Svg {...p}>
    <path d="M4 16.5V19a1 1 0 0 1-1 1H2.8a1 1 0 0 1-1-1v-2.5" />
    <path d="M22.2 16.5V19a1 1 0 0 1-1 1H21a1 1 0 0 1-1-1v-2.5" />
    <path d="M2.4 16.5h19.2v-3.8a2 2 0 0 0-1.3-1.9l-1.5-.5-1.9-3.6A2 2 0 0 0 15.1 5.6H8.9a2 2 0 0 0-1.8 1.1L5.2 10.3l-1.5.5a2 2 0 0 0-1.3 1.9z" />
    <path d="M5.2 10.5h13.6" />
    <circle cx="7" cy="14" r="1.1" />
    <circle cx="17" cy="14" r="1.1" />
  </Svg>
)

/* ── ระบบ ─────────────────────────────────────────────────── */

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 21c4.5-2 7-5.4 7-9.4V6.1l-7-2.6-7 2.6v5.5c0 4 2.5 7.4 7 9.4z" />
  </Svg>
)

export const IconShieldCheck = (p) => (
  <Svg {...p}>
    <path d="M12 21c4.5-2 7-5.4 7-9.4V6.1l-7-2.6-7 2.6v5.5c0 4 2.5 7.4 7 9.4z" />
    <path d="m9 11.8 2.2 2.2L15.2 10" />
  </Svg>
)

export const IconBolt = (p) => (
  <Svg {...p}>
    <path d="M13.2 2.5 4.8 13.2h5.6l-.6 8.3 8.4-10.7h-5.6z" />
  </Svg>
)

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
)

export const IconArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5" />
    <path d="m11 6-6 6 6 6" />
  </Svg>
)

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
)

export const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
)

export const IconClose = (p) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
)

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3 1.8" />
  </Svg>
)

export const IconWallet = (p) => (
  <Svg {...p}>
    <path d="M20.5 9.5V7.8a1.8 1.8 0 0 0-1.8-1.8H5.3A1.8 1.8 0 0 0 3.5 7.8v8.4A1.8 1.8 0 0 0 5.3 18h13.4a1.8 1.8 0 0 0 1.8-1.8v-1.7" />
    <path d="M21.6 9.5h-4.3a2.5 2.5 0 0 0 0 5h4.3z" />
    <path d="M3.5 8.2V6.4a1.6 1.6 0 0 1 1.2-1.6l10-2.3" />
  </Svg>
)

export const IconQR = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.4" />
    <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.4" />
    <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.4" />
    <path d="M14 14h2.6v2.6H14zM17.9 17.9h2.6v2.6h-2.6zM14 20.5h1.2M20.5 14h-1.2" />
  </Svg>
)

export const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 21.5s6.8-6 6.8-11a6.8 6.8 0 1 0-13.6 0c0 5 6.8 11 6.8 11z" />
    <circle cx="12" cy="10.4" r="2.5" />
  </Svg>
)

export const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M8.4 3.8H5.6a1.9 1.9 0 0 0-1.9 2.1c.5 5.6 5 10.1 10.6 10.6a1.9 1.9 0 0 0 2.1-1.9v-2.8l-3.4-1.1-1.4 1.7a11.5 11.5 0 0 1-4.5-4.5l1.7-1.4z" />
  </Svg>
)

export const IconDoc = (p) => (
  <Svg {...p}>
    <path d="M6 2.8h7.5L19 8.3v11.5a1.7 1.7 0 0 1-1.7 1.7H6a1.7 1.7 0 0 1-1.7-1.7V4.5A1.7 1.7 0 0 1 6 2.8z" />
    <path d="M13.3 2.8v5.5H19" />
    <path d="M8 13h8M8 16.5h5" />
  </Svg>
)

export const IconLifeRing = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="m5.8 5.8 3.7 3.7M14.5 14.5l3.7 3.7M18.2 5.8l-3.7 3.7M9.5 14.5l-3.7 3.7" />
  </Svg>
)

export const IconHome = (p) => (
  <Svg {...p}>
    <path d="M3.6 10.4 12 3.5l8.4 6.9v9a1.4 1.4 0 0 1-1.4 1.4H5a1.4 1.4 0 0 1-1.4-1.4z" />
    <path d="M9.6 20.8v-6.4h4.8v6.4" />
  </Svg>
)

export const IconCamera = (p) => (
  <Svg {...p}>
    <path d="M4.2 7.6h3l1.4-2.2h6.8l1.4 2.2h3a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H4.2a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5z" />
    <circle cx="12" cy="13.4" r="3.4" />
  </Svg>
)

export const IconInfo = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 11v5.2M12 7.9h.01" />
  </Svg>
)

export const IconRefresh = (p) => (
  <Svg {...p}>
    <path d="M20 11.5a8 8 0 1 0-.9 4.7" />
    <path d="M20.4 20.2v-4.6h-4.6" />
  </Svg>
)

export const IconSliders = (p) => (
  <Svg {...p}>
    <path d="M4 7h10M18.5 7H20M4 17h3M11 17h9" />
    <circle cx="16" cy="7" r="2.3" />
    <circle cx="8.6" cy="17" r="2.3" />
  </Svg>
)

export const IconPlus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const PRODUCT_ICONS = {
  rider: IconRider,
  shop: IconShop,
  motor: IconCar,
}
