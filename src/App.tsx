import { useMemo, useState } from 'react';
import './App.css';
import DemoSection from './components/DemoSection';

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
    title: 'Legal Research, Grounded In Sources',
    description:
      'Surface case law and precedent with citation-linked summaries so associates can move from question to trusted answer without context switching.',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODV5Zm5mM2x0N2Mzb2VzeXd4ZWx0MzNoYTF6MGwzMmN6NXV3OWNoZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlBO7eyXzSZkJri/giphy.gif'
  },
  {
    title: 'Easy Drafting For High-Stakes Work',
    description:
      'Build first drafts from approved language banks and redline faster with structured clause suggestions tailored to matter context.',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnV3N3M5aGp6d2dzbTZ5dXllcWZmZmJldmV0bDJwMzA4M2FoM2Q5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPGcguWZHRC2HyBRS/giphy.gif'
  },
  {
    title: 'Proactive Agent Execution',
    description:
      'Let an agent track deadlines, prepare follow-ups, and draft next actions so your team spends more time on legal judgment.',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXFlbjBtYjM4MWE4M3V6dWU2MnVrcHBlNWVna21qa2YxMmx0Z2N6NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7aD2saalBwwftBIY/giphy.gif'
  },
  {
    title: 'Practice-Wide Matter Visibility',
    description:
      'Monitor progress, bottlenecks, and risk signals across all matters from a single command layer built for legal leadership.',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQydTRsNGhjaG1tb2VrM2hqcGU4cnQ3dnd6M2d5c2hueXQ1Z2x4ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/f3iwJFOVOwuy7K6FFw/giphy.gif'
  }
];

const capabilities = [
  {
    title: 'Automated Case Analysis',
    body: 'Rapidly synthesize thousands of documents to identify key precedents, liabilities, and arguments.'
  },
  {
    title: 'Secure Document Management',
    body: 'Centralized, encrypted vaults for all sensitive case files with granular access controls.'
  },
  {
    title: 'AI-Driven Research',
    body: 'Natural language queries across global legal databases returning synthesized, cited briefs.'
  },
  {
    title: 'Compliance Monitoring',
    body: "Real-time alerts on regulatory shifts impacting your clients' specific operational domains."
  }
];

function CapabilityIcon({ title }: { title: string }) {
  if (title === 'Automated Case Analysis') {
    return (
      <svg className="capabilityCard__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
        <path d="M8 15v-3M12 15V9M16 15V7" />
      </svg>
    );
  }

  if (title === 'Secure Document Management') {
    return (
      <svg className="capabilityCard__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3.5 7.5h7l2 2h8v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
        <circle cx="16.5" cy="14.5" r="2.2" />
        <path d="M16.5 11.8v1.1M16.5 16.1v1.1M13.8 14.5h1.1M17.6 14.5h1.1" />
      </svg>
    );
  }

  if (title === 'AI-Driven Research') {
    return (
      <svg className="capabilityCard__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.3 15.3 5.2 5.2" />
        <path d="M6.8 10.8c.7-1.8 1.4-1.8 2.1 0 .7 1.8 1.4 1.8 2.1 0 .7-1.8 1.4-1.8 2.1 0" />
      </svg>
    );
  }

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
          <a href="#">Solutions</a>
          <a href="#demos">Demos</a>
          <a href="#">Security</a>
          <a href="#">Pricing</a>
        </nav>
        <div className="topbar__right">
          <button className="topbar__cta" type="button" onClick={() => setIsSignupOpen(true)}>
            Sign Up
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>The New Standard in Legal Intelligence.</h1>
        <p className="hero__tagline">
          Associate empowers elite legal teams with AI-driven analysis, secure document management, and unparalleled
          compliance tools. Elevate your practice.
        </p>
        <div className="hero__actions">
          <button type="button" onClick={() => setIsSignupOpen(true)}>
            Book a Demo
          </button>
          <a href="#precision" className="ghostButton">
            Explore Features
          </a>
        </div>
      </section>

      <section className="capabilities" id="precision">
        <div className="capabilities__intro">
          <h2>Precision Engineered for Practice.</h2>
          <p className="muted">Discover how Associate transforms vast legal datasets into actionable strategic advantages.</p>
        </div>

        <div className="capabilities__grid">
          {capabilities.map((item) => (
            <article className="capabilityCard" key={item.title}>
              <div className="capabilityCard__titleRow">
                <CapabilityIcon title={item.title} />
                <h3>{item.title}</h3>
              </div>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <DemoSection items={demos} />

      <section className="security" id="security">
        <div className="security__icon" aria-hidden="true" />
        <h2>Uncompromising Security.</h2>
        <p>
          In the legal sector, trust is paramount. Associate employs bank-grade encryption and stringent data privacy
          protocols to ensure client confidentiality is never breached.
        </p>
        <div className="security__pills">
          <span>SOC 2 TYPE II CERTIFIED</span>
          <span>END-TO-END ENCRYPTION</span>
          <span>GDPR COMPLIANT</span>
          <span>ZERO-TRUST ARCHITECTURE</span>
        </div>
      </section>

      <footer className="footer">
        <strong>Associate</strong>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Contact</a>
        <span>© 2024 Associate Legal Technologies. All rights reserved.</span>
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
    </main>
  );
}

export default App;
