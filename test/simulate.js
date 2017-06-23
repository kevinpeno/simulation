/* globals require */
"use strict"

const test = require("tape")
const simulate = require("../src/simulate")

test("Simulation module | runs a supplied function to get an expected outcome", (t) => {
	const state = {
		"test": false
	}
	const simulationStep = state => state
	const result = simulate.itWith(simulationStep, state)

	t.equals(state, result)
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

test("Simulation module | will return true if goods.food is > population", (t) => {
	const state = {
		"population": 1,
		"goods": [
			{
				"type": "food",
				"amount": 1
			}
		]
	}
	const result = simulate.isFoodSufficient(state)

	t.true(result)
	t.end()
})

test("Simulation module | will return false if goods.food is > population", (t) => {
	const state = {
		"population": 1,
		"goods": [
			{
				"type": "food",
				"amount": 0
			}
		]
	}
	const result = simulate.isFoodSufficient(state)

	t.false(result)
	t.end()
})

test("Simulation module | population cannot grow if there not enough room", (t) => {
	const state = {
		"population": 1,
		"size": 1,
		"goods": [{
			"type": "food",
			"amount": 1
		}]
	}

	const results = simulate.canPopGrow(state)

	t.false(results)
	t.end()
})

test("Simulation module | population cannot grow if there not enough food", (t) => {
	const state = {
		"population": 1,
		"size": 2,
		"goods": [{
			"type": "food",
			"amount": 0
		}]
	}

	const results = simulate.canPopGrow(state)

	t.false(results)
	t.end()
})

test("Simulation module | population does not grow by default", (t) => {
	const state = {
		"population": 1,
		"size": 1,
		"goods": [{
			"type": "food",
			"amount": 1
		}]
	}

	const results = simulate.growPopulation(state)

	t.equals(results.population, 1)
	t.end()
})

test("Simulation module | population grows by one when conditions are met", (t) => {
	const state = {
		"population": 1,
		"size": 2,
		"goods": [{
			"type": "food",
			"amount": 1
		}]
	}

	const results = simulate.growPopulation(state)

	t.equals(results.population, 2)
	t.end()
})

test("Simulation module | population shrinks by one when there's not enough food", (t) => {
	const state = {
		"population": 1,
		"size": 2,
		"goods": [{
			"type": "food",
			"amount": 0
		}]
	}

	const results = simulate.growPopulation(state)

	t.equals(results.population, 0)
	t.end()
})
