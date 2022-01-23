import { phoneSchema } from '../../../src/lib/entities/Phone';
import { PhoneBuilder } from '../../builders/PhoneBuilder';

describe('phoneSchema', () => {
	it('fails if the name is undefined', async () => {
		const phone = new PhoneBuilder({ name: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('name is a required field');
	});

	it('fails if the manufacturer is undefined', async () => {
		const phone = new PhoneBuilder({ manufacturer: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('manufacturer is a required field');
	});

	it('fails if the description is undefined', async () => {
		const phone = new PhoneBuilder({ description: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('description is a required field');
	});

	it('fails if the color is undefined', async () => {
		const phone = new PhoneBuilder({ color: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('color is a required field');
	});

	it('fails if the price is undefined', async () => {
		const phone = new PhoneBuilder({ price: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('price is a required field');
	});

	it('fails if the price is negative', async () => {
		const phone = new PhoneBuilder({ price: -10 }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('price must be a positive number');
	});

	it('fails if the imageFileName is undefined', async () => {
		const phone = new PhoneBuilder({ imageFileName: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('imageFileName is a required field');
	});

	it('fails if the imageFileName is not a valid url', async () => {
		const phone = new PhoneBuilder({ imageFileName: 'image' }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('imageFileName must be a valid URL');
	});

	it('fails if the screen is undefined', async () => {
		const phone = new PhoneBuilder({ screen: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('screen is a required field');
	});

	it('fails if the processor is undefined', async () => {
		const phone = new PhoneBuilder({ processor: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('processor is a required field');
	});

	it('fails if the ram is undefined', async () => {
		const phone = new PhoneBuilder({ ram: undefined }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('ram is a required field');
	});

	it('fails if the ram is negative', async () => {
		const phone = new PhoneBuilder({ ram: -10 }).get();

		await expect(phoneSchema.validate(phone)).rejects.toThrow('ram must be a positive number');
	});
});
