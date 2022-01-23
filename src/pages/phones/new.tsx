import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PhoneForm } from '../../containers/PhoneForm';
import { useCreatePhone } from '../../lib/hooks/useCreatePhone';

const CreatePhonePage: NextPage = () => {
	const { execute } = useCreatePhone();

	return (
		<>
			<Head>
				<title>New phone | Phone Catalog</title>
			</Head>

			<Container>
				<PhoneForm onSubmit={async (phone) => execute(phone)} />
			</Container>
		</>
	);
};

export default CreatePhonePage;
