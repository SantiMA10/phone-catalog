import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { getPhone } from '../../../../lib/data/phone';

const handleGetPhone = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
	if (!req?.query?.phoneId) {
		res.status(400).json({
			message: 'Missing phoneId in query',
		});
		res.end();
		return;
	}

	if (typeof req.query.phoneId !== 'string') {
		res.status(400).json({
			message: 'Invalid phoneId type',
		});
		res.end();
		return;
	}

	const { data: phone } = await getPhone(req.query.phoneId);

	if (!phone) {
		res.status(404);
		res.end();
		return;
	}

	res.status(200).json({ data: phone });
	res.end();
});

export default handleGetPhone;
