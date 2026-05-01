import { useMemo, useState } from 'react';
import './App.css';
import DemoSection from './components/DemoSection';
import delloite from './assets/delloite.jpeg';
import henryHuges from './assets/HenryHuges.jpeg';
import logicGnosis from './assets/logicGnosis.jpeg';
import oddisaJudicial from './assets/oddisaJudicial.jpeg';
import shardulAmarchand from './assets/shardulAmarchand.jpeg';
import wadiyaChandi from './assets/WadiyaChandi.jpeg';
import firstPage from './assets/firstPage.mp4';
import secondPage from './assets/secondPage.mp4';
import thirdRecording from './assets/thirdrecording.mp4';

const baseWaitlist = [
  'rachel.hill@stonebridgelegal.com',
  'arjun.mehra@northpointlaw.co',
  'devon.white@arcchambers.io',
  'sophia.lee@briefworksgroup.com',
  'nina.patel@forgewestlegal.com',
  'michael.ross@counselgrid.com'
];

const demos = [
  {
    act: 'Act 1 Intake',
    title: 'You hand over the file. Associate reads it.',
    description:
      "Drop in whatever you have. The vakalatnama. The WhatsApp thread. The email from opposing counsel you forgot about for two days. Associate reads it the way a good junior would, quietly and carefully. By the time you're ready to think about the matter, it has already pulled the relevant judgments from eCourts and India Code.",
    mediaSrc: firstPage,
    placeholder:
      'Lawyer drops a vakalatnama and three WhatsApp screenshots into a clean canvas. Editorial text appears below as Associate works with verified source tags beside each finding.'
  },
  {
    act: 'Act 2 Brief',
    title: 'Associate hands you back the matter you should have spent two days building.',
    description:
      "What kind of matter this is. Who the parties are. What the law actually says, and what's missing. Every citation is verified. Where the law is genuinely unsettled, it tells you that with both positions instead of picking one for you. You still do the thinking. That part has not changed.",
    mediaSrc: secondPage,
    placeholder:
      'Editorial brief renders on screen as if typed by a senior associate. Sections appear in sequence with VERIFIED tags on each citation.'
  },
  {
    act: 'Act 3 Work',
    title: 'Then you do the work. With the agent in the margin, never in the way.',
    description:
      'Drafting opens the document. Margin annotations appear with sources against your playbook and Indian law. Accept, reject, modify. Your call. During DD review, the agent flags section-level risks and clause references, then keeps filings, checklists, court fee logic, and artifacts complete as the matter closes.',
    mediaSrc: thirdRecording,
    placeholder:
      'Lawyer reviews the Sharma Textiles MoA with CRITICAL annotations and options: Add to report, Modify, Dismiss. Status bar shows save time, document number, and review progress.'
  }
];

const capabilities = [
  {
    title: 'Context Fragmentation',
    body: 'The lawyer doing the actual work in India today switches between eight to twelve tools to close a single matter. They become the memory layer holding everything together.'
  },
  {
    title: 'Session By Session AI',
    body: 'Most AI tools help with one document at a time. The next session starts from zero, so the lawyer rebuilds context from memory, every single time.'
  },
  {
    title: 'Verification Burden',
    body: 'When AI cites a case, you still open the judgment yourself. It may use the right case for the wrong proposition or miss that a ruling was overturned.'
  },
  {
    title: 'False Time Savings',
    body: "The tool that should save one hour can cost ninety minutes of verification. The problem is not whether AI can help Indian lawyers. It's whether a lawyer can trust it."
  }
];

const logos = [
  { src: delloite, name: 'Delloite Legal' },
  { src: henryHuges, name: 'Henry Huges' },
  { src: logicGnosis, name: 'Logic Gnosis' },
  { src: oddisaJudicial, name: 'Oddisa Judicial' },
  { src: shardulAmarchand, name: 'Shardul Amarchand' },
  { src: wadiyaChandi, name: 'Wadiya Chandi' }
];

function CapabilityIcon() {
  return (
    <svg className="capabilityCard__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m4 20 6.5-6.5M10 6l8 8M8.4 4.4l2.2 2.2M13.5 9.5l2.2 2.2M18.6 14.6l2.2 2.2" />
      <path d="M3.5 20.5h9" />
    </svg>
  );
}

function App() {
  const [waitlist, setWaitlist] = useState(baseWaitlist);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [signupStatus, setSignupStatus] = useState('');
  const [signupKind, setSignupKind] = useState<'ok' | 'error' | ''>('');

  const waitlistSet = useMemo(() => new Set(waitlist.map((item) => item.toLowerCase())), [waitlist]);

  const onSubmitWaitlist = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();

    if (!normalized) {
      setSignupKind('error');
      setSignupStatus('Please enter a valid work email.');
      return;
    }

    if (waitlistSet.has(normalized)) {
      const position = waitlist.findIndex((item) => item.toLowerCase() === normalized) + 1;
      setSignupKind('error');
      setSignupStatus(`Already registered. Your waitlist number is #${position}.`);
      return;
    }

    const next = [...waitlist, email.trim()];
    setWaitlist(next);
    setSignupKind('ok');
    setSignupStatus(`Signup complete. Your waitlist number is #${next.length}.`);
    setEmail('');
  };

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="#">
          Associate
        </a>
        <nav className="topbar__nav" aria-label="Primary">
          <a href="#">Blogs</a>
          <a href="#demos">Demos</a>
          <a href="#security">Security</a>
          <button className="topbar__navButton" type="button" onClick={() => setIsPricingOpen(true)}>
            Pricing
          </button>
        </nav>
        <div className="topbar__right">
          <button className="topbar__cta" type="button" onClick={() => setIsSignupOpen(true)}>
            Sign Up
          </button>
          <button className="topbar__menuButton" type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open section menu">
            ☰
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>The AI workspace for Indian lawyers</h1>
        <h2 className="hero__subhead">The associate you couldn&apos;t afford. Now you can.</h2>
        <div className="hero__actions">
          <button type="button" onClick={() => setIsSignupOpen(true)}>
            Try Associate
          </button>
        </div>
        <p className="hero__note">Built in India. For India&apos;s 1.7 million advocates. From day one.</p>
      </section>

      <section className="capabilities" id="precision">
        <div className="capabilities__intro">
          <p className="eyebrow">The Problem</p>
          <h2>Every legal AI tool generates. Nobody verifies.</h2>
          <p className="muted">
            AI can help Indian lawyers. But until verification is native, context is persistent, and uncertainty is
            explicit, trust stays on the lawyer and not the tool.
          </p>
        </div>

        <div className="capabilities__grid">
          {capabilities.map((item) => (
            <article className="capabilityCard" key={item.title}>
              <div className="capabilityCard__titleRow">
                <CapabilityIcon />
                <h3>{item.title}</h3>
              </div>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="triedBy" aria-labelledby="tried-by-title">
        <p className="triedBy__eyebrow">Tried By Lawyers At</p>
        <h2 id="tried-by-title">Already in the hands of lawyers at the firms and companies you know.</h2>
        <p className="triedBy__copy">
          We&apos;ve shown Associate to in house counsel, partners, and solo practitioners across India.
        </p>
        <div className="triedBy__slider">
          <div className="triedBy__track">
            {[...logos, ...logos].map((logo, index) => (
              <div className="triedBy__item" key={`${logo.name}-${index}`}>
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection items={demos} />

      <section className="security" id="security">
        <div className="security__icon" aria-hidden="true" />
        <h2>Uncompromising Security.</h2>
        <p>
          Associate employs bank-grade encryption and stringent data privacy
          protocols to ensure confidentiality is never breached.
        </p>
        <div className="security__pills">
          <span>SOC 2 TYPE II CERTIFIED</span>
          <span>END-TO-END ENCRYPTION</span>
          <span>GDPR COMPLIANT</span>
          <span>ZERO-TRUST ARCHITECTURE</span>
        </div>
      </section>

      <section className="closingCta">
        <h2>One Lawyer with Associate should feel like Ten.</h2>
        <p>
          We&apos;re building this for the advocate in Bengaluru with forty active matters and no support staff, not
          just the firms that already have both.
        </p>
        <button type="button" onClick={() => setIsSignupOpen(true)}>
          Try Associate
        </button>
      </section>

      <footer className="footer">
        <p>Thank you for reading this far.</p>
        <p>Associate · Built in Bengaluru, for India </p>
        <p>© 2026 Associate</p>
      </footer>

      {isSignupOpen ? (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Sign up">
          <div className="modal">
            <button className="modal__close" type="button" onClick={() => setIsSignupOpen(false)} aria-label="Close">
              x
            </button>
            <p className="eyebrow">Early Access</p>
            <h3>Join the Associate waitlist</h3>
            <p className="muted">Current waitlist size: {waitlist.length}</p>
            <form className="modal__form" onSubmit={onSubmitWaitlist}>
              <input
                type="email"
                placeholder="bestLawyer@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit">Join Waitlist</button>
            </form>
            <p className="modal__status" data-kind={signupKind}>
              {signupStatus}
            </p>
          </div>
        </div>
      ) : null}

      {isPricingOpen ? (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Pricing">
          <div className="modal modal--pricing">
            <button className="modal__close" type="button" onClick={() => setIsPricingOpen(false)} aria-label="Close">
              x
            </button>
            <p className="eyebrow">Pricing</p>
            <h3>Plans for every stage of practice</h3>
            <div className="pricingGrid">
              <article className="pricingCard">
                <h4>Free</h4>
                <p>₹0 / month</p>
                <ul>
                  <li>1 document</li>
                  <li>5,000 tokens per day</li>
                  <li>1 drafting iteration</li>
                  <li>Basic research assistance</li>
                </ul>
              </article>
              <article className="pricingCard">
                <h4>Starter</h4>
                <p>₹2,200 / month</p>
                <ul>
                  <li>7 documents</li>
                  <li>20,000 AI tokens</li>
                  <li>Unlimited drafting iterations</li>
                  <li>Priority support</li>
                </ul>
              </article>
              <article className="pricingCard">
                <h4>Pro</h4>
                <p>$80 / month</p>
                <ul>
                  <li>90,000 AI tokens</li>
                  <li>Advanced matter workflows</li>
                  <li>Unlimited drafting iterations</li>
                  <li>Extended verification tools</li>
                </ul>
              </article>
              <article className="pricingCard">
                <h4>Enterprise</h4>
                <p>Contact us</p>
                <ul>
                  <li>Potentially unlimited documents</li>
                  <li>Potentially unlimited tokens</li>
                  <li>Custom deployment and controls</li>
                  <li>Dedicated account team</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      ) : null}

      {isMenuOpen ? (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Sections">
          <div className="modal modal--menu">
            <button className="modal__close" type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close">
              x
            </button>
            <p className="eyebrow">Navigate</p>
            <h3>Go to a section</h3>
            <div className="menuGrid">
              <a href="#precision" onClick={() => setIsMenuOpen(false)}>The Problem</a>
              <a href="#demos" onClick={() => setIsMenuOpen(false)}>How Associate Works</a>
              <a href="#security" onClick={() => setIsMenuOpen(false)}>Security</a>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPricingOpen(true);
                }}
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSignupOpen(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
