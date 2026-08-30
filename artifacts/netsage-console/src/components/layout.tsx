import { Activity, BarChart3, BookOpenCheck, BrainCircuit, ChevronRight, ClipboardCheck, FileSearch, LayoutDashboard, Menu, Network, ScrollText, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const navGroups = [
  { label: 'Workspace', items: [
    { href: '/', label: 'Command center', icon: LayoutDashboard },
    { href: '/diagnose', label: 'Diagnose', icon: FileSearch },
    { href: '/cases', label: 'Cases', icon: Network },
  ] },
  { label: 'Intelligence', items: [
    { href: '/rules', label: 'Rule checks', icon: BookOpenCheck },
    { href: '/ai-analysis', label: 'AI analysis', icon: BrainCircuit },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ] },
  { label: 'Governance', items: [
    { href: '/reviews', label: 'Human reviews', icon: ClipboardCheck },
    { href: '/responsible-ai', label: 'Decision log', icon: ShieldCheck },
  ] },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageName = location === '/' ? 'Command center' : navGroups.flatMap((group) => group.items).find((item) => item.href === location)?.label ?? 'Console';
  return (
    <div className="min-h-[100dvh] bg-background text-foreground md:flex">
      <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 md:static md:translate-x-0`}>
        <div className="flex h-[74px] items-center justify-between border-b border-sidebar-border px-5">
          <Link href="/" data-testid="link-brand" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Activity size={20} strokeWidth={2.6} /></span>
            <span><span className="block text-[15px] font-extrabold tracking-[-0.02em] text-white">NetSage</span><span className="font-mono-ui block text-[9px] uppercase tracking-[0.2em] text-sidebar-foreground/60">AI console</span></span>
          </Link>
          <button aria-label="Close navigation" data-testid="button-close-navigation" onClick={() => setMobileOpen(false)} className="rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent md:hidden"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-6">
          {navGroups.map((group) => <div key={group.label} className="mb-7">
            <div className="mb-2 px-3 font-mono-ui text-[9px] font-medium uppercase tracking-[0.19em] text-sidebar-foreground/45">{group.label}</div>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const active = location === item.href;
                const Icon = item.icon;
                return <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-[12px] font-semibold transition-colors ${active ? 'bg-sidebar-accent text-white' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-white'}`}>
                  <Icon size={16} className={active ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-primary'} /><span>{item.label}</span>{active && <ChevronRight size={14} className="ml-auto text-sidebar-primary" />}
                </Link>;
              })}
            </nav>
          </div>)}
        </div>
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/60 p-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--accent))] text-[11px] font-extrabold text-[hsl(var(--accent-foreground))]">AR</div>
            <div className="min-w-0"><div className="truncate text-[11px] font-bold text-white">Alex Rivera</div><div className="font-mono-ui text-[9px] text-sidebar-foreground/50">NOC · shift B</div></div>
            <span className="ml-auto h-2 w-2 rounded-full bg-sidebar-primary animate-pulse-line" title="Online" />
          </div>
        </div>
      </aside>
      {mobileOpen && <button aria-label="Close navigation overlay" data-testid="button-overlay-close" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-[hsl(var(--foreground)/.35)] md:hidden" />}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3"><button aria-label="Open navigation" data-testid="button-open-navigation" onClick={() => setMobileOpen(true)} className="rounded-md p-2 hover:bg-muted md:hidden"><Menu size={20} /></button><div><div className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Operations / {pageName}</div><h1 className="mt-1 text-[15px] font-extrabold tracking-[-0.02em]">{pageName}</h1></div></div>
          <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" /><span className="font-mono-ui text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Demo data</span></div><div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-[10px] font-extrabold text-primary">AR</div></div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div><div className="font-mono-ui mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">{eyebrow ?? 'Network intelligence'}</div><h2 className="text-2xl font-extrabold tracking-[-0.04em] md:text-[30px]">{title}</h2>{description && <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted-foreground">{description}</p>}</div>
    {action}
  </div>;
}