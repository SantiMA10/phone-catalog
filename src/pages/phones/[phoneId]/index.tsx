import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PhoneDetailPage } from '../../../components/PhoneDetailPage';
import { useDeletePhone } from '../../../lib/hooks/useDeletePhone';
import { usePhone } from '../../../lib/hooks/usePhone';

const PhoneDetailNextPage: NextPage = () => {
	const router = useRouter();
	const { phone, loading, error } = usePhone(
		typeof router.query.phoneId === 'string' ? router.query.phoneId : undefined,
	);
	const { execute } = useDeletePhone(phone?.id);

	return (
		<>
			<Head>
				<title>{loading ? 'loading...' : phone?.name} | Phone Catalog</title>
			</Head>

			<Container>
				<PhoneDetailPage
					phone={phone}
					loading={loading}
					error={error}
					onDelete={() => {
						execute();
					}}
				/>
			</Container>
		</>
	);
};

export default PhoneDetailNextPage;
