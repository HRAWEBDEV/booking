type ReserveStep = (typeof reserveSteps)[number];

const reserveStepQueryName = 'reserve-step';
const reserveSteps = ['reserve', 'payment', 'book'] as const;

export type { ReserveStep };
export { reserveStepQueryName, reserveSteps };
