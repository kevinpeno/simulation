/* globals require, setTimeout, console */
"use strict"

const _ = require("lodash")
const simulate = require("./simulate")

const state = {
	"population": 1,
	"size": 10,
	"goods": [{
		"type": "food",
		"amount": 8
	}]
}

const simulation = _.flow([
	simulate.growPopulation
])
const simulator = _.partial(simulate.itWith, simulation)

// runtime
function loop(timer, toRun) {
	const run = (state) => {
		setTimeout(() => {
			run(toRun(state))
		}, timer)
	}

	return _.partial(run, _, toRun)
}

const programFlow = _.flow([
	simulator,
	(state) => {
		console.log(state)
		return state
	}
])

loop(1000, programFlow)(state)
