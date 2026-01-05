export interface Item {
	id: number;
	name: string | null;
	description?: string | null;
	image?: string | null;
	acquired: boolean;
	type: string;
}

export interface ItemsData {
	items: Item[];
}
