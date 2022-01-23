import { ChevronRightIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Center, Flex, Grid, GridItem, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { MainLayout } from '../../components/MainLayout';
import { Phone } from '../../lib/entities/Phone';

interface Props {
	phones: Phone[];
	loading: boolean;
	error?: Error;
}

export const Home = ({ phones, loading, error }: Props) => {
	if (phones.length === 0) {
		return (
			<MainLayout loading={loading} error={error}>
				<Center h="100vh">
					<Stack>
						<Center>
							<WarningTwoIcon />
						</Center>
						<Text>We do not have any phone in the catalog yet</Text>
					</Stack>
				</Center>
			</MainLayout>
		);
	}

	return (
		<MainLayout loading={loading} error={error}>
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
								data-testid={`phone-link-${phone.id}`}
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
		</MainLayout>
	);
};
