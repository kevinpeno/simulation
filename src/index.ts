type Good = [string, number]

export const producer = (...outputs: Good[]) => outputs
export const produces = producer

export const consumer = (...inputs: Good[]): Good[] =>
	producer(...inputs)
		.map(([ name, value ]) => <Good>[name, -value])
export const consumes = consumer

type FactoryConfig = {
	consumes: Good[],
	produces: Good[]
}
export const factory = ({
	consumes,
	produces,
}: FactoryConfig) => ([
	...consumer(...consumes),
	...producer(...produces)
])
