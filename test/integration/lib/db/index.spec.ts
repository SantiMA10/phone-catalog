import { prisma } from '../../../../src/lib/db';

describe('db', () => {
	it('uses prisma correctly', async () => {
		const phones = await prisma.phone.findMany();

		expect(phones).toStrictEqual([]);
	});
});
