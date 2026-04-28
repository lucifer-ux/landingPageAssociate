import { useState } from 'react';
import type { FormEvent } from 'react';
import './WaitlistSection.css';

type WaitlistSectionProps = {
  waitlist: string[];
  onJoin: (email: string) => { ok: boolean; message: string; position?: number };
};

function WaitlistSection({ waitlist, onJoin }: WaitlistSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [statusKind, setStatusKind] = useState<'ok' | 'error' | ''>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = onJoin(email.trim());
    setStatus(result.message);
    setStatusKind(result.ok ? 'ok' : 'error');
    if (result.ok) {
      setEmail('');
    }
  };

  return (
    <section className="waitlist" id="waitlist">
      <div className="waitlist__header">
        <p className="eyebrow">Early Access</p>
        <h2>Join the Associate waitlist</h2>
        <p className="muted">Sign up once and we will hold your place in line for the next onboarding cohort.</p>
      </div>

      <form className="waitlist__form" onSubmit={handleSubmit}>
        <label htmlFor="waitlist-email">Work email</label>
        <div className="waitlist__formRow">
          <input
            id="waitlist-email"
            name="email"
            type="email"
            required
            placeholder="bestLawyer@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <button type="submit">Join Waitlist</button>
        </div>
        <p className="waitlist__status" data-kind={statusKind}>
          {status}
        </p>
      </form>

      <div className="waitlist__meta">
        <p>
          Current waitlist size: <strong>{waitlist.length}</strong>
        </p>
      </div>
    </section>
  );
}

export default WaitlistSection;
