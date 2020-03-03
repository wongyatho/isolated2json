#!/usr/bin/env node

if (process.argv.length != 3) {
	console.error(`usage: ${process.argv0[1]} url`);
	process.exit(1);
}

require('./index')(process.argv[2]).then(out => console.log(JSON.stringify(out)));
