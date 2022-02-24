import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PhoneFormPage } from '../../../components/PhoneFormPage';
import { usePhone } from '../../../lib/hooks/usePhone';
import { useUpdatePhone } from '../../../lib/hooks/useUpdatePhone';

const EditPhoneNextPage: NextPage = () => {
	const router = useRouter();
	const { phone, loading, error } = usePhone(
		typeof router.query.phoneId === 'string' ? router.query.phoneId : undefined,
	);
	const { execute } = useUpdatePhone();

	return (
		<>
			<Head>
				<title>{loading ? 'loading...' : phone?.name} | Phone Catalog</title>
			</Head>

			<Container>
				<PhoneFormPage
					onSubmit={async (phone) => execute(phone)}
					initialPhone={phone}
					loading={loading}
					error={error}
				/>
			</Container>
		</>
	);
};

export default EditPhoneNextPage;
