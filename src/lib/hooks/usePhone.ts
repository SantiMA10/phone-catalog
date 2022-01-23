import { Phone } from '@prisma/client';
import useSWR from 'swr';

import { fetcher } from '../utils/fetcher';

interface PhonePayload {
	data: Phone;
}

export const usePhone = (
	phoneId: Phone['id'] | undefined,
): { phone: Phone | null; loading: boolean; error?: Error } => {
	const { data, error } = useSWR<PhonePayload>(phoneId && `/api/phones/${phoneId}`, fetcher);

	return {
		phone: data?.data || null,
		loading: !data && !error,
		error: error,
	};
};
