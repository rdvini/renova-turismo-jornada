import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_ID = "G-ZW2M2W0BTH";

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(GA_ID);
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
};
