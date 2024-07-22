export type Post = {
	id: string;
	slug: string;
	title: string;
	content: string;
	language: {
		key: string;
		slug: string;
		label: string;
	};
};