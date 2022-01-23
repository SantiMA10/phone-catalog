import { Container } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { Home } from '../containers/Home';
import { getPhones } from '../lib/data/phone';
import { usePhones } from '../lib/hooks/usePhones';

interface Props {
	fallbacks: {
		phones: { data: Phone[] };
	};
}

const HomePage: NextPage<Props> = (props: Props) => {
	const { phones, loading, error } = usePhones(props.fallbacks.phones);

	return (
		<>
			<Head>
				<title>Home | Phone Catalog</title>
			</Head>

			<Container>
				<Home phones={phones} loading={loading} error={error} />
			</Container>
		</>
	);
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	return { props: { fallbacks: { phones: await getPhones() } } };
};
