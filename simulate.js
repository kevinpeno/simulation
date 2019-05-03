// /* globals require, setTimeout, console */
/* globals require */
"use strict"

const {
	producer,
	consumer,
	factory,
	getStores,
} = require("./src/index")

const FOOD_MULTIPLIER = 1.05
const BABY_MULTIPLIER = 0.01

const feedPopulation = (stores) => consumer([
	"food",
	getStores("population", stores)
])

const workThePopulous = (stores) =>  producer([
	"energy",
	getStores("population", stores)
])

const growFood = (stores) => {
	const energy = getStores("energy", stores)

	return factory(["energy", energy],["food", Math.floor(energy * FOOD_MULTIPLIER)])
}

const cullPopulation = (stores) => {
	const food = getStores("food", stores)

	return food < 0
		? factory(["population", -food], ["food", -food])
		: producer(["population", 0])
}

const makeBabies = (stores) => {
	const food = getStores("food", stores)

	return food > 0
		? factory(["food", food], ["population", Math.floor(food * BABY_MULTIPLIER)])
		: producer(["population", 0])
}

function simulate(stores, factories) {
	const processedStores = factories.reduce((stores, factory) => {
		return stores.concat(factory(stores))
	}, stores)

	const newStoresObj = processedStores.reduce((stores, [name, value]) => {
		return Object.assign({}, stores, {
			[name]: (stores[name] ? (stores[name] + value) : value)
	})}, {})

	const newStore = []

	for ( const i in newStoresObj) {
		newStore.push([i, newStoresObj[i]])
	}

	return newStore
}

const startingCivCount = 15000

const stores = [
	["energy", 0],
	["food", startingCivCount],
	["population", startingCivCount]
]

const factories = [
	feedPopulation,
	workThePopulous,
	growFood,
	cullPopulation,
	makeBabies,
]

// console.log(stores)

// const round1 = simulate(stores, factories)
// console.log(round1)

// const round2 = simulate(round1, factories)
// console.log(round2)

// const round3 = simulate(round2, factories)
// console.log(round3)

// const round4 = simulate(round3, factories)
// console.log(round4)

// const round5 = simulate(round4, factories)
// console.log(round5)
// debugger

// runtime
function loop(timer, toRun) {
	const run = (state, factories) => {
		setTimeout(() => {
			const newState = toRun(state, factories)
			console.log(newState)
			run(newState, factories)
		}, timer)
	}

	return run
}

loop(1000, simulate)(stores, factories)
