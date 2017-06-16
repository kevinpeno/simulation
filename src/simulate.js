"use strict"
/* globals console, setTimeout */

const system = {
	"population": 1,
	"size": 10
}

// simulation loop
function loop(state) {
	return () => {
		console.log(state)
		setTimeout(loop(state), 1000)
	}
}

loop(system)()
