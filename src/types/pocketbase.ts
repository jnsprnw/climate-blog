export type Post = {
	id: string;
	slug: string;
	title: string;
	content: string;
	image:
		| undefined
		| {
				url: string;
				width: number;
				height: number;
				caption: string;
		  };
	language: {
		key: string;
		slug: string;
		label: string;
	};
	created: string;
	published: string;
	isFavorite: boolean;
	image_alt: string;
	image_caption: string;
	tags: string[];
	url: string;
};
