import {GameModel} from '../../../models/game-model'
import * as query from '../../../components/query'
import Card from '../../base/card'
import {hermit} from '../../base/defaults'
import {Hermit} from '../../base/types'
import {CardComponent, ObserverComponent, SlotComponent} from '../../../components'

class KeralisRare extends Card {
	props: Hermit = {
		...hermit,
		id: 'keralis_rare',
		numericId: 72,
		name: 'Keralis',
		expansion: 'default',
		rarity: 'rare',
		tokens: 1,
		type: 'terraform',
		health: 250,
		primary: {
			name: 'Booshes',
			cost: ['any'],
			damage: 60,
			power: null,
		},
		secondary: {
			name: 'Sweet Face',
			cost: ['terraform', 'terraform', 'any'],
			damage: 0,
			power: 'Heal any AFK Hermit 100hp.',
		},
	}

	pickCondition = query.every(
		query.not(query.slot.active),
		query.not(query.slot.empty),
		query.slot.hermit
	)

	override onAttach(game: GameModel, component: CardComponent, observer: ObserverComponent) {
		const {player} = component

		let pickedAfkSlot: SlotComponent | null = null

		// Pick the hermit to heal
		observer.subscribe(player.hooks.getAttackRequests, (activeInstance, hermitAttackType) => {
			// Make sure we are attacking
			if (activeInstance.entity !== component.entity) return

			// Only secondary attack
			if (hermitAttackType !== 'secondary') return

			// Make sure there is something to select
			if (!game.components.exists(SlotComponent, this.pickCondition)) return

			game.addPickRequest({
				playerId: player.id,
				id: component.entity,
				message: 'Pick an AFK Hermit from either side of the board',
				canPick: this.pickCondition,
				onResult(pickedSlot) {
					// Store the info to use later
					pickedAfkSlot = pickedSlot
				},
				onTimeout() {
					// We didn't pick anyone to heal, so heal no one
				},
			})
		})

		// Heals the afk hermit *before* we actually do damage
		observer.subscribe(player.hooks.onAttack, (attack) => {
			if (!attack.isAttacker(component.entity) || attack.type !== 'secondary') return

			if (!pickedAfkSlot?.inRow()) return
			pickedAfkSlot.row.heal(100)
			let hermit = pickedAfkSlot.row.getHermit()

			game.battleLog.addEntry(
				player.entity,
				`$p${hermit?.props.name} (${pickedAfkSlot.row.index + 1})$ was healed $g100hp$ by $p${
					hermit?.props.name
				}$`
			)
		})
	}
}

export default KeralisRare
