import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	favoriteName: { type: String, default: null, required: true },
	favoriteUrl: { type: String, default: null, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Favorite', favoriteSchema);

