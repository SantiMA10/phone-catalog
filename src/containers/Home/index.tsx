import { Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Phone } from '../../lib/entities/Phone';

interface Props {
	phones: Phone[];
	loading: boolean;
	error?: Error;
}

export const Home = ({ phones, loading, error }: Props) => {
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong: {error.message}</div>;
	}

	if (phones.length === 0) {
		return <div>We do not have any phone in the catalog yet</div>;
	}

	return (
		<Grid gap={2}>
			{phones.map((phone) => {
				return (
					<NextLink key={phone.id} href={`/phone/${phone.id}`} passHref>
						<GridItem bg="tomato" w="100%" p={4} color="white" cursor={'pointer'} borderRadius={4}>
							<Stack spacing={6} direction="row">
								<Image
									borderRadius="full"
									boxSize="60px"
									src={phone.imageFileName}
									alt={phone.name}
								/>
								<Stack spacing={4} direction="column">
									<Text fontSize="lg">📱 {phone.name}</Text>
									<Text fontSize="md">🏗 {phone.manufacturer}</Text>
								</Stack>
							</Stack>
						</GridItem>
					</NextLink>
				);
			})}
		</Grid>
	);
};
