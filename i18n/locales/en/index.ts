import common from "./common.json";
import nav from "./nav.json";
import footer from "./footer.json";
import index from "./pages/index.json";
import news from "./pages/news.json";
import services from "./pages/services.json";
import contact from "./pages/contact.json";
import about from "./pages/about.json";
import legal from "./pages/legal.json";
import policies from "./pages/policies.json";
import clientHub from "./pages/client-hub.json";
import process from "./pages/process.json";
import cases from "./pages/cases.json";
import casesIndex from "./pages/cases/_index.json";
import caseHerqulez from "./pages/cases/herqulez.json";
import caseTegetec from "./pages/cases/tegetec.json";

export default {
  common,
  nav,
  footer,
  landing: index,
  news,
  services,
  contact,
  about,
  legal,
  policies,
  clientHub,
  process,
  cases,
  casesIndex,
  caseStudies: {
    herqulez: caseHerqulez,
    tegetec: caseTegetec,
  },
};
