var r = require('../../node_modules/rethinkdb/rethinkdb.js');
var expect = require('../../node_modules/chai/chai').expect;
var rp = require('request-promise');
var utils = require('../utils/generateData.js');

//connection
var rConnectConfig;
if (process.env.RETHINK_PORT_8080_TCP_ADDR) {
  rConnectConfig = { host: 'rethink', db: 'apiTables' }
} else {
  rConnectConfig =  { host: 'localhost', db: 'apiTables' }
}


var host = rConnectConfig.host;

describe("rethinkDB", function() {
  var connection = null;

  beforeEach(function(done) {

    r.connect(rConnectConfig, function (err, conn) {
      if ( err ) throw err;
      connection = conn;


      r.tableList().run(conn)
      .then(function (result){
        if ( result.indexOf('yoni_testTable') > -1 ){
          r.tableDrop('yoni_testTable').run(conn)
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
    this.timeout(5000);

    var newTable = {
      tableName : 'testTable',
      name: {
        firstName: true,
        lastName: true
      }
    }

    var uri = 'http://localhost:5001/api/users/tables';

    var options = {
      method: 'POST',
      uri: uri,
      body: newTable,
      json: true
    }

      rp(options)
      .then(function (response) {
        r.tableList().run(connection)
        .then(function(result) {
          expect(result.indexOf('yoni_testTable')).to.not.equal(-1);
          done();
        })
      })
      .catch(function(err) {
        console.log('ERROR', err);
        done();
      })

  });


  xit("should get all tables ", function(done) {
  });


  xit("should delete a table", function(done) {
    
    done();
  });


  xit("should post to a table", function(done) {
    
    done();
  });


});
