/* ═══════════════════════════════════════════════════════════════
   MOCK QR — สร้างลาย QR จำลองแบบคงที่จากข้อความ (ไม่ใช่ QR จริง)
   ใช้เพื่อการนำเสนอเท่านั้น สแกนไม่ได้
   ═══════════════════════════════════════════════════════════════ */

const SIZE = 25 // จำนวนโมดูลต่อด้าน

/** hash แบบง่าย เพื่อให้ลายเดิมได้ผลเหมือนเดิมทุกครั้ง */
function seedFrom(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function isFinderZone(r, c) {
  const inBox = (r0, c0) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7
  return inBox(0, 0) || inBox(0, SIZE - 7) || inBox(SIZE - 7, 0)
}

export default function MockQR({ value = 'TURBO-TRUST', className = 'w-40', dark = '#0E1F52' }) {
  let rnd = seedFrom(value)
  const next = () => {
    rnd ^= rnd << 13
    rnd ^= rnd >>> 17
    rnd ^= rnd << 5
    return (rnd >>> 0) / 4294967296
  }

  const cells = []
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (isFinderZone(r, c)) continue
      // แถบจับเวลา (timing pattern)
      if (r === 6 || c === 6) {
        if ((r + c) % 2 === 0) cells.push([r, c])
        continue
      }
      if (next() > 0.53) cells.push([r, c])
    }
  }

  const Finder = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" rx="1.6" fill={dark} />
      <rect x="1" y="1" width="5" height="5" rx="1.1" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" rx=".7" fill={dark} />
    </g>
  )

  return (
    <svg
      viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`}
      className={className}
      role="img"
      aria-label="รหัส QR ของกรมธรรม์ (ตัวอย่างสำหรับการนำเสนอ)"
      shapeRendering="crispEdges"
    >
      <rect x="-1" y="-1" width={SIZE + 2} height={SIZE + 2} fill="#fff" rx="1.5" />
      {cells.map(([r, c]) => (
        <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill={dark} />
      ))}
      <Finder x={0} y={0} />
      <Finder x={SIZE - 7} y={0} />
      <Finder x={0} y={SIZE - 7} />
      {/* จุดกึ่งกลางแบรนด์ */}
      <rect x={SIZE / 2 - 2.6} y={SIZE / 2 - 2.6} width="5.2" height="5.2" rx="1.3" fill="#fff" />
      <rect
        x={SIZE / 2 - 1.9}
        y={SIZE / 2 - 1.9}
        width="3.8"
        height="3.8"
        rx="1"
        fill="#EC3F8C"
      />
    </svg>
  )
}
