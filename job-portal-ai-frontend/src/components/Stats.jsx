const STATS = [
  { value: "10,000+", label: "Active Jobs" },
  { value: "5,000+",  label: "Registered Candidates" },
  { value: "2x",      label: "Faster Hiring" },
]

export default function Stats() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{s.value}</div>
              <div className="text-sm text-slate-600 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
