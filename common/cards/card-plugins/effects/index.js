import MilkBucketEffectCard from './milk-bucket'
import ShieldEffectCard from './shield'
import IronArmorEffectCard from './iron-armor'
import GoldArmorEffectCard from './gold-armor'
import DiamondArmorEffectCard from './diamond-armor'
import NetheriteArmorEffectCard from './netherite-armor'
import WolfEffectCard from './wolf'
import TotemEffectCard from './totem'
import BedEffectCard from './bed'
import ThornsEffectCard from './thorns'
import LoyaltyEffectCard from './loyalty'
import StringEffectCard from './string'
import TurtleShellEffectCard from './turtle-shell'
import EffectCard from './_effect-card'
import ThornsIIEffectCard from './thorns_ii'
import ThornsIIIEffectCard from './thorns_iii'

/** @type {Array<EffectCard>} */
const EFFECT_CARDS = [
	new BedEffectCard(),
	new WolfEffectCard(),
	new MilkBucketEffectCard(),
	new GoldArmorEffectCard(),
	new IronArmorEffectCard(),
	new ShieldEffectCard(),
	new DiamondArmorEffectCard(),
	new NetheriteArmorEffectCard(),
	new TotemEffectCard(),
	new ThornsEffectCard(),
	new ThornsIIEffectCard(),
	new ThornsIIIEffectCard(),
	new LoyaltyEffectCard(),
	// new StringEffectCard(),
	// new TurtleShellEffectCard(),
]

export default EFFECT_CARDS
