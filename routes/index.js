// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()
// const fs = require('fs')
const {
	spawn
} = require('child_process');

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
		// console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		if (largeDataSet) {
			largeDataSet = JSON.parse(largeDataSet)
			res.json(largeDataSet)
		} else {
			res.json()
		}
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