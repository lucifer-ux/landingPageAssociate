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
    act: 'Act 1 — Intake',
    title: 'You hand over the file. Associate reads it.',
    description:
      "Drop in whatever you have. The vakalatnama. The WhatsApp thread. The email from opposing counsel you forgot about for two days. Associate reads it the way a good junior would, quietly and carefully. By the time you're ready to think about the matter, it has already pulled the relevant judgments from eCourts and India Code.",
    placeholder:
      'Lawyer drops a vakalatnama and three WhatsApp screenshots into a clean canvas. Editorial text appears below as Associate works with verified source tags beside each finding.'
  },
  {
    act: 'Act 2 — Brief',
    title: 'Associate hands you back the matter you should have spent two days building.',
    description:
      "What kind of matter this is. Who the parties are. What the law actually says, and what's missing. Every citation is verified. Where the law is genuinely unsettled, it tells you that with both positions instead of picking one for you. You still do the thinking. That part has not changed.",
    placeholder:
      'Editorial brief renders on screen as if typed by a senior associate. Sections appear in sequence with VERIFIED tags on each citation.'
  },
  {
    act: 'Act 3 — Work',
    title: 'Then you do the work. With the agent in the margin, never in the way.',
    description:
      'Drafting opens the document. Margin annotations appear with sources against your playbook and Indian law. Accept, reject, modify. Your call. During DD review, the agent flags section-level risks and clause references, then keeps filings, checklists, court fee logic, and artifacts complete as the matter closes.',
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
    title: 'Session-By-Session AI',
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
          <a href="#">Blogs</a>
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
    </main>
  );
}

export default App;
