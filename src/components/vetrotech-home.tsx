import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Code2,
  Cpu,
  Database,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Network,
  Phone,
  Rocket,
  ShoppingBag,
  Sparkles,
  Star,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const brandLogo = "/images/1709979833185.jpg";

const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Solutions", "solutions"],
  ["Industries", "industries"],
  ["Why VetroTech", "why-vetrotech"],
  ["Contact", "contact"],
] as const;

const services: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Software Development",
    description: "Custom web and business applications built for performance, scalability and usability.",
    icon: Code2,
  },
  {
    title: "IT Consulting",
    description: "Technology guidance that helps organizations make informed decisions and improve their digital capabilities.",
    icon: MessageSquareText,
  },
  {
    title: "Web Development",
    description: "Modern, responsive and high-performance websites and web applications.",
    icon: Layers3,
  },
  {
    title: "Cloud Solutions",
    description: "Cloud-ready architectures and solutions designed for flexibility, reliability and scalability.",
    icon: CloudCog,
  },
  {
    title: "Digital Transformation",
    description: "Modernize existing processes, systems and customer experiences through technology.",
    icon: Workflow,
  },
  {
    title: "Enterprise Solutions",
    description: "Business-focused software solutions designed to streamline operations and support growth.",
    icon: Building2,
  },
];

const industries: Array<{ name: string; icon: LucideIcon }> = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Finance", icon: LineChart },
  { name: "Retail & E-commerce", icon: ShoppingBag },
  { name: "Real Estate", icon: Building2 },
  { name: "Manufacturing", icon: Factory },
  { name: "Professional Services", icon: BriefcaseBusiness },
  { name: "Startups & SMEs", icon: Rocket },
];

const reasons = [
  ["Business-First Approach", "Technology decisions aligned with business objectives."],
  ["Scalable Engineering", "Solutions designed to grow with changing business requirements."],
  ["Modern Technology", "Current, dependable and maintainable development practices."],
  ["Transparent Collaboration", "Clear communication throughout planning, development and delivery."],
  ["Quality-Focused", "Reliability, usability, performance and maintainability at every stage."],
  ["Long-Term Partnership", "Support for businesses beyond initial implementation."],
] as const;

const process = [
  ["Discover", "Understand your business, users and requirements."],
  ["Plan", "Define the solution, technology and implementation strategy."],
  ["Build", "Design and develop using modern engineering practices."],
  ["Test", "Validate performance, usability, security and reliability."],
  ["Launch", "Deploy the solution and support the transition."],
  ["Improve", "Continuously optimize and evolve the product."],
] as const;

const solutions = [
  ["Business Applications", "Streamline operations with purpose-built software.", Layers3],
  ["Digital Platforms", "Create scalable platforms connecting customers, teams and processes.", Network],
  ["Automation", "Reduce repetitive work and improve efficiency through intelligent automation.", Workflow],
  ["Data & Analytics", "Turn business data into useful insights for better decision-making.", BarChart3],
] as const;

const GOOGLE_REVIEWS_URL = "";

function Brand({ header = false }: { header?: boolean }) {
  return (
    <a href="#home" aria-label="VetroTech Soft Solutions home" className="flex shrink-0 items-center">
      <img
        src={brandLogo}
        alt="VetroTech Soft Solutions"
        className={header ? "h-auto w-[110px] max-w-full object-contain sm:w-[125px] lg:w-[140px]" : "h-20 w-24 object-fill"}
      />
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-border bg-background/95 shadow-sm backdrop-blur-xl" : "border-transparent bg-background/80 backdrop-blur-md"}`}>
      <div className="page-shell grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-1 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Brand header />
        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-1 lg:flex">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-md px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <Button asChild variant="corporate" className="hidden lg:inline-flex">
          <a href="#contact">Get a Consultation <ArrowRight /></a>
        </Button>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-4 pb-5 pt-3 shadow-xl lg:hidden">
          <div className="mx-auto flex max-w-lg flex-col">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="border-b border-border/70 py-3 text-sm font-semibold text-foreground">
                {label}
              </a>
            ))}
            <Button asChild variant="corporate" size="lg" className="mt-4 w-full">
              <a href="#contact" onClick={() => setOpen(false)}>Get a Consultation <ArrowRight /></a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, copy, centered = false, inverse = false }: { eyebrow: string; title: string; copy?: string; centered?: boolean; inverse?: boolean }) {
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`section-kicker ${inverse ? "text-brand-cyan" : ""}`}><span className="h-px w-6 bg-current" />{eyebrow}</p>
      <h2 className={`mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.65rem] ${inverse ? "text-primary-foreground" : "text-brand-deep"}`}>{title}</h2>
      {copy && <p className={`mt-5 text-base leading-8 sm:text-lg ${inverse ? "text-primary-foreground/65" : "text-muted-foreground"}`}>{copy}</p>}
    </div>
  );
}

function TechnologyVisual() {
  return (
    <div className="hero-grid relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-lg border border-brand-line/25 bg-brand-deep p-5 shadow-2xl shadow-brand-deep/25 sm:p-8" aria-label="Connected digital systems architecture illustration" role="img">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/30 via-transparent to-primary/10" />
      <div className="relative flex h-full flex-col justify-between rounded-md border border-primary-foreground/10 bg-brand-deep/80 p-5 backdrop-blur-sm sm:p-7">
        <div className="flex items-center justify-between border-b border-primary-foreground/10 pb-4">
          <div className="flex gap-2"><span className="size-2 rounded-full bg-brand-cyan" /><span className="size-2 rounded-full bg-primary/80" /><span className="size-2 rounded-full bg-primary-foreground/30" /></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground/45">Systems overview</span>
        </div>
        <div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="space-y-3">
            {["Strategy", "Experience", "Engineering"].map((item, i) => <div key={item} className="flex items-center gap-3 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-3"><span className={`size-2 rounded-full ${i === 1 ? "bg-brand-cyan" : "bg-primary"}`} /><span className="text-[11px] font-semibold text-primary-foreground/70">{item}</span></div>)}
          </div>
          <div className="h-px w-5 bg-brand-cyan/50" />
          <div className="relative grid aspect-square place-items-center rounded-full border border-brand-cyan/30">
            <div className="node-pulse absolute inset-5 rounded-full border border-primary/50" />
            <div className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"><Cpu className="size-7" /></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[Database, CloudCog, BarChart3].map((Icon, index) => <div key={index} className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-3 sm:p-4"><Icon className="size-4 text-brand-cyan" /><div className="mt-4 h-1.5 rounded-full bg-primary-foreground/10"><div className={`h-full rounded-full bg-primary ${index === 0 ? "w-4/5" : index === 1 ? "w-2/3" : "w-3/4"}`} /></div></div>)}
        </div>
      </div>
      <div className="absolute right-[12%] top-[18%] size-3 rounded-full bg-brand-cyan shadow-lg shadow-brand-cyan/70" />
      <div className="absolute bottom-[24%] left-[8%] size-2 rounded-full bg-primary" />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-pale pb-16 pt-32 sm:pb-20 sm:pt-36 lg:min-h-[760px] lg:pb-24 lg:pt-40">
      <div className="absolute inset-x-0 top-0 h-px bg-brand-line/40" />
      <div className="page-shell grid items-center gap-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
        <div className="reveal min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-line/50 bg-background px-3 py-2 text-xs font-semibold text-brand-navy shadow-sm">
            <MapPin className="size-3.5 text-primary" /> Trusted Technology & Consulting Partner in Hyderabad
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-[1.1] text-brand-deep sm:text-5xl lg:text-[3.65rem]">
            Technology Solutions That Move Your Business <span className="text-primary">Forward</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            VetroTech Soft Solutions helps businesses transform ideas into reliable digital solutions through software development, IT consulting, cloud technologies and modern digital engineering.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="corporate" size="lg"><a href="#contact">Get a Free Consultation <ArrowRight /></a></Button>
            <Button asChild variant="corporateOutline" size="lg"><a href="#services">Explore Our Services <ChevronRight /></a></Button>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-muted-foreground">
            {["Business-aligned", "Scalable by design", "Clear collaboration"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" />{item}</span>)}
          </div>
        </div>
        <TechnologyVisual />
      </div>
    </section>
  );
}

function Stats() {
  const stats = [["4.4★", "Google Rating"], ["72+", "Google Reviews"], ["Hyderabad", "India"], ["End-to-End", "Technology Solutions"]];
  return <section aria-label="Company trust indicators" className="border-y border-border bg-background"><div className="page-shell grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">{stats.map(([value, label]) => <div key={label} className="px-4 py-8 text-center sm:px-8"><strong className="block text-xl font-extrabold text-brand-deep sm:text-2xl">{value}</strong><span className="mt-2 block text-xs font-semibold text-muted-foreground sm:text-sm">{label}</span></div>)}</div></section>;
}

function About() {
  return (
    <section id="about" className="section-space bg-background">
      <div className="page-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative min-h-[460px] overflow-hidden rounded-lg bg-brand-deep p-6 shadow-xl sm:p-9">
          <div className="hero-grid absolute inset-0 opacity-60" />
          <div className="relative flex h-full min-h-[400px] flex-col justify-between">
            <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-cyan">Digital capability map</span><Network className="text-primary-foreground/40" /></div>
            <div className="grid grid-cols-2 gap-4">
              {[{ n: "01", t: "Consult", i: MessageSquareText }, { n: "02", t: "Architect", i: Layers3 }, { n: "03", t: "Engineer", i: Code2 }, { n: "04", t: "Scale", i: LineChart }].map(({ n, t, i: Icon }) => <div key={n} className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur-sm"><div className="flex items-center justify-between"><Icon className="size-5 text-brand-cyan" /><span className="text-xs text-primary-foreground/35">{n}</span></div><p className="mt-8 font-bold text-primary-foreground">{t}</p></div>)}
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-primary-foreground/55"><span className="h-px flex-1 bg-primary-foreground/15" /> Strategy to reliable delivery</div>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="About VetroTech" title="Technology Expertise. Business-Focused Thinking." />
          <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
            <p>VetroTech Soft Solutions is a Hyderabad-based software and IT consulting company focused on helping businesses solve technology challenges and build scalable digital solutions.</p>
            <p>Our approach combines technical expertise, practical business understanding and modern engineering practices to deliver solutions designed around each client&apos;s goals.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">{["Business-focused solutions", "Modern technology stack", "Scalable architecture", "Transparent communication"].map((benefit) => <div key={benefit} className="flex items-center gap-3 border-b border-border py-3 text-sm font-semibold text-foreground"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-primary"><Check className="size-3.5" /></span>{benefit}</div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-space bg-muted/60">
      <div className="page-shell">
        <SectionHeading centered eyebrow="What We Do" title="Our Technology Services" copy="From strategy and development to digital transformation, we provide technology solutions designed around your business needs." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({ title, description, icon: Icon }, index) => <article key={title} className="group rounded-lg border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-brand-deep/5"><div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-md bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-5" /></span><span className="text-xs font-bold text-muted-foreground/60">0{index + 1}</span></div><h3 className="mt-7 text-xl font-bold text-brand-deep">{title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">{description}</p><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Discuss this service <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a></article>)}</div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="section-space relative overflow-hidden bg-brand-deep">
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="page-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <div><SectionHeading inverse eyebrow="Solutions" title="Solutions Built Around Real Business Needs" /><div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">{solutions.map(([title, copy, Icon]) => <div key={title} className="border-l border-primary-foreground/15 pl-5"><Icon className="size-5 text-brand-cyan" /><h3 className="mt-4 font-bold text-primary-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/55">{copy}</p></div>)}</div></div>
        <div className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/50">Operating view</span><span className="flex items-center gap-2 text-xs font-semibold text-brand-cyan"><span className="node-pulse size-2 rounded-full bg-brand-cyan" /> Live architecture</span></div>
          <div className="mt-6 grid grid-cols-3 gap-3"><div className="col-span-2 rounded-md bg-primary-foreground/8 p-5"><BarChart3 className="size-5 text-brand-cyan" /><div className="mt-8 flex h-24 items-end gap-2">{["h-[45%] opacity-45", "h-[70%] opacity-55", "h-[54%] opacity-60", "h-[88%] opacity-70", "h-[72%] opacity-80", "h-[95%] opacity-90"].map((barClass, i) => <div key={i} className={`flex-1 rounded-t-sm bg-primary ${barClass}`} />)}</div></div><div className="space-y-3">{[Database, CloudCog, Network].map((Icon, i) => <div key={i} className="grid aspect-square place-items-center rounded-md border border-primary-foreground/10 bg-primary-foreground/5"><Icon className="size-5 text-primary-foreground/60" /></div>)}</div></div>
          <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-md border border-primary-foreground/10 p-4"><span className="text-xs text-primary-foreground/45">System readiness</span><div className="mt-3 h-2 rounded-full bg-primary-foreground/10"><div className="h-full w-4/5 rounded-full bg-brand-cyan" /></div></div><div className="rounded-md border border-primary-foreground/10 p-4"><span className="text-xs text-primary-foreground/45">Connected services</span><p className="mt-2 text-xl font-bold text-primary-foreground">Integrated</p></div></div>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return <section id="industries" className="section-space bg-background"><div className="page-shell"><SectionHeading centered eyebrow="Industry Perspective" title="Technology Across Industries" copy="Flexible technology expertise for organizations with different operating models, customer needs and growth priorities." /><div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{industries.map(({ name, icon: Icon }) => <div key={name} className="group flex min-h-36 flex-col items-center justify-center rounded-md border border-border bg-card p-4 text-center transition-all hover:border-primary/35 hover:bg-brand-pale"><Icon className="size-6 text-primary transition-transform group-hover:-translate-y-1" /><h3 className="mt-4 text-xs font-bold leading-5 text-brand-deep">{name}</h3></div>)}</div></div></section>;
}

function WhyChooseUs() {
  return (
    <section id="why-vetrotech" className="section-space bg-brand-pale">
      <div className="page-shell grid gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-20">
        <div><SectionHeading eyebrow="Why VetroTech" title="Why Businesses Choose VetroTech" /><div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">{reasons.map(([title, copy]) => <div key={title}><div className="flex items-center gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-4" /></span><h3 className="font-bold text-brand-deep">{title}</h3></div><p className="mt-3 pl-10 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div>
        <div className="rounded-lg border border-brand-line/40 bg-background p-7 shadow-xl shadow-brand-deep/5 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">From need to outcome</p>
          <div className="relative mt-8 space-y-0 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-brand-line">{[["Understand", "Business context"], ["Shape", "Practical direction"], ["Deliver", "Reliable technology"], ["Evolve", "Continued value"]].map(([title, label], i) => <div key={title} className="relative grid grid-cols-[40px_1fr] gap-4 pb-9 last:pb-0"><span className="z-10 grid size-10 place-items-center rounded-full border border-brand-line bg-background text-xs font-extrabold text-primary">{i + 1}</span><div><h3 className="font-bold text-brand-deep">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{label}</p></div></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return <section className="section-space bg-background"><div className="page-shell"><SectionHeading centered eyebrow="Our Process" title="How We Work" copy="A clear, collaborative path from the first conversation to continuous improvement." /><ol className="relative mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-6">{process.map(([title, copy], i) => <li key={title} className="relative"><div className="flex items-center"><span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand-line bg-brand-pale text-sm font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>{i < process.length - 1 && <span className="hidden h-px flex-1 bg-brand-line lg:block" />}</div><h3 className="mt-5 text-base font-bold text-brand-deep">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></li>)}</ol></div></section>;
}

function Reviews() {
  const [notice, setNotice] = useState(false);
  const openReviews = () => {
    if (GOOGLE_REVIEWS_URL) window.open(GOOGLE_REVIEWS_URL, "_blank", "noopener,noreferrer");
    else setNotice(true);
  };
  return <section className="border-y border-border bg-muted/60 py-16"><div className="page-shell grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><p className="section-kicker"><span className="h-px w-6 bg-current" />Customer trust</p><h2 className="mt-4 text-3xl font-bold text-brand-deep">What Our Customers Say</h2><p className="mt-3 text-sm text-muted-foreground">Public Google rating and review count, without fabricated testimonials.</p></div><div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><strong className="text-4xl font-extrabold text-brand-deep">4.4 <span className="text-lg text-muted-foreground">/ 5</span></strong><div><div className="flex gap-1 text-primary" aria-label="4.4 out of 5 stars">{[0,1,2,3,4].map((star) => <Star key={star} className="size-4 fill-current" />)}</div><span className="mt-1 block text-xs font-semibold text-muted-foreground">72 Google Reviews</span></div></div><Button variant="corporateOutline" onClick={openReviews}>View Google Reviews <ArrowRight /></Button></div>{notice && <p role="status" className="md:col-span-2 text-sm text-muted-foreground">The official Google review link has not been supplied yet.</p>}</div></section>;
}

function CTA() {
  return <section className="bg-primary py-16 sm:py-20"><div className="page-shell grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/65">Start a conversation</p><h2 className="mt-4 text-3xl font-bold text-primary-foreground sm:text-4xl">Have a Technology Challenge? Let&apos;s Talk.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/75">Tell us what you&apos;re trying to build, improve or transform. Our team can help you identify the right technology approach.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button asChild variant="light" size="lg"><a href="#contact">Start a Conversation <ArrowRight /></a></Button><Button asChild variant="lightOutline" size="lg"><a href="#contact">Contact Us</a></Button></div></div></section>;
}

type FormState = { fullName: string; email: string; phone: string; company: string; service: string; message: string };
const emptyForm: FormState = { fullName: "", email: "", phone: "", company: "", service: "", message: "" };

function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const submissionIdRef = useRef<string | null>(null);
  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSent(false);
    setSubmitError("");
    submissionIdRef.current = null;
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid business email.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!form.service) next.service = "Please choose a service.";
    if (form.message.trim().length < 10) next.message = "Please share a little more about your requirement.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSent(false);
    setSubmitError("");
    submissionIdRef.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/submit-enquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submissionId: submissionIdRef.current }),
      });
      const result: { success?: boolean; message?: string } | null = await response
        .json()
        .catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "We couldn't submit your enquiry. Please try again.");
      }

      setSent(true);
      setForm(emptyForm);
      setErrors({});
      submissionIdRef.current = null;
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't submit your enquiry. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="section-space bg-brand-pale">
      <div className="page-shell"><SectionHeading eyebrow="Contact" title="Let’s Build Something Valuable Together" copy="Share your technology goals with our Hyderabad team and start a practical conversation about the next step." />
        <div className="mt-12 grid overflow-hidden rounded-lg border border-border bg-background shadow-xl shadow-brand-deep/5 lg:grid-cols-[.82fr_1.18fr]">
          <div className="bg-brand-deep p-7 sm:p-10 lg:p-12">
            <Brand />
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-brand-cyan">Contact information</p>
            <div className="mt-7 space-y-7">
              <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-brand-cyan" /><div><p className="text-sm font-bold text-primary-foreground">Office address</p><address className="mt-2 text-sm not-italic leading-7 text-primary-foreground/60">Piller No. 744, KS Bakers Lane, Padmajas Raja Enclave, Flat No. 403, above Amrutha Swagruha Foods, near KPHB Bus Stop, Hyderabad, Telangana 500072</address></div></div>
              <div className="flex gap-4"><Phone className="size-5 shrink-0 text-brand-cyan" /><div><p className="text-sm font-bold text-primary-foreground">Phone</p><a href="tel:+917842810649" className="mt-2 block text-sm text-primary-foreground/60 hover:text-primary-foreground">078428 10649</a></div></div>
              <div className="flex gap-4"><MapPin className="size-5 shrink-0 text-brand-cyan" /><div><p className="text-sm font-bold text-primary-foreground">Location</p><p className="mt-2 text-sm text-primary-foreground/60">Hyderabad, Telangana, India</p></div></div>
              <div className="flex gap-4"><Mail className="size-5 shrink-0 text-brand-cyan" /><div><p className="text-sm font-bold text-primary-foreground">Email</p><p className="mt-2 text-sm text-primary-foreground/60">Available upon request</p></div></div>
            </div>
          </div>
          <form onSubmit={submit} noValidate className="p-7 sm:p-10 lg:p-12" aria-label="Business inquiry form" aria-busy={isSubmitting}>
            <h3 className="text-2xl font-bold text-brand-deep">Tell us about your requirement</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id="fullName" label="Full Name *" error={errors.fullName}><Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} aria-invalid={Boolean(errors.fullName)} className="h-12" autoComplete="name" disabled={isSubmitting} /></Field>
              <Field id="email" label="Business Email *" error={errors.email}><Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} className="h-12" autoComplete="email" disabled={isSubmitting} /></Field>
              <Field id="phone" label="Phone Number *" error={errors.phone}><Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} className="h-12" autoComplete="tel" disabled={isSubmitting} /></Field>
              <Field id="company" label="Company"><Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} className="h-12" autoComplete="organization" disabled={isSubmitting} /></Field>
              <div className="sm:col-span-2"><Field id="service" label="Service Required *" error={errors.service}><Select value={form.service} onValueChange={(value) => update("service", value)} disabled={isSubmitting}><SelectTrigger id="service" className="h-12" aria-invalid={Boolean(errors.service)}><SelectValue placeholder="Select a service" /></SelectTrigger><SelectContent>{services.map(({ title }) => <SelectItem key={title} value={title}>{title}</SelectItem>)}</SelectContent></Select></Field></div>
              <div className="sm:col-span-2"><Field id="message" label="Message *" error={errors.message}><Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} aria-invalid={Boolean(errors.message)} className="min-h-32 resize-y" placeholder="Tell us what you are looking to build, improve or transform." disabled={isSubmitting} /></Field></div>
            </div>
            {sent && <div role="status" className="mt-5 flex items-start gap-3 rounded-md border border-success/25 bg-success/10 p-4 text-sm text-foreground"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" /><span>Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.</span></div>}
            {submitError && <p role="alert" className="mt-5 text-sm font-medium text-destructive">{submitError}</p>}
            <Button type="submit" variant="corporate" size="lg" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>Send Inquiry <ArrowRight /></Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}{error && <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">{error}</p>}</div>;
}

function Footer() {
  return <footer className="bg-brand-deep pt-16 text-primary-foreground"><div className="page-shell grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"><div><Brand /><p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/55">A Hyderabad-based software and IT consulting company helping businesses build reliable, scalable digital solutions.</p></div><FooterColumn title="Company" links={[["About", "#about"], ["Services", "#services"], ["Solutions", "#solutions"], ["Industries", "#industries"], ["Contact", "#contact"]]} /><FooterColumn title="Services" links={[["Software Development", "#services"], ["IT Consulting", "#services"], ["Web Development", "#services"], ["Cloud Solutions", "#services"], ["Digital Transformation", "#services"]]} /><div><h3 className="text-sm font-bold">Contact</h3><div className="mt-5 space-y-4 text-sm text-primary-foreground/55"><p className="flex gap-3"><MapPin className="size-4 shrink-0 text-brand-cyan" />Hyderabad, Telangana</p><a href="tel:+917842810649" className="flex gap-3 hover:text-primary-foreground"><Phone className="size-4 shrink-0 text-brand-cyan" />078428 10649</a></div></div></div><div className="border-t border-primary-foreground/10"><div className="page-shell flex flex-col gap-4 py-6 text-xs text-primary-foreground/45 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 VetroTech Soft Solutions. All Rights Reserved.</p><div className="flex gap-5"><span>Privacy Policy</span><span>Terms &amp; Conditions</span></div></div></div></footer>;
}

function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return <div><h3 className="text-sm font-bold">{title}</h3><ul className="mt-5 space-y-3">{links.map(([label, href]) => <li key={label}><a href={href} className="text-sm text-primary-foreground/55 transition-colors hover:text-primary-foreground">{label}</a></li>)}</ul></div>;
}

export function VetroTechHome() {
  return <><Navbar /><main><Hero /><Stats /><About /><Services /><Solutions /><Industries /><WhyChooseUs /><Process /><Reviews /><CTA /><Contact /></main><Footer /></>;
}