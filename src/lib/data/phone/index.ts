import { omit } from 'lodash';

import { prisma } from '../../db';
import { Phone, phoneSchema } from '../../entities/Phone';

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

export const createPhone = async (phone: Partial<Phone>): Promise<{ data: Phone }> => {
	const validatedPhone = await phoneSchema.validate(omit(phone, ['id']));

	return { data: await prisma.phone.create({ data: validatedPhone }) };
};

export const updatePhone = async (likePhone: Partial<Phone>): Promise<{ data: Phone | null }> => {
	const phone = await prisma.phone.findFirst({ where: { id: likePhone.id } });

	if (!phone) {
		return { data: null };
	}

	const validatedPhone = await phoneSchema.validate({ ...phone, ...likePhone });

	return { data: await prisma.phone.update({ where: { id: likePhone.id }, data: validatedPhone }) };
};
