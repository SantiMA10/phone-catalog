import { useToast } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import { useRouter } from 'next/router';

export const useDeletePhone = (id?: Phone['id']): { execute: () => Promise<void> } => {
	const toast = useToast();
	const router = useRouter();

	return {
		execute: async () => {
			const confirmation = confirm('Are you sure you want to delete this phone?');

			if (!confirmation) {
				return;
			}

			if (!id) {
				toast({
					title: 'Unable to delete the phone.',
					description: `Try again later. (The phone id is required)`,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			const response = await fetch(`/api/phones/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				toast({
					title: 'Unable to delete the phone.',
					description: `Try again later. (${response.status})`,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				return;
			}

			toast({
				title: 'Phone successfully deleted.',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
			router.push('/');
		},
	};
};
