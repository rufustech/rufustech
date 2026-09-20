import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

/**
 * Analytics note: GA4 is loaded by the gtag.js snippet in public/index.html
 * (measurement ID G-5EZJL21683), which records the page_view automatically.
 * There is deliberately no react-ga4 call here — it was previously initialised
 * with a GTM container ID (GTM-…), which is not a valid GA4 measurement ID, and
 * a second initialisation would double-count page views.
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
