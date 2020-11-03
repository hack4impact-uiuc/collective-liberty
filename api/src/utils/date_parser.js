const DATE_RANGE_DELIM = '-';
const DATE_SECTION_DELIMS = { '/': true, '.': true };
const MIN_NUM_CHAR = '0';
const MAX_NUM_CHAR = '9';
const FULL_DATE_LEN = 3;
const MONTH_YR_DATE_LEN = 2;
const YR_DATE_LEN = 1;
const VALID_YR_LEN = 4;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

const validMonth = (s) => {
  const int = parseInt(s);
  return MIN_MONTH <= int && int <= MAX_MONTH;
};

const validYear = (s) => {
  return !isNaN(parseInt(s)) && s.length === VALID_YR_LEN;
};

const processWorkingDate = (workingDate) => {
  const len = workingDate.length;

  if (len === FULL_DATE_LEN) {
    return workingDate.join('/');
  } else if (
    len === MONTH_YR_DATE_LEN &&
    validMonth(workingDate[0]) &&
    validYear(workingDate[1])
  ) {
    return workingDate[0] + '/01/' + workingDate[1];
  } else if (len === YR_DATE_LEN && validYear(workingDate[0])) {
    return '1/01/' + workingDate[0];
  }

  return undefined;
};

/**
 * Normalizes dates found in dataset to M/D/YYYY
 * @param {string} dateStr
 */
const parse = (dateStr) => {
  if (dateStr === undefined || dateStr === null) return [];

  const dates = [];
  let workingDate = [];
  let workingStr = '';

  for (const ch of dateStr) {
    if (ch >= MIN_NUM_CHAR && ch <= MAX_NUM_CHAR) {
      workingStr += ch;
    } else if (DATE_SECTION_DELIMS[ch]) {
      workingDate.push(workingStr);

      workingStr = '';
    } else if (ch === DATE_RANGE_DELIM) {
      workingDate.push(workingStr);
      dates.push(processWorkingDate(workingDate));

      workingDate = [];
      workingStr = '';
    }
  }

  if (workingStr !== '') {
    workingDate.push(workingStr);
  }

  if (workingDate.length > 0) {
    dates.push(processWorkingDate(workingDate));
  }

  return dates;
};

module.exports = {
  parse,
};
