
/*
API calls:
/page/ POST - needs body and next page id
- returns new page id
/page/ GET - needs page id
- returns object type {page id, body, next page id, timestamp, num pages before, num pages left}
/page/ PATCH? - needs page id and new body
- returns page id
/page/ DELETE - needs page id
- returns next page id
/leaves/ GET (dump leaves sorted by latest timestamp) - needs no arguments
- returns array of objects type {page id, preview, num pages left}
*/

import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const createPageTableStatement = `
	create table if not exists page (
		pid integer primary key,
		body varchar(2048),
		preview varchar(30),
		next_pid integer,
		timestamp bigint,
		num_prior integer,
		num_left integer
	);
`;

const insertLastPageStatement = `
	insert into page values (
		0,
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis lectus magna fringilla urna. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Ut etiam sit amet nisl purus in mollis nunc. Vulputate mi sit amet mauris commodo. Aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod. Sed odio morbi quis commodo odio aenean. Felis bibendum ut tristique et egestas. Amet justo donec enim diam vulputate ut pharetra sit amet. Nibh venenatis cras sed felis eget velit aliquet sagittis. Id cursus metus aliquam eleifend mi. Egestas fringilla phasellus faucibus scelerisque eleifend. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Arcu dictum varius duis at consectetur lorem donec massa sapien. Viverra justo nec ultrices dui sapien. Sed cras ornare arcu dui vivamus arcu felis bibendum. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est.',
		'Lorem ipsum dolor si...',
		NULL,
		${Date.now()},
		0,
		0
	) on conflict (pid) do nothing;
`;

class BackwordsDB {

	constructor() {
	}

	async initialize() {

		const pool = new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false }
		});

		this.client = await pool.connect();

		// Do database page table initialize commands
		await this.client.query(createPageTableStatement);
		await this.client.query(insertLastPageStatement);

	}

	async createPage(body, next_pid) {
		return 2;
	}

	async readPage(pid) {
		if (pid === 0) {
			return {pid: 0, body: "This is the very first page!\nwow", next_pid: undefined, timestamp: 1661839772441, num_prior: 2, num_left: 0};
		} else if (pid === 1) {
			return {pid: 1, body: "Left branch is going vert interesting", next_pid: 0, timestamp: 1661839794850, num_prior: 0, num_left: 1};
		} else {
			return {pid: 2, body: "Right branch so far wowww", next_pid: 0, timestamp: 1661839804672, num_prior: 0, num_left: 1};
		}
	}

	async updatePage(pid, body) {
		return 1;
	}

	async deletePage(pid) {
		return 0;
	}

	async getLeaves() {
		return [{"pid": 1, "preview": "Left branch...", "num_left": 1}, {"pid": 2, "preview": "Right branch...", "num_left": 1}];
	}

}

export { BackwordsDB };
