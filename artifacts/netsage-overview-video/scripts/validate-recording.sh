#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE="$ROOT/src/components/video/VideoTemplate.tsx"
HOOK="$ROOT/src/lib/video/hooks.ts"
TOML="$ROOT/.replit-artifact/artifact.toml"

grep -q 'videoAspectRatio = "16:9"' "$TOML"
grep -q 'useVideoPlayer' "$TEMPLATE"
grep -q 'window.startRecording' "$HOOK"
grep -q 'window.stopRecording' "$HOOK"
grep -q 'AnimatePresence mode="sync"' "$TEMPLATE"
grep -q 'overflow: hidden' "$ROOT/src/index.css"

scene_count="$(find "$ROOT/src/components/video/video_scenes" -name 'Scene*.tsx' | wc -l | tr -d ' ')"
if [ "$scene_count" -lt 5 ]; then
  echo "Expected at least 5 scene files, found $scene_count" >&2
  exit 1
fi

echo "recording lifecycle valid: 16:9, hook, start/stop, looping scene stack"