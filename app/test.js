/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

/**
 * This script will capture a screenshot of a twitter account page
 * Usage: $ casperjs screenshot.js <twitter-account> <filename.[jpg|png|pdf]>
 */
// var fs = require('fs');
var casper = require("casper").create({
    viewportSize: {
        width: 1024,
        height: 768
    },
    verbose: true,
    logLevel: 'debug',
    timeout: 60000
});

var pageUrl = casper.cli.get(0);
var selector = casper.cli.get(1);
var filename = casper.cli.get(2);
var timeout = casper.cli.get(3) || 20000;

if (!pageUrl || !filename || !/\.(png|jpg|pdf)$/i.test(filename)) {
    casper
        .echo("Usage: $ casperjs screenshot.js <page url> <filename.[jpg|png|pdf]>")
        .exit(1);
}
var twt_ids, links;
casper.start(pageUrl, function() {
    var raw_html = this.download(pageUrl, 'src.html');
    this.echo("Saved raw html of " + pageUrl);
    twt_ids = this.evaluate(function() {
        var elements = __utils__.findAll('#article-body iframe.twitter-tweet');
        return elements.map(function(e) {
            return e.getAttribute('id');
        });
    });


});
// casper.run();
casper.run(function() {
    this.echo(JSON.stringify(twt_ids));
    // this.echo(this.getHTML());
    this.each(twt_ids, function(self, twtContainer) {
        twtContainer = '#' + twtContainer;
        self.log('capture screenshot for:' + twtContainer);
        var file = (new Date()).getTime() + '.png';
        self.captureSelector(file, twtContainer);
        self.echo("Saved screenshot of " + (twtContainer) + " to " + file);
    }).exit();

});