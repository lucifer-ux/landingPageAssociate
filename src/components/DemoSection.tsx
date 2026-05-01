import './DemoSection.css';

type DemoItem = {
  act: string;
  title: string;
  description: string;
  mediaSrc?: string;
  placeholder: string;
};

type DemoSectionProps = {
  items: DemoItem[];
};

function DemoSection({ items }: DemoSectionProps) {
  return (
    <section className="demo" id="demos">
      <div className="demo__intro">
        <h2>How Associate Works</h2>
        <p className="demo__subhead">The brief, the build, the work.</p>
      </div>

      <div className="demo__stack">
        {items.map((item, index) => (
          <article className={`demoSplit ${index % 2 === 1 ? 'demoSplit--reverse' : ''}`} key={item.title}>
            <div className="demoSplit__text">
              <h3 className="demoSplit__kicker">{item.act}</h3>
              <h4 className="demoSplit__subhead">{item.title}</h4>
              <p className="muted">{item.description}</p>
            </div>
            <div className="demoSplit__media">
              {item.mediaSrc ? (
                <video
                  className="demoSplit__video"
                  src={item.mediaSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  onLoadedMetadata={(event) => {
                    event.currentTarget.playbackRate = 1.5;
                  }}
                />
              ) : (
                <div className="demoSplit__placeholder">
                  <p>GIF placeholder</p>
                  <p>{item.placeholder}</p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DemoSection;
