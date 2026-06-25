import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_ID = "G-ZW2M2W0BTH";

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    try {
      ReactGA.initialize(GA_ID);
      initialized.current = true;
    } catch (err) {
      console.warn("GA init failed", err);
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    try {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    } catch (err) {
      console.warn("GA send failed", err);
    }
  }, [location.pathname, location.search]);
};
