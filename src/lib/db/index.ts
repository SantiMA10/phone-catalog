/**
 * Best practice for instantiating PrismaClient with Next.js
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */

import { PrismaClient } from '@prisma/client';

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
