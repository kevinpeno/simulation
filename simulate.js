// /* globals require, setTimeout, console */
/* globals require */
"use strict"

const {consumer, factory, producer} = require("./src/index")

const makeBabies = factory(
	["food", 1],
	["population", 1]
)

const feedPopulation = (stores) => {
	const souls = stores
		.filter(([name]) => name === "population")
		.reduce((acc, [, value]) => acc + value, 0)
	return consumer(["food", souls])
}

const workThePopulous = (stores) => {
	const workers = stores
		.filter(([name]) => name === "population")
		.reduce((acc, [, value]) => acc + value, 0)

	return producer(["energy", workers])
}

const cullPopulation = (stores) => {
	const food = stores
		.filter(([name]) => name === "food")
		.reduce((acc, [, value]) => acc + value, 0)

	const culledPop = factory(["population", -food], ["food", -food])

	return food <= 0 ? culledPop : [["population", 0]]
}

const workThePopulous = (stores) => {
	const workers = stores
		.filter(([name]) => name === "population")
		.reduce((acc, [, value]) => acc + value, 0)

	return producer(["energy", workers])
}

const stores = [
	["energy", 0],
	["food", 20],
	["population", 20]
]

const factories = [
	workThePopulous,
	feedPopulation,
	makeBabies,
	cullPopulation,
	growFood
]

function simulate(stores, factories) {
	const diffs = factories.map((factory) => {
		if ( factory instanceof Function ) {
			return factory(stores)
		}

		return factory
	})

	const flattenedStores = [].concat(stores, ...diffs)

	const newStoresObj = flattenedStores.reduce((stores, [name, value]) => {
		return Object.assign({}, stores, {
			[name]: (stores[name] ? (stores[name] + value) : value)
		})
	}, {})

	const newStore = []

	for ( const i in newStoresObj) {
		newStore.push([i, newStoresObj[i]])
	}

	return newStore
}

const round1 = simulate(stores, factories)
const round2 = simulate(round1, factories)
const round3 = simulate(round2, factories)
const round4 = simulate(round3, factories)
const round5 = simulate(round4, factories)

round5
debugger

// const simulation = _.over([
// 	simulate.growPopulation,
// 	simulate.consumeFood,
// 	simulate.runFactories
// ])
// const simulator = _.partial(simulate.itWith, simulation)

// runtime
// function loop(timer, toRun) {
// 	const run = (state) => {
// 		setTimeout(() => {
// 			run(toRun(state))
// 		}, timer)
// 	}

// 	return _.partialRight(run, toRun)
// }

// function programFlow(state) {
// 	return _.flow([
// 		simulator,
// 		_.flatten,
// 		(diffs) => {
// 			console.log(diffs)
// 			return diffs
// 		},
// 		_.partialRight(_.mergeDiffsToState, state),
// 		(state) => {
// 			console.log(state)
// 			return state
// 		}
// 	])(state)
// }

// console.log(state)
// loop(1000, programFlow)(state)
