import ReactGA from "react-ga4";
import Hero from "../components/Hero";

function Home() {
  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "home",
  });

  return (
    <div>
      <Hero />
    </div>
  );
}

export default Home;
