/**
 * Synthetic "Scripted API" script to recreate an outlier type of alert. This example looks for the response time in a cluster and fails when any host is suffering
 *   from response times greater than 2 standard deviations from the cluster average.
 * Instructions:
 * - Create an Endpoint availability, Scripted API monitor (probably run once a minute)
 * - Use the code below as an example, this requires 2 secure credentials (MIKE_ACCOUNT_ID and MIKE_USER_KEY, change the names!)
 * - Change the NRQL accordingly, for example appName in the WHERE clause and time period (5 minutes will allow for some smoothing of data)
 * - Optional - Change the threshold below and fields in the JSON (depending on whether you changed the fields in the NRQL)
 * - Set the monitor running
 * - Create an alert to watch for this specific monitor. It will alert you when the monitor fails and you can then drill into the monitor failure to see the details.
 */

var assert = require('assert');

// Define our query, choose your own query here!
const NRQL_TranCount = "SELECT average(duration) AS avg_host, stddev(duration) AS std_dev, count(*) AS count FROM Transaction WHERE appName = 'Proxy-West' FACET host, entityGuid, appName SINCE 5 minutes ago";

// Minimum Transactions before we evaluate against the threshold. This is to try to avoid false alerts
const MinTranCount = 100;

// Function to create the post options, basically varies on the NRQL only
function getPostOptions(NRQL) {
  return {
    uri: 'https://api.newrelic.com/graphql',
    // Set the correct URL
    // uri: 'https://api.eu.newrelic.com/graphql',
  body: '{"query": "{ actor { account(id: ' + $secure.MIKE_ACCOUNT_ID + ') { nrql(query: \\\"' + NRQL + '\\\") { totalResult results }}}}"}',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': $secure.MIKE_USER_KEY
  }
  };
}

// Do our POST
$http.post(getPostOptions(NRQL_TranCount),
  // Callback function
  function (err, response, body) {
    assert.equal(response.statusCode, 200, 'Expected a 200 OK response from transaction count');
    console.log('Response from Transaction count:', body);
    if (!err && response.statusCode === 200) {
      // Get the JSON
      var jsn = JSON.parse(body).data.actor.account.nrql;
      // Get the average and standard deviation for all hosts
      var totalAvg = jsn.totalResult.avg_host;
      var totalStdDev = jsn.totalResult.std_dev;
      var totalCount = jsn.totalResult.count;
      console.log("TOTAL - Avg: " + totalAvg + ", StdDev: " + totalStdDev + ", Count: " + totalCount);
      // Calcuate a threshold for alerting (the average plus 2 standard deviations here). Please choose your own!
      var threshold = totalAvg + 2*totalStdDev;
      console.log("Threshold: " + threshold);
      // Loop through the hosts looking for one outside the threshold
      for(var i = 0; i < jsn.results.length; i++) {
        console.log("Host: " + jsn.results[i].facet[0] + ", Avg: " + jsn.results[i].avg_host + ", StdDev: " + jsn.results[i].std_dev + ", Count: " + jsn.results[i].count);
        if (jsn.results[i].count > MinTranCount) {
          // On finding an outlier fail the synthetic monitor
          assert.ok(jsn.results[i].avg_host < threshold, "Average response time too high - Host: " + jsn.results[i].facet[0] +
            ", Host Avg: " + jsn.results[i].avg_host + ", Average across all hosts: " + totalAvg);
        }
        else
          console.log("Host: " + jsn.results[i].facet[0] + " ignored, number of transactions too low: " + jsn.results[i].count);
      }
    }
  }
);
