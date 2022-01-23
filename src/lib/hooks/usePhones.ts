import { Phone } from '@prisma/client';
import useSWR from 'swr';

import { fetcher } from '../utils/fetcher';

interface PhonePayload {
	data: Phone[];
}

export const usePhones = (
	fallback?: PhonePayload,
): { phones: Phone[]; loading: boolean; error?: Error } => {
	const { data, error } = useSWR<PhonePayload>('/api/phones', fetcher, {
		fallbackData: fallback,
	});

	return {
		phones: data?.data || [],
		loading: !data && !error,
		error: error,
	};
};
