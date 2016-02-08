<<<<<<< HEAD
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

  parseColumnNames: function(obj) {
    console.log('this is the obj', obj)
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
	generateData: function(fields, columns, numberOfRows) {
    // var columns = module.exports.parseColumnNames(fields);
		var data = [];  	

    for (var i = 0; i < numberOfRows; i++) { 
      var row = {};
      _.each(fields, function(field, fakerCategory) {
        if (fakerCategory !== 'tableName') {
          _.each(field, function (fakerVal, fakerField) {
            var key = fakerField;
            // generating the fake data from faker and pushing the row into an array
            var ref = dataIndex[fakerCategory][fakerField];
            var value = eval("faker." + ref + "()");
            console.log('value: ', typeof value);
            if (value.indexOf('\'') > -1) {
              value = eval("faker." + ref + "()");
            } else {
              row[key] = value;
            }
          });
        } 
      });
      data.push(row);			
		}	
		return data;
  },


	generateValueString: function(n) {
		var valueStr = '';

    for (var i = 1; i <= n; i++) {
      valueStr += i < n ? '$' + i + ',' : '$' + i;
    }

    return valueStr;
	}




};

