import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SparklesText } from './ui/sparkles-text';
import { Instagram, Briefcase, MessageCircleHeart } from 'lucide-react';

/* ─── Animation Variants ─────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

/* ─── AnimatedSection Wrapper ────────────────────────────── */
function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={stagger}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Gold Divider ───────────────────────────────────────── */
function GoldDivider() {
  return (
    <motion.div variants={fadeIn} className="gold-divider" />
  );
}

/* ─── Ornament ───────────────────────────────────────────── */
function Ornament({ text = '✦' }: { text?: string }) {
  return (
    <motion.span variants={fadeIn} style={{ color: 'var(--gold)', margin: '0 0.5rem', opacity: 0.8 }}>
      {text}
    </motion.span>
  );
}

/* ─── Section Title ──────────────────────────────────────── */
export function SectionTitle({ text }: { text: string }) {
  return (
    <SparklesText
      text={text}
      sparklesCount={8}
      colors={{ first: '#5c0a14', second: '#8b1a2a' }} // Maroon and deep red sparkles
      className="text-center font-display w-full flex justify-center"
      style={{ marginBottom: '3.5rem', marginTop: '3.5rem' }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.04 } },
          hidden: {}
        }}
        className="text-center font-display"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 10, stiffness: 100 } }
            }}
            className="gold-text"
            style={{
              letterSpacing: '0.12em',
              fontSize: '1.6rem', // Increased size
              textTransform: 'uppercase',
              display: 'inline-block',
              fontWeight: 800,
              textShadow: '2px 2px 10px rgba(92,10,20,0.1)'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </SparklesText>
  );
}

/* ─── Section 1: Hero Title ──────────────────────────────── */
export function HeroSection() {
  return (
    <AnimatedSection className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: 'calc(100vh - 25vh)', paddingBottom: '10vh' }}>
      {/* Top Ornament */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
        <Ornament text="✦" />
        <span style={{ color: 'var(--gold)', letterSpacing: '0.25em', fontSize: '0.75rem', textTransform: 'uppercase', fontFamily: 'var(--font-english)' }}>
          Auspicious Invitation
        </span>
        <Ornament text="✦" />
      </motion.div>

      {/* Telugu Main Title */}
      <motion.h1
        variants={fadeUp}
        className="font-telugu gold-text"
        style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          lineHeight: 1.15,
          marginBottom: '1rem',
          textShadow: '0 0 40px rgba(92,10,20,0.2)',
        }}
      >
        శుభ గృహ ప్రవేశం
      </motion.h1>

      <GoldDivider />

      {/* English Subtitle */}
      <motion.p
        variants={fadeUp}
        className="font-display"
        style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          color: 'var(--cream)',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
          fontStyle: 'italic',
        }}
      >
        House Warming Ceremony
      </motion.p>
      <motion.p
        variants={fadeUp}
        style={{ color: 'var(--gold)', letterSpacing: '0.3em', fontSize: '0.85rem', textTransform: 'uppercase' }}
      >
        ~ Invitation ~
      </motion.p>

      {/* Scroll Hint */}
      <motion.div
        variants={fadeIn}
        style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ color: 'var(--gold)', opacity: 0.6, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ color: 'var(--gold)', fontSize: '1.2rem' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ─── Section 2: Invitation Message ─────────────────────── */
export function InvitationMessage() {
  return (
    <AnimatedSection className="py-24 px-8">
      <div className="glass-card ornament-border text-center" style={{ maxWidth: '520px', margin: '0 auto' }}>
        {/* God's name */}
        <motion.p variants={fadeUp} className="font-telugu" style={{ color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
          శ్రీ వేంకటేశ్వర స్వామి ఆశీస్సులతో
        </motion.p>

        <GoldDivider />

        <motion.p
          variants={fadeUp}
          className="font-english"
          style={{
            color: 'var(--cream)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.85,
            fontStyle: 'italic',
          }}
        >
          With the divine blessings of{' '}
          <span style={{ color: 'var(--gold-light)' }}>Lord Venkateswara</span>,<br />
          we humbly request the honor of your presence<br />
          at the <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Gruhapravesam</span> ceremony<br />
          of our new abode.
        </motion.p>

        <GoldDivider />

        <motion.p variants={fadeUp} className="font-telugu" style={{ color: 'var(--cream-dark)', fontSize: '0.95rem', lineHeight: 1.9 }}>
          మీ అందరి ఆశీర్వాదాలు మాకు అమూల్యం.<br />
          మీరు తప్పక రావాలని మనసారా కోరుకుంటున్నాము.
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

/* ─── Section 3: Host Names ──────────────────────────────── */
export function HostNames() {
  return (
    <AnimatedSection className="py-20 px-6 text-center">
      <SectionTitle text="✦ Invited By ✦" />

      {/* Main Host */}
      <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
        <h2
          className="font-display gold-text"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', lineHeight: 1.2, fontWeight: 700 }}
        >
          Uppalapati Prabhas Raju
        </h2>
      </motion.div>

      <motion.div variants={fadeIn} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Ornament text="✦" /><Ornament text="✦" /><Ornament text="✦" />
      </motion.div>

      {/* Parents */}
      <motion.div variants={fadeUp} className="glass-card" style={{ display: 'inline-block', padding: '1.2rem 2.5rem' }}>
        <p className="font-english" style={{ color: 'var(--cream-dark)', fontSize: '0.95rem', lineHeight: 1.9 }}>
          <span style={{ color: 'var(--gold)' }}>S/o</span> Late Sri Uppalapati Surya Narayana Raju <br />
          & Smt. Siva Kumari
        </p>
      </motion.div>
    </AnimatedSection>
  );
}

/* ─── Section 4: Date & Time ─────────────────────────────── */
export function DateTimeSection() {
  const items = [
    { icon: '📅', label: 'Date', value: 'Tuesday, 6th April 2027', sub: 'Chaitra Bahula Amavasya' },
    { icon: '⏰', label: 'Time', value: '8:00 AM Onwards', sub: 'Muhurtham: 9:15 AM – 10:45 AM' },
  ];

  return (
    <AnimatedSection className="py-20 px-6">
      <SectionTitle text="✦ Auspicious Date & Time ✦" />

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="glass-card animate-glow"
            style={{ padding: '2rem', textAlign: 'center', minWidth: '220px', flex: '1 1 220px' }}
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.5 }}
              style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
            >
              {item.icon}
            </motion.div>
            <p style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {item.label}
            </p>
            <p className="font-display" style={{ color: 'var(--cream)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              {item.value}
            </p>
            <p className="font-english" style={{ color: 'var(--gold-light)', fontSize: '0.85rem', fontStyle: 'italic' }}>
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ─── Section 5: Address ─────────────────────────────────── */
export function AddressSection() {
  return (
    <AnimatedSection className="py-20 px-6 text-center">
      <SectionTitle text="✦ Venue ✦" />

      <motion.div variants={fadeUp} className="glass-card" style={{ maxWidth: '420px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>

        <h3 className="font-display" style={{ color: 'var(--gold-light)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 600 }}>
          New Residence
        </h3>

        <p className="font-english" style={{ color: 'var(--cream)', lineHeight: 1.9, fontSize: '1rem', marginBottom: '1.5rem' }}>
          Prabhas Nilayam,<br />
          Near Sri Venkateswara Swamy Temple,<br />
          Tirumala Tirupati Devasthanam,<br />
          Tirupati, Andhra Pradesh
        </p>

        <GoldDivider />

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
          style={{ marginTop: '1rem' }}
        >
          <span>📍</span>
          Open in Google Maps
        </a>
      </motion.div>
    </AnimatedSection>
  );
}

/* ─── Section 6: Event Schedule ─────────────────────────── */
export function ScheduleSection() {
  const events = [
    { time: '8:00 AM', telugu: 'గణపతి పూజ', english: 'Ganapathi Puja', icon: '🪔', desc: 'Begin with Lord Ganesha\'s blessings' },
    { time: '9:15 AM', telugu: 'గృహప్రవేశం ముహూర్తం', english: 'Gruhapravesam Muhurtham', icon: '🏡', desc: 'Sacred home entry ceremony' },
    { time: '10:45 AM', telugu: 'వాస్తు పూజ', english: 'Vastu Puja', icon: '🌸', desc: 'Blessing the home with positive energy' },
    { time: '12:00 PM', telugu: 'భోజనం / ప్రసాదం', english: 'Lunch & Prasadam', icon: '🍛', desc: 'Traditional feast & blessings' },
  ];

  return (
    <AnimatedSection className="py-20 px-6">
      <SectionTitle text="✦Event Schedule✦" />

      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {events.map((event, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            className="glass-card timeline-item"
            style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
          >
            <span style={{ fontSize: '1.6rem', minWidth: '2rem' }}>{event.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.25rem' }}>
                <div>
                  <p className="font-telugu" style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '0.15rem' }}>
                    {event.telugu}
                  </p>
                  <p className="font-display" style={{ color: 'var(--cream)', fontSize: '1rem', fontWeight: 600 }}>
                    {event.english}
                  </p>
                </div>
                <span style={{ background: 'rgba(92,10,20,0.08)', color: 'var(--gold)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', letterSpacing: '0.05em', border: '1px solid rgba(92,10,20,0.2)', whiteSpace: 'nowrap' }}>
                  {event.time}
                </span>
              </div>
              <p className="font-english" style={{ color: 'rgba(92,10,20,0.6)', fontSize: '0.82rem', marginTop: '0.35rem', fontStyle: 'italic' }}>
                {event.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ─── Section 7: RSVP ────────────────────────────────────── */
export function RSVPSection() {
  const [rsvp, setRsvp] = React.useState<'attend' | 'decline' | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleRSVP = (choice: 'attend' | 'decline') => {
    setRsvp(choice);
    setTimeout(() => setSubmitted(true), 600);
  };

  return (
    <AnimatedSection className="py-24 px-6 text-center">
      <motion.p variants={fadeUp} style={{ color: 'var(--gold)', letterSpacing: '0.25em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
        ✦ RSVP ✦
      </motion.p>

      <motion.h2 variants={fadeUp} className="font-display gold-text" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>
        Will You Join Us?
      </motion.h2>

      <motion.p variants={fadeUp} className="font-telugu" style={{ color: 'var(--cream-dark)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
        మీరు తప్పక రావాలని ఆతురుతగా వేచి చూస్తున్నాం
      </motion.p>

      <GoldDivider />

      {!submitted ? (
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
          <button
            id="rsvp-attend"
            onClick={() => handleRSVP('attend')}
            className={`rsvp-btn ${rsvp === 'attend' ? 'active-attend' : ''}`}
            style={{ color: rsvp === 'attend' ? 'var(--maroon-dark)' : 'var(--gold)', fontFamily: 'var(--font-english)' }}
          >
            ✓ Will Attend
          </button>
          <button
            id="rsvp-decline"
            onClick={() => handleRSVP('decline')}
            className={`rsvp-btn ${rsvp === 'decline' ? 'active-decline' : ''}`}
            style={{ color: rsvp === 'decline' ? 'var(--cream)' : 'var(--gold)', fontFamily: 'var(--font-english)' }}
          >
            ✗ Can't Attend
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{ maxWidth: '380px', margin: '2rem auto', padding: '2rem' }}
        >
          {rsvp === 'attend' ? (
            <>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
              <p className="font-display gold-text" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                Wonderful! See You There!
              </p>
              <p className="font-english" style={{ color: 'var(--cream-dark)', fontSize: '0.95rem' }}>
                We look forward to celebrating with you!
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
              <p className="font-display" style={{ color: 'var(--cream)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                We'll Miss You!
              </p>
              <p className="font-english" style={{ color: 'var(--cream-dark)', fontSize: '0.95rem' }}>
                Thank you for letting us know. Your blessings are always with us.
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Footer */}
      <motion.div variants={fadeUp} style={{ marginTop: '4rem', paddingBottom: '3rem' }}>
        <GoldDivider />
        <p className="font-telugu" style={{ color: 'var(--gold)', fontSize: '1.1rem', marginTop: '1.5rem' }}>
          శుభస్య శీఘ్రం • మీ రాక మాకు ఆనందం
        </p>
        <p className="font-english" style={{ color: 'rgba(92,10,20,0.6)', fontSize: '0.8rem', marginTop: '0.75rem', letterSpacing: '0.1em' }}>
        </p>

        {/* Separator Curve */}
        <div style={{ margin: '3.5rem auto 2rem', width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
          <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 1rem' }}>
            <path d="M0 7.5 Q10 -2.5, 20 7.5 T40 7.5" stroke="var(--gold)" fill="none" strokeWidth="1.5" />
          </svg>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
        </div>

        {/* Designer Credits */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <p className="font-display" style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Designed By
          </p>
          <h3 className="gold-text font-display" style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.08em' }}>
            Nalipi Sridhar Reddy
          </h3>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://wa.me/917386376302"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', padding: '0.5rem', background: 'rgba(212,168,67,0.1)', borderRadius: '50%' }}
              aria-label="WhatsApp"
            >
              <MessageCircleHeart size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.instagram.com/sridharreddy7831"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', padding: '0.5rem', background: 'rgba(212,168,67,0.1)', borderRadius: '50%' }}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="bit.ly/nsr7831"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', padding: '0.5rem', background: 'rgba(212,168,67,0.1)', borderRadius: '50%' }}
              aria-label="Portfolio"
            >
              <Briefcase size={18} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
