
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

const createNewPidStatement = `
	select max(pid)+1 as pid from page;
`;

const createPagesLeftStatement = `
	select num_left+1 as num_left from page where pid=$1;
`;

const createInsertPageStatement = `
	insert into page values (
		$1,
		$2,
		$3,
		$4,
		$5,
		0,
		$6
	);
`;

const createIncrementNumPriorStatement = `
	update page set num_prior=num_prior+1 where pid=$1;
`;

const readPageStatement = `
	select pid, body, next_pid, timestamp, num_prior, num_left from page where pid=$1 limit 1;
`;

const updatePageStatement = `
	update page set body=$1, preview=$2 where pid=$3;
`;

const getLeavesStatement = `
	select pid, preview, num_left from page where num_prior=0 order by timestamp desc limit 100;
`;

class BackwordsDB {

	constructor() {
	}

	generatePreview(body) {
		return body.substring(0, 20) + "...";
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
		let query_res = await this.client.query(createNewPidStatement);
		const pid = query_res.rows[0].pid;
		query_res = await this.client.query(createPagesLeftStatement, [next_pid]);
		const num_left = query_res.rows[0].num_left;
		query_res = await this.client.query(createInsertPageStatement, [
			pid,
			body.substring(0, 2047),
			this.generatePreview(body),
			next_pid,
			Date.now(),
			num_left
		]);
		query_res = await this.client.query(createIncrementNumPriorStatement, [next_pid]);
		return pid;
	}

	async readPage(pid) {
		const query_res = await this.client.query(readPageStatement, [pid]);
		return query_res.rows[0];
	}

	async updatePage(pid, body) {
		const query_res = await this.client.query(updatePageStatement, [body.substring(0, 2047), this.generatePreview(body), pid]);
		return pid;
	}

	async deletePage(pid) {
		// query to get num_prior and num_left to make sure it can be deleted (also get next_pid for later)
		// if it can be deleted:
		// delete row from table
		// query to update (decrement) next page's num prior
		return 0;
	}

	async getLeaves() {
		const query_res = await this.client.query(getLeavesStatement);
		return query_res.rows;
	}

}

export { BackwordsDB };
