/* globals require */
"use strict"

const _ = require("../src/utils")
const test = require("tape")
const simulate = require("../src/simulate")

test("Simulation module | runs a supplied function to get an expected outcome", (t) => {
	const state = {
		"test": false
	}
	const simulationStep = _.identity
	const result = simulate.itWith(simulationStep, state)

	t.equals(state, result)
	t.end()
})

test("Simulation module | will return true if population is > 0", (t) => {
	const state = {
		"population": 1,
		"size": 2
	}
	const result = simulate.isPopulationSufficient(state)

	t.true(result)
	t.end()
})

test("Simulation module | will return true if population is < 1", (t) => {
	const state = {
		"population": 0,
		"size": 2
	}
	const result = simulate.isPopulationSufficient(state)

	t.false(result)
	t.end()
})

test("Simulation module | will return true if size is > population", (t) => {
	const state = {
		"population": 1,
		"size": 2
	}
	const result = simulate.isSpaceSufficient(state)

	t.true(result)
	t.end()
})

test("Simulation module | will return true if size is > population", (t) => {
	const state = {
		"population": 2,
		"size": 2
	}
	const result = simulate.isSpaceSufficient(state)

	t.false(result)
	t.end()
})

test("Simulation module | will return true if goods.food is >= population", (t) => {
	const state = {
		"population": 1,
		"goods": {
			"food": 1
		}
	}
	const result = simulate.isFoodSufficient(state)

	t.true(result)
	t.end()
})

test("Simulation module | will return false if goods.food is < population", (t) => {
	t.false(simulate.isFoodSufficient({
		"population": 1
	}))

	t.end()
})

test("Simulation module | population grows by one when conditions are met", (t) => {
	const state = {
		"population": 1,
		"size": 2,
		"goods": {
			"food": 1
		}
	}

	const results = simulate.growPopulation(state)

	t.equals(results.population, +1)
	t.end()
})

test("Simulation module | population shrinks by one when there's not enough food", (t) => {
	const state = {
		"population": 1,
		"size": 2,
		"goods": {
			"food": 0
		}
	}

	const results = simulate.growPopulation(state)

	t.equals(results.population, -1)
	t.end()
})

test("Simulation module | population comsumes food equal to the size of population", (t) => {
	const state = {
		"population": 2,
		"goods": {
			"food": 2
		}
	}

	const results = simulate.consumeFood(state)

	t.equals(results.goods.food, -2)
	t.end()
})
