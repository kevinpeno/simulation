/* globals require */
"use strict"

const test = require("tape")
const _ = require("./../src/utils")

test("Utilities module | can assign from one object onto another", (t) => {
	const toAssign = { "test": true }
	const assignee = { "existing": true }
	const results = _.assign(toAssign, assignee)

	t.true(results.existing)
	t.true(results.test)
	t.end()
})

test("Utilities module | can assign without mutating any passed in objects", (t) => {
	const toAssign = { "test": true }
	const assignee = { "existing": true }
	_.assign(toAssign, assignee)

	t.false(toAssign.existing)
	t.false(assignee.test)
	t.end()
})

test("Utilities module | can get a property value, data last", (t) => {
	const results = _.get("test", { "test": true })
	t.equals(true, results)
	t.end()
})

test("Utilities module | can get a property value or default, data last", (t) => {
	t.true(_.getOr(false, "test", { "test": true }))
	t.false(_.getOr(false, "test", {}))
	t.end()
})

test("Utilities module | can set a property value", (t) => {
	const toSet = "test"
	const value = true
	const assignee = { "existing": true }
	const results = _.set(toSet, value, assignee)

	t.true(results.test)
	t.end()
})

test("Utilities module | can set a property value with a customizer", (t) => {
	const toSet = "test"
	const value = 0
	const customizer = _.partial(Math.max, 1)
	const results = _.setWith(toSet, value, customizer)

	t.equals(results.test, 1)
	t.end()
})

test("Utilities module | can flatten an object to one level", (t) => {
	const nestedObj = {
		"test": {
			"test": true
		}
	}
	const results = _.flattenObject(nestedObj)

	t.true(results["test.test"])
	t.end()
})

test("Utilities module | returns properties on a state, that are not in the diff, unchanged", (t) => {
	const state = {
		"test": 0
	}
	const diffs = []
	const results = _.mergeDiffsToState(diffs, state)

	t.equals(results.test, 0)
	t.end()
})

test("Utilities module | can apply positive numerical differences to an object", (t) => {
	const state = {
		"test": 0
	}
	const diffs = [{
		"test": 1
	}]
	const results = _.mergeDiffsToState(diffs, state)

	t.equals(results.test, 1)
	t.end()
})
