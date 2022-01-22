import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';

const AllTheProviders: FC = ({ children }) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
