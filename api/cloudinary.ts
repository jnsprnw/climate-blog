import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: Bun.env.CLOUDINARY_CLOUD,
	api_key: Bun.env.CLOUDINARY_KEY,
	api_secret: Bun.env.CLOUDINARY_SECRET
});

export async function getImageDetails(
	id: string,
	caption: string,
	alt: string,
	source_url: string,
	source_label: string
) {
	const { width, height } = await cloudinary.api.resource(id);

	// const info = await cloudinary.api.resource(id);
	// console.log(info);

	const transformation = { quality: 'auto', fetch_format: 'auto' };

	const url = cloudinary.url(id, transformation);

	const url_rss = cloudinary.url(id, {
		...transformation,
		width: 400,
		height: 400,
		crop: 'fit'
	});

	const url_preview = cloudinary.url(id, {
		...transformation,
		width: 1200,
		height: 630,
		crop: 'fill',
		gravity: 'auto'
	});

	const sizes = [300, 600, 900, 1200, 1500, 1800, 2100, width].filter((size) => size <= width);

	return {
		url,
		width,
		height,
		caption,
		alt,
		url_rss,
		url_preview,
		source_url,
		source_label,
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
