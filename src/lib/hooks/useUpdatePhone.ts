import { useToast } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import { useRouter } from 'next/router';

export const useUpdatePhone = (): { execute: (phone: Phone) => Promise<void> } => {
	const toast = useToast();
	const router = useRouter();

	return {
		execute: async (phone: Phone) => {
			const response = await fetch(`/api/phones/${phone.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(phone),
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
				title: 'Phone successfully updated.',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
			router.push('/');
		},
	};
};
