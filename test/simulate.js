/* globals require */
"use strict"

const test = require("blue-tape")
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

test("Simulation module | increases population when it is not too large", (t) => {
	const data = {
		"population": 0,
		"size": 2
	}
	const result = simulate.increasePopIfNotTooLarge(data)

	t.equals(result.population, 1)
	t.end()
})

test("Simulation module | will never decrease population below 0", (t) => {
	const data = {
		"population": -2,
		"size": 2
	}
	const result = simulate.increasePopIfNotTooLarge(data)

	t.equals(result.population, 0)
	t.end()
})

test("Simulation module | will tell me if the state has food goods", (t) => {
	const data = {
		"population": 1,
		"goods": [
			{
				"type": "food",
				"amount": 0
			}
		]
	}

	const result = simulate.hasFood(data)
	const check = (v) => v.type === "food"

	t.true(result.every(check))
	t.end()
})

test("Simulation module | will tell me if the total food in state", (t) => {
	const data = {
		"population": 1,
		"goods": [
			{
				"type": "food",
				"amount": 1
			}
		]
	}
	const result = simulate.getFood(data)

	t.equals(result, 1)
	t.end()
})

test("Simulation module | will return `false` if food is less than population", (t) => {
	const data = {
		"population": 1,
		"goods": [
			{
				"type": "food",
				"amount": 1
			}
		]
	}
	const result = simulate.isFoodLessThanPopulation(data)

	t.false(result)
	t.end()
})

test("Simulation module | will decrease pop if food is deficient", (t) => {
	const data = {
		"population": 1,
		"goods": [
			{
				"type": "food",
				"amount": 0
			}
		]
	}
	const result = simulate.decreasePopIfMissingFood(data)

	t.equals(result.population, 0)
	t.end()
})
