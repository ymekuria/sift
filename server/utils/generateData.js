var faker = require('Faker');
var underscore = require('underscore')

module.exports = { 

	generateData: function(req, res) {
		var tableData = req.body;
		var fakeData = [];  	

    for ( var i = 0; i < 10; i++ ) { 
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


	generateValueString: function(fakeDataArr) {
		var valueStr = '';
    for ( var i = 1; i <= fakeDataArr.length; i ++ ) {
       valueStr+='$'+i+','
    }
    valueStr =valueStr.slice(0,valueStr.length-1)

    return valueStr;
	
	}




};