export function producer(good) {
	if ( good && good.length ) {
		return (good[0] instanceof Array) ? good : [good]
	}

	return []
}

export function consumer(good) {
	return producer(good)
		.map(([name, value]) => [name, -value])
}

export function factory(consumes, produces) {
	return [].concat(
		consumer(consumes),
		producer(produces)
	)
}

export function getStores(property, stores) {
	return stores
		.filter(([name]) => property === name)
		.reduce((acc, [, value]) => acc + value, 0)
}
