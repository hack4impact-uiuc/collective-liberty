const preprocess = require('./preprocess');

// constant list of arrests that qualify as victim arrests
const VICTIM_ARREST_FOCUSES = Object.freeze([
  'Prostitution Arrests or Stings',
  'Human Trafficking Arrests',
]);

function aggregateIncidentInfo(yearCounts) {
  let totalArrestCounts = {};
  let stateMax = 0;
  let cityMaxesPerState = {};
  let totalIncidents = 0;

  yearCounts.forEach((year) => {
    Object.entries(year.stateCounts).forEach(([index, num]) => {
      if (!totalArrestCounts[index]) {
        totalArrestCounts[index] = num;
      } else {
        totalArrestCounts[index] += num;
      }

      // get state max
      if (totalArrestCounts[index] > stateMax) {
        stateMax = totalArrestCounts[index];
      }

      totalIncidents += num;
    });

    Object.entries(year.cityCounts).forEach(([index, num]) => {
      if (!totalArrestCounts[index]) {
        totalArrestCounts[index] = num;
      } else {
        totalArrestCounts[index] += num;
      }

      // get city max per state
      const state = index.split(',')[1];
      if (cityMaxesPerState[state] !== undefined) {
        if (totalArrestCounts[index] > cityMaxesPerState[state]) {
          cityMaxesPerState[state] = totalArrestCounts[index];
        }
      } else {
        cityMaxesPerState[state] = 0;
      }
    });
  });

  return {
    ...totalArrestCounts,
    _stateMax: stateMax,
    _cityMaxesPerState: cityMaxesPerState,
    _totalIncidents: totalIncidents,
  };
}

const getArrestStatsFromIncidents = (yearCounts, query) => {
  // get victim arrest count
  const victimArrestCount = getIncidentCountByFocuses(yearCounts, {
    ...query,
    focuses: VICTIM_ARREST_FOCUSES,
  });
  let totalArrestCount = getTotalNumOfIncidents(yearCounts, query);
  let arrestScore = Number(
    (((totalArrestCount - victimArrestCount) / totalArrestCount) * 100).toFixed(
      2
    )
  );

  if (isNaN(arrestScore)) {
    arrestScore = 0;
  }

  return {
    arrestScore,
    victimArrestCount,
    traffickerArrestCount: totalArrestCount - victimArrestCount,
    totalCaseCount: totalArrestCount,
  };
};

const getIncidentCountByFocuses = (yearCounts, query) => {
  const { city, state, focuses } = query;

  // get victim arrest count
  let focusArrestCount = 0;
  const mergedYearCount = preprocess.mergeYearlyCounts(yearCounts);
  const incidentTypeCounts = mergedYearCount.incidentTypeCounts;

  const focusKeys =
    focuses &&
    Object.keys(incidentTypeCounts).filter((incidentType) =>
      focuses.includes(incidentType)
    );

  if (focusKeys && focusKeys.length > 0) {
    focusKeys.forEach((focus) => {
      const focusCounts = incidentTypeCounts[focus];

      if (city && state) {
        const index = preprocess.formatCityIndex(city, state);

        if (focusCounts[index]) {
          focusArrestCount += focusCounts[index];
        }
      } else if (state) {
        if (focusCounts[state]) {
          focusArrestCount += focusCounts[state];
        }
      } else {
        // sum all
        focusArrestCount = Object.values(focusCounts).reduce(
          (acc, v) => acc + v,
          focusArrestCount
        );
      }
    });
  }

  return focusArrestCount;
};

const getTotalNumOfIncidents = (yearCounts, query) => {
  const { city, state } = query;
  let sum = 0;

  yearCounts.forEach((yearlyCount) => {
    if (city && state) {
      const index = preprocess.formatCityIndex(city, state);
      if (yearlyCount.cityCounts[index]) {
        sum += yearlyCount.cityCounts[index];
      }
    } else if (state) {
      if (yearlyCount.stateCounts[state]) {
        sum += yearlyCount.stateCounts[state];
      }
    } else {
      // sum all
      sum = Object.values(yearlyCount.stateCounts).reduce(
        (acc, val) => (acc += val),
        sum
      );
    }
  });

  return sum;
};

const flattenIncidents = (yearCounts) => {
  let flattenedCounts = {};

  yearCounts.forEach((year) => {
    Object.entries(year.stateCounts).forEach(([index, num]) => {
      if (!flattenedCounts[index]) {
        flattenedCounts[index] = num;
      } else {
        flattenedCounts[index] += num;
      }
    });

    Object.entries(year.cityCounts).forEach(([index, num]) => {
      if (!flattenedCounts[index]) {
        flattenedCounts[index] = num;
      } else {
        flattenedCounts[index] += num;
      }
    });
  });

  return {
    ...flattenedCounts,
  };
};

module.exports = {
  aggregateIncidentInfo,
  getArrestStatsFromIncidents,
  getIncidentCountByFocuses,
  getTotalNumOfIncidents,
  flattenIncidents,
};
