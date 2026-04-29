export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero__title">
        Check in Seconds: Is Your TIN on the <em>NBR Audit List?</em>
      </h1>
      <p className="hero__desc">
        NBR published the AY 2023-24 risk-based audit list as a PDF, and finding specific records
        in it is difficult for many people. I parsed the full PDF into structured JSON data and
        built this small web app so users can get instant TIN suggestions and final audit status
        with zone, circle, and submission type.
      </p>
    </section>
  );
}
