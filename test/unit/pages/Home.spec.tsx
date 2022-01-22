import { render, screen } from '@testing-library/react';

import HomePage from '../../../src/pages';

describe('Home', () => {
	it('renders a button', () => {
		render(<HomePage />);

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
	});
});
