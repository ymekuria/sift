var faker = require('Faker');
var underscore = require('underscore')

module.exports = { 

	generateData: function(req, res) {
		var tableData = req.body;
		var fakeData = [];  	

    for ( var i = 0; i <=5; i++ ) { 
    	var rowData = [];
			for ( var keys in tableData ) {
				if( keys !== 'tableName') {
					var fields = keys.split(".");
					//console.log('fields', fields);
						rowData.push(faker[fields[0]][fields[1]]());
						// );
		    }

			}
			fakeData.push(rowData);
		}	
		return fakeData;


	},


	mergeFields: function() {


	}




};