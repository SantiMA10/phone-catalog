import { number, object, string } from 'yup';

export interface Phone {
	id: string;
	name: string;
	manufacturer: string;
	description: string;
	color: string;
	price: number;
	imageFileName: string;
	screen: string;
	processor: string;
	ram: number;
}

export const phoneSchema = object({
	name: string().required(),
	manufacturer: string().required(),
	description: string().required(),
	color: string().required(),
	price: number().required().positive().integer(),
	imageFileName: string().url().required(),
	screen: string().required(),
	processor: string().required(),
	ram: number().required().positive().integer(),
});
