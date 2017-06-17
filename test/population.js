/* globals require */
"use strict"

const test = require("blue-tape")
const population = require("../src/population")

test("`get` will return the current population", (t) => {
	const result = population.get({
		"population": 1
	}, 1)

	t.equals(result, 1)
	t.end()
})

test("`set` will return a new state with pop updated to expected value", (t) => {
	const result = population.set({
		"population": 0
	}, 1)

	t.equals(result.population, 1)
	t.end()
})

test("`increment` will return a new state with pop increased by one", (t) => {
	const result = population.increment({
		"population": 0
	}, 1)

	t.equals(result.population, 1)
	t.end()
})

test("`decrement` will return a new state with pop decrease by one", (t) => {
	const result = population.decrement({
		"population": 1
	}, 1)

	t.equals(result.population, 0)
	t.end()
})

test("isLessThanZero will return true if pop less than zero", (t) => {
	const result = population.isLessThanZero({
		"population": -1
	})

	t.true(result)
	t.end()
})

test("isLessThanMax will return true if pop less than specified", (t) => {
	const result = population.isLessThanSize({
		"population": 1,
		"size": 2
	})

	t.true(result)
	t.end()
})
