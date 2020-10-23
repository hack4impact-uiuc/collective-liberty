const router = require('express').Router();
const Incident = require('../models/Incident');
var mongodb = require('mongodb');


router.get("/", async (req, res) => {
	const incidents = await Incident.find({})
	res.send(incidents)
})

module.exports = router;
