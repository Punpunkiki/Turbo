import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, computeQuote } from './catalog'

/* ═══════════════════════════════════════════════════════════════
   STORE — สถานะทั้งหมดของแอปเก็บไว้ในหน่วยความจำ (mock, ไม่มี backend)
   ═══════════════════════════════════════════════════════════════ */

const StoreContext = createContext(null)

const emptyBuyer = {
  fullName: '',
  citizenId: '',
  phone: '',
  platform: '',
}

export function StoreProvider({ children }) {
  /* ── ตะกร้าปัจจุบัน ── */
  const [productId, setProductId] = useState('rider')
  const [planId, setPlanId] = useState('plus')
  const [modeId, setModeId] = useState('daily')
  const [usage, setUsage] = useState({ daysPerWeek: 4, tripsPerDay: 12 })
  const [payMethod, setPayMethod] = useState('wallet')
  const [buyer, setBuyer] = useState(emptyBuyer)
  /* ขั้นตอนการซื้อเก็บไว้ที่ store เพื่อให้หน้าจอที่กำลังเลื่อนออก
     ยังแสดงขั้นตอนเดิม ไม่กระพริบกลับไปขั้นตอนที่ 1 */
  const [buyStep, setBuyStep] = useState(0)

  /* ── หลังซื้อ ── */
  const [policy, setPolicy] = useState(null)
  const [coverageOn, setCoverageOn] = useState(false)
  const [coverageSince, setCoverageSince] = useState(null)
  const [tripsToday, setTripsToday] = useState(0)
  const [claims, setClaims] = useState([])
  const [toast, setToast] = useState(null)

  const product = PRODUCTS[productId]
  const plan = product.plans.find((p) => p.id === planId) || product.plans[1]
  const quote = useMemo(
    () => computeQuote(product, plan, modeId, usage),
    [product, plan, modeId, usage]
  )

  /* เปลี่ยนผลิตภัณฑ์ → รีเซ็ตแผน/โหมดให้เข้ากับผลิตภัณฑ์ใหม่ */
  const selectProduct = useCallback((id) => {
    const p = PRODUCTS[id]
    setProductId(id)
    setPlanId(p.plans.find((x) => x.popular)?.id ?? p.plans[0].id)
    setModeId(p.modes[0].id)
  }, [])

  const showToast = useCallback((message, tone = 'default') => {
    setToast({ message, tone, id: Math.random() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  /** สร้างกรมธรรม์อิเล็กทรอนิกส์ (mock) แล้วเปิดความคุ้มครองทันที */
  const issuePolicy = useCallback(() => {
    const now = new Date()
    const serial = String(Math.floor(100000 + Math.random() * 899999))
    const issued = {
      number: `TT-${now.getFullYear() + 543}-${serial}`,
      productId,
      productName: product.name,
      planName: plan.name,
      benefits: plan.benefits,
      modeLabel: quote.mode.label,
      unitPrice: quote.unitPrice,
      unitSuffix: quote.mode.unit,
      holder: buyer.fullName.trim() || 'สมชาย ใจดี',
      phone: buyer.phone.trim() || '08x-xxx-xx12',
      payMethod,
      issuedAt: now.toISOString(),
    }
    setPolicy(issued)
    setCoverageOn(true)
    setCoverageSince(Date.now())
    setTripsToday(0)
    return issued
  }, [productId, product.name, plan, quote, buyer, payMethod])

  const toggleCoverage = useCallback(() => {
    setCoverageOn((on) => {
      if (on) {
        setCoverageSince(null)
        showToast('ปิดความคุ้มครองแล้ว วันนี้ไม่ถูกตัดเงินเพิ่ม')
        return false
      }
      setCoverageSince(Date.now())
      showToast('เปิดความคุ้มครองแล้ว คุ้มครองทันที', 'live')
      return true
    })
  }, [showToast])

  const addClaim = useCallback((claim) => {
    const now = new Date()
    const entry = {
      id: `CL-${String(Math.floor(10000 + Math.random() * 89999))}`,
      status: 'received',
      submittedAt: now.toISOString(),
      ...claim,
    }
    setClaims((prev) => [entry, ...prev])
    return entry
  }, [])

  /** เดโม่: จำลองการรับงานเพิ่ม 1 เที่ยว (ใช้กับโหมดจ่ายรายเที่ยว) */
  const addTrip = useCallback(() => setTripsToday((n) => n + 1), [])

  const resetAll = useCallback(() => {
    setProductId('rider')
    setPlanId('plus')
    setModeId('daily')
    setUsage({ daysPerWeek: 4, tripsPerDay: 12 })
    setBuyer(emptyBuyer)
    setBuyStep(0)
    setPayMethod('wallet')
    setPolicy(null)
    setCoverageOn(false)
    setCoverageSince(null)
    setTripsToday(0)
    setClaims([])
  }, [])

  const value = {
    productId,
    product,
    planId,
    plan,
    modeId,
    usage,
    quote,
    buyer,
    buyStep,
    payMethod,
    policy,
    coverageOn,
    coverageSince,
    tripsToday,
    claims,
    toast,
    selectProduct,
    setPlanId,
    setModeId,
    setUsage,
    setBuyer,
    setBuyStep,
    setPayMethod,
    issuePolicy,
    toggleCoverage,
    addClaim,
    addTrip,
    showToast,
    resetAll,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
