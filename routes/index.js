// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()
// const fs = require('fs')
const {
	spawn
} = require('child_process');

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
// router.get('/', (req, res) => {
// 	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
// })

// const data = fs.readFileSync('test.txt', 'utf-8');
// const lines = data.split(/\r?\n/);
/*  This route render json data */
// const mydata = [];

router.all('*', (req, res) => {
	var url = req.url
	// url = encodeURI(url)
	// console.log('URL' + url);
	var largeDataSet = '';
	// spawn new child process to call the python script
	const python = spawn('python', ['mytest.py', url]);
	// collect data from script
	python.stdout.on('data', function (data) {
		// console.log(`data:${data}`);
		// console.log('Pipe data from python script ...');
		// largeDataSet.push(data);
		largeDataSet += data;
		// mydata.push(data)
	});
	// in close event we are sure that stream is from child process is closed
	python.on('close', (code) => {
		// console.log('data' + mydata);
		// console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		// console.log(largeDataSet)
		// var len = largeDataSet.length
		// if (largeDataSet[len - 1] == ',')
		// 	largeDataSet[len - 1] = ''
		largeDataSet = JSON.parse(largeDataSet)
		res.json(largeDataSet)
	});
})


// split the contents by new line

// print all lines
// lines.forEach((line) => {
// 	if (line.includes(url))
// 		res.send(line)
// });
// res.send(url)

// res.json({
// 	confirmation: 'success',
// 	app: process.env.TURBO_APP_ID,
// 	data: 'this is a sample json route.',
// 	url: url
// })
// router.get('/json', (req, res) => {
// 	res.json()
// })

// /*  This route sends text back as plain text. */
// router.get('/send', (req, res) => {
// 	res.send('This is the Send Route')
// })

// /*  This route redirects requests to Turbo360. */
// router.get('/redirect', (req, res) => {
// 	res.redirect('https://www.turbo360.co/landing')
// })


module.exports = router