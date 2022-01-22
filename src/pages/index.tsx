import { Button } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { prisma } from '../lib/db';

interface Props {
	phones: Phone;
}

const HomePage: NextPage<Props> = (props: Props) => {
	return (
		<>
			<Head>
				<title>Phone Catalog</title>
			</Head>

			{JSON.stringify(props.phones)}

			<Button colorScheme="blue">Button</Button>
		</>
	);
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
	const phones = await prisma.phone.findMany();
	return { props: { phones } };
};
