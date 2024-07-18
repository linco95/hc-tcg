import Card from '../../base/card'
import {hermit} from '../../base/defaults'
import {Hermit} from '../../base/types'

class VintageBeefCommon extends Card {
	props: Hermit = {
		...hermit,
		id: 'vintagebeef_common',
		numericId: 102,
		name: 'Beef',
		expansion: 'default',
		rarity: 'common',
		tokens: 0,
		type: 'balanced',
		health: 250,
		primary: {
			name: 'Hey Guys!',
			cost: ['any'],
			damage: 30,
			power: null,
		},
		secondary: {
			name: 'Mindcrack',
			cost: ['balanced', 'balanced'],
			damage: 80,
			power: null,
		},
	}
}

export default VintageBeefCommon
