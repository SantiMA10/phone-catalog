import { $, chalk, nothrow, sleep } from 'zx';

let exitCode = 0;

do {
	({ exitCode } = await nothrow($`curl -o - 127.0.0.1:13306`));

	if (exitCode !== 1) {
		console.log('Waiting for MySQL...');
	}

	await sleep(1000);
} while (exitCode !== 1);

console.log(chalk.green('MySQL is up!'));
