import faker from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { prisma } from '../../src/lib/db';
import { Phone } from '../../src/lib/entities/Phone';

const factory = Factory.Sync.makeFactory<Phone>({
	id: Factory.each(() => faker.datatype.uuid()),
	color: Factory.each(() => faker.commerce.color()),
	description: Factory.each(() => faker.lorem.sentence()),
	imageFileName: Factory.each(() => faker.image.imageUrl()),
	manufacturer: Factory.each(() => faker.company.companyName()),
	name: Factory.each(() => faker.commerce.productName()),
	price: Factory.each(() => faker.datatype.number()),
	processor: Factory.each(() => faker.commerce.productName()),
	ram: Factory.each(() => faker.datatype.number()),
	screen: Factory.each(() => faker.commerce.productName()),
});

export class PhoneBuilder {
	private phone: Phone;

	public constructor(phoneLike?: Partial<Phone>) {
		this.phone = factory.build(phoneLike);
	}

	public async save(): Promise<Phone> {
		return prisma.phone.create({ data: this.phone });
	}

	public get(): Phone {
		return this.phone;
	}
}
