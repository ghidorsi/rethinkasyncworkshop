function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	}
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000

	console.log("Requesting: " + url)

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	let t;
	let f;

	fakeAjax(file, function(text) {
		if(f) f(text);
		else t = text;;	
	});

	return function(cb) {
		if(t) cb(t);
		else f = cb;
	};
}

// request all files concurrently
let file1 = getFile("file1")
let file2 = getFile("file2")
let file3 = getFile("file3")

file1(function(text) {
	output(text)

	file2(function(text) {
		output(text)

		file3(function(text) {
			output(text)
			output("Complete!")
		})
	})
})
