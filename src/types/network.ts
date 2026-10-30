export type Entity = {
	id: string;
	title: string;
	type: string;
	weight: number;
	date?: string;
};

export type Link = {
	source: string;
	target: string;
	weight: number;
};
