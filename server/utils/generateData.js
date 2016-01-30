var faker = require('Faker');
// var underscore = require('underscore')
var dataIndex = require('./dataIndex/write.js');

// req.body will now resemble : 
//
// {
//   name: { 
//     firstName: true, 
//     lastName: true}, 
//   company: {
//     catchPhrase: true}
// }

//use req.body as a reference to the index file to 
//pull out the relevant faker queries ---> insert into 
//the generate data algorithm below. 

//use this in combination with our dataIndex to get and execute faker queries
var fakerize = function (obj) {
  //for each key in faker, execute the given faker generation
  var results = [];
  for (key in obj) {
    var rowData = [];
    for (key2 in index[key]) {
      var ref = index[key][key2];
      results.push("faker." + ref + "()");
    }
  }
  return results;
};



module.exports = { 

  parseColumnNames: function (obj) {
    var results = [];
    for (key in obj) {
      if (key !== 'tableName') {
        results = results.concat(Object.keys(obj[key]));
      }
    }
    return results;
  },

	generateData: function(obj,numberOfRows) {
		var fakeData = [];  	

    for (var i = 0; i < numberOfRows; i++ ) { 
    	var rowData = [];
      for (key in obj) {
        if ( key !== 'tableName') {
          for (key2 in dataIndex[key]) {
            if (obj[key][key2]) {
              var ref = dataIndex[key][key2];
              rowData.push(eval("faker." + ref + "()"));
            }
          }
        }
          
      }

			fakeData.push(rowData);
		}	
		return fakeData;

  },
//


	generateValueString: function(fakeDataArr) {
		var valueStr = '';
    for ( var i = 1; i <= fakeDataArr.length; i ++ ) {
       valueStr+='$'+i+','
    }
    valueStr =valueStr.slice(0,valueStr.length-1)

    return valueStr;
	
	}




};