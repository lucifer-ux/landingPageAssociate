import './DemoSection.css';

type DemoItem = {
  title: string;
  description: string;
  gif: string;
};

type DemoSectionProps = {
  items: DemoItem[];
};

function DemoSection({ items }: DemoSectionProps) {
  return (
    <section className="demo" id="demos">
      <div className="demo__intro">
        <p className="eyebrow">Demonstrations</p>
        <h2>See Associate in action.</h2>
      </div>

      <div className="demo__stack">
        {items.map((item, index) => (
          <article className={`demoSplit ${index % 2 === 1 ? 'demoSplit--reverse' : ''}`} key={item.title}>
            <div className="demoSplit__text">
              <p className="demoSplit__kicker">0{index + 1}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </div>
            <div className="demoSplit__media">
              <img src={item.gif} alt={item.title} loading="lazy" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DemoSection;
