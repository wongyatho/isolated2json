const fetch = require('node-fetch');
const pdf = require('pdf-parse');

module.exports = async function(url) {
	try {
		let res = await fetch(url);
		let data = await pdf(await res.buffer());

		// number of pages
		//console.log(data.numpages);
		// number of rendered pages
		//console.log(data.numrender);
		// PDF info
		//console.log(data.info);
		// PDF metadata
		//console.log(data.metadata); 
		// PDF.js version
		// check https://mozilla.github.io/pdf.js/getting_started/
		//console.log(data.version);
		// PDF text
		//console.log(data.text); 

		let lines = data.text.split("\n");
		let output = [];
		for(let i=0; i <lines.length;i++) {
			if (lines[i] == "(DD/MM/YYYY)") {
				continue;
			}

			for(++i;;i+=3) {
				let line1 = lines[i].split('  ');
				if (line1.length < 2 || isNaN(parseInt(line1[0].split(' ')[0]))) {
					break;
				}
				let caseNo = parseInt(line1[0].split(' ')[0]);
				output.push(`{
  "case_no":"${caseNo}",
  "district":"${line1[0].replace(caseNo+' ','')}",
  "address":"${line1[1]}",
  "end_date":"${lines[i+2]}",
}`);
			}
		}

		return '['+output.join(',')+']';
	} catch(e) {
		console.error(e);
	}
 
	return '';
};
