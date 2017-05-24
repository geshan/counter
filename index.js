const http = require('http');

const config = {
	host: "mysql",
	user: "root",
	password: "root",
	database: "counter"
};

const db = require('namshi-node-mysql')(config);

async function getCount() {
	await db.query('UPDATE counts SET counts = counts+1 WHERE count_id = 1');
	let rows = await db.query('SELECT counts FROM counts WHERE count_id = 1');
	console.log('count is :', rows[0]);

	return rows[0]['counts']
}

let server = http.createServer(async (req, res) => {
	if (req.url === '/' || req.url === '/counter') {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(`<h2>Page visited ${await getCount()} times</h2>`);
	}
});

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");
