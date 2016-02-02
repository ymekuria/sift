var fs = require('fs');
var faker = require('faker');
var _ = require('lodash')

 // { value: 'AL', label: 'Alabama', disabled: true }

var first = [
"name",
"address",
"phoneNumber",
"internet",
"company",
"image",
"lorem",
"random",
"commerce"
]

var second = [
"department",
"price",
"firstName",
"lastName",
"title",
"jobArea",
"zipCode",
"city",
"streetName",
"latitude",
"longitude",
"phoneNumber",
"email",
"username",
"companyName",
"catchPhrase",
"avatar",
"abstractImage",
"nightlife",
"fashion",
"sports",
"lorem",
"paragraph",
"sentences",
"words",
"boolean"
];

// var index = _.map(first, function (category, i) {
//   var children = [];
//   for (key in faker[category]) {
//     if (second.indexOf(key) > -1) {
//       children.push(key)
//     }
//   }
//   return {
//     value: category,
//     label: category,
//     disabled: false,
//     children: children
//   }
// })

var index = _.map(second, function (sub) {
    return {
      value: sub,
      label: sub,
      disabled: false
  }
})
// for (key in faker) {
//   if (first.indexOf(key) > -1) {
//     index[key] = [];
//     for (key2 in faker[key]) {
//       if (second.indexOf(key2) > -1) {
//         index.push(key2);
//       }
//     }
//   }
// }


//fakerize is going to take an obj that invokes some 
//faker queries based on the fields that are selected
//the obj will look something like this: 

// {name: { firstName: true, lastName: true}, 
//  company: {catchPhrase: true}}

function fakerize (obj) {
  //for each key in faker, execute the given faker generation
  for (key in obj) {
    for (key2 in index[key]) {
      var ref = index[key][key2];
      console.log('REF', ref)
      console.log(eval("faker." + ref + "()"));
    }
  }
}

// fakerize({name: { firstName: true, lastName: true}, 
//  company: {catchPhrase: true}})


fs.writeFile('./subSelections.js', JSON.stringify(index, null, 2), function(err) {
  if (err) throw err;
    console.log('i think it wrote')
})