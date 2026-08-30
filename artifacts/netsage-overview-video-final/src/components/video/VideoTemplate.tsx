import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from '@/components/video/video_scenes/Scene1';
import { Scene2 } from '@/components/video/video_scenes/Scene2';
import { Scene3 } from '@/components/video/video_scenes/Scene3';
import { Scene4 } from '@/components/video/video_scenes/Scene4';
import { Scene5 } from '@/components/video/video_scenes/Scene5';
import { Scene6 } from '@/components/video/video_scenes/Scene6';

export const SCENE_DURATIONS = {
  dashboard: 3600,
  evidence: 4200,
  rules: 3900,
  intelligence: 4700,
  review: 3500,
  audit: 4300,
};

const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

function PersistentField({ currentScene }: { currentScene: number }) {
  const orbPositions = [
    { x: '72vw', y: '8vh', scale: 1.25, color: 'rgba(226,111,88,.22)' },
    { x: '12vw', y: '68vh', scale: .8, color: 'rgba(131,184,171,.2)' },
    { x: '66vw', y: '74vh', scale: 1.05, color: 'rgba(231,182,108,.18)' },
    { x: '18vw', y: '13vh', scale: .9, color: 'rgba(226,111,88,.2)' },
    { x: '82vw', y: '48vh', scale: 1.1, color: 'rgba(131,184,171,.18)' },
    { x: '46vw', y: '11vh', scale: 1.4, color: 'rgba(231,182,108,.13)' },
  ];
  const orb = orbPositions[currentScene] ?? orbPositions[0];
  return (
    <>
      <motion.div
        className="pointer-events-none absolute z-0 h-[28vw] w-[28vw] rounded-full blur-[5vw]"
        animate={{ left: orb.x, top: orb.y, scale: orb.scale, backgroundColor: orb.color }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute left-[-10vw] top-[58vh] z-0 h-[42vw] w-[42vw] rounded-full border border-[rgba(242,238,230,.06)]"
        animate={{ rotate: currentScene * 19, scale: 1 + currentScene * .025 }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-18vw] top-[-15vw] z-0 h-[48vw] w-[48vw] rounded-full border border-[rgba(242,238,230,.07)]"
        animate={{ rotate: -currentScene * 13, scale: 1.03 - currentScene * .02 }}
        transition={{ duration: 2.1, ease: 'easeInOut' }}
      />
    </>
  );
}

export default function VideoTemplate() {
  const { currentScene, sceneKeys } = useVideoPlayer({ durations: SCENE_DURATIONS });
  const Scene = scenes[currentScene] ?? Scene1;
  return (
    <main className="video-frame">
      <div className="grid-veil pointer-events-none absolute inset-0 z-0 opacity-80" />
      <PersistentField currentScene={currentScene} />
      <div className="paper-noise" />
      <header className="absolute left-[4.4vw] right-[4.4vw] top-[4vh] z-20 flex items-center justify-between">
        <div className="flex items-center gap-[.7vw]">
          <motion.div
            className="grid h-[2.2vw] min-h-[20px] w-[2.2vw] min-w-[20px] place-items-center rounded-[.35vw] bg-[var(--coral)] text-[var(--ink)]"
            animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-mono text-[clamp(10px,.8vw,14px)] font-medium">N</span>
          </motion.div>
          <div className="font-semibold tracking-[-.04em] text-[clamp(14px,1.35vw,23px)]">netsage<span className="text-[var(--coral)]">.</span></div>
        </div>
        <div className="mono flex items-center gap-[.7vw] text-[clamp(8px,.6vw,11px)] tracking-[.14em] text-[var(--muted)]">
          <span className="inline-block h-[.5vw] min-h-[5px] w-[.5vw] min-w-[5px] rounded-full bg-[var(--teal)] pulse" />
          OPERATIONS / LIVE TRACE
        </div>
      </header>
      <div className="absolute inset-0 z-10">
        <AnimatePresence mode="sync" initial={false}>
          <Scene key={sceneKeys[currentScene]} />
        </AnimatePresence>
      </div>
      <footer className="absolute bottom-[4vh] left-[4.4vw] right-[4.4vw] z-20 flex items-end justify-between">
        <span className="mono text-[clamp(8px,.6vw,11px)] tracking-[.12em] text-[var(--muted)]">EVIDENCE → DECISION → LEARNING</span>
        <div className="flex gap-[.35vw]">
          {sceneKeys.map((key, index) => (
            <motion.span
              key={key}
              className="h-[.25vw] min-h-[3px] rounded-full"
              animate={{ width: index === currentScene ? '2.4vw' : '.45vw', backgroundColor: index === currentScene ? 'var(--coral)' : 'rgba(242,238,230,.25)' }}
              transition={{ duration: .35 }}
            />
          ))}
        </div>
      </footer>
    </main>
  );
}