var r = require('rethinkdb');
var expect = require('../../node_modules/chai/chai').expect;
var rp = require('request-promise');
var utils = require('../utils/generateData.js');

//connection
var rConnectConfig;
if (process.env.RETHINK_PORT_8080_TCP_ADDR) {
  rConnectConfig = { host: 'rethink', port: 28015, db: 'apiTables' }
} else {
  rConnectConfig =  { host: 'localhost', db: 'apiTables' }
}


var host = rConnectConfig.host;
var port = rConnectConfig.port || 8080;

describe("rethinkDB", function() {
  var connection = null;

  beforeEach(function(done) {

    r.connect(rConnectConfig, function (err, conn) {
      if ( err ) throw err;
      connection = conn;


      r.tableList().run(conn)
      .then(function (result){
        if ( result.indexOf('zack_testTable') > -1 ){
          r.tableDrop('zack_testTable').run(conn)
          .then(function(result) {
            console.log('before each', result)
          })
        }
        done();
      });
    })

  });


  afterEach(function() {
    //drop all tables from test
    // r.tableDrop('zack_testTable').run(connection)
    // .then(function(result) {
    //   done()
    // })
    // .catch(function(err) {
    //   throw err;
    // })

  });

  it("should create a table", function(done) {
    var newTable = {
      tableName : 'testTable',
      name: {
        firstName: true,
        lastName: true
      }
    }
    var uri = 'http://localhost:5001/api/users/tables';
    console.log(uri)
    var options = {
      method: 'POST',
      uri: uri,
      body: newTable,
      json: true,
      resolveWithFullResponse: true
    }

    rp(options)
    .then(function () {
      console.log('wtffff')
    })
    .catch(function(err) {
      console.log('ERROR', err);
    })
    .finally(function (res) {
      console.log('yo')
    })

    // r.table('zackTest')

  });


  xit("should get all tables ", function(done) {
    
    done();
  });


  xit("should delete a table", function(done) {
    
    done();
  });


  xit("should post to a table", function(done) {
    
    done();
  });


});
