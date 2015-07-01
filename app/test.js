/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

/**
 * This script will capture a screenshot of a twitter account page
 * Usage: $ casperjs screenshot.js <twitter-account> <filename.[jpg|png|pdf]>
 */

var casper = require("casper").create({
    // viewportSize: {
    //     width: 1024,
    //     height: 768
    // },
    verbose: true,
    logLevel: 'debug'

});

var pageUrl = casper.cli.get(0);
var selector = '.'+casper.cli.get(1);
var filename = casper.cli.get(2);
var timeout = casper.cli.get(3) || 20000;

if (!pageUrl || !filename || !/\.(png|jpg|pdf)$/i.test(filename)) {
    casper
        .echo("Usage: $ casperjs screenshot.js <page url> <filename.[jpg|png|pdf]>")
        .exit(1);
}

casper.start(pageUrl, function() {
    this.waitForSelector(selector, (function() {
        this.captureSelector(filename, 'html');
        this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
    }), (function() {
        this.die("Timeout reached. Fail whale?");
        this.exit();
    }), timeout);
    // this.echo(this.getHtml());
});

casper.run();