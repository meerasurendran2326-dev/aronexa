import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    startRecording?: () => void;
    stopRecording?: () => void;
  }
}

export function useVideoPlayer({ durations }: { durations: Record<string, number> }) {
  const sceneKeys = useMemo(() => Object.keys(durations), [durations]);
  const [currentScene, setCurrentScene] = useState(0);
  const hasStoppedRecording = useRef(false);

  useEffect(() => {
    window.startRecording?.();
  }, []);

  useEffect(() => {
    const duration = durations[sceneKeys[currentScene]];
    const timer = window.setTimeout(() => {
      if (currentScene === sceneKeys.length - 1) {
        if (!hasStoppedRecording.current) {
          window.stopRecording?.();
          hasStoppedRecording.current = true;
        }
        setCurrentScene(0);
      } else {
        setCurrentScene((scene) => scene + 1);
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [currentScene, durations, sceneKeys]);

  return { currentScene, sceneKeys };
}