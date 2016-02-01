var faker = require('Faker');
var _ = require('lodash');
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

  // this method generates an array of data with the specified fields
  //use req.body as a reference to the index file to 
  //pull out the relevant faker queries ---> insert into 
  //the generate data algorithm below. 
	generateData: function(fields,numberOfRows) {
		var fakeData = [];  	

    for (var i = 0; i < numberOfRows; i++ ) { 
    	var rowData = [];
      // for (key in fields) {
      _.each( fields, function(fieldVal, fakerCategory) { 
        if ( fakerCategory !== 'tableName') {
          _.each( fieldVal, function (fakerVal, fakerField){ 
            // if the the passed in catagory is marked true 
            if (fields[fakerCategory][fakerField]) {
              // generating the fake data from faker and pushing the row into an array
              var ref = dataIndex[fakerCategory][fakerField];
              rowData.push(eval("faker." + ref + "()"));
            }
          });
        }
          
      });

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