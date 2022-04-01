[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

# Synthetic Based Outlier Detection
![GitHub forks](https://img.shields.io/github/forks/newrelic-experimental/synthetic-based-outlier-detection?style=social)
![GitHub stars](https://img.shields.io/github/stars/newrelic-experimental/synthetic-based-outlier-detection?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/newrelic-experimental/synthetic-based-outlier-detection?style=social)

![GitHub all releases](https://img.shields.io/github/downloads/newrelic-experimental/synthetic-based-outlier-detection/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/newrelic-experimental/synthetic-based-outlier-detection)
![GitHub last commit](https://img.shields.io/github/last-commit/newrelic-experimental/synthetic-based-outlier-detection)
![GitHub Release Date](https://img.shields.io/github/release-date/newrelic-experimental/synthetic-based-outlier-detection)


![GitHub issues](https://img.shields.io/github/issues/newrelic-experimental/synthetic-based-outlier-detection)
![GitHub issues closed](https://img.shields.io/github/issues-closed/newrelic-experimental/synthetic-based-outlier-detection)
![GitHub pull requests](https://img.shields.io/github/issues-pr/newrelic-experimental/synthetic-based-outlier-detection)
![GitHub pull requests closed](https://img.shields.io/github/issues-pr-closed/newrelic-experimental/synthetic-based-outlier-detection)

This project provides an example New Relic outlier alert using a synthetic Scripted API script. The example looks for the response time in a cluster and fails when any host is suffering from response times greater than 2 standard deviations from the cluster average.

## How it works
The monitor should run on a regular basis (say every minute), testing the response times in the cluster. When an outlier is found the monitor fails and an alert can then be used to send a notification.


## Getting Started
- Make sure you have a USER key and your account id, then create an Endpoint availability, Scripted API monitor (probably set to run once a minute). 
- Paste in the outlier-alert.js JavaScript code.
- Ensure the USER key and account id are set correctly, the example uses 2 secure credentials (`MIKE_ACCOUNT_ID` and `MIKE_USER_KEY`). Rename these or hardcode them, as appropriate.
- Change the NRQL accordingly (`NRQL_TranCount` variable), for example appName in the WHERE clause and time period (5 minutes will allow for some smoothing of data and reduce the likelihood of false alerts). Note, if you change any of the field names then you will need to reflect this in the JavaScript code.
- Optional - Change the `threshold` variable depending on your needs (the example uses 2 times the standard deviation of the cluster as a whole).
- Optional - Change the `MinTranCount` value, this is the minimum number of transactions a host needs to be executing before it can be considered as an outlier. This is to stop false alerts when transaction numbers are low.
- Test the monitor and set it running.
- Create an alert to watch for this specific monitor. It will alert you when the monitor fails and you can then drill into the monitor failure to see the details.

## Multi location support
You can safely run the synthetic script from multiple locations.

## Support

New Relic has open-sourced this project. This project is provided AS-IS WITHOUT WARRANTY OR DEDICATED SUPPORT. Issues and contributions should be reported to the project here on GitHub.

>We encourage you to bring your experiences and questions to the [Explorers Hub](https://discuss.newrelic.com) where our community members collaborate on solutions and new ideas.


## Contributing

We encourage your contributions to improve Synthetic Based Outlier Detection! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project. If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company, please drop us an email at opensource@newrelic.com.

**A note about vulnerabilities**

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License

Synthetic Based Outlier Detection is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

