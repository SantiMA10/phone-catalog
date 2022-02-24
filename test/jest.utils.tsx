import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import http from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import React, { FC, ReactElement } from 'react';
import listen from 'test-listen';

import { prisma } from '../src/lib/db';

const AllTheProviders: FC = ({ children }) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

export function withDb(suite: () => void): void {
	beforeEach(async () => {
		await prisma.phone.deleteMany();
	});

	suite();
}

export function withNextApiRoute(
	handler: unknown,
	suite: (getUrl: () => string, setQuery: (query: unknown) => void) => void,
): void {
	let server: http.Server;
	let url: string;
	let query: unknown = undefined;

	beforeEach(async () => {
		server = http.createServer((req, res) =>
			apiResolver(
				req,
				res,
				query,
				handler,
				{
					previewModeId: 'id',
					previewModeEncryptionKey: 'key',
					previewModeSigningKey: 'key',
				},
				false,
			),
		);
		url = await listen(server);
	});

	afterEach(async () => {
		query = undefined;
		await new Promise((resolve) => server.close(resolve));
	});

	suite(
		() => url,
		(newQuery) => {
			query = newQuery;
		},
	);
}
