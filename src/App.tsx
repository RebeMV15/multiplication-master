import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'

const PageShell: React.FC<{ title: string; back?: boolean }> = ({ title, back, children }) => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-sm min-h-dvh bg-white text-gray-800 shadow-sm">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-3 border-b">
        {back && (
          <button aria-label="Go back" onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 active:scale-95">
            <span className="inline-block rotate-180 select-none">➔</span>
          </button>
        )}
        <h1 className="text-xl font-extrabold">{title}</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <PageShell title="Multiplication Master">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <p className="text-sm text-purple-700">An educational web app</p>
        </div>
        <Link to="/learn" className="block rounded-2xl bg-purple-600 text-white text-lg font-bold py-5 text-center active:scale-[0.98]">Learn</Link>
        <Link to="/practice" className="block rounded-2xl bg-pink-600 text-white text-lg font-bold py-5 text-center active:scale-[0.98]">Practice</Link>
        <p className="text-center text-xs text-gray-500 mt-6">Designed by Rebeca Martinez with ❤️</p>
      </div>
    </PageShell>
  )
}

const LearnList: React.FC = () => {
  const tables = Array.from({ length: 8 }, (_, i) => i + 2)
  return (
    <PageShell title="Learn" back>
      <ul className="divide-y rounded-2xl overflow-hidden border">
        {tables.map((t) => (
          <li key={t}>
            <Link to={`/learn/${t}`} className="flex items-center justify-between px-4 py-4 text-base">
              <span>Table of {t}</span>
              <span className="text-gray-400">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

const LearnDetail: React.FC = () => {
  const { table } = useParams()
  const n = Number(table)
  const rows = Array.from({ length: 10 }, (_, i) => i + 1)
  return (
    <PageShell title={`Table of ${n}`} back>
      <div className="flex flex-col items-center gap-4">
        <img src="https://picsum.photos/seed/kids-bikes/400/160" alt="Kids learning" className="w-full rounded-xl object-cover" />
        <ul className="w-full text-center text-lg">
          {rows.map((i) => (
            <li key={i} className="py-1">{n} × {i} = {n * i}</li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}

const Practice: React.FC = () => {
  const [a, setA] = useState(() => 2 + Math.floor(Math.random() * 8))
  const [b, setB] = useState(() => 1 + Math.floor(Math.random() * 10))
  const [answer, setAnswer] = useState("")
  const [checked, setChecked] = useState<null | boolean>(null)

  const correct = a * b
  function next() {
    setA(2 + Math.floor(Math.random() * 8))
    setB(1 + Math.floor(Math.random() * 10))
    setAnswer("")
    setChecked(null)
  }

  function onCheck() {
    const val = Number(answer)
    if (!Number.isFinite(val)) return
    setChecked(val === correct)
  }

  const showNext = checked !== null

  return (
    <PageShell title="Practice" back>
      <div className="flex flex-col items-center gap-6">
        <div className="text-6xl">🤖</div>
        <div className="text-3xl font-bold tracking-wide">{a} × {b} = ?</div>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-40 text-center text-2xl border rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ""))}
          disabled={showNext}
        />
        {checked === true && <p className="text-green-600 font-semibold">Correct!!</p>}
        {checked === false && <p className="text-red-600 font-semibold">Incorrect. It's {correct}</p>}
        {!showNext ? (
          <button onClick={onCheck} className="rounded-full bg-purple-600 text-white font-bold px-8 py-3 active:scale-95">Check</button>
        ) : (
          <button onClick={next} className="rounded-full bg-purple-600 text-white font-bold px-8 py-3 active:scale-95">Next</button>
        )}
      </div>
    </PageShell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnList />} />
        <Route path="/learn/:table" element={<LearnDetail />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  )
}
