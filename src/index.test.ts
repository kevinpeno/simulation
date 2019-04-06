import run from "tape"
import {
	producer,
	consumer,
	factoryExecutor,
} from "./"

run("producers create goods", (test) => {
	const result = producer(
		["population", 1],
		["food", 1]
	)
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

	test.deepEqual(result, [])
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
	const result = factoryExecutor({
		consumes: [
			["food", 1]
		],
		produces: [
			["population", 1]
		]
	})
	const expected = [
		["food", -1],
		["population", 1]
	]

	test.deepEqual(result, expected)
	test.end()
})
