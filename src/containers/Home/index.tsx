import { ChevronRightIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
	Center,
	Flex,
	Grid,
	GridItem,
	Image,
	Spacer,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { NavBar } from '../../components/NavBar';
import { Phone } from '../../lib/entities/Phone';

interface Props {
	phones: Phone[];
	loading: boolean;
	error?: Error;
}

export const Home = ({ phones, loading, error }: Props) => {
	if (loading) {
		return (
			<Center h="100vh">
				<Stack>
					<Center>
						<Spinner />
					</Center>
					<Text>Loading...</Text>
				</Stack>
			</Center>
		);
	}

	if (error) {
		return (
			<Center h="100vh">
				<Stack>
					<Center>
						<WarningTwoIcon />
					</Center>
					<Text>Something went wrong: {error.message}</Text>
				</Stack>
			</Center>
		);
	}

	if (phones.length === 0) {
		return (
			<Center h="100vh">
				<Stack>
					<Center>
						<WarningTwoIcon />
					</Center>
					<Text>We do not have any phone in the catalog yet</Text>
				</Stack>
			</Center>
		);
	}

	return (
		<>
			<NavBar />
			<Grid gap={2}>
				{phones.map((phone) => {
					return (
						<NextLink key={phone.id} href={`/phones/${phone.id}`} passHref>
							<GridItem
								role="link"
								bg="teal"
								w="100%"
								p={4}
								color="white"
								cursor={'pointer'}
								borderRadius={4}
							>
								<Flex align="center">
									<Image
										borderRadius="full"
										boxSize="60px"
										src={phone.imageFileName}
										alt={phone.name}
									/>
									<Stack spacing={4} direction="column" marginLeft={8}>
										<Text fontSize="lg">📱 {phone.name}</Text>
										<Text fontSize="md">🏗 {phone.manufacturer}</Text>
									</Stack>
									<Spacer />
									<ChevronRightIcon />
								</Flex>
							</GridItem>
						</NextLink>
					);
				})}
			</Grid>
		</>
	);
};
