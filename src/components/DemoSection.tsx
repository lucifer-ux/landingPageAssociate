import './DemoSection.css';

type DemoItem = {
  act: string;
  title: string;
  description: string;
  placeholder: string;
};

type DemoSectionProps = {
  items: DemoItem[];
};

function DemoSection({ items }: DemoSectionProps) {
  return (
    <section className="demo" id="demos">
      <div className="demo__intro">
        <p className="eyebrow">How Associate Works</p>
        <h2>The brief, the build, the work.</h2>
      </div>

      <div className="demo__stack">
        {items.map((item, index) => (
          <article className={`demoSplit ${index % 2 === 1 ? 'demoSplit--reverse' : ''}`} key={item.title}>
            <div className="demoSplit__text">
              <p className="demoSplit__kicker">{item.act}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </div>
            <div className="demoSplit__media">
              <div className="demoSplit__placeholder">
                <p>GIF placeholder</p>
                <p>{item.placeholder}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DemoSection;
