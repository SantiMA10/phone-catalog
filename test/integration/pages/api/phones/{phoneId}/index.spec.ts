import fetch from 'node-fetch';

import handleGetPhone from '../../../../../../src/pages/api/phones/[phoneId]';
import { PhoneBuilder } from '../../../../../builders/PhoneBuilder';
import { withDb, withNextApiRoute } from '../../../../../jest.utils';

withDb(() => {
	withNextApiRoute(handleGetPhone, (getUrl, setQuery) => {
		describe('GET /api/phones/[phoneId]', () => {
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

		describe('DELETE /api/phones/[phoneId]', () => {
			it('returns a 400 error if the phone id is missing', async () => {
				setQuery({ phoneId: undefined });
				const response = await fetch(getUrl(), { method: 'DELETE' });

				expect(response.status).toBe(400);
				expect(await response.json()).toStrictEqual({ message: 'Missing phoneId in query' });
			});

			it('returns a 400 error if the phone id is an array', async () => {
				setQuery({ phoneId: [] });
				const response = await fetch(getUrl(), { method: 'DELETE' });

				expect(response.status).toBe(400);
				expect(await response.json()).toStrictEqual({ message: 'Invalid phoneId type' });
			});

			it('returns a 404 error if the phone does not exist in the db', async () => {
				const phone = new PhoneBuilder().get();

				setQuery({ phoneId: phone.id });
				const response = await fetch(getUrl(), { method: 'DELETE' });

				expect(response.status).toBe(404);
			});

			it('returns a 204 if the phone exists and was deleted', async () => {
				const phone = await new PhoneBuilder().save();

				setQuery({ phoneId: phone.id });
				const response = await fetch(getUrl(), { method: 'DELETE' });

				expect(response.status).toBe(204);
			});
		});

		describe('PATCH /api/phones/[phoneId]', () => {
			it('returns a 400 error if the phone id is missing', async () => {
				setQuery({ phoneId: undefined });
				const response = await fetch(getUrl(), {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name: 'iPhone' }),
				});

				expect(response.status).toBe(400);
				expect(await response.json()).toStrictEqual({ message: 'Missing phoneId in query' });
			});

			it('returns a 400 error if the phone id is an array', async () => {
				setQuery({ phoneId: [] });
				const response = await fetch(getUrl(), {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name: 'iPhone' }),
				});
				expect(response.status).toBe(400);
				expect(await response.json()).toStrictEqual({ message: 'Invalid phoneId type' });
			});

			it('returns a 404 error if the phone does not exist in the db', async () => {
				const phone = new PhoneBuilder().get();
				setQuery({ phoneId: phone.id });

				const response = await fetch(getUrl(), {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name: 'iPhone' }),
				});

				expect(response.status).toBe(404);
			});

			it('returns a 400 error if the user tries to update the phone with invalid data', async () => {
				const phone = await new PhoneBuilder().save();
				setQuery({ phoneId: phone.id });

				const response = await fetch(getUrl(), {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name: null }),
				});

				expect(response.status).toBe(400);
				expect(await response.json()).toEqual({ error: { message: expect.any(String) } });
			});

			it('returns a 200 if the phone exists and was updated', async () => {
				const phone = await new PhoneBuilder().save();
				setQuery({ phoneId: phone.id });
				const response = await fetch(getUrl(), {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name: 'iPhone' }),
				});

				expect(response.status).toBe(200);
				expect(await response.json()).toMatchObject({ data: { id: phone.id, name: 'iPhone' } });
			});
		});
	});
});
