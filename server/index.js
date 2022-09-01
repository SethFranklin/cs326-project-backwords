
import express from 'express';
import logger from 'morgan';
import { BackwordsDB } from "./db.js";

const backwords_db = new BackwordsDB();
await backwords_db.initialize();

const app = express();
const port = process.env.PORT || 8080;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));

app.post("/page", async function(req, res) {
	res.json(await backwords_db.createPage(req.query.body, parseInt(req.query.next_pid)));
});

app.get("/page", async function(req, res) {
	res.json(await backwords_db.readPage(parseInt(req.query.pid)));
});

app.patch("/page", async function(req, res) {
	res.json(await backwords_db.updatePage(parseInt(req.query.pid), req.query.body));
});

app.delete("/page", async function(req, res) {
	res.json(await backwords_db.deletePage(parseInt(req.query.pid)));
});

app.get("/leaves", async function(req, res) {
	res.json(await backwords_db.getLeaves());
});

app.listen(port, function() {
  console.log(`Server started on port ${port}.`);
});