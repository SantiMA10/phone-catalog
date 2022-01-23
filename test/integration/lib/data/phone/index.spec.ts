import { getPhone, getPhones } from '../../../../../src/lib/data/phone';
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
	});
});
