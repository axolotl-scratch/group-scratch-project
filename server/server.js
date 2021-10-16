const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// statically serve everything in the public folder (bundle.js and index.html)
app.use(express.static(path.join(__dirname, '../public')))


// ******error handlers*******
app.use((req, res) =>
	res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	// console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/