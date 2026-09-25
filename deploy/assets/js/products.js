"use strict";

/*
 * NivAk Technologies — Central Product Catalog
 *
 * Add or update products here.
 * Home and Apps & Games pages can reuse this same data.
 *
 * Status values:
 *   production
 *   nearly-complete
 *   development
 */

window.NIVAK_PRODUCTS = [
  {
    id: "quickcalc-daily",
    name: "QuickCalc Daily",
    type: "Utility App",
    status: "production",
    icon: "assets/images/apps/quickcalc-daily.png",
    description:
      "A clean everyday calculator with calculation history, favorites and PDF export tools.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.akhilesh.quickcalc_daily"
  },

  {
    id: "resumego",
    name: "ResumeGo",
    type: "Productivity App",
    status: "production",
    icon: "assets/images/apps/resume-builder.png",
    description:
      "Create structured CVs and resumes, manage profile information and export professional documents to PDF.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.nivaktechnologies.resumebuilder"
  },

  {
    id: "block-quest",
    name: "Block Quest",
    type: "Puzzle Game",
    status: "production",
    icon: "assets/images/apps/block-quest.png",
    description:
      "A mobile block puzzle experience with progression, lives, checkpoints and rewards.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.nivaktechnologies.block_quest"
  },

  {
    id: "quick-play",
    name: "Quick Play",
    type: "Mini Games",
    status: "production",
    icon: "assets/images/apps/quick-play.png",
    description:
      "A collection of quick mobile mini-games designed for simple and accessible entertainment.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.nivaktechnologies.quickplay"
  },

  {
    id: "colourflow-master",
    name: "ColourFlow Master",
    type: "Puzzle Game",
    status: "nearly-complete",
    icon: "assets/images/apps/colourflow-master.png",
    description:
      "A vibrant colour-based puzzle experience designed around satisfying visual challenges.",
    playStore: ""
  },

  {
    id: "photopro-ai",
    name: "PhotoPro AI",
    type: "Photo App",
    status: "development",
    icon: "assets/images/apps/photopro-ai.png",
    description:
      "A photo-focused mobile application currently being developed as part of the NivAk product portfolio.",
    playStore: ""
  },

  {
    id: "carrom-king-arena",
    name: "Carrom King Arena",
    type: "Mobile Game",
    status: "development",
    icon: "assets/images/apps/carrom-king-arena.png",
    description:
      "A premium digital carrom experience with computer play, multiplayer, challenges, rankings and rewards.",
    playStore: ""
  }
];


window.NIVAK_PRODUCT_STATUS = {
  production: {
    label: "Available",
    className: "badge--production"
  },

  "nearly-complete": {
    label: "Nearly Complete",
    className: "badge--nearly"
  },

  development: {
    label: "In Development",
    className: "badge--development"
  }
};

