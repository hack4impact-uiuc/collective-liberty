const router = require('express').Router();
const Incident = require('../models/Incident');

router.get('*', async (req, res) => {
	const c = req.query.city
	const f = req.query.focus
	let s = req.query.state;
	const sd = req.query.dateOfOperation
	const ed = req.query.endDateOfOperation
	const incidents = await Incident.findOne({$or: [{city: c}, {focus: f}, {state: s}, {dateOfOperation: sd}, {endDateOfOperation: ed}]})
	res.send(incidents)
})

module.exports = router;
