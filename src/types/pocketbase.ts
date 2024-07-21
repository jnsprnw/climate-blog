export type Post = {
	id: string;
	title: string;
	content: string;
	language: {
		key: string;
		slug: string;
		label: string;
	};
};
