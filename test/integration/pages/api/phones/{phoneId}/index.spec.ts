import fetch from 'node-fetch';

import handleGetPhone from '../../../../../../src/pages/api/phones/[phoneId]';
import { PhoneBuilder } from '../../../../../builders/PhoneBuilder';
import { withDb, withNextApiRoute } from '../../../../../jest.utils';

withDb(() => {
	withNextApiRoute(handleGetPhone, (getUrl, setQuery) => {
		it('returns a 404 error if the phone does not exist in the db', async () => {
			const phone = new PhoneBuilder().get();

			setQuery({ phoneId: phone.id });
			const response = await fetch(getUrl());

			expect(response.status).toBe(404);
		});

		it('returns a 400 error if the phone id is missing', async () => {
			setQuery({ phoneId: undefined });
			const response = await fetch(getUrl());

			expect(response.status).toBe(400);
			expect(await response.json()).toStrictEqual({ message: 'Missing phoneId in query' });
		});

		it('returns a 400 error if the phone id is an array', async () => {
			setQuery({ phoneId: [] });
			const response = await fetch(getUrl());

			expect(response.status).toBe(400);
			expect(await response.json()).toStrictEqual({ message: 'Invalid phoneId type' });
		});

		it('returns the phone from the db', async () => {
			const phone = await new PhoneBuilder().save();

			setQuery({ phoneId: phone.id });
			const response = await fetch(getUrl());

			expect(response.status).toBe(200);
			expect(await response.json()).toStrictEqual({ data: phone });
		});
	});
});
