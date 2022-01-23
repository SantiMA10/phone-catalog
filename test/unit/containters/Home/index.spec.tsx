import { Home } from '../../../../src/containers/Home';
import { PhoneBuilder } from '../../../builders/PhoneBuilder';
import { render, screen } from '../../../jest.utils';

describe('Home', () => {
	it('shows the loading screen if the content is loading', async () => {
		render(<Home phones={[]} loading={true} />);

		const loading = await screen.findByText(/loading\.\.\./i, { selector: 'p.chakra-text' });

		expect(loading).toBeInTheDocument();
	});

	it('shows the error message', async () => {
		render(<Home phones={[]} loading={false} error={new Error('ups')} />);

		const error = await screen.findByText(/something went wrong: ups/i);

		expect(error).toBeInTheDocument();
	});

	it('tells the user that there is no phone in the catalog', async () => {
		render(<Home phones={[]} loading={false} />);

		const emptyMessage = await screen.findByText(/we do not have any phone in the catalog yet/i);

		expect(emptyMessage).toBeInTheDocument();
	});

	it('shows the phone name, phone manufacturer and phone image for each phone in the list', async () => {
		const phone = new PhoneBuilder().get();
		render(<Home phones={[phone]} loading={false} />);

		const name = await screen.findByText(`📱 ${phone.name}`);
		const manufacturer = await screen.findByText(`🏗 ${phone.manufacturer}`);
		const image = await screen.findByRole('img');

		expect(name).toBeInTheDocument();
		expect(manufacturer).toBeInTheDocument();
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', phone.imageFileName);
	});

	it('each phone has a link to visit the detail', async () => {
		const phone = new PhoneBuilder().get();
		render(<Home phones={[phone]} loading={false} />);

		const link = await screen.findByTestId(`phone-link-${phone.id}`);

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', expect.stringContaining(`/phones/${phone.id}`));
	});
});
