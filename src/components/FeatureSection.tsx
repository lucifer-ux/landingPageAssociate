import './FeatureSection.css';

type Feature = {
  title: string;
  body: string;
};

type FeatureSectionProps = {
  features: Feature[];
};

function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <section className="features" id="features">
      <div className="features__header">
        <p className="eyebrow">Capabilities</p>
        <h2>Built for legal ops and modern associate teams</h2>
      </div>
      <div className="features__grid">
        {features.map((feature) => (
          <article key={feature.title} className="featureCard">
            <h3>{feature.title}</h3>
            <p className="muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
