import { motion } from 'framer-motion';
import { ArrowDownRight, CircleDot, Terminal } from 'lucide-react';

const evidence = [
  ['SYMPTOM', 'Hosts in VLAN 20 cannot reach the default gateway.'],
  ['TOPOLOGY', 'SW1 Gi0/1 ↔ SW2 Gi0/1 · trunk uplink'],
  ['EXPECTED FAULT', 'Native VLAN mismatch on the trunk link'],
  ['OSI LAYER', 'Layer 2 · Data Link'],
];

export function Scene2() {
  return (
    <motion.section className="relative h-screen w-full overflow-hidden" initial={{ opacity: 0, clipPath: 'circle(0% at 92% 50%)' }} animate={{ opacity: 1, clipPath: 'circle(150% at 92% 50%)' }} exit={{ opacity: 1, clipPath: 'circle(0% at 6% 50%)' }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 bg-[linear-gradient(125deg,#151b20_0%,#1a252a_52%,#172c2e_100%)]" />
      <div className="absolute right-0 top-0 h-full w-[43vw] bg-[radial-gradient(circle_at_50%_48%,rgba(131,184,171,.18),transparent_52%)]" />
      <div className="absolute left-0 top-[18vh] h-px w-[55vw] bg-[var(--line)]" />
      <div className="absolute left-[4.4vw] top-[17vh] max-w-[34vw]">
        <motion.div className="caption mb-[2.5vh] text-[var(--teal)]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .4 }}>01 / Capture the signal</motion.div>
        <motion.h2 className="display-lg" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .45, duration: .75 }}>Every case<br /><span className="text-[var(--teal)]">starts with proof.</span></motion.h2>
        <motion.p className="body-sm mt-[3vh] max-w-[24vw] text-[var(--paper-dim)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: .6 }}>Raw command output, topology notes, and symptoms stay attached to the decision — not buried in a ticket.</motion.p>
        <motion.div className="mt-[4vh] flex items-center gap-[.7vw] text-[var(--paper-dim)]" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.35, duration: .5 }}><ArrowDownRight size="1.2vw" className="text-[var(--coral)]" /><span className="mono text-[clamp(8px,.65vw,11px)]">C001 · TRUNK / VLAN</span></motion.div>
      </div>
      <motion.div className="absolute right-[5vw] top-[15vh] w-[46vw] rounded-[.45vw] border border-[var(--line)] bg-[rgba(21,27,32,.78)] p-[1.2vw] backdrop-blur-md" initial={{ opacity: 0, x: 55, rotate: 1.5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ delay: .55, duration: .85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-[.9vw]"><div><span className="mono text-[clamp(8px,.57vw,10px)] text-[var(--coral)]">EVIDENCE PACKET</span><div className="mt-[.35vw] text-[clamp(13px,1.2vw,19px)] font-semibold">VLAN 20 trunk fault</div></div><span className="rounded-full border border-[rgba(226,111,88,.35)] px-[.6vw] py-[.3vw] mono text-[clamp(7px,.5vw,9px)] text-[var(--coral)]">HIGH</span></div>
        <div className="grid grid-cols-2 gap-x-[1vw]">{evidence.map(([label, value], index) => <motion.div key={label} className="border-b border-[var(--line)] py-[1.05vw]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85 + index * .12, duration: .4 }}><div className="mono text-[clamp(7px,.52vw,10px)] tracking-[.13em] text-[var(--muted)]">{label}</div><div className="mt-[.55vw] text-[clamp(9px,.75vw,13px)] leading-[1.35] text-[var(--paper)]">{value}</div></motion.div>)}</div>
        <div className="mt-[1vw] rounded-[.3vw] border border-[rgba(131,184,171,.26)] bg-[rgba(131,184,171,.06)] p-[.85vw]"><div className="mb-[.6vw] flex items-center gap-[.45vw] text-[var(--teal)]"><Terminal size="1vw" /><span className="mono text-[clamp(7px,.52vw,10px)]">CAPTURED OUTPUT</span></div><div className="space-y-[.35vw] mono text-[clamp(7px,.58vw,10px)] text-[var(--paper-dim)]"><div><span className="text-[var(--teal)]">$</span> show interfaces trunk</div><div><span className="text-[var(--teal)]">$</span> show vlan brief</div><div className="text-[var(--coral)]">! native VLAN mismatch detected</div></div></div>
      </motion.div>
      <svg className="absolute bottom-[11vh] left-[4.4vw] h-[15vh] w-[48vw] overflow-visible" viewBox="0 0 560 110" fill="none"><motion.path d="M12 58 H180 C205 58 214 16 246 16 H312 C337 16 350 58 376 58 H548" stroke="rgba(131,184,171,.72)" strokeWidth="1.5" strokeDasharray="8 10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1.1 }} /><motion.circle cx="12" cy="58" r="7" fill="var(--ink)" stroke="var(--coral)" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: 'spring', stiffness: 300 }} /><motion.circle cx="548" cy="58" r="7" fill="var(--ink)" stroke="var(--teal)" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, type: 'spring', stiffness: 300 }} /><motion.circle cx="280" cy="16" r="6" fill="var(--coral)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, type: 'spring' }} /><text x="0" y="90" fill="rgba(242,238,230,.55)" fontSize="10" fontFamily="DM Mono">SW1</text><text x="520" y="90" fill="rgba(242,238,230,.55)" fontSize="10" fontFamily="DM Mono">SW2</text><text x="247" y="2" fill="rgba(226,111,88,.9)" fontSize="9" fontFamily="DM Mono">Gi0/1</text><CircleDot x="260" y="72" size="12" className="text-[var(--coral)]" /></svg>
    </motion.section>
  );
}