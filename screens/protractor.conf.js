// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const protractorImageComparison = require('protractor-image-comparison');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--no-sandbox', 'disable-infobars', '--disable-gpu']
    },
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    shardTestFiles: true,
    maxInstances: 2
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  },
  directConnect: true,
  baseUrl: 'http://localhost:8100/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    browser.driver.manage().window().setSize(414, 736);
    jasmine.getEnv().addReporter(new SpecReporter());

    const protractorImageComparison = require('protractor-image-comparison');
    browser. protractorImageComparison = new protractorImageComparison(
        {
            actualFolder: './screens/actual/',
            baselineFolder: './screens/baseline/',
            diffFolder: './screens/diff/',
            screenshotPath: './screens/current/',
            tempFullScreenFolder: './screens/full/',
            autoSaveBaseline: true,
            // ignoreAntialiasing: true,
            // ignoreColors: true,
            ignoreTransparentPixel: true,
            // debug: true
        }
    );
  }
};
