// Tab Indexes
export const ARRESTS_TAB = 0;
export const MASSAGE_PARLOR_LAWS_TAB = 1;
export const VACATUR_LAWS_TAB = 2;
export const CRIMINAL_LAWS_TAB = 3;

// Neutral Color
export const NEUTRAL_MAP_COLOR = [211, 202, 197];

// Color Dictionaries
export const CRIMINAL_LAWS_COLORS = Object.freeze({
  "Very Bad": "#CF2A2A",
  Bad: "#EB5757",
  Weak: "#FA9158",
  Fair: "#FFCB21",
  Good: "#6FCF97",
  Strong: "#257F4A",
});
export const VACATUR_LAWS_COLORS = Object.freeze({
  Kansas: "#7C2323",
  "Very Bad": "#CF2A2A",
  Bad: "#EB5757",
  "Needs Improvement": "#FA9158",
  Fair: "#FFCB21",
  Good: "#6FCF97",
  Excellent: "#257F4A",
});
export const MASSAGE_PARLOR_LAW_COLORS = Object.freeze({
  None: "#CF2A2A",
  "Very Bad": "#EB5757",
  Bad: "#FA9158",
  Weak: "#FFCB21",
  Fair: "#6FCF97",
  Good: "#257F4A",
});

// Color Dictionaries RGB
export const CRIMINAL_LAWS_COLORS_RGB = Object.freeze({
  "Very Bad": [207, 42, 42],
  Bad: [235, 87, 87],
  Weak: [250, 145, 88],
  Fair: [255, 203, 33],
  Good: [111, 207, 151],
  Strong: [37, 127, 74],
});

export const VACATUR_LAWS_COLORS_RGB = Object.freeze({
  Kansas: [124, 35, 35],
  "Very Bad": [207, 42, 42],
  Bad: [235, 87, 87],
  "Needs Improvement": [250, 145, 88],
  Fair: [255, 203, 33],
  Good: [111, 207, 151],
  Excellent: [37, 127, 74],
});

export const MASSAGE_PARLOR_LAW_COLORS_RGB = Object.freeze({
  None: [207, 42, 42],
  "Very Bad": [235, 87, 87],
  Bad: [250, 145, 88],
  Weak: [255, 203, 33],
  Fair: [111, 207, 151],
  Good: [37, 127, 74],
});

// User roles
export const USER_ROLES = Object.freeze({
  Admin: "Admin",
  Guest: "Guest",
});

// Sidebar Charts
export const ARRESTS_CHART_TITLE = "How Law Correlates with Arrests";
export const MASSAGE_LAWS_CHART_TITLE =
  "How Law Correlates with Massage Parlor Incidents";
