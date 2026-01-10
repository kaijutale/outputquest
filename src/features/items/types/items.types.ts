export interface Item {
	id: number;
	name: string | null;
	description?: string | null;
	image?: string | null;
	acquired: boolean;
}

export interface ItemsData {
	items: Item[];
}
