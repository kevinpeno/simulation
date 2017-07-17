/* globals require, setTimeout, console */
"use strict"

const _ = require("./utils")
const simulate = require("./simulate")

const state = {
	"population": 1,
	"size": 10,
	"goods": {
		"energy": 8,
		"food": 8
	},
	"factories": [{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},{
		"energy": -1,
		"food": 1
	},
	{
		"energy": 1
	}]
}

const simulation = _.over([
	simulate.growPopulation,
	simulate.consumeFood,
	simulate.runFactories
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

function programFlow(state) {
	return _.flow([
		simulator,
		_.flatten,
		(diffs) => {
			console.log(diffs)
			return diffs
		},
		_.partialRight(_.mergeDiffsToState, state),
		(state) => {
			console.log(state)
			return state
		}
	])(state)
}

console.log(state)
loop(1000, programFlow)(state)
