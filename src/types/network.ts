export type Entity = {
	id: string;
	title: string;
	type: string;
	weight: number;
};

export type Link = {
	source: string;
	target: string;
	weight: number;
};
