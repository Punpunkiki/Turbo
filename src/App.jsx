import BottomNav from './components/BottomNav'
import PhoneFrame from './components/PhoneFrame'
import Toast from './components/Toast'
import { NavProvider, useNav } from './lib/nav'
import { StoreProvider, useStore } from './lib/store'

import Splash from './screens/Splash'
import Products from './screens/Products'
import Quote from './screens/Quote'
import Buy from './screens/Buy'
import Success from './screens/Success'
import Home from './screens/Home'
import Policy from './screens/Policy'
import Claim from './screens/Claim'
import Branches from './screens/Branches'

/* ═══════════════════════════════════════════════════════════════
   TURBO TRUST — ต้นแบบแอปพลิเคชันสำหรับการนำเสนอ
   ทุกหน้าจอเชื่อมกันเป็น flow เดียว ไม่มีทางตัน
   ═══════════════════════════════════════════════════════════════ */

const SCREENS = {
  splash: Splash,
  products: Products,
  quote: Quote,
  buy: Buy,
  success: Success,
  home: Home,
  policy: Policy,
  claim: Claim,
  branches: Branches,
}

/** หน้าจอที่มีแถบเมนูล่าง */
const TAB_SCREENS = ['home', 'policy', 'claim', 'branches']

function AppShell() {
  const { current, leaving, dir, reset } = useNav()
  const { policy, toast } = useStore()

  const Current = SCREENS[current.name] ?? Splash
  const Leaving = leaving ? (SCREENS[leaving.name] ?? null) : null

  const showTabs = policy && TAB_SCREENS.includes(current.name)

  /** ปุ่มข้ามหน้าในแผงผู้นำเสนอ (เดสก์ท็อป) */
  const jump = (name) => {
    if (name === 'home' && !policy) return reset('products')
    reset(name)
  }

  return (
    <PhoneFrame onJump={jump} currentScreen={current.name} hasPolicy={Boolean(policy)}>
      <div className="flex h-full w-full flex-col">
        <div className="relative flex-1 overflow-hidden">
          {/* หน้าจอที่กำลังเลื่อนออก */}
          {Leaving && (
            <div
              key={`leave-${leaving.name}`}
              aria-hidden="true"
              className={`absolute inset-0 ${
                dir === 'forward' ? 'screen-exit-forward' : 'screen-exit-back'
              }`}
            >
              <Leaving />
            </div>
          )}

          {/* หน้าจอปัจจุบัน */}
          <div
            key={current.name}
            className={`absolute inset-0 ${
              dir === 'forward' ? 'screen-enter-forward' : 'screen-enter-back'
            }`}
          >
            <Current />
          </div>

          <Toast toast={toast} />
        </div>

        {showTabs && <BottomNav active={current.name} />}
      </div>
    </PhoneFrame>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <NavProvider initial="splash">
        <AppShell />
      </NavProvider>
    </StoreProvider>
  )
}
