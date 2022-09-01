
import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

class BackwordsDB {

	constructor() {
	}

	async initialize() {
		const pool = new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false }
		});

		this.client = await pool.connect();

		// Do database page table initialize command(s)
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
