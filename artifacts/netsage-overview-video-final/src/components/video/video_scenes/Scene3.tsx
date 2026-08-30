import { motion } from 'framer-motion';
import { Check, CircleDot, GitBranch, ShieldCheck, X } from 'lucide-react';

const checks = [
  ['Interface state', 'Gi0/1 is up / up on both sides', 'passed'],
  ['Allowed VLANs', 'VLAN 20 is present on the trunk', 'passed'],
  ['Native VLAN', 'SW1 native 1 ≠ SW2 native 20', 'failed'],
  ['Encapsulation', '802.1Q negotiated successfully', 'passed'],
];

export function Scene3() {
  return (
    <motion.section className="relative h-screen w-full overflow-hidden" initial={{ opacity: 0, clipPath: 'polygon(100% 0,100% 0,100% 100%,72% 100%)' }} animate={{ opacity: 1, clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} exit={{ opacity: 1, clipPath: 'polygon(0 0,28% 0,28% 100%,0 100%)' }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 bg-[#1b2628]" />
      <motion.div className="absolute right-[-10vw] top-[-12vw] h-[55vw] w-[55vw] rounded-full border border-[rgba(131,184,171,.15)]" animate={{ rotate: [0, 18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute inset-y-0 right-0 w-[38vw] bg-[linear-gradient(90deg,transparent,rgba(131,184,171,.06))]" />
      <div className="absolute left-[4.4vw] top-[15vh]"><div className="caption mb-[2.3vh] text-[var(--teal)]">02 / Remove the guesswork</div><h2 className="display-lg">Rules before<br /><span className="text-[var(--coral)]">reasoning.</span></h2><p className="body-sm mt-[3vh] max-w-[24vw] text-[var(--paper-dim)]">A deterministic layer shows what the evidence can prove — and where a human or model still needs to look.</p></div>
      <motion.div className="absolute right-[4.6vw] top-[15vh] w-[49vw] rounded-[.45vw] border border-[var(--line)] bg-[rgba(21,27,32,.72)] p-[1.25vw] backdrop-blur" initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .35, duration: .8, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-[1vw]"><div className="flex items-center gap-[.6vw]"><div className="grid h-[1.7vw] w-[1.7vw] place-items-center rounded-[.25vw] bg-[rgba(131,184,171,.14)] text-[var(--teal)]"><GitBranch size="1vw" /></div><div><div className="mono text-[clamp(7px,.52vw,10px)] text-[var(--muted)]">EXECUTION TIMELINE</div><div className="mt-[.25vw] text-[clamp(12px,1.1vw,18px)] font-semibold">Trace from input to review</div></div></div><span className="mono text-[clamp(7px,.5vw,9px)] text-[var(--teal)]">4 / 4 CHECKS</span></div>
        <div className="relative mt-[1.2vw] space-y-[.1vw]">{checks.map(([label, detail, status], index) => <motion.div key={label} className="relative flex gap-[.8vw] py-[.85vw]" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .7 + index * .17, duration: .48, ease: [0.16, 1, 0.3, 1] }}><div className="relative flex w-[1.4vw] shrink-0 justify-center">{index < checks.length - 1 && <span className="absolute top-[1.6vw] h-[4vw] w-px bg-[var(--line)]" />}{status === 'failed' ? <span className="relative z-10 grid h-[1.35vw] w-[1.35vw] place-items-center rounded-full bg-[var(--coral)] text-[var(--ink)]"><X size=".75vw" /></span> : <span className="relative z-10 grid h-[1.35vw] w-[1.35vw] place-items-center rounded-full border border-[var(--teal)] text-[var(--teal)]"><Check size=".75vw" /></span>}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><div className="text-[clamp(10px,.85vw,14px)] font-semibold">{label}</div><span className={`mono text-[clamp(7px,.5vw,9px)] ${status === 'failed' ? 'text-[var(--coral)]' : 'text-[var(--teal)]'}`}>{status.toUpperCase()}</span></div><div className="mt-[.35vw] text-[clamp(8px,.65vw,11px)] text-[var(--paper-dim)]">{detail}</div></div></motion.div>)}</div>
        <motion.div className="mt-[.9vw] flex items-center gap-[.6vw] border-t border-[var(--line)] pt-[.9vw] text-[var(--amber)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55, duration: .5 }}><ShieldCheck size="1vw" /><span className="mono text-[clamp(7px,.53vw,10px)]">BOUNDED INPUT FOR AI ANALYSIS</span><CircleDot size=".8vw" className="ml-auto animate-pulse" /></motion.div>
      </motion.div>
      <div className="absolute bottom-[13vh] left-[4.4vw] flex items-center gap-[.6vw]"><span className="mono text-[clamp(8px,.62vw,11px)] text-[var(--muted)]">RULE ENGINE</span><span className="h-px w-[8vw] bg-[var(--teal)]" /><span className="mono text-[clamp(8px,.62vw,11px)] text-[var(--teal)]">TRANSPARENT BY DEFAULT</span></div>
    </motion.section>
  );
}