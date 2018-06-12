import { autorun, observable, decorate } from 'mobx'

class PokedexStore {
	pokemonList = []
	pokemonHistory = []
	totalPokemon = 0
	pageSize = 10
	page = 1
	disablePagination = false
	pokemonTypes = []
	favorites = []
	removeFromFavorites(name) {
		const pokemon = this.favorites.find(val => name === val.favoriteName)
		this.favorites.remove(pokemon)
	}
}

decorate(PokedexStore, {
  pokemonList: observable,
	pokemonHistory: observable,
	totalPokemon: observable,
	pageSize: observable,
	page: observable,
	disablePagination: observable,
	pokemonTypes: observable,
	favorites: observable
});

let store = window.PokedexStore = new PokedexStore

export default store

autorun(() => {
	console.log('favorites', store.favorites);
});
