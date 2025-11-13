import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Github, Linkedin, Mail, Twitter, ExternalLink, Link as LinkIcon, Menu, ChevronDown, Star, BookOpen, Code2, Layers, Hammer, Briefcase, Calendar, Tag, PlayCircle } from 'lucide-react'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">
      {children}
    </span>
  )
}

function Section({ id, title, children, icon: Icon }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2 mb-3">
        {Icon ? <Icon className="h-4 w-4 text-neutral-400" /> : null}
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
      </div>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 shadow-sm overflow-hidden relative">
        {/* subtle gradient accent */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-neutral-200/60 to-transparent dark:from-neutral-800/60 blur-2xl" />
        <div className="p-4 sm:p-6 relative">{children}</div>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
  )
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)
  const [githubUser, setGithubUser] = useState('vercel')
  const [repos, setRepos] = useState([])
  const [blogs] = useState(() => [
    { title: 'Designing with Constraints', date: '2024-08-12', tags: ['design', 'systems'], img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop' },
    { title: 'Building a Notion-style UI in React', date: '2024-05-03', tags: ['react', 'ui'], img: 'https://images.unsplash.com/photo-1559163179-87a949b3513b?q=80&w=900&auto=format&fit=crop' },
    { title: 'From Idea to Prototype in a Day', date: '2024-02-19', tags: ['product', 'speed'], img: 'https://images.unsplash.com/photo-1529336953121-ad0d5a67b2f0?q=80&w=900&auto=format&fit=crop' },
  ])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    let ignore = false
    async function loadRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=6`)
        const data = await res.json()
        if (!ignore && Array.isArray(data)) setRepos(data)
      } catch (e) {
        // silent fail
      }
    }
    loadRepos()
    return () => {
      ignore = true
    }
  }, [githubUser])

  const nav = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'skills', label: 'Skills' },
      { id: 'blogs', label: 'Blogs' },
      { id: 'open-source', label: 'Open Source' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setLeftOpen((v) => !v)} aria-label="Toggle left sidebar">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-neutral-900 dark:bg-white" />
              <span className="text-sm text-neutral-500">Portfolio</span>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight">Notion Style</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <span className="text-xs text-neutral-600 dark:text-neutral-300">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </button>
            <button className="lg:hidden p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setRightOpen((v) => !v)} aria-label="Toggle right sidebar">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Page shell */}
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 mt-6">
        {/* Left sidebar */}
        <aside className={`col-span-12 lg:col-span-2 ${leftOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-20 space-y-2">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="group flex items-center justify-between px-2 py-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm transition"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">{n.label}</span>
                <ChevronDown className="h-3 w-3 text-neutral-400 rotate-[-90deg]" />
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-12 lg:col-span-8 space-y-8">
          {/* Hero with Spline */}
          <section className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="relative p-6 flex flex-col justify-center gap-5">
                {/* floating accents */}
                <div className="pointer-events-none absolute -left-10 top-4 h-28 w-28 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 blur-2xl" />
                <div className="flex items-center gap-3">
                  <img
                    alt="Profile"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop"
                    className="h-14 w-14 rounded-xl object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
                  />
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">Your Name</h2>
                    <p className="text-sm text-neutral-500">Software Engineer • Product-minded • Curious</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  I build delightful, performant interfaces and thoughtful systems. I love working at the intersection of design, engineering, and AI.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800" href="mailto:you@example.com">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800" href="https://github.com" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800" href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800" href="https://twitter.com" target="_blank" rel="noreferrer">
                    <Twitter className="h-4 w-4" /> Twitter
                  </a>
                </div>
              </div>
              <div className="h-[300px] sm:h-[360px] md:h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
                <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </section>

          <Section id="about" title="About" icon={BookOpen}>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                I’m a full-stack developer focused on building accessible, minimal, and reliable products. I enjoy crafting clean UIs, scalable APIs, and experimenting with AI to augment workflows.
              </p>
              <ul>
                <li>Based in Anywhere</li>
                <li>Open to freelance and collaborations</li>
                <li>Currently exploring multi-agent systems</li>
              </ul>
            </div>
          </Section>

          <Section id="experience" title="Experience" icon={Briefcase}>
            <div className="space-y-4">
              {[
                {
                  role: 'Frontend Engineer',
                  company: 'Acme Inc.',
                  period: '2023 – Present',
                  bullets: ['Led redesign with Notion-like system', 'Improved LCP by 35%', 'Built component library'],
                  logo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=256&auto=format&fit=crop'
                },
                {
                  role: 'Software Engineer',
                  company: 'Globex',
                  period: '2021 – 2023',
                  bullets: ['Shipped real-time dashboards', 'Maintained CI/CD pipelines', 'Mentored junior engineers'],
                  logo: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=256&auto=format&fit=crop'
                },
              ].map((e, i) => (
                <div key={i} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={e.logo} alt="logo" className="h-9 w-9 rounded-md object-cover" />
                      <div>
                        <div className="font-medium">{e.role} • {e.company}</div>
                        <div className="text-sm text-neutral-500 flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {e.period}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects" icon={Code2}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Notion-Portfolio',
                  desc: 'A minimal portfolio template with Notion vibes.',
                  tags: ['react', 'tailwind'],
                  link: '#',
                  img: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1200&auto=format&fit=crop'
                },
                {
                  title: 'AI Notes',
                  desc: 'Semantic search and summarization for notes.',
                  tags: ['ai', 'vectordb'],
                  link: '#',
                  img: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop'
                },
                {
                  title: 'Design System',
                  desc: 'Token-based system with theming and motion.',
                  tags: ['design', 'system'],
                  link: '#',
                  img: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1200&auto=format&fit=crop'
                },
                {
                  title: 'Open Widget Kit',
                  desc: 'Embeddable widgets for dashboards.',
                  tags: ['widgets', 'oss'],
                  link: '#',
                  img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
                },
              ].map((p, i) => (
                <a key={i} href={p.link} className="group rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-sm transition-colors bg-white/60 dark:bg-neutral-900/60">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium group-hover:underline underline-offset-4">{p.title}</div>
                      <ExternalLink className="h-4 w-4 text-neutral-400" />
                    </div>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{p.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Section>

          <Section id="skills" title="Skills" icon={Layers}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
                { title: 'Backend', items: ['FastAPI', 'Node.js', 'MongoDB', 'Postgres'] },
                { title: 'AI/ML', items: ['LangChain', 'OpenAI', 'Vector DBs', 'Pinecone'] },
                { title: 'Mobile', items: ['React Native', 'Expo'] },
                { title: 'Tools', items: ['Git', 'Docker', 'Vite', 'Figma'] },
                { title: 'Cloud', items: ['Vercel', 'AWS', 'Railway'] },
              ].map((s) => (
                <div key={s.title} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <div className="mb-2 font-medium">{s.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <Badge key={i}>{i}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="blogs" title="Blogs" icon={BookOpen}>
            <div className="grid sm:grid-cols-2 gap-4">
              {blogs.map((b, i) => (
                <a key={i} href="#" className="group rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-900 transition bg-white/60 dark:bg-neutral-900/60">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={b.img} alt="cover" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium group-hover:underline underline-offset-4">{b.title}</div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {b.date}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {b.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Section>

          <Section id="open-source" title="Open Source" icon={Star}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm text-neutral-500">GitHub User:</div>
                <input
                  className="px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm"
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {repos.map((r) => (
                  <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition bg-white/60 dark:bg-neutral-900/60">
                    <div className="flex items-center justify-between">
                      <div className="font-medium hover:underline underline-offset-4 inline-flex items-center gap-2">
                        <Github className="h-4 w-4" /> {r.name}
                      </div>
                      <ExternalLink className="h-4 w-4 text-neutral-400" />
                    </div>
                    {r.description ? (
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{r.description}</p>
                    ) : null}
                    <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
                      <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" /> {r.stargazers_count}</span>
                      {r.language ? (
                        <span className="inline-flex items-center gap-1"><Code2 className="h-3 w-3" /> {r.language}</span>
                      ) : null}
                      {r.topics?.length ? (
                        <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" /> {r.topics.slice(0,2).join(', ')}</span>
                      ) : null}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Section>

          <Section id="contact" title="Contact" icon={LinkIcon}>
            <div className="grid sm:grid-cols-2 gap-4">
              <form className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 space-y-3 bg-white/60 dark:bg-neutral-900/60">
                <input className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent" placeholder="Your name" />
                <input className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent" placeholder="Email" />
                <textarea rows={4} className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent" placeholder="Message" />
                <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <Mail className="h-4 w-4" /> Send
                </button>
              </form>
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60">
                <div className="font-medium mb-2">Links</div>
                <div className="space-y-2 text-sm">
                  <a className="flex items-center gap-2 hover:underline" href="mailto:you@example.com"><Mail className="h-4 w-4" /> you@example.com</a>
                  <a className="flex items-center gap-2 hover:underline" href="https://github.com" target="_blank" rel="noreferrer"><Github className="h-4 w-4" /> github.com/yourhandle</a>
                  <a className="flex items-center gap-2 hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /> linkedin.com/in/you</a>
                  <a className="flex items-center gap-2 hover:underline" href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter className="h-4 w-4" /> twitter.com/you</a>
                </div>
              </div>
            </div>
          </Section>
        </main>

        {/* Right sidebar */}
        <aside className={`col-span-12 lg:col-span-2 ${rightOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-20 space-y-4">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60">
              <div className="font-medium mb-1">Currently Learning</div>
              <div className="flex flex-wrap gap-1.5">
                {['Rust', 'tRPC', 'Agents', 'RAG'].map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60">
              <div className="font-medium mb-1 inline-flex items-center gap-2"><PlayCircle className="h-4 w-4" /> Now Playing</div>
              <div className="mt-2 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=256&auto=format&fit=crop" alt="album" className="h-12 w-12 rounded-md object-cover" />
                <div>
                  <div className="text-sm font-medium">Lofi Coding Beats</div>
                  <div className="text-xs text-neutral-500">Focus • Chillhop</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60">
              <div className="font-medium mb-1 inline-flex items-center gap-2"><Hammer className="h-4 w-4" /> Toolbox</div>
              <div className="flex flex-wrap gap-1.5">
                {['VS Code', 'Raycast', 'Arc', 'Figma'].map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-center text-sm text-neutral-500">
        Built with a Notion-inspired aesthetic. Smooth, minimal, and responsive.
      </footer>
    </div>
  )
}
