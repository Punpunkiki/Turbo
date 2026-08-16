import logoSrc from '../assets/logo/turbo-trust-logo.png'

/* ═══════════════════════════════════════════════════════════════
   LOGO
   ไฟล์ต้นฉบับเป็น PNG 1024×1024 พื้นหลังโปร่งใส และมีขอบว่างรอบตัวมาก
   component นี้จึงครอบ (crop) เฉพาะตัวมาร์กออกมา เพื่อให้วางใน header
   ขนาดเล็กแล้วยังอ่านออก ไม่ลอยกลางกรอบ

   ค่าครอบด้านล่างวัดจากขอบเขตพิกเซลที่ไม่โปร่งใสจริงของไฟล์
   (x 0.191–0.797, y 0.238–0.766) แล้วเผื่อขอบไว้ 2%
   ถ้าเปลี่ยนไฟล์โลโก้ใหม่ที่ระยะขอบต่างไป ให้ปรับ 3 ค่านี้พร้อมกัน:
     aspect-ratio = กว้างของกรอบ ÷ สูงของกรอบ
     width        = 100 ÷ กว้างของกรอบ  (หน่วย %)
     translate    = (-x0, -y0) × 100    (หน่วย %)

   สลับไฟล์โลโก้จริงได้ที่: src/assets/logo/turbo-trust-logo.png
   ═══════════════════════════════════════════════════════════════ */

const CROP = {
  aspectRatio: '1.137 / 1',
  width: '154.8%',
  transform: 'translate(-17.1%, -21.8%)',
}

export default function Logo({ className = 'w-32', label = 'TURBO TRUST' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: CROP.aspectRatio }}>
      <img
        src={logoSrc}
        alt={label}
        className="absolute left-0 top-0 max-w-none select-none"
        style={{ width: CROP.width, transform: CROP.transform }}
        draggable="false"
      />
    </div>
  )
}

/** โลโก้พร้อมเงา สำหรับวางบนพื้นน้ำเงินเข้ม (splash / เวทีเดโม่) */
export function LogoOnDark({ className = 'w-40' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: CROP.aspectRatio }}>
      <img
        src={logoSrc}
        alt="TURBO TRUST"
        className="absolute left-0 top-0 max-w-none select-none"
        style={{
          width: CROP.width,
          transform: CROP.transform,
          filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.35))',
        }}
        draggable="false"
      />
    </div>
  )
}
