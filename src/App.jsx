import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

// GitHub Release URLs - both video and audio hosted externally
const VIDEO_URL = "https://github.com/import-dhruv/Musila/releases/download/v1.0.0/background.mp4";
const SONG_URL  = "https://github.com/import-dhruv/Musila/releases/download/v1.0.0/funkify.mp3";

// ── All timestamps from description ─────────────────────────────────────────
const TRACKS = [
  { time: "00:00", name: "HOMAGE FUNK" },
  { time: "02:01", name: "MONTAGEM XONADA" },
  { time: "03:17", name: "NO BATIDÃO (Slowed)" },
  { time: "05:05", name: "From The Start" },
  { time: "06:24", name: "Sonho Do Amor" },
  { time: "08:01", name: "DIRTY SHOES FUNK" },
  { time: "09:33", name: "PASSO BEM SOLTO (Slowed)" },
  { time: "11:29", name: "ACELERADA" },
  { time: "12:30", name: "NO ERA AMOR (Super Slowed)" },
  { time: "14:15", name: "MONTAGEM MIAU (Slowed)" },
  { time: "15:40", name: "Montagem Supersonic" },
  { time: "17:08", name: "VAI VAI TRAIR" },
  { time: "18:38", name: "Noite Delicia" },
  { time: "20:11", name: "Funk de Beleza (Slowed)" },
  { time: "22:36", name: "Dark Red (Funk Ultra Slowed)" },
  { time: "25:21", name: "MONTAGEM DIREÇÃO" },
  { time: "26:41", name: "SUPERSONIKA MONTAGEM" },
  { time: "28:47", name: "LUA NA PRAÇA" },
  { time: "30:16", name: "MONTAGEM COMA" },
  { time: "31:29", name: "Vem Vem" },
  { time: "32:52", name: "Nada Nada" },
  { time: "34:22", name: "LUNA BALA (Slowed)" },
  { time: "36:26", name: "VAI CAIR" },
  { time: "37:57", name: "GUANO VIA (Super Slowed)" },
  { time: "39:44", name: "BABE" },
  { time: "42:59", name: "SEM SAÍDA" },
  { time: "44:00", name: "VEI VAI TREMER" },
  { time: "45:37", name: "MONTAGEM QUÍMICO" },
  { time: "47:10", name: "ESTA NOCHE" },
  { time: "48:18", name: "MONTAGEM LADRAO (Slowed)" },
  { time: "49:43", name: "FUNK DO BOUNCE" },
  { time: "51:19", name: "MONTAGEM BEM SOLTO" },
  { time: "53:01", name: "TE CONOCÍ (Ultra Slowed)" },
  { time: "55:51", name: "Funk de Beleza 2" },
  { time: "57:53", name: "MONTAGEM DEIXAR" },
  { time: "59:07", name: "Eternxlkz - ENOUGH!" },
  { time: "01:00:38", name: "SOKA!" },
  { time: "01:02:07", name: "MONTAGEM VOZES TALENTINHO (Super Slowed)" },
  { time: "01:03:49", name: "RITMO DE VERAO (SLOWED)" },
  { time: "01:05:28", name: "MONTAGEM AMOSTRA" },
  { time: "01:07:07", name: "CLIMA LINDO (SLOWED)" },
  { time: "01:08:29", name: "Montagem Au Miau" },
  { time: "01:09:51", name: "NEXT!" },
  { time: "01:11:31", name: "MONTAGEM BAILÃO" },
  { time: "01:13:15", name: "Ela Domina Phonk" },
  { time: "01:15:08", name: "AL NACER!" },
  { time: "01:17:23", name: "MONTAGEM RUGADA" },
  { time: "01:19:16", name: "Montagem Hypersonic" },
  { time: "01:20:50", name: "SEMPERO (Super Slowed)" },
  { time: "01:23:15", name: "DIA DELÍCIA (Slowed)" },
  { time: "01:24:40", name: "MONTAGEM TOMADA (Slowed)" },
  { time: "01:26:05", name: "MONTAGEM BAILÃO" },
  { time: "01:27:48", name: "YOSHO HAI MONTAGEM" },
  { time: "01:29:12", name: "Montagem Carrusel" },
  { time: "01:30:35", name: "Funk de Beleza (Slowed)" },
  { time: "01:33:00", name: "VEM NO PIQUE" },
  { time: "01:34:41", name: "envy (slowed)" },
  { time: "01:36:47", name: "Eternxlkz - SLAY!" },
  { time: "01:38:35", name: "TOPA TOPA TOPA" },
  { time: "01:39:55", name: "VAI NO VAPOR" },
  { time: "01:40:57", name: "CANTO DE LUNA (ULTRA SLOWED)" },
  { time: "01:43:00", name: "SPOOKY" },
  { time: "01:44:37", name: "MASHA ULTRAFUNK" },
  { time: "01:46:11", name: "AVANGARD (Slowed + Reverb)" },
  { time: "01:49:28", name: "MATUSHKA ULTRAFUNK" },
  { time: "01:51:53", name: "Vois sur ton chemin (DJ Holanda Remix)" },
  { time: "01:54:20", name: "Manasha (Over Slowed)" },
  { time: "01:56:35", name: "DON'T STOP - Slowed" },
  { time: "01:59:35", name: "God Frequency" },
  { time: "02:01:11", name: "Reflection!" },
  { time: "02:02:22", name: "Montagem Bandido" },
  { time: "02:03:49", name: "Automotivo Nostalgia Retrô" },
  { time: "02:04:55", name: "Slide De Sepultura" },
  { time: "02:06:20", name: "FUNK SIGILO (SLOWED)" },
  { time: "02:08:04", name: "DERNIERE DANCE FUNK" },
  { time: "02:09:35", name: "GHOST IN SHELL!" },
  { time: "02:10:47", name: "LXNGVX - YUM YUM" },
  { time: "02:12:57", name: "O Melhor no Que Faz 3.0" },
  { time: "02:14:57", name: "NO FEAR!" },
  { time: "02:16:47", name: "Assim Bas La Vida Funk (Super Slowed)" },
  { time: "02:18:49", name: "NUNCA MUDA (PHONK)" },
  { time: "02:20:11", name: "FUNK DO BALKAN (Slowed + Reverb)" },
  { time: "02:21:31", name: "SEQUÊNCIA MALÉFICA 1.0" },
  { time: "02:23:08", name: "Eu Sento Gabu!" },
  { time: "02:24:31", name: "FUNK INFERNAL" },
  { time: "02:26:01", name: "MEIA NOITE - Ultra Slowed" },
  { time: "02:27:31", name: "MONTAGEM FIM ESTRELAR (SLOWED)" },
  { time: "02:29:19", name: "BELONG TO ME FUNK" },
  { time: "02:30:57", name: "Whine in Brazil" },
  { time: "02:32:33", name: "Sequência da Dz7" },
  { time: "02:34:33", name: "DNA" },
  { time: "02:36:02", name: "FEAR!" },
  { time: "02:37:25", name: "Passo Bem Heavenly" },
  { time: "02:39:21", name: "Ecos da Rua" },
  { time: "02:40:56", name: "Hamood Habibi Funk (Super Slowed)" },
  { time: "02:42:56", name: "CUTE DEPRESSED" },
  { time: "02:44:33", name: "2 Phut Hon Funk (Slowed)" },
  { time: "02:47:17", name: "MONTAGEM REPO (SUPER SLOWED)" },
  { time: "02:48:48", name: "HDN, LOXP" },
  { time: "02:50:23", name: "BLUE HORIZON FUNK - SUPER SLOWED" },
].map(({ time, name }) => {
  const parts = time.split(":").map(Number);
  const seconds =
    parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : parts[0] * 60 + parts[1];
  return { seconds, name };
});

const getCurrentTrack = (currentSeconds) => {
  let current = TRACKS[0].name;
  for (const track of TRACKS) {
    if (currentSeconds >= track.seconds) current = track.name;
    else break;
  }
  return current;
};

export default function App() {
  const [playing, setPlaying]   = useState(false);
  const [current, setCurrent]   = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking]   = useState(false);
  const [loaded, setLoaded]     = useState(false);
  const [songName, setSongName] = useState(TRACKS[0].name);
  const howlRef                 = useRef(null);
  const rafRef                  = useRef(null);
  const videoRef                = useRef(null);

  // Handle video autoplay from GitHub Releases
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      
      const playVideo = async () => {
        try {
          await video.play();
          console.log('GitHub release video started playing');
        } catch (error) {
          console.log('Video autoplay blocked:', error.message);
          // Video will play when user clicks play button
        }
      };
      
      // Add a small delay for GitHub CDN
      const handleCanPlay = () => {
        setTimeout(playVideo, 500);
      };
      
      if (video.readyState >= 3) {
        playVideo();
      } else {
        video.addEventListener('canplay', handleCanPlay, { once: true });
      }
      
      // Cleanup
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  useEffect(() => {
    const sound = new Howl({
      src: [SONG_URL],
      html5: true,
      preload: true,
      onload() {
        setDuration(sound.duration());
        setLoaded(true);
      },
      onend() {
        setPlaying(false);
        setCurrent(0);
      },
    });
    howlRef.current = sound;
    return () => sound.unload();
  }, []);

  useEffect(() => {
    const tick = () => {
      if (howlRef.current && !seeking) {
        const pos = howlRef.current.seek() || 0;
        setCurrent(pos);
        setSongName(getCurrentTrack(pos));
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

  const togglePlay = () => {
    if (!howlRef.current || !loaded) return;
    
    // Try to start video when user interacts
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(console.error);
    }
    
    if (playing) { howlRef.current.pause(); setPlaying(false); }
    else { howlRef.current.play(); setPlaying(true); }
  };

  const skipBack = () => {
    if (!howlRef.current || !loaded) return;
    const prevTracks = TRACKS.filter((t) => t.seconds < current - 3);
    const prev = prevTracks[prevTracks.length - 1] || TRACKS[0];
    howlRef.current.seek(prev.seconds);
    setCurrent(prev.seconds);
    setSongName(prev.name);
  };

  const skipForward = () => {
    if (!howlRef.current || !loaded) return;
    const next = TRACKS.find((t) => t.seconds > current);
    if (next) {
      howlRef.current.seek(next.seconds);
      setCurrent(next.seconds);
      setSongName(next.name);
    }
  };

  const onScrub = (e) => {
    const val = parseFloat(e.target.value);
    setCurrent(val);
    setSongName(getCurrentTrack(val));
    if (howlRef.current) howlRef.current.seek(val);
  };

  const fmt = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans">

      {/* Video Background - GitHub Releases CDN */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ 
          filter: 'brightness(0.8) contrast(1.1)',
          transform: 'scale(1.01)'
        }}
        onLoadStart={() => console.log('Loading video from GitHub Releases...')}
        onLoadedData={() => console.log('GitHub video data loaded successfully')}
        onCanPlay={() => console.log('GitHub video ready to play')}
        onError={(e) => {
          console.error('GitHub video error:', e.target.error);
          console.log('Using gradient background fallback');
          e.target.style.display = 'none';
        }}
        onProgress={() => {
          const video = videoRef.current;
          if (video && video.buffered.length > 0) {
            const buffered = (video.buffered.end(0) / video.duration) * 100;
            if (buffered > 0) {
              console.log(`GitHub video buffered: ${buffered.toFixed(1)}%`);
            }
          }
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Enhanced Fallback background - always visible until video loads */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-60"
        style={{ zIndex: -1 }}
      />
      
      {/* Animated background particles for better visual appeal */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {/* Top bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10">
        <img src="logo.png" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="text-white/40 text-xs sm:text-sm tracking-wider">Made by @importdhruv</span>
      </div>

      {/* Player */}
      <div className="absolute bottom-4 sm:bottom-10 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[420px] z-10">

        {/* Song name */}
        <div className="mb-3 px-4 sm:px-5 py-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl">
          <p className="text-white text-sm font-medium tracking-wide truncate">
            {loaded ? songName : "Loading music..."}
          </p>
        </div>

        {/* Progress + controls */}
        <div className="px-4 sm:px-5 pt-4 pb-5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl">

          {/* Time */}
          <div className="flex justify-between mb-2">
            <span className="text-white/50 text-xs tabular-nums">{fmt(current)}</span>
            <span className="text-white/50 text-xs tabular-nums">{fmt(duration)}</span>
          </div>

          {/* Scrubber */}
          <div className="relative mb-5 py-2 -my-2">
            <div className="w-full h-1 rounded-full bg-white/15" />
            <div className="absolute top-2 left-0 h-1 rounded-full bg-white" style={{ width: `${progress}%` }} />
            <input
              type="range" min={0} max={duration || 100} step={0.1} value={current}
              onChange={onScrub}
              onMouseDown={() => setSeeking(true)} onMouseUp={() => setSeeking(false)}
              onTouchStart={() => setSeeking(true)} onTouchEnd={() => setSeeking(false)}
              className="absolute top-0 left-0 w-full h-5 opacity-0 cursor-pointer"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">

            <button onClick={skipBack} disabled={!loaded}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/15 transition flex items-center justify-center disabled:opacity-40">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button onClick={togglePlay} disabled={!loaded}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed">
              {!loaded ? (
                <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : playing ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={skipForward} disabled={!loaded}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/15 transition flex items-center justify-center disabled:opacity-40">
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
