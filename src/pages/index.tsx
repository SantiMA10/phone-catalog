import { Container } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { HomePage } from '../components/HomePage';
import { getPhones } from '../lib/data/phone';
import { usePhones } from '../lib/hooks/usePhones';

interface Props {
	fallbacks: {
		phones: { data: Phone[] };
	};
}

const HomeNextPage: NextPage<Props> = (props: Props) => {
	const { phones, loading, error } = usePhones(props.fallbacks.phones);

	return (
		<>
			<Head>
				<title>Home | Phone Catalog</title>
			</Head>

			<Container>
				<HomePage phones={phones} loading={loading} error={error} />
			</Container>
		</>
	);
};

export default HomeNextPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	return { props: { fallbacks: { phones: await getPhones() } } };
};
