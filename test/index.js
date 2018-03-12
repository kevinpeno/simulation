/* globals require */
"use strict"

const run = require("tape")
const {producer, consumer, factory} = require("../src/index")

run("producers create goods", (test) => {
	const result = producer([
		["population", 1],
		["food", 1]
	])
	const expected = [
		["population", 1],
		["food", 1]
	]

	test.deepEqual(result, expected)
	test.end()
})

run("producer can accept singular items to produce", (test) => {
	const result = producer(
		["population", 1]
	)
	const expected = [["population", 1]]

	test.deepEqual(result, expected)
	test.end()
})

run("producers create nothing if nothing is passed in", (test) => {
	const result = producer()
	const expected = []

	test.deepEqual(result, expected)
	test.end()
})

run("consumers consume goods (functionally an inverse of producer)", (test) => {
	const result = consumer(
		["population", 1]
	)
	const expected = [["population", -1]]

	test.deepEqual(result, expected)
	test.end()
})

run("factories consume goods to produce other goods", (test) => {
	const result = factory(
		["food", 1],
		["population", 1]
	)
	const expected = [
		["food", -1],
		["population", 1]
	]

	test.deepEqual(result, expected)
	test.end()
})
