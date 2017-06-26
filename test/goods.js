/* globals require */
"use strict"

const test = require("tape")
const goods = require("../src/goods")
const state = [
	{
		"type": "food",
		"amount": 10
	}
]

test("Goods module | will return the specified good", (t) => {
	const result = goods.get("food", state)

	t.deepEquals(result, state[0])
	t.end()
})

test("Goods module | will return a default object when specified good doesn't exist", (t) => {
	const result = goods.get("food", [])

	t.equals(result.type, "food")
	t.equals(result.amount, 0)
	t.end()
})

test("Goods module | will return true if the specified good has an amount = X", (t) => {
	const result = goods.has("food", 10, state)

	t.equals(result, true)
	t.end()
})

test("Goods module | will return true if the specified good has an amount > X", (t) => {
	const result = goods.has("food", 1, state)

	t.equals(result, true)
	t.end()
})

test("Goods module | will return false if the specified good has an amount < X", (t) => {
	const result = goods.has("food", 11, state)

	t.equals(result, false)
	t.end()
})

test("Goods module | will set the amount of goods matching type to the supplied value", (t) => {
	const state = [{
		"type": "food",
		"amount": 0
	}]

	const results = goods.set("food", 1, state)

	t.equals(results[0].amount, 1)
	t.end()
})

test("Goods module | will set the amount of goods matching type to zero if value is < 0", (t) => {
	const state = [{
		"type": "food",
		"amount": 0
	}]

	const results = goods.set("food", -1, state)

	t.equals(results[0].amount, 0)
	t.end()
})

test("Goods module | will increment the amount of goods matching type by the supplied value", (t) => {
	const state = [{
		"type": "food",
		"amount": 0
	}]

	const results = goods.increment("food", 1, state)

	t.equals(results[0].amount, 1)
	t.end()
})
