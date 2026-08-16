/* ═══════════════════════════════════════════════════════════════
   CATALOG — ข้อมูลผลิตภัณฑ์และการคำนวณเบี้ยทั้งหมดเป็น mock data
   (ต้นแบบสำหรับการนำเสนอ ไม่ได้ต่อกับระบบคิดเบี้ยจริง)
   ═══════════════════════════════════════════════════════════════ */

/* หมายเหตุเชิงกลยุทธ์:
   แต่ละแผนมีค่า `annual` = เบี้ยของกรมธรรม์รายปีในตลาดที่ความคุ้มครองใกล้เคียงกัน
   ใช้เปรียบเทียบแบบตรงไปตรงมา — ถ้าลูกค้าวิ่งงานเกือบทุกวัน ประกันรายปีอาจคุ้มกว่า
   แอปจะบอกตามจริง เพราะจุดขายคือ "จ่ายเท่าที่ใช้" ไม่ใช่ "ถูกกว่าเสมอ" */

export const PRODUCTS = {
  rider: {
    id: 'rider',
    name: 'ประกันไรเดอร์รายวัน',
    badge: 'Flexi-Protection',
    blurb: 'เปิดคุ้มครองตอนออกวิ่ง ปิดตอนพัก จ่ายเฉพาะวันที่ใช้',
    startFrom: 10,
    startUnit: 'บาท/วัน',
    accent: 'magenta',
    // โหมดการจ่าย: โหมดแรก = ตามการใช้งาน, โหมดที่สอง = เหมา
    modes: [
      { id: 'daily', label: 'จ่ายรายวัน', unit: 'บาท/วัน', note: 'ตัดเงินเฉพาะวันที่คุณกดเปิดความคุ้มครอง' },
      { id: 'trip', label: 'จ่ายรายเที่ยว', unit: 'บาท/เที่ยว', note: 'ตัดเงินอัตโนมัติเมื่อรับงานแต่ละเที่ยว' },
    ],
    plans: [
      {
        id: 'basic',
        name: 'อุบัติเหตุพื้นฐาน',
        tagline: 'คุ้มครองตัวคุณระหว่างวิ่งงาน',
        price: { daily: 10, trip: 1 },
        annual: 2400,
        benefits: [
          { label: 'เสียชีวิต / ทุพพลภาพจากอุบัติเหตุ', value: '100,000 บาท' },
          { label: 'ค่ารักษาพยาบาลต่ออุบัติเหตุ', value: '5,000 บาท' },
          { label: 'สายด่วนช่วยเหลือ 24 ชม.', value: 'รวมอยู่แล้ว' },
        ],
      },
      {
        id: 'plus',
        name: 'อุบัติเหตุ + ทรัพย์สิน',
        tagline: 'คุ้มครองทั้งตัวคุณและของที่กำลังส่ง',
        popular: true,
        price: { daily: 15, trip: 1.5 },
        annual: 3900,
        benefits: [
          { label: 'เสียชีวิต / ทุพพลภาพจากอุบัติเหตุ', value: '200,000 บาท' },
          { label: 'ค่ารักษาพยาบาลต่ออุบัติเหตุ', value: '15,000 บาท' },
          { label: 'ของที่ส่งเสียหาย / สูญหาย', value: '3,000 บาท/ครั้ง' },
          { label: 'ความรับผิดต่อบุคคลภายนอก', value: '50,000 บาท' },
        ],
      },
      {
        id: 'max',
        name: 'ครบวงจร + ชดเชยรายได้',
        tagline: 'วันไหนวิ่งไม่ได้ ยังมีรายได้ทดแทน',
        price: { daily: 22, trip: 2.2 },
        annual: 6200,
        benefits: [
          { label: 'เสียชีวิต / ทุพพลภาพจากอุบัติเหตุ', value: '300,000 บาท' },
          { label: 'ค่ารักษาพยาบาลต่ออุบัติเหตุ', value: '30,000 บาท' },
          { label: 'ของที่ส่งเสียหาย / สูญหาย', value: '5,000 บาท/ครั้ง' },
          { label: 'ชดเชยรายได้ระหว่างพักรักษา', value: '500 บาท/วัน' },
          { label: 'รถเสียกลางทาง เรียกช่างฟรี', value: '2 ครั้ง/เดือน' },
        ],
      },
    ],
  },

  shop: {
    id: 'shop',
    name: 'ประกันร้านค้ารายย่อย',
    badge: 'Micro-Merchant',
    blurb: 'คุ้มครองหน้าร้าน ของในร้าน และลูกค้าที่เข้ามาใช้บริการ',
    startFrom: 6,
    startUnit: 'บาท/วัน',
    accent: 'navy',
    modes: [
      { id: 'daily', label: 'จ่ายรายวัน', unit: 'บาท/วัน', note: 'ตัดเงินเฉพาะวันที่คุณเปิดร้าน' },
      { id: 'month', label: 'จ่ายรายเดือน', unit: 'บาท/เดือน', note: 'เหมาทั้งเดือน ไม่ต้องกดเปิด-ปิด' },
    ],
    plans: [
      {
        id: 'basic',
        name: 'ไฟไหม้ + ของหาย',
        tagline: 'ปกป้องสต๊อกและอุปกรณ์ในร้าน',
        price: { daily: 6, month: 160 },
        annual: 1900,
        benefits: [
          { label: 'ไฟไหม้ / น้ำท่วมตัวอาคาร', value: '150,000 บาท' },
          { label: 'สินค้าและอุปกรณ์ในร้าน', value: '50,000 บาท' },
          { label: 'โจรกรรมที่มีร่องรอยงัดแงะ', value: '20,000 บาท' },
        ],
      },
      {
        id: 'plus',
        name: 'ร้านค้า + ลูกค้า',
        tagline: 'เพิ่มความคุ้มครองลูกค้าที่เข้าร้าน',
        popular: true,
        price: { daily: 11, month: 290 },
        annual: 3600,
        benefits: [
          { label: 'ไฟไหม้ / น้ำท่วมตัวอาคาร', value: '300,000 บาท' },
          { label: 'สินค้าและอุปกรณ์ในร้าน', value: '100,000 บาท' },
          { label: 'ลูกค้าบาดเจ็บในพื้นที่ร้าน', value: '100,000 บาท' },
          { label: 'เงินสดในลิ้นชัก', value: '10,000 บาท' },
        ],
      },
      {
        id: 'max',
        name: 'ร้านค้า + หยุดกิจการ',
        tagline: 'ร้านปิดซ่อม ยังมีเงินหมุน',
        price: { daily: 18, month: 470 },
        annual: 5900,
        benefits: [
          { label: 'ไฟไหม้ / น้ำท่วมตัวอาคาร', value: '500,000 บาท' },
          { label: 'สินค้าและอุปกรณ์ในร้าน', value: '200,000 บาท' },
          { label: 'ลูกค้าบาดเจ็บในพื้นที่ร้าน', value: '200,000 บาท' },
          { label: 'ชดเชยวันที่ร้านปิดซ่อม', value: '800 บาท/วัน' },
        ],
      },
    ],
  },

  motor: {
    id: 'motor',
    name: 'ประกันรถยนต์ / พ.ร.บ.',
    badge: 'Motor',
    blurb: 'ต่อ พ.ร.บ. และประกันภาคสมัครใจ ผ่อนเป็นรายเดือนได้',
    startFrom: 55,
    startUnit: 'บาท/เดือน',
    accent: 'navy',
    modes: [
      { id: 'month', label: 'ผ่อนรายเดือน', unit: 'บาท/เดือน', note: 'แบ่งจ่าย 12 งวด ไม่มีดอกเบี้ย' },
      { id: 'year', label: 'จ่ายรายปี', unit: 'บาท/ปี', note: 'จ่ายครั้งเดียว ประหยัดกว่าแบบผ่อน' },
    ],
    plans: [
      {
        id: 'basic',
        name: 'พ.ร.บ. รถจักรยานยนต์',
        tagline: 'ภาคบังคับ ต่อออนไลน์ใน 2 นาที',
        price: { month: 55, year: 645 },
        annual: 645,
        benefits: [
          { label: 'ค่ารักษาพยาบาลเบื้องต้น', value: '30,000 บาท/คน' },
          { label: 'เสียชีวิต / ทุพพลภาพถาวร', value: '35,000 บาท/คน' },
          { label: 'ส่ง e-พ.ร.บ. เข้าแอปทันที', value: 'รวมอยู่แล้ว' },
        ],
      },
      {
        id: 'plus',
        name: 'ประกันชั้น 3+ รถเก๋ง',
        tagline: 'ชนแล้วมีคู่กรณี ซ่อมรถเราด้วย',
        popular: true,
        price: { month: 640, year: 7300 },
        annual: 7300,
        benefits: [
          { label: 'ซ่อมรถคู่กรณี', value: '1,000,000 บาท' },
          { label: 'ซ่อมรถเรา (มีคู่กรณี)', value: '100,000 บาท' },
          { label: 'ค่าเสียหายส่วนแรก', value: 'ไม่มี' },
          { label: 'รถยกฉุกเฉิน 24 ชม.', value: 'รวมอยู่แล้ว' },
        ],
      },
      {
        id: 'max',
        name: 'ประกันชั้น 1 รถเก๋ง',
        tagline: 'คุ้มครองเต็มรูปแบบ ชนเองก็ซ่อม',
        price: { month: 1290, year: 14700 },
        annual: 14700,
        benefits: [
          { label: 'ซ่อมรถคู่กรณี', value: '2,000,000 บาท' },
          { label: 'ซ่อมรถเรา (ชนเองก็ได้)', value: 'ตามทุนประกัน' },
          { label: 'รถหาย / ไฟไหม้', value: 'ตามทุนประกัน' },
          { label: 'รถใช้ระหว่างซ่อม', value: '700 บาท/วัน' },
        ],
      },
    ],
  },
}

export const PRODUCT_LIST = [PRODUCTS.rider, PRODUCTS.shop, PRODUCTS.motor]

/* ── ตัวช่วยจัดรูปแบบตัวเลข ───────────────────────────────────── */
export const baht = (n) =>
  new Intl.NumberFormat('th-TH', {
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n)

/**
 * คำนวณเบี้ยตามการใช้งานจริง (mock)
 * @param {object} product  ผลิตภัณฑ์จาก PRODUCTS
 * @param {object} plan     แผนที่เลือก
 * @param {string} modeId   'daily' | 'trip' | 'month' | 'year'
 * @param {object} usage    { daysPerWeek, tripsPerDay }
 */
export function computeQuote(product, plan, modeId, usage) {
  const mode = product.modes.find((m) => m.id === modeId) || product.modes[0]
  const unitPrice = plan.price[mode.id]
  const { daysPerWeek = 5, tripsPerDay = 12 } = usage

  let perYear
  let perMonth
  let usageNote

  switch (mode.id) {
    case 'daily':
      perYear = unitPrice * daysPerWeek * 52
      usageNote = `วิ่งงาน ${daysPerWeek} วัน/สัปดาห์`
      break
    case 'trip':
      perYear = unitPrice * tripsPerDay * daysPerWeek * 52
      usageNote = `${tripsPerDay} เที่ยว/วัน · ${daysPerWeek} วัน/สัปดาห์`
      break
    case 'month':
      perYear = unitPrice * 12
      usageNote = 'จ่ายเท่ากันทุกเดือน'
      break
    default: // year
      perYear = unitPrice
      usageNote = 'จ่ายครั้งเดียวต่อปี'
  }
  perMonth = perYear / 12

  const traditional = plan.annual
  const saving = traditional - perYear
  const usageBased = mode.id === 'daily' || mode.id === 'trip'

  /* จุดคุ้มทุน: วิ่งได้กี่วันต่อสัปดาห์ก่อนที่ประกันรายปีจะคุ้มกว่า
     ตัวเลขนี้คือหัวใจของการตัดสินใจ จึงคำนวณและแสดงให้ลูกค้าเห็นตรง ๆ */
  let breakEvenDays = null
  if (mode.id === 'daily') breakEvenDays = traditional / (unitPrice * 52)
  if (mode.id === 'trip') breakEvenDays = traditional / (unitPrice * tripsPerDay * 52)

  return {
    mode,
    unitPrice,
    perMonth: Math.round(perMonth),
    perYear: Math.round(perYear),
    perDayEquivalent: mode.id === 'trip' ? unitPrice * tripsPerDay : null,
    usageNote,
    usageBased,
    traditional,
    saving: Math.round(saving),
    savingPct: Math.round((saving / traditional) * 100),
    breakEvenDays: breakEvenDays ? Math.floor(breakEvenDays * 10) / 10 : null,
    /* โหมดเหมา (รายเดือน/รายปี): เทียบยอดรวมของการผ่อนกับการจ่ายทีเดียว */
    installmentTotal: plan.price.month ? plan.price.month * 12 : null,
    lumpSum: plan.price.year ?? null,
  }
}

/* ── สาขาใกล้เคียง (Community Layer) — mock ──────────────────── */
export const BRANCHES = [
  {
    id: 'b1',
    name: 'เงินเทอร์โบ สาขาลาดพร้าว 71',
    distanceKm: 0.8,
    hours: 'จ. – ส. 08:30 – 18:00',
    services: ['รับเรื่องเคลม', 'ปรึกษาแผนประกัน', 'รับเงินสดค่าสินไหม'],
    phone: '02 000 1071',
    open: true,
  },
  {
    id: 'b2',
    name: 'เงินเทอร์โบ สาขารัชดา 32',
    distanceKm: 2.4,
    hours: 'ทุกวัน 09:00 – 19:00',
    services: ['รับเรื่องเคลม', 'ต่อ พ.ร.บ. หน้าเคาน์เตอร์'],
    phone: '02 000 1032',
    open: true,
  },
  {
    id: 'b3',
    name: 'เงินเทอร์โบ สาขาบางกะปิ',
    distanceKm: 4.1,
    hours: 'จ. – ศ. 08:30 – 17:30',
    services: ['รับเรื่องเคลม', 'ปรึกษาแผนประกัน'],
    phone: '02 000 1145',
    open: false,
  },
  {
    id: 'b4',
    name: 'เงินเทอร์โบ สาขามีนบุรี',
    distanceKm: 6.7,
    hours: 'ทุกวัน 09:00 – 18:00',
    services: ['รับเรื่องเคลม', 'ต่อ พ.ร.บ. หน้าเคาน์เตอร์', 'ตรวจสภาพรถ'],
    phone: '02 000 1188',
    open: true,
  },
]

/* ── ประเภทการเคลม — mock ────────────────────────────────────── */
export const CLAIM_TYPES = [
  { id: 'accident', label: 'อุบัติเหตุระหว่างวิ่งงาน', hint: 'ล้ม ชน หรือถูกชน' },
  { id: 'medical', label: 'ค่ารักษาพยาบาล', hint: 'มีใบเสร็จจากโรงพยาบาล' },
  { id: 'goods', label: 'ของที่ส่งเสียหาย / สูญหาย', hint: 'มีรูปถ่ายและเลขออเดอร์' },
  { id: 'income', label: 'ขอเงินชดเชยรายได้', hint: 'มีใบรับรองแพทย์ให้หยุดงาน' },
]
