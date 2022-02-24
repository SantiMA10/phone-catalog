import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PhoneFormPage } from '../../components/PhoneFormPage';
import { useCreatePhone } from '../../lib/hooks/useCreatePhone';

const CreatePhoneNextPage: NextPage = () => {
	const { execute } = useCreatePhone();

	return (
		<>
			<Head>
				<title>New phone | Phone Catalog</title>
			</Head>

			<Container>
				<PhoneFormPage onSubmit={async (phone) => execute(phone)} />
			</Container>
		</>
	);
};

export default CreatePhoneNextPage;
