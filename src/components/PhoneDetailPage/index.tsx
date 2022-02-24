import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Center, Image, Table, Tbody } from '@chakra-ui/react';
import Link from 'next/link';

import { Phone } from '../../lib/entities/Phone';
import { MainLayout } from '../MainLayout';
import { PhoneDetailRow } from './components/PhoneDetailRow';
import { PhoneNotFound } from './components/PhoneNotFound';

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
				<PhoneNotFound />
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
					<PhoneDetailRow description="Name" value={phone.name} />
					<PhoneDetailRow description="Manufacturer" value={phone.manufacturer} />
					<PhoneDetailRow description="Description" value={phone.description} />
					<PhoneDetailRow description="Price" value={phone.price} />
					<PhoneDetailRow description="RAM" value={phone.ram} />
					<PhoneDetailRow description="Color" value={phone.color} />
					<PhoneDetailRow description="Processor" value={phone.processor} />
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
