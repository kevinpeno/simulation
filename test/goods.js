/* globals require */
"use strict"

const test = require("blue-tape")
const goods = require("../src/goods")
const state = [
	{
		"type": "food",
		"amount": 10
	}
]

test("Goods module | will return the specified good", (t) => {
	const result = goods.get(state, "food")

	t.equals(result, state[0])
	t.end()
})

test("Goods module | will return true if the specified good has an amount = X", (t) => {
	const result = goods.has(state, "food", 10)

	t.equals(result, true)
	t.end()
})

test("Goods module | will return true if the specified good has an amount > X", (t) => {
	const result = goods.has(state, "food", 1)

	t.equals(result, true)
	t.end()
})

test("Goods module | will return false if the specified good has an amount < X", (t) => {
	const result = goods.has(state, "food", 11)

	t.equals(result, false)
	t.end()
})
