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

test("Population module | `set` will return a new state with pop updated to supplied value", (t) => {
	const result = population.set(1)

	t.equals(result.population, 1)
	t.end()
})
