import { DeleteIcon, EditIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Button, Center, Image, Stack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import Link from 'next/link';

import { Phone } from '../../lib/entities/Phone';
import { MainLayout } from '../MainLayout';

interface Props {
	phone: Phone | null;
	loading: boolean;
	error?: Error;
	onDelete: (phoneId: Phone['id']) => void;
}

export const PhoneDetailPage = ({ phone, loading, error, onDelete }: Props) => {
	if (!phone) {
		return (
			<MainLayout loading={loading} error={error}>
				<Center h="100vh">
					<Stack>
						<Center>
							<WarningTwoIcon />
						</Center>
						<Text>Ups! We cannot find that phone in our catalog</Text>
					</Stack>
				</Center>
			</MainLayout>
		);
	}

	return (
		<MainLayout loading={loading} error={error}>
			<Center>
				<Image boxSize="250px" src={phone.imageFileName} alt={phone.name} />
			</Center>

			<Table variant="striped" colorScheme="teal">
				<Tbody>
					<Tr>
						<Td>
							<Text fontWeight="black">Name</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.name}</Text>
						</Td>
					</Tr>
					<Tr>
						<Td>
							<Text fontWeight="black">Manufacturer</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.manufacturer}</Text>
						</Td>
					</Tr>
					<Tr>
						<Td>
							<Text fontWeight="black">Description</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.description}</Text>
						</Td>
					</Tr>
					<Tr>
						<Td>
							<Text fontWeight="black">Price</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.price}</Text>
						</Td>
					</Tr>
					<Tr>
						<Td>
							<Text fontWeight="black">RAM</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.ram}</Text>
						</Td>
					</Tr>
					<Tr>
						<Td>
							<Text fontWeight="black">Color</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.color}</Text>
						</Td>
					</Tr>
					<Tr>
						<Td>
							<Text fontWeight="black">Processor</Text>
						</Td>
						<Td>
							<Text fontSize="xl">{phone.processor}</Text>
						</Td>
					</Tr>
				</Tbody>
			</Table>

			<Link href={`/phones/${phone.id}/edit`} passHref>
				<Button role="link" colorScheme="teal">
					<EditIcon /> Edit phone
				</Button>
			</Link>
			<Button
				onClick={() => {
					onDelete(phone.id);
				}}
				colorScheme="red"
			>
				<DeleteIcon /> Delete phone
			</Button>
		</MainLayout>
	);
};
