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
	});
});
