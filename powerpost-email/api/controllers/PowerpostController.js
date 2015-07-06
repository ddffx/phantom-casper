/**
 * PowerpostController
 *
 * @description :: Server-side logic for managing powerposts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var shell = require('shelljs');
module.exports = {
    add: function(req, res) {

        var page_url = req.param('page_url');
        // shell.echo('hello world');
        shell.cd('/data/'); // result  files go here.
        
        shell.exec('casperjs /app/test.js ' + page_url + ' .twitter-tweet-rendered scr.png 20000', function(code, result){
        	sails.log('Exit code:', code);
        
        });

        return res.json({
            page_url: page_url
        });
    }
};