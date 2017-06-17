/* globals require */
"use strict"

const test = require("blue-tape")
const utils = require("../src/utils")

test("setKeyValue will replace the supplied value", (t) => {
	const state = {
		"test": 1
	}

	const result = utils.setKeyValue(state, "test", 2)

	t.equals(result.test, 2)
	t.end()
})

test("incrementKeyValue will update the supplied value by increment", (t) => {
	const state = {
		"test": 0
	}

	const result = utils.incrementKeyValue(state, "test", 1)

	t.equals(result.test, 1)
	t.end()
})
