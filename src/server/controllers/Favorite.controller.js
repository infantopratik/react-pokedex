import Favorite from '../models/favoriteModel';

export function addFavorite(req, res){
	if (!req.body) {
		return res.status(403).json({error: 'Error in the query params'});
	}

	let favoriteData = req.body;

	favoriteData.userId = req.token.userId;

	let newFavorite = new Favorite(favoriteData);

	newFavorite.save()
	.then(favorite=>{
		console.log('Favorite Created', favorite);
		let favoriteId = favorite._id;
		res.json({favoriteId});
	})
	.catch(err => {
		console.log('err while adding favorite', err);
		return res.status(409).json({error: err.message}).end();
	})
}

export function removeFavorite(req, res){
	let userId = req.token.userId;
	let favoriteName = req.body.favoriteName
	Favorite.deleteOne({userId, favoriteName})
		.exec(err => {
			if (err) {
				return res.status(500).json({error: err.message});
			}
			return res.end(`${favoriteName} removed from favorites`);
		})
}

export function getAllFavorites(req, res) {
	let userId = req.token.userId;
	Favorite.find({userId}, (err, favorites)=>{
		if(err) return res.status(409).json({error: err.message}).end();
		return res.json(favorites);
	})
}

