import { useToast } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import { omit } from 'lodash';
import { useRouter } from 'next/router';

export const useCreatePhone = (): { execute: (phone: Phone) => Promise<void> } => {
	const toast = useToast();
	const router = useRouter();

	return {
		execute: async (phone: Phone) => {
			const response = await fetch('/api/phones', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(omit(phone, ['id'])),
			});

			if (!response.ok) {
				toast({
					title: 'Unable to create the new phone.',
					description: `Try again later. (${response.status})`,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				return;
			}

			toast({
				title: 'New phone successfully created.',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
			router.push('/');
		},
	};
};
