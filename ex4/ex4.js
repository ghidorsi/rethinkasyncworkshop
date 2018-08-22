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
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

let pr1 = getFile("file1");
let pr2 = getFile("file2");
let pr3 = getFile("file3");

// request an array of files concurrently
// ["file1","file2","file3"]...
Promise.all([pr1, pr2, pr3])
	.then(output)
	.then(() => output("Complete!"));
