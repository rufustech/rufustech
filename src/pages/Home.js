import Hero from "../components/Hero";

/**
 * Single-route landing page. GA4 page_view is emitted by the gtag.js snippet
 * in public/index.html, so no analytics call belongs here — the previous
 * ReactGA.send() ran during render, which fired on every re-render.
 */
function Home() {
  return <Hero />;
}

export default Home;
