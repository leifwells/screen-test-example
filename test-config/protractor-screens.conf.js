// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../test-screens/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
        '--headless',
        '--no-sandbox',
        '--disable-infobars'
      ]
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
    // SETS THE SIZE TO iPhone 6 Plus SIZE
    browser.driver.manage().window().setSize(414, 736);

    jasmine.getEnv().addReporter(new SpecReporter());

    const protractorImageComparison = require('protractor-image-comparison');
    browser.protractorImageComparison = new protractorImageComparison(
        {
            actualFolder: './test-screens/actual/',
            baselineFolder: './test-screens/baseline/',
            diffFolder: './test-screens/diff/',
            screenshotPath: './test-screens/current/',
            // tempFullScreenFolder: './test-screens/full/',
            autoSaveBaseline: true,
            // ignoreAntialiasing: true,
            // ignoreColors: true,
            // ignoreTransparentPixel: true,
            // debug: true
        }
    );
  }
};
