// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const protractorImageComparison = require('protractor-image-comparison');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../test-screens/**/*.e2e-spec.ts'
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
    // SETS THE SIZE TO iPhone 6 Plus SIZE (height is 736 + height of )
    browser.driver.manage().window().setSize(414, 810);
    jasmine.getEnv().addReporter(new SpecReporter());
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './test-screens/reports/',
        takeScreenshots: false
      })
    );

    const protractorImageComparison = require('protractor-image-comparison');
    browser. protractorImageComparison = new protractorImageComparison(
        {
            actualFolder: './test-screens/actual/',
            baselineFolder: './test-screens/baseline/',
            diffFolder: './test-screens/diff/',
            screenshotPath: './test-screens/current/',
            tempFullScreenFolder: './test-screens/full/',
            autoSaveBaseline: true,
            // ignoreAntialiasing: true,
            // ignoreColors: true,
            ignoreTransparentPixel: true,
            // debug: true
        }
    );
  }
};
