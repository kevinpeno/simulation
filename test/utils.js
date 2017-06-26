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

test("Utilities module | can set a property value", (t) => {
	const toSet = "test"
	const value = true
	const assignee = { "existing": true }
	const results = _.set(toSet, value, assignee)

	t.true(results.test)
	t.end()
})

test("Utilities module | can set without mutating assignee", (t) => {
	const toSet = "test"
	const value = true
	const assignee = { "existing": true }
	_.set(toSet, value, assignee)

	t.false(assignee.test)
	t.end()
})

test("Utilities module | can set a property value with a customizer", (t) => {
	const toSet = "test"
	const value = 0
	const customizer = _.partial(Math.max, 1)
	const assignee = { "existing": true }
	const results = _.setWith(toSet, value, customizer, assignee)

	t.equals(results.test, 1)
	t.end()
})

