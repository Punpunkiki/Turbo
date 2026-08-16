/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── BRAND CI ────────────────────────────────────────────────
        // ชมพู-แดงสด (Primary) — ปุ่มหลัก / highlight / accent
        magenta: {
          50: '#FDF0F6',
          100: '#FBDCEA',
          200: '#F7B8D3',
          300: '#F286B4',
          400: '#EC3F8C', // brand pink (ตรงกับโลโก้) — ใช้เป็น accent/เส้น
          500: '#DE1A73', // ปุ่มหลัก: ตัวอักษรขาวผ่าน 4.5:1
          600: '#C31462',
          700: '#9E0F4F',
        },
        // น้ำเงินเข้ม (Secondary) — หัวข้อ / ตัวอักษร / แถบตกแต่ง
        navy: {
          50: '#EEF2FB',
          100: '#DCE4F6',
          200: '#B4C3E8', // ใช้บนพื้นน้ำเงินเข้มเท่านั้น
          300: '#5A6E9E', // ข้อความรองบนพื้นสว่าง — ผ่าน 4.5:1 บนขาวและบน mist-100

          400: '#3E5CAC',
          500: '#16307A', // secondary หลัก
          600: '#122868',
          700: '#0E1F52',
          800: '#0A1740',
        },
        // พื้นหลังสว่าง สะอาดตา
        mist: {
          50: '#FAFBFE',
          100: '#F4F6FB',
          200: '#E8ECF6',
          300: '#D6DDEE',
        },
        // สีสถานะเดียวที่ไม่ใช่สีแบรนด์ — ใช้เฉพาะ "คุ้มครองอยู่" เท่านั้น
        live: {
          400: '#12C47C',
          500: '#0FA968',
          600: '#0A8452',
        },
      },
      fontFamily: {
        display: ['"Bai Jamjuree"', '"Noto Sans Thai"', 'system-ui', 'sans-serif'],
        sans: ['Anuphan', '"Noto Sans Thai"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        sheet: '28px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,31,82,.04), 0 8px 24px -12px rgba(14,31,82,.18)',
        lift: '0 2px 4px rgba(14,31,82,.06), 0 18px 40px -16px rgba(14,31,82,.28)',
        cta: '0 10px 24px -10px rgba(222,26,115,.75)',
        device: '0 40px 90px -30px rgba(6,14,40,.75), 0 0 0 1px rgba(255,255,255,.08)',
      },
      keyframes: {
        'slide-in-right': {
          from: { transform: 'translateX(28px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-28px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-up': {
          from: { transform: 'translateY(14px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        streak: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.85)', opacity: '.55' },
          '70%,100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'draw-check': { from: { strokeDashoffset: '60' }, to: { strokeDashoffset: '0' } },
      },
      animation: {
        'slide-in-right': 'slide-in-right .28s cubic-bezier(.22,.9,.28,1) both',
        'slide-in-left': 'slide-in-left .28s cubic-bezier(.22,.9,.28,1) both',
        'fade-up': 'fade-up .45s cubic-bezier(.22,.9,.28,1) both',
        streak: 'streak 2.6s cubic-bezier(.5,0,.3,1) infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(.3,0,.2,1) infinite',
        'draw-check': 'draw-check .5s .25s ease-out both',
      },
    },
  },
  plugins: [],
}
