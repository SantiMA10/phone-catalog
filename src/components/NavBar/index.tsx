import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import Link from 'next/link';

export const NavBar = () => {
	return (
		<Flex pb="8" pt="2">
			<Link href="/" passHref>
				<Box p="2" role="link" cursor="pointer">
					<Heading size="md">📞 Phone Catalog</Heading>
				</Box>
			</Link>
			<Spacer />
			<Box>
				<Button colorScheme="teal">Create new phone</Button>
			</Box>
		</Flex>
	);
};
