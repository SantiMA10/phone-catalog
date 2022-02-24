import { WarningTwoIcon } from '@chakra-ui/icons';
import { Center, Spinner, Stack, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { NavBar } from './components/NavBar';

interface Props {
	loading: boolean;
	error?: Error;
}

export const MainLayout = ({ loading, error, children }: PropsWithChildren<Props>) => {
	if (loading) {
		return (
			<Stack>
				<NavBar />
				<Center h="100vh">
					<Stack>
						<Center>
							<Spinner />
						</Center>
						<Text>Loading...</Text>
					</Stack>
				</Center>
			</Stack>
		);
	}

	if (error) {
		return (
			<Stack>
				<NavBar />
				<Center h="100vh">
					<Stack>
						<Center>
							<WarningTwoIcon />
						</Center>
						<Text>Something went wrong: {error.message}</Text>
					</Stack>
				</Center>
			</Stack>
		);
	}

	return (
		<Stack>
			<NavBar />
			{children}
		</Stack>
	);
};
