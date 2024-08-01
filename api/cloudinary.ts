import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: Bun.env.CLOUDINARY_CLOUD,
	api_key: Bun.env.CLOUDINARY_KEY,
	api_secret: Bun.env.CLOUDINARY_SECRET
});

export async function getImageDetails(id: string, caption: string) {
	const { width, height } = await cloudinary.api.resource(id);

	const transformation = { quality: 'auto', fetch_format: 'auto' };

	const url = cloudinary.url(id, transformation);

	const url_rss = cloudinary.url(id, {
		...transformation,
		height: 400,
		width: 400,
		crop: 'fit'
	});

	const sizes = [300, 600, 900, 1200, 1500, 1800, 2100, width].filter((size) => size <= width);

	return {
		url,
		width,
		height,
		caption,
		url_rss,
		sizes: sizes.map((size) => [
			size,
			cloudinary.url(id, {
				...transformation,
				width: size,
				crop: 'scale'
			})
		])
	};
}
