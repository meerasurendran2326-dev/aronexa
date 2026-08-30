import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Check, ShieldAlert } from 'lucide-react';

const metrics = [
  { label: 'TOTAL CASES', value: '178', tone: 'paper' },
  { label: 'AI DIAGNOSED', value: '71%', tone: 'coral' },
  { label: 'AGREEMENT', value: '86%', tone: 'teal' },
];

export function Scene1() {
  return (
    <motion.section
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 1, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={`${import.meta.env.BASE_URL}media/netsage-network-map.png`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[.20] mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_46%,rgba(226,111,88,.16),transparent_35%),linear-gradient(110deg,#151b20_12%,rgba(21,27,32,.85)_54%,#151b20_100%)]" />
      <div className="absolute left-[4.4vw] top-[21vh] max-w-[41vw]">
        <motion.div className="caption mb-[2.2vh] flex items-center gap-[.7vw]" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2, duration: .5 }}>
          <span className="h-px w-[2.8vw] bg-[var(--coral)]" /> NETWORK OPERATIONS, RECOMPOSED
        </motion.div>
        <motion.h1 className="display-xl max-w-[8em]" initial={{ opacity: 0, y: 35, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: .38, duration: .9, ease: [0.16, 1, 0.3, 1] }}>
          Find the fault<br /><span className="text-[var(--coral)]">faster.</span>
        </motion.h1>
        <motion.p className="body-sm mt-[3.4vh] max-w-[28vw] text-[var(--paper-dim)]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .65 }}>
          NetSage turns messy network evidence into a traceable decision path — from first signal to final audit.
        </motion.p>
      </div>
      <motion.div className="absolute right-[4.4vw] top-[17vh] w-[45vw] rounded-[.45vw] border border-[var(--line)] bg-[rgba(28,37,43,.86)] p-[1.2vw] shadow-2xl backdrop-blur-md" initial={{ opacity: 0, x: 90, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ delay: .75, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mb-[1.1vw] flex items-center justify-between border-b border-[var(--line)] pb-[.9vw]">
          <div className="flex items-center gap-[.6vw]"><div className="grid h-[1.5vw] w-[1.5vw] place-items-center rounded-[.2vw] bg-[var(--coral)] text-[var(--ink)]"><Activity size="1vw" /></div><span className="text-[clamp(10px,1vw,16px)] font-semibold">Shift overview</span></div>
          <span className="mono text-[clamp(7px,.55vw,10px)] text-[var(--muted)]">08 MAR 2025 · 14:35 UTC</span>
        </div>
        <div className="grid grid-cols-3 gap-[.65vw]">
          {metrics.map((metric, index) => <motion.div key={metric.label} className="rounded-[.3vw] border border-[var(--line)] bg-[rgba(242,238,230,.035)] p-[.9vw]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 + index * .12, duration: .45 }}><div className="mono text-[clamp(7px,.53vw,10px)] tracking-[.12em] text-[var(--muted)]">{metric.label}</div><div className={`mt-[.55vw] font-mono text-[clamp(19px,2vw,32px)] ${metric.tone === 'coral' ? 'text-[var(--coral)]' : metric.tone === 'teal' ? 'text-[var(--teal)]' : 'text-[var(--paper)]'}`}>{metric.value}</div></motion.div>)}
        </div>
        <div className="mt-[.7vw] grid grid-cols-[1.5fr_1fr] gap-[.65vw]">
          <div className="rounded-[.3vw] border border-[var(--line)] p-[.9vw]"><div className="mb-[.5vw] flex justify-between"><span className="mono text-[clamp(7px,.53vw,10px)] text-[var(--muted)]">CASE FLOW / 7 DAYS</span><span className="text-[clamp(8px,.55vw,10px)] text-[var(--teal)]">+8.4%</span></div><svg viewBox="0 0 320 105" className="h-[8.7vw] w-full"><path d="M0 78 C28 71 33 64 58 71 S92 47 116 57 S145 28 170 44 S204 26 226 35 S262 20 290 25 S306 14 320 18 V105 H0Z" fill="rgba(226,111,88,.10)" /><motion.path d="M0 78 C28 71 33 64 58 71 S92 47 116 57 S145 28 170 44 S204 26 226 35 S262 20 290 25 S306 14 320 18" fill="none" stroke="var(--coral)" strokeWidth="2.5" pathLength="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.25, duration: 1.6 }} /><path d="M0 90 C34 82 52 85 78 82 S114 69 140 76 S184 51 211 64 S246 52 271 53 S302 40 320 44" fill="none" stroke="var(--teal)" strokeWidth="2" strokeDasharray="4 5" /></svg></div>
          <div className="rounded-[.3vw] border border-[rgba(226,111,88,.25)] bg-[rgba(226,111,88,.05)] p-[.9vw]"><div className="flex items-center gap-[.45vw] text-[var(--coral)]"><ShieldAlert size="1vw" /><span className="mono text-[clamp(7px,.53vw,10px)]">OPERATOR FOCUS</span></div><div className="mt-[1.1vw] text-[clamp(11px,1vw,16px)] font-semibold leading-[1.18]">2 high-impact cases</div><div className="mt-[.65vw] text-[clamp(8px,.65vw,11px)] leading-[1.4] text-[var(--paper-dim)]">West aggregation latency is correlating with physical interface errors.</div><div className="mt-[1.25vw] h-[.3vw] w-full overflow-hidden rounded-full bg-[rgba(242,238,230,.1)]"><motion.div className="h-full w-[68%] bg-[var(--coral)]" initial={{ scaleX: 0, transformOrigin: 'left' }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: .8 }} /></div></div>
        </div>
        <div className="mt-[.75vw] flex items-center gap-[.5vw] text-[var(--teal)]"><BrainCircuit size="1vw" /><span className="mono text-[clamp(7px,.55vw,10px)]">EVIDENCE PIPELINE ONLINE</span><Check size="1vw" className="ml-auto" /></div>
      </motion.div>
    </motion.section>
  );
}