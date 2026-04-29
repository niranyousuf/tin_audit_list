import { useEffect, useState } from 'react';

function Counter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(target * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <>{value.toLocaleString()}</>;
}

export function InfoSection() {
  return (
    <section className="info" aria-label="About this tool">
      <div className="info__card">
        <p>
          <strong>What is this?</strong> The National Board of Revenue (NBR) selects income tax
          returns for audit each year using an automated Risk-Based Audit Criterion. This tool
          lets you instantly check whether your TIN appears on the officially published selection
          list for Assessment Year 2023–24.
        </p>
      </div>
      <div className="info__stats" aria-label="Statistics">
        <div className="info__stat">
          <span className="info__stat-value">
            <Counter target={72196} />
          </span>
          <span className="info__stat-label">Returns selected</span>
        </div>
        <div className="info__stat">
          <span className="info__stat-value">2023–24</span>
          <span className="info__stat-label">Assessment year</span>
        </div>
        <div className="info__stat">
          <span className="info__stat-value">
            <Counter target={100} />%
          </span>
          <span className="info__stat-label">Client-side · private</span>
        </div>
      </div>
    </section>
  );
}
