import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { ValidationError } from 'yup';

import { createPhone, getPhones } from '../../../lib/data/phone';

const handleGetPhones = nc()
	.get(async (_: NextApiRequest, res: NextApiResponse) => {
		res.status(200).json(await getPhones());
		res.end();
	})
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const { data: phone } = await createPhone(req.body);

			res.status(201).json({ data: phone });
			res.end();
			return;
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).json({ error: { message: error.message } });
				res.end();
				return;
			}

			if (error instanceof Error) {
				res.status(500).json({ error: { message: error.message } });
				res.end();
				return;
			}

			res.status(500).json({ error: { message: 'Unknown error' } });
			res.end();
		}
	});

export default handleGetPhones;
