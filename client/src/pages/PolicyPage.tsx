import { Link } from "react-router-dom";

export interface PolicySection {
  heading: string;
  body: string;
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}

export function PolicyPage({ eyebrow, title, intro, sections }: PolicyPageProps) {
  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white">
          Elixirr Essence
        </Link>
        <header className="mt-16 max-w-3xl border-b border-white/10 pb-12">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-amber-200/70">{eyebrow}</p>
          <h1 className="font-serif text-5xl leading-none text-white sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/55">{intro}</p>
        </header>
        <div className="grid gap-10 border-b border-white/10 py-12 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">Our promise</p>
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl text-white">{section.heading}</h2>
                <p className="mt-3 text-sm leading-7 text-white/55">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
        <p className="pt-8 text-sm text-white/35">
          Questions? <Link to="/contact" className="text-amber-200/80 hover:text-amber-100">Contact our team.</Link>
        </p>
      </div>
    </div>
  );
}
