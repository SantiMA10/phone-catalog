import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Phone } from '@prisma/client';
import { Formik } from 'formik';

import { phoneSchema } from '../../lib/entities/Phone';
import { MainLayout } from '../MainLayout';

interface Props {
	initialPhone?: Phone | null;
	loading?: boolean;
	error?: Error;
	onSubmit: (phone: Phone) => Promise<void>;
}

export const PhoneFormPage = ({ initialPhone, onSubmit, loading, error }: Props) => {
	return (
		<MainLayout loading={!!loading} error={error}>
			<Formik
				initialValues={{
					id: '',
					name: '',
					manufacturer: '',
					description: '',
					color: '',
					price: 0,
					imageFileName: '',
					screen: '',
					processor: '',
					ram: 0,
					...initialPhone,
				}}
				enableReinitialize
				validationSchema={phoneSchema}
				onSubmit={async (values, { setSubmitting }) => {
					await onSubmit(values);
					setSubmitting(false);
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<FormControl isInvalid={!!(errors.name && touched.name && errors.name)}>
							<FormLabel htmlFor="name">Name</FormLabel>
							<Input id="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
							{errors.name && touched.name && errors.name && (
								<FormErrorMessage>{errors.name}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl
							isInvalid={!!(errors.manufacturer && touched.manufacturer && errors.manufacturer)}
						>
							<FormLabel htmlFor="manufacturer">Manufacturer</FormLabel>
							<Input
								id="manufacturer"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.manufacturer}
							/>
							{errors.manufacturer && touched.manufacturer && errors.manufacturer && (
								<FormErrorMessage>{errors.manufacturer}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl
							isInvalid={!!(errors.description && touched.description && errors.description)}
						>
							<FormLabel htmlFor="description">Description</FormLabel>
							<Input
								id="description"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
							/>
							{errors.description && touched.description && errors.description && (
								<FormErrorMessage>{errors.description}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!(errors.color && touched.color && errors.color)}>
							<FormLabel htmlFor="color">Color</FormLabel>
							<Input id="color" onChange={handleChange} onBlur={handleBlur} value={values.color} />
							{errors.color && touched.color && errors.color && (
								<FormErrorMessage>{errors.color}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!(errors.price && touched.price && errors.price)}>
							<FormLabel htmlFor="price">Price</FormLabel>
							<Input
								id="price"
								type="number"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.price}
							/>
							{errors.price && touched.price && errors.price && (
								<FormErrorMessage>{errors.price}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl
							isInvalid={!!(errors.imageFileName && touched.imageFileName && errors.imageFileName)}
						>
							<FormLabel htmlFor="imageFileName">Image</FormLabel>
							<Input
								id="imageFileName"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.imageFileName}
							/>
							{errors.imageFileName && touched.imageFileName && errors.imageFileName && (
								<FormErrorMessage>{errors.imageFileName}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!(errors.processor && touched.processor && errors.processor)}>
							<FormLabel htmlFor="processor">Processor</FormLabel>
							<Input
								id="processor"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.processor}
							/>
							{errors.processor && touched.processor && errors.processor && (
								<FormErrorMessage>{errors.processor}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!(errors.screen && touched.screen && errors.screen)}>
							<FormLabel htmlFor="screen">Screen</FormLabel>
							<Input
								id="screen"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.screen}
							/>
							{errors.screen && touched.screen && errors.screen && (
								<FormErrorMessage>{errors.screen}</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!(errors.ram && touched.ram && errors.ram)}>
							<FormLabel htmlFor="ram">RAM</FormLabel>
							<Input
								id="ram"
								type="number"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.ram}
							/>
							{errors.ram && touched.ram && errors.ram && (
								<FormErrorMessage>{errors.ram}</FormErrorMessage>
							)}
						</FormControl>

						<Box pt="8" pb="8">
							<Button type="submit" colorScheme="teal" disabled={isSubmitting} w="100%">
								{isSubmitting ? (
									'Saving...'
								) : (
									<>
										<CheckCircleIcon />
										{initialPhone ? 'Update phone' : 'Save phone'}
									</>
								)}
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</MainLayout>
	);
};
