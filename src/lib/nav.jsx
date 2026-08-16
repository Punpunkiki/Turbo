import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   NAV — router ขนาดเล็กที่เขียนเอง (ไม่พึ่ง dependency ภายนอก)
   เก็บหน้าจอเป็น stack เพื่อให้ทิศทาง slide ถูกต้อง:
   push  → เลื่อนเข้าจากขวา, back → เลื่อนเข้าจากซ้าย
   ═══════════════════════════════════════════════════════════════ */

const NavContext = createContext(null)
const TRANSITION_MS = 300

export function NavProvider({ initial = 'splash', children }) {
  const [stack, setStack] = useState([{ name: initial, params: {} }])
  const [leaving, setLeaving] = useState(null) // หน้าจอที่กำลังออก
  const [dir, setDir] = useState('forward')
  const timer = useRef(null)

  const beginTransition = useCallback((from, direction) => {
    setDir(direction)
    setLeaving(from)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLeaving(null), TRANSITION_MS)
  }, [])

  const push = useCallback(
    (name, params = {}) => {
      setStack((prev) => {
        if (prev[prev.length - 1].name === name) return prev
        beginTransition(prev[prev.length - 1], 'forward')
        return [...prev, { name, params }]
      })
    },
    [beginTransition]
  )

  /** แทนที่หน้าปัจจุบัน — ใช้เมื่อไม่ควรย้อนกลับ (เช่น หลังซื้อสำเร็จ) */
  const replace = useCallback(
    (name, params = {}) => {
      setStack((prev) => {
        beginTransition(prev[prev.length - 1], 'forward')
        return [...prev.slice(0, -1), { name, params }]
      })
    },
    [beginTransition]
  )

  /** ล้าง stack แล้วเริ่มใหม่ — ใช้กับแท็บล่าง */
  const reset = useCallback(
    (name, params = {}) => {
      setStack((prev) => {
        if (prev[prev.length - 1].name === name) return prev
        beginTransition(prev[prev.length - 1], 'back')
        return [{ name, params }]
      })
    },
    [beginTransition]
  )

  const back = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev
      beginTransition(prev[prev.length - 1], 'back')
      return prev.slice(0, -1)
    })
  }, [beginTransition])

  const current = stack[stack.length - 1]

  const value = useMemo(
    () => ({
      current,
      params: current.params,
      canGoBack: stack.length > 1,
      leaving,
      dir,
      push,
      replace,
      reset,
      back,
    }),
    [current, stack.length, leaving, dir, push, replace, reset, back]
  )

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside <NavProvider>')
  return ctx
}
