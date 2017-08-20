/**
 * homepage.js - Homepage tests.
 */

var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1920, height: 961};
casper.on('page.error', function(msg, trace) {
    this.echo('Error: ' + msg, 'ERROR');
    for(var i=0; i<trace.length; i++) {
        var step = trace[i];
        this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
    }
});

casper.on('remote.message', function(message) {
    this.echo('Message: ' + message);
});

casper.test.begin('Tests homepage structure', function suite(test) {

    casper.start('http://web', function() {

        test.assertTitle("TestProject", "Title is correct");

        casper.wait(2000);

        test.assertVisible('h2');
    });

    casper.run(function() {







        test.done();
    });
});