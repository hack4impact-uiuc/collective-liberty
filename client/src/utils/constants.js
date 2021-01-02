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
  Strong: "#257F4A",
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
  Strong: [37, 127, 74],
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

// export const massageParlorStrengthExplanations = Object.freeze({
//   None: 'There are no laws governing massage establishments. In the case of counties of cities they can sometimes draw on state laws but experience has proven that local inspectors and civil enforcement equipped with local laws can bring consequences to traffickers that just relying on state laws cannot.',
//   "Very Bad": 'These laws frequently categorize all massage businesses as sexually-oriented. Not only does this make it exponentially harder to help potential trafficking victims, it puts licensed practitioners at higher risk of sexual harassment and assault because their therapeutic practices are labeled the same as strip clubs and pornographic video stores.',
//   Bad: 'The law targets the behavior of workers and targets the consequences to the workers as well, placing all of the burden on potential trafficking victims rather than the managers and operatives controlling their behavior.',
//   Weak: 'The law has minimal clauses to regulate businesses - usually just zoning restrictions or requirements to obtain a business license.',
//   Fair: 'The jurisdiction has passed a law that attempts to regulate businesses to close exploitative and/or trafficking sites but lacks sufficient clauses to reliably close such venues.',
//   Good: 'This law contains at least 3 of the clauses that have proven successful at closing trafficking venues while placing minimum burdens on licensed practitioners.',
//   Strong: 'This law contains at least 3 of the clauses that have proven successful at closing trafficking venues while placing minimum burdens on licensed practitioners.',
// })

export const VACATUR_RANK_EXPLANATIONS = Object.freeze({
  Excellent:
    "These states provide robust avenues for civil relief that are trauma-informed and allow survivors of trafficking to live free of documentation that records them as criminals rather than survivors.",
  Good:
    "These states have multiple avenues for civil relief for victims that are as trauma-informed as possible and allow for relief from multiple types of crimes. It should be noted that no state receives a score of Excellent. This is because no states make exceptions for acts of self-defense committed while being trafficked. If a victim physically fights back against their trafficker or their rapists (men buying them) then their assault or murder is not justified. If a victim cannot legally fight back to be free - how can they believe they have the right to be free?",
  Fair:
    "These states have multiple avenues avenues for civil relief OR relief from multiple types of crimes. Combining these so that victims can choose how they can seek relief without undergoing intense trauma and needless legal obstacles and can seek relief from multiple types of crimes that victims are forced to commit in trafficking situations would improve these states' standing.",
  "Needs Improvement":
    "These states have some level of civil remedy but the practice is cumbersome or provides narrow avenues for victim relief.",
  Bad:
    "These states allow for some civil relief but the way that the relief is framed is often victim-blaming - for instance, requiring that victims show clear proof beyond a shadow of a doubt that they were trafficked AND that their charges for things like prostitution, truancy, petty theft (e.g. stealing food to eat) must be proven to be linked to trafficking. In some cases victims must prove the ways that their traffickers controlled them - painful and traumatic experiences when all a victim wants is to be able to rebuild their lives.",
  "Very Bad":
    "These states have almost no civil relief for those charged and/or convicted of crimes that they committed while in their trafficking situation. In this case the law prosecutes the victim and causes them to be legally haunted by their past, in addition to the psychological, and sometimes physical, scars they must carry.",
  Kansas:
    "Kansas only allows victims that have feared, and can prove they faced, physical violence to force them into prostitution to have those charges expunged. This ignores those coerced or defrauded and controlled through a variety of means that do not include physical violence. It also ignores actions victims are forced to engage in to survive their traffickers including petty theft (to eat or to make a quota demanded by their trafficker), truancy, assault, drug possession (for those kept controlled by their traffickers through narcotics), and more.",
});
