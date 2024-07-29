import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: Bun.env.CLOUDINARY_CLOUD,
	api_key: Bun.env.CLOUDINARY_KEY,
	api_secret: Bun.env.CLOUDINARY_SECRET
});

export async function getImageDetails(id: string, caption: string) {
	const url = cloudinary.url(id, { quality: 'auto', fetch_format: 'auto' });
	const url_rss = cloudinary.url(id, {
		quality: 'auto',
		fetch_format: 'auto',
		height: 400,
		width: 400,
		crop: 'fit'
	});
	const { width, height } = await cloudinary.api.resource(id);
	return {
		url,
		width,
		height,
		caption,
		url_rss
	};
}
