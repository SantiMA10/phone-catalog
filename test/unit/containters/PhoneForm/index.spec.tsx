import userEvent from '@testing-library/user-event';

import { PhoneForm } from '../../../../src/containers/PhoneForm';
import { act, render, screen } from '../../../jest.utils';

describe('PhoneDetail', () => {
	it('shows the validation error if the user tries to submit the form without completing it', async () => {
		render(<PhoneForm onSubmit={jest.fn()} />);

		await act(async () => {
			const button = await screen.findByText(/save phone/i);
			userEvent.click(button);
		});

		expect(await screen.findByText(/^name is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^manufacturer is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^description is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^color is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^price must be a positive number$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^imageFileName is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^processor is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^screen is a required field$/i)).toBeInTheDocument();
		expect(await screen.findByText(/^ram must be a positive number$/i)).toBeInTheDocument();
	});

	it('shows the validation error if the user tries enter a invalid url', async () => {
		render(<PhoneForm onSubmit={jest.fn()} />);

		const imageField = await screen.findByLabelText(/^Image$/i);
		userEvent.type(imageField, 'invalid url');

		await act(async () => {
			const button = await screen.findByText(/save phone/i);
			userEvent.click(button);
		});

		expect(await screen.findByText(/^imageFileName must be a valid URL$/i)).toBeInTheDocument();
	});

	it('calls the onSubmit handler with all the data in the form', async () => {
		const onSubmit = jest.fn();
		render(<PhoneForm onSubmit={onSubmit} />);

		userEvent.type(await screen.findByLabelText(/^name$/i), 'iPhone 11');
		userEvent.type(await screen.findByLabelText(/^manufacturer$/i), 'Apple');
		userEvent.type(await screen.findByLabelText(/^description$/i), 'The best iPhone ever');
		userEvent.type(await screen.findByLabelText(/^color$/i), 'Space Grey');
		userEvent.type(await screen.findByLabelText(/^price$/i), '10000');
		userEvent.type(await screen.findByLabelText(/^image$/i), 'https://picsum.photos/200');
		userEvent.type(await screen.findByLabelText(/^screen$/i), 'The best screen ever');
		userEvent.type(await screen.findByLabelText(/^processor$/i), 'The best processor ever');
		userEvent.type(await screen.findByLabelText(/^ram$/i), '10000');

		await act(async () => {
			const button = await screen.findByText(/save phone/i);
			userEvent.click(button);
		});

		expect(onSubmit).toHaveBeenCalled();
	});
});
