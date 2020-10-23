const router = require('express').Router();
const Incident = require('../models/Incident');

router.get('*', async (req, res) => {
	const city = req.query.city
	const focus = req.query.focus
	const state = req.query.state;
	const start_date = req.query.dateOfOperation
	const end_date = req.query.endDateOfOperation
	const incidents = await Incident.find(req.query)
	res.send(incidents)
})

module.exports = router;
