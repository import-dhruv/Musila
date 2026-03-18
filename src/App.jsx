import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

// ─── REPLACE THESE WITH YOUR CLOUDFLARE R2 URLs ───────────────────────────
const VIDEO_URL = "/background.mp4";
const SONG_URL  = "/funkify.mp3";
const SONG_NAME = "Your Song Name";
// ──────────────────────────────────────────────────────────────────────────

export default function App() {
  const [playing, setPlaying]     = useState(false);
  const [current, setCurrent]     = useState(0);   // seconds elapsed
  const [duration, setDuration]   = useState(0);   // total seconds
  const [seeking, setSeeking]     = useState(false);
  const howlRef                   = useRef(null);
  const rafRef                    = useRef(null);

  // ── Init Howl once ────────────────────────────────────────────────────
  useEffect(() => {
    const sound = new Howl({
      src: [SONG_URL],
      html5: true,           // stream — don't wait for full 161 MB download
      preload: true,
      onload() {
        setDuration(sound.duration());
      },
      onend() {
        setPlaying(false);
        setCurrent(0);
      },
    });
    howlRef.current = sound;
    return () => sound.unload();
  }, []);

  // ── RAF loop to update scrubber while playing ─────────────────────────
  useEffect(() => {
    const tick = () => {
      if (howlRef.current && !seeking) {
        setCurrent(howlRef.current.seek() || 0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (playing) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, seeking]);

  // ── Controls ──────────────────────────────────────────────────────────
  const togglePlay = () => {
    if (!howlRef.current) return;
    if (playing) {
      howlRef.current.pause();
      setPlaying(false);
    } else {
      howlRef.current.play();
      setPlaying(true);
    }
  };

  const restart = () => {
    if (!howlRef.current) return;
    howlRef.current.seek(0);
    setCurrent(0);
    if (!playing) {
      howlRef.current.play();
      setPlaying(true);
    }
  };

  const skipForward = () => {
    if (!howlRef.current) return;
    const next = Math.min(current + 10, duration);
    howlRef.current.seek(next);
    setCurrent(next);
  };

  const onScrub = (e) => {
    const val = parseFloat(e.target.value);
    setCurrent(val);
    if (howlRef.current) howlRef.current.seek(val);
  };

  // ── Helpers ───────────────────────────────────────────────────────────
  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans">

      {/* ── Video Background ────────────────────────────────────────── */}
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* ── Dark gradient overlay ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <div className="px-5 py-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md">
          <span className="text-white text-sm font-semibold tracking-widest uppercase">
            Funk
          </span>
        </div>
        <span className="text-white/40 text-xs tracking-wider">
          Made by @importdhruv
        </span>
      </div>

      {/* ── Player ──────────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[420px] z-10">

        {/* Song name */}
        <div className="mb-3 px-5 py-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl">
          <p className="text-white text-sm font-medium tracking-wide truncate">
            {SONG_NAME}
          </p>
        </div>

        {/* Progress + controls */}
        <div className="px-5 pt-4 pb-5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl">

          {/* Time labels */}
          <div className="flex justify-between mb-2">
            <span className="text-white/50 text-xs tabular-nums">{fmt(current)}</span>
            <span className="text-white/50 text-xs tabular-nums">{fmt(duration)}</span>
          </div>

          {/* Scrubber */}
          <div className="relative mb-5">
            {/* Track background */}
            <div className="w-full h-1 rounded-full bg-white/15" />
            {/* Filled portion */}
            <div
              className="absolute top-0 left-0 h-1 rounded-full bg-white transition-all"
              style={{ width: `${progress}%` }}
            />
            {/* Native range (invisible, sits on top for interaction) */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={current}
              onChange={onScrub}
              onMouseDown={() => setSeeking(true)}
              onMouseUp={() => setSeeking(false)}
              onTouchStart={() => setSeeking(true)}
              onTouchEnd={() => setSeeking(false)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">

            {/* Restart / Prev */}
            <button
              onClick={restart}
              className="w-11 h-11 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/15 transition flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 transition flex items-center justify-center"
            >
              {playing ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip +10s */}
            <button
              onClick={skipForward}
              className="w-11 h-11 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/15 transition flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM14 6v12h2V6h-2z" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
