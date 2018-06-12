import { autorun, observable, decorate } from 'mobx'

class PokemonCardStore {
	addedAsFavorite = false
	pokemonImage = null
	pokemonStats = []
	pokemonTypes = []
}

decorate(PokemonCardStore, {
  addedAsFavorite: observable,
	pokemonImage: observable,
	pokemonStats: observable,
	pokemonTypes: observable
});

export default PokemonCardStore
