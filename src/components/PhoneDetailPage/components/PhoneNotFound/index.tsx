import { WarningTwoIcon } from '@chakra-ui/icons';
import { Center, Stack, Text } from '@chakra-ui/react';

export const PhoneNotFound: React.FC = () => {
	return (
		<Center h="100vh">
			<Stack>
				<Center>
					<WarningTwoIcon />
				</Center>
				<Text>Ups! We cannot find that phone in our catalog</Text>
			</Stack>
		</Center>
	);
};
