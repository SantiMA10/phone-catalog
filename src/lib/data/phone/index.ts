import { prisma } from '../../db';
import { Phone } from '../../entities/Phone';

export const getPhones = async (): Promise<{ data: Phone[] }> => {
	const phones = await prisma.phone.findMany();

	return { data: phones };
};

export const getPhone = async (id: Phone['id']): Promise<{ data: Phone | null }> => {
	const phone = await prisma.phone.findFirst({ where: { id } });

	return { data: phone };
};

export const deletePhone = async (id: Phone['id']): Promise<{ deleted: boolean }> => {
	try {
		await prisma.phone.delete({ where: { id } });
	} catch (error) {
		console.error(error);
		return { deleted: false };
	}

	return { deleted: true };
};
