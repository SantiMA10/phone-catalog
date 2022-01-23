import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { getPhones } from '../../../lib/data/phone';

const handleGetPhones = nc().get(async (_: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(await getPhones());
	res.end();
});

export default handleGetPhones;
