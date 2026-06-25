import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_ID = "G-ZW2M2W0BTH";
let initialized = false;

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      if (!initialized) {
        ReactGA.initialize(GA_ID);
        initialized = true;
      }
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    } catch (err) {
      console.warn("GA error", err);
    }
  }, [location.pathname, location.search]);
};
