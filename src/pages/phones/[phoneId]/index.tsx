import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PhoneDetail } from '../../../containers/PhoneDetail';
import { usePhone } from '../../../lib/hooks/usePhone';

const PhoneDetailPage: NextPage = () => {
	const router = useRouter();
	const { phone, loading, error } = usePhone(
		typeof router.query.phoneId === 'string' ? router.query.phoneId : undefined,
	);

	return (
		<>
			<Head>
				<title>{loading ? 'loading...' : phone?.name} | Phone Catalog</title>
			</Head>

			<Container>
				<PhoneDetail phone={phone} loading={loading} error={error} onDelete={() => ({})} />
			</Container>
		</>
	);
};

export default PhoneDetailPage;
