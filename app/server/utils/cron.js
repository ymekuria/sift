var client = require('../utils/dbconnect').client;
var r = require('rethinkdb');

var CronJob = require('cron').CronJob;
var job = new CronJob('00 00 00 * * 0-6', function() {

    if (process.env.RETHINK_PORT_8080_TCP_ADDR) {
      rConnectConfig = { host: 'rethink', db: 'apiTables' }
    } else {
      rConnectConfig =  { host: 'localhost', db: 'apiTables' }
    }
    r.connect(rConnectConfig, function(err, conn) {
      if (err) { console.log(err); }
      connection = conn;
    });

    var queryString = "SELECT tablename FROM tables WHERE last_used > current_date - interval '8 days' AND active = true";
    client.query(queryString, function(err, results) {
      var tablenames = results.rows;
      tablenames.forEach(function(tablename) {
        r.table_drop(tablename);
      });
    });
    var updateString = "UPDATE tables SET active = false WHERE last_used > current_date - interval '8 days' AND active = true";
    client.query(updateString, function(err, results) {
      console.log('Tables removed and updated.');
    }) 
  },
  null,
  false, /* Start the job right now */
  'America/Los_Angeles'
);