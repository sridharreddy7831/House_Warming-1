import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import PetalOverlay from './components/PetalOverlay';
import {
  HeroSection,
  InvitationMessage,
  HostNames,
  DateTimeSection,
  AddressSection,
  ScheduleSection,
  RSVPSection,
} from './components/InvitationSections';

/* ─── Mobile Support ───────────────────────────────────────── */

/* ─── Right Panel Sections ───────────────────────────────── */
function InvitationContent() {
  return (
    <div style={{ padding: '0 1.5rem' }}>
      <HeroSection />

      {/* Decorative separator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0 auto', maxWidth: '500px', padding: '1rem 0' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--gold))' }} />
        <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>🪔</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--gold))' }} />
      </div>

      <InvitationMessage />
      <HostNames />
      <DateTimeSection />
      <AddressSection />
      <ScheduleSection />
      <RSVPSection />
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  const scrollY = useRef<number>(0);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.currentTime = 5; // Start at 5 seconds
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          document.removeEventListener('click', playAudio);
          document.removeEventListener('touchstart', playAudio);
        }).catch(() => {
          // Autoplay was prevented by browser, will try again on first interaction
        });
      }
    };

    // Try to auto-play immediately (some browsers allow if muted, or if user previously interacted)
    const timeout = setTimeout(playAudio, 1000);

    // Add interaction listeners as fallback for strict browsers
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('touchstart', playAudio, { once: true });

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  useEffect(() => {
    // Initial load animation delay
    setTimeout(() => setIsLoaded(true), 300);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const panel = isMobile ? window : rightPanelRef.current;
    if (!panel) return;

    const handleScroll = () => {
      if (isMobile) {
        const winScrollY = window.scrollY;
        scrollY.current = winScrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? winScrollY / docHeight : 0);
      } else {
        const el = rightPanelRef.current;
        if (!el) return;
        scrollY.current = el.scrollTop;
        const scrollMax = el.scrollHeight - el.clientHeight;
        setScrollProgress(scrollMax > 0 ? el.scrollTop / scrollMax : 0);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else if (rightPanelRef.current) {
      rightPanelRef.current.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      } else if (rightPanelRef.current) {
        rightPanelRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.2 }}
      style={{ height: '100dvh', overflow: 'hidden', display: 'flex', background: 'var(--maroon-dark)' }}
    >
      {/* ── Desktop Layout ─────────────────────────────────── */}
      {!isMobile ? (
        <>
          <div style={{
            width: '100%',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(160deg, #3a0609 0%, #1a0305 100%)',
            textAlign: 'center',
            padding: '2rem',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📱</div>
            <h2 className="font-display gold-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Mobile Experience Only
            </h2>
            <p className="font-english" style={{ color: 'var(--cream-dark)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6 }}>
              This premium interactive invitation is designed exclusively for mobile devices to provide the best possible cinematic experience.
              <br /><br />
              Please open this link on your smartphone to view the invitation.
            </p>
            <div style={{ marginTop: '2rem', width: '60px', height: '2px', background: 'var(--gold)' }} />
          </div>
        </>
      ) : (
        /* ── Mobile Layout ──────────────────────────────────── */
        <div style={{
          width: '100%',
          height: '100dvh',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #c4a7c5ff 0%, #fde891 70%, #fde891 100%)',
        }}>

          {/* Fixed m1.png (leaves and flowers) at the top top */}
          <div style={{
            position: 'absolute',
            top: -55,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/m1.png)',
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            zIndex: 10,
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
          }} />

          {/* Scrollable Container beneath the house */}
          <div
            style={{ position: 'absolute', inset: 0, overflowY: 'auto', zIndex: 1, paddingBottom: '15vh' }}
            onScroll={(e) => {
              const el = e.currentTarget;
              scrollY.current = el.scrollTop;
              const max = el.scrollHeight - el.clientHeight;
              setScrollProgress(max > 0 ? el.scrollTop / max : 0);
              
              // Play audio on first scroll if not playing
              if (!isPlaying && audioRef.current) {
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                }).catch(() => {
                  // Ignore
                });
              }
            }}
          >
            <div style={{ paddingTop: '8rem' /* space to not cover the marigolds on initial load initially */ }}>
              <InvitationContent />

              {/* Extra space at bottom to ensure last content clears the house image and stops in the middle */}
              <div style={{ height: '30vh' }} />
            </div>
          </div>

          <PetalOverlay isMobile={true} />

          {/* Fixed bottom house image layer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              zIndex: 10,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            {/* Base mask to make the scroll transition smooth */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '25vh',
              background: 'linear-gradient(to top, #fde891 15%, transparent)',
              zIndex: -1
            }} />

            <img
              src="/house.png"
              alt="House"
              style={{
                width: '100%',
                maxHeight: '45vh',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'drop-shadow(0 -5px 15px rgba(0,0,0,0.4))'
              }}
            />
          </motion.div>

          <audio ref={audioRef} src="/bg.mp3" loop />

          {/* Floating Audio Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleAudio}
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              zIndex: 50,
              background: 'rgba(239, 186, 60, 0.25)', // soft gold transp
              border: '1px solid var(--gold)',
              color: 'var(--maroon-dark)',
              padding: '0.5rem',
              borderRadius: '50%',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
