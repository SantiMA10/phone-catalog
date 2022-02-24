import userEvent from '@testing-library/user-event';

import { PhoneDetailPage } from '../../../../src/components/PhoneDetailPage';
import { PhoneBuilder } from '../../../builders/PhoneBuilder';
import { act, render, screen } from '../../../jest.utils';

describe('PhoneDetailPage', () => {
	it('shows the loading screen if the content is loading', async () => {
		render(<PhoneDetailPage phone={null} loading={true} onDelete={jest.fn()} />);

		const loading = await screen.findByText(/loading\.\.\./i, { selector: 'p.chakra-text' });

		expect(loading).toBeInTheDocument();
	});

	it('shows the error message', async () => {
		render(
			<PhoneDetailPage
				phone={null}
				loading={false}
				error={new Error('ups')}
				onDelete={jest.fn()}
			/>,
		);

		const error = await screen.findByText(/something went wrong: ups/i);

		expect(error).toBeInTheDocument();
	});

	it('shows the phone not found message', async () => {
		render(<PhoneDetailPage phone={null} loading={false} onDelete={jest.fn()} />);

		const error = await screen.findByText(/ups! we cannot find that phone in our catalog/i);

		expect(error).toBeInTheDocument();
	});

	it('calls the "onDelete" handler when the button is clicked by the user', async () => {
		const onDelete = jest.fn();
		const phone = new PhoneBuilder().get();
		render(<PhoneDetailPage phone={phone} loading={false} onDelete={onDelete} />);

		await act(async () => {
			const button = await screen.findByText(/delete phone/i);
			userEvent.click(button);
		});

		expect(onDelete).toHaveBeenCalled();
	});

	it('has the proper edit link', async () => {
		const phone = new PhoneBuilder().get();
		render(<PhoneDetailPage phone={phone} loading={false} onDelete={jest.fn()} />);

		const button = await screen.findByText(/edit phone/i);

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('href', `/phones/${phone.id}/edit`);
	});

	it('displays all the information about the phone', async () => {
		const phone = new PhoneBuilder().get();
		render(<PhoneDetailPage phone={phone} loading={false} onDelete={jest.fn()} />);

		const name = await screen.findByText(phone.name);
		const manufacturer = await screen.findByText(phone.manufacturer);
		const description = await screen.findByText(phone.description);
		const price = await screen.findByText(phone.price);
		const ram = await screen.findByText(phone.ram);
		const color = await screen.findByText(phone.color);
		const processor = await screen.findByText(phone.processor);

		expect(name).toBeInTheDocument();
		expect(manufacturer).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(price).toBeInTheDocument();
		expect(ram).toBeInTheDocument();
		expect(color).toBeInTheDocument();
		expect(processor).toBeInTheDocument();
	});

	it('displays the phone image', async () => {
		const phone = new PhoneBuilder().get();
		render(<PhoneDetailPage phone={phone} loading={false} onDelete={jest.fn()} />);

		const image = await screen.findByRole('img');

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', phone.imageFileName);
	});
});
