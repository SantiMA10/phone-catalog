import { Td, Text, Tr } from '@chakra-ui/react';

interface Props {
	description: string;
	value: string | number;
}

export const PhoneDetailRow: React.FC<Props> = ({ description, value }: Props) => {
	return (
		<Tr>
			<Td>
				<Text fontWeight="black">{description}</Text>
			</Td>
			<Td>
				<Text fontSize="xl">{value}</Text>
			</Td>
		</Tr>
	);
};
