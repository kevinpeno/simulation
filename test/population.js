/* globals require */
"use strict"

const test = require("tape")
const population = require("../src/population")

test("Population module | `get` will return the current population", (t) => {
	const result = population.get({
		"population": 1
	})

	t.equals(result, 1)
	t.end()
})

test("Population module | `set` will return a new state with pop updated to expected value", (t) => {
	const result = population.set(1, {
		"population": 0
	})

	t.equals(result.population, 1)
	t.end()
})

test("Population module | `set` will prevent population from being set to less than 0", (t) => {
	const result = population.set(-1, {
		"population": 0
	})

	t.equals(result.population, 0)
	t.end()
})

test("Population module | `increment` will return a new state with pop increased by value", (t) => {
	const result = population.increment(1, {
		"population": 0
	})

	t.equals(result.population, 1)
	t.end()
})

test("Population module | `increment` will return a new state with pop decrease by one", (t) => {
	const result = population.increment(-1, {
		"population": 1
	})

	t.equals(result.population, 0)
	t.end()
})
