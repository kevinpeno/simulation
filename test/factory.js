/* globals require */
"use strict"

const test = require("tape")
const factory = require("../src/factory")
const state = {
	"test": 1,
	"test2": 1,
	"test3": 1
}

test("Factories | consume resources and create new ones", (t) => {
	const config = {
		"test": -1,
		"test2": -1,
		"test3": 1
	}
	const results = factory.run(config, state)

	t.equals(results.test, -1)
	t.equals(results.test2, -1)
	t.equals(results.test3, 1)
	t.end()
})

test("Factories | don't consume or create if insufficient resources to consume", (t) => {
	const config = {
		"test": -1,
		"test2": 1
	}

	const results = factory.run(config, {})

	t.deepEquals(results, {})
	t.end()
})
