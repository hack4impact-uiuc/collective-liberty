const router = require('express').Router();
const Incident = require('../models/Incident');

router.get("/city/:city", async (req, res) => {
	const c = req.params.city
	const incidents = await Incident.findOne({city: c})
	res.send(incidents)
})

router.get("/focus/:focus", async (req, res) => {
	const f = req.params.focus
	const incidents = await Incident.findOne({focus: f})
	res.send(incidents)
})

router.get("/state/:state", async (req, res) => {
    let s = req.params.state;
	const incidents = await Incident.findOne({state: s})
	res.send(incidents)
})

router.get("/start_date/:start_date", async (req, res) => {
	const s = req.params.dateOfOperation
	const incidents = await Incident.findOne({dateOfOperation: s})
	res.send(incidents)
})

router.get("/end_date/:end_date", async (req, res) => {
	const e = req.params.endDateOfOperation
	const incidents = await Incident.findOne({endDateOfOperation: e})
	res.send(incidents)
})

module.exports = router;
