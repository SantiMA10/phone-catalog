import { ValidationError } from 'yup';

import {
	createPhone,
	deletePhone,
	getPhone,
	getPhones,
	updatePhone,
} from '../../../../../src/lib/data/phone';
import { PhoneBuilder } from '../../../../builders/PhoneBuilder';
import { withDb } from '../../../../jest.utils';

withDb(() => {
	describe('phone', () => {
		describe('#getPhones', () => {
			it('returns an empty array if there is no phone in the db', async () => {
				const { data: phones } = await getPhones();

				expect(phones).toEqual([]);
			});

			it('all the available phones in the db', async () => {
				const dbPhones = [await new PhoneBuilder().save(), await new PhoneBuilder().save()];

				const { data: phones } = await getPhones();

				expect(phones).toEqual(expect.arrayContaining(dbPhones));
			});
		});

		describe('#getPhone', () => {
			it('returns null if the phone is not in the db', async () => {
				await new PhoneBuilder().save();
				const noDbPhone = new PhoneBuilder().get();

				const { data: phone } = await getPhone(noDbPhone.id);

				expect(phone).toBeNull();
			});

			it('returns the phone from the db', async () => {
				const dbPhone = await new PhoneBuilder().save();

				const { data: phone } = await getPhone(dbPhone.id);

				expect(phone).toStrictEqual(dbPhone);
			});
		});

		describe('#deletePhone', () => {
			it('returns the deleted flag set to false if the phone does not exists', async () => {
				const phone = new PhoneBuilder().get();

				const { deleted } = await deletePhone(phone.id);

				expect(deleted).toBe(false);
			});

			it('returns the deleted flag set to true if the phone exists and was deleted', async () => {
				const phone = await new PhoneBuilder().save();

				const { deleted } = await deletePhone(phone.id);

				expect(deleted).toBe(true);
			});
		});

		describe('#createPhone', () => {
			it('throws a ValidationError if the Phone does not comply with the validation schema', async () => {
				const phone = new PhoneBuilder({ name: undefined }).get();

				await expect(createPhone(phone)).rejects.toThrow(ValidationError);
			});

			it('returns the created phone if everything goes well', async () => {
				const phone = new PhoneBuilder().get();

				const { data: createdPhone } = await createPhone(phone);

				expect(createdPhone).toStrictEqual(phone);
			});
		});

		describe('#updatePhone', () => {
			it('throws a ValidationError if the Phone does not comply with the validation schema', async () => {
				const phone = await new PhoneBuilder().save();

				await expect(updatePhone({ id: phone.id, name: undefined })).rejects.toThrow(
					ValidationError,
				);
			});

			it('returns the created phone if everything goes well', async () => {
				const phone = await new PhoneBuilder().save();

				const { data: updatedPhone } = await updatePhone({ id: phone.id, name: 'new name' });

				expect(updatedPhone).toMatchObject({ id: phone.id, name: 'new name' });
			});

			it('returns null if the phone is not in the db', async () => {
				const phone = new PhoneBuilder().get();

				const { data: updatedPhone } = await updatePhone({ id: phone.id, name: 'new name' });

				expect(updatedPhone).toBeNull();
			});
		});
	});
});
