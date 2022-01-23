/**
 * @jest-environment node
 */

import fetch from 'node-fetch';

import handleGetPhones from '../../../../../src/pages/api/phones';
import { PhoneBuilder } from '../../../../builders/PhoneBuilder';
import { withDb, withNextApiRoute } from '../../../../jest.utils';

withDb(() => {
	withNextApiRoute(handleGetPhones, (getUrl) => {
		describe('GET /api/phones', () => {
			it('all the available phones in the db', async () => {
				const dbPhones = [await new PhoneBuilder().save(), await new PhoneBuilder().save()];
				const response = await fetch(getUrl(), {
					method: 'GET',
				});

				expect(response.status).toBe(200);
				expect(await response.json()).toEqual({ data: expect.arrayContaining(dbPhones) });
			});
		});

		describe('POST /api/phones', () => {
			it('returns a 400 error if the phone is missing any field', async () => {
				const phone = new PhoneBuilder({ name: undefined }).get();
				const response = await fetch(getUrl(), {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(phone),
				});

				expect(response.status).toBe(400);
				expect(await response.json()).toEqual({ error: { message: 'name is a required field' } });
			});

			it('returns a 201 and the created phone if everything goes well', async () => {
				const phone = new PhoneBuilder().get();
				const response = await fetch(getUrl(), {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(phone),
				});

				expect(response.status).toBe(201);
				expect(await response.json()).toEqual({ data: phone });
			});
		});
	});
});
