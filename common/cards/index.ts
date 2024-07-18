import type Card from './base/card'

import defaultEffectCards from './default/effects'
import alterEgoEffectCards from './alter-egos/effects'
// import adventOfTcgEffectCards from './advent-of-tcg/effects'
import defaultHermitCards from './default/hermits'
import alterEgosHermitCards from './alter-egos/hermits'
// import adventOfTcgHermitCards from './advent-of-tcg/hermits'
import defaultItemCards from './default/items'
import defaultSingleUseCards from './default/single-use'
import alterEgosSingleUseCards from './alter-egos/single-use'
// import adventOfTcgSingleUseCards from './advent-of-tcg/single-use'
import alterEgosIIHermitCards from './alter-egos-ii/hermits/index'
import {CardClass} from './base/card'

const effectCardClasses: Array<CardClass> = [
	...defaultEffectCards,
	...alterEgoEffectCards,
	// ...adventOfTcgEffectCards,
]

const hermitCardClasses: Array<CardClass> = [
	...defaultHermitCards,
	...alterEgosHermitCards,
	// ...adventOfTcgHermitCards,
	...alterEgosIIHermitCards,
]

const itemCardClasses: Array<CardClass> = [...defaultItemCards]

const singleUseCardClasses: Array<CardClass> = [
	...defaultSingleUseCards,
	...alterEgosSingleUseCards,
	// ...adventOfTcgSingleUseCards,
]

const allCardClasses: Array<CardClass> = [
	...effectCardClasses,
	...hermitCardClasses,
	...itemCardClasses,
	...singleUseCardClasses,
]

export const CARDS: Record<string | number, Card> = allCardClasses.reduce(
	(result: Record<string | string, Card>, cardClass) => {
		let card = new cardClass(cardClass)
		result[cardClass.name] = card
		result[card.props.numericId] = card
		// To maintain compatability with the deck saving system, we need to be able to look up
		// cards by their id.
		result[card.props.id] = card
		return result
	},
	{}
)
