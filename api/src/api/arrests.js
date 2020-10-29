const router = require('express').Router();
const Incident = require('../models/Incident');

const VICTIM_ARREST_FOCUSES = [
	"Prostitution Arrests or Stings"
]

function getStatsFromArrests(arrests) {

	let victimArrestCount = 0;

	if (arrests.length > 0) {
		victimArrestCount = arrests
		.map(arrest => VICTIM_ARREST_FOCUSES.includes(arrest.focus) ? 1 : 0)
		.reduce((accumulator, arrest) => accumulator + arrest)
	}

	return {
		arrestScore: Number(((arrests.length - victimArrestCount) / arrests.length * 100).toFixed(2)),
		victimArrestCount: victimArrestCount,
		traffickerArrestCount: arrests.length - victimArrestCount,
		totalCaseCount: arrests.length
	}

}

router.get('*', async (req, res) => {

	const query = {};

	if (req.query.city) {
		query.city = req.query.city;
	}
	if (req.query.state) {
		query.state = req.query.state;
	}
	if (req.query.time_range) {

		const [startYear, endYear] = req.query.time_range.split(',');

		if (!isNaN(Number(startYear)) && !isNaN(Number(endYear))) {
			query.dateOfOperation = {
				$gte: Number(startYear)
			};
			query.endDateOfOperation = {
				$lte: Number(endYear)
			};
		}
	}

	const arrests = await Incident.find(query)
	const stats = getStatsFromArrests(arrests)
	res.send(stats)
})

module.exports = router;
