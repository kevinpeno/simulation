/* globals require, setTimeout, console */
"use strict"

const _ = require("./utils")
const simulate = require("./simulate")

const state = {
	"population": 1,
	"size": 10,
	"goods": [{
		"type": "food",
		"amount": 8
	}]
}

const simulation = _.over([
	simulate.growPopulation,
	simulate.consumeFood
])
const simulator = _.partial(simulate.itWith, simulation)

// runtime
function loop(timer, toRun) {
	const run = (state) => {
		setTimeout(() => {
			run(toRun(state))
		}, timer)
	}

	return _.partialRight(run, toRun)
}

const programFlow = _.flow([
	simulator,
	(state) => {
		console.log(state)
		return state
	}
])

console.log(JSON.stringify(state))
// loop(1000, programFlow)(state)
console.log(JSON.stringify(programFlow(state)))
