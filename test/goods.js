/* globals require */
"use strict"

const _ = require("../src/utils")
const test = require("tape")
const goods = require("../src/goods")
const state = {
	"food": {
		"amount": 10
	}
}

test("Goods module | will return the specified good", (t) => {
	t.deepEquals(goods.get("food", state), state.food)
	t.end()
})

test("Goods module | will return a default object when specified good doesn't exist", (t) => {
	t.deepEquals(goods.get("food", {}), {
		"amount": 0
	})
	t.end()
})

test("Goods module | will return true if the specified good has gte the requested amount", (t) => {
	const equalFood = state
	const moreFood = _.set(
		"food",
		{ "amount": state.food.amount + 1 },
		state
	)

	t.true(goods.has("food", 10, equalFood))
	t.true(goods.has("food", 10, moreFood))
	t.end()
})

test("Goods module | will return false if the specified good has < the requested amount", (t) => {
	t.false(goods.has("food", 11, state))
	t.end()
})

test("Goods module | will set the amount of goods matching type to the supplied value", (t) => {
	const results = goods.set("food", 1)

	t.equals(results.food.amount, 1)
	t.end()
})
