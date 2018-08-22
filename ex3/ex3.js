function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return new Promise(function(resolve) {
		fakeAjax(file, resolve);
	})
}

// request all files concurrently
let file1 = getFile("file1");
let file2 = getFile("file2");
let file3 = getFile("file3");

file1
	.then(output)
	.then(() => file2)
	.then(output)
	.then(() => file3)
	.then(output)
	.then(() => output("Done!"));
