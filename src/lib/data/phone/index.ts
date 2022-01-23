import { prisma } from '../../db';
import { Phone } from '../../entities/Phone';

export const getPhones = async (): Promise<{ data: Phone[] }> => {
	const phones = await prisma.phone.findMany();

	return { data: phones };
};
