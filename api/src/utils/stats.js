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

const getStatsFromIncidents = (yearCounts) => {
  let victimArrestCount = 0;
  let totalArrestCount = getTotalNumOfIncidents(yearCounts);

  let arrestScore = Number(
    (((totalArrestCount - victimArrestCount) / totalArrestCount) * 100).toFixed(
      2
    )
  );

  if (isNaN(arrestScore)) {
    arrestScore = -1;
  }

  return {
    arrestScore,
    victimArrestCount,
    traffickerArrestCount: totalArrestCount - victimArrestCount,
    totalCaseCount: totalArrestCount,
  };
};

const getTotalNumOfIncidents = (yearCounts) => {
  let sum = 0;

  yearCounts.forEach((year) => {
    sum = Object.values(year.incidentTypeCounts).reduce(
      (acc, val) => (acc += val),
      sum
    );
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
  getStatsFromIncidents,
  getTotalNumOfIncidents,
  flattenIncidents,
};
