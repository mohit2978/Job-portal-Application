const FOOTER_LINKS = ["About", "Contact", "Privacy Policy", "Terms"]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            © 2026 <span className="font-semibold text-slate-900">JobPortal.AI</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map(link => (
              <a key={link} href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
