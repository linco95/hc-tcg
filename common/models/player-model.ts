import {getStarterPack} from '../../server/src/utils/state-gen'
import {PlayerDeckT} from '../../common/types/deck'
import {Socket} from 'socket.io'
import {validateDeck} from '../utils/validation'
import {censorString} from '../utils/formatting'
import {PlayerInfo} from '../types/server-requests'

export type PlayerId = string & {__player_id: never}

export class PlayerModel {
	private internalId: PlayerId
	private internalSecret: string
	private internalDeck: PlayerDeckT
	public name: string
	public minecraftName: string
	public censoredName: string
	public socket: Socket

	constructor(playerName: string, minecraftName: string, socket: Socket) {
		this.internalId = Math.random().toString() as PlayerId
		this.internalSecret = Math.random().toString()

		// Always generate a starter deck as the default
		this.internalDeck = {
			name: 'Starter Deck',
			icon: 'any',
			cards: getStarterPack(),
		}

		this.name = playerName
		this.minecraftName = minecraftName
		this.censoredName = censorString(playerName)
		this.socket = socket
	}

	public get id() {
		return this.internalId
	}
	public get secret() {
		return this.internalSecret
	}
	public get deck() {
		return this.internalDeck
	}

	getPlayerInfo(): PlayerInfo {
		return {
			playerId: this.id,
			playerSecret: this.secret,
			playerDeck: this.deck,
			playerName: this.name,
			minecraftName: this.minecraftName,
			censoredPlayerName: this.censoredName,
		}
	}

	setPlayerDeck(newDeck: PlayerDeckT) {
		if (!newDeck || !newDeck.cards) return
		const validationMessage = validateDeck(newDeck.cards)
		if (validationMessage) return
		this.internalDeck = {
			name: newDeck.name,
			icon: newDeck.icon,
			cards: newDeck.cards,
		}
	}

	setMinecraftName(name: string) {
		this.minecraftName = name
	}
}
