import { browser, by, element } from 'protractor';
import { ScreensPageObject } from './screens.po';

const protractorImageComparison = require('protractor-image-comparison');

describe('Screen Comparison', () => {
  let page: ScreensPageObject;
  let menuButton;
  let expected;

  beforeEach(() => {
    page = new ScreensPageObject();
    menuButton = page.getMenuButton();
    expected = browser.ExpectedConditions;
  });

  describe('Page One', () => {
    beforeEach(() => {
      page.navigateTo('/');

      browser.wait(expected.elementToBeClickable(menuButton));
    });

    it('should match', () => {
      expect(browser.protractorImageComparison.checkScreen('page-one')).toEqual(0);
    });
  });

  describe('Side Menu', function() {
    let menuItemElement;

    beforeEach(() => {
      page.navigateTo('/');

      browser.wait(expected.elementToBeClickable(menuButton));
    });

    it('should match', () => {

      return menuButton.click()
        .then(() => {
          // WAIT FOR CLICK BLOCK TO GO AWAY
          browser.wait(expected.stalenessOf(element(by.css('.click-block-active'))));

          browser.driver.sleep(1000);

          expect(browser.protractorImageComparison.checkScreen('side-menu')).toEqual(0);
        });
    });
  });

  describe('Page Two', function() {
    let menuItemElement;

    beforeEach(() => {
      page.navigateTo('/');

      browser.wait(expected.elementToBeClickable(menuButton));
    });

    it('should match', () => {

      return menuButton.click()
        .then(() => {
          // WAIT FOR CLICK BLOCK TO GO AWAY
          browser.wait(expected.stalenessOf(element(by.css('.click-block-active'))));

          menuItemElement = page.getMenuItemButton(1);
          browser.driver.sleep(500);

          return menuItemElement.click()
        })
        .then(()=> {
          browser.driver.sleep(2000);
          // WAIT ON THE MENU BUTTON TO BE CLICKABLE (IF RENDERED, THE UI IS READY)
          browser.wait(expected.elementToBeClickable(menuButton));

          /* NOTE:
              THIS PAGE GENERATES RANDOM ICONS, SO
              - THE ICONS MAY CHANGE PER LINE
              - THE TEXT MAY MOVE DUE TO THE WIDTH OF THE ICON
              CHANGING THE EXPECTED RESULT TO toBeLessThan(2) TO ADJUST FOR TOLERANCE
              SO THAT THE TEST WILL PASS.
              BEST PRACTICE: VISUALLY INSPECT THE DIFF SCREENS
          */
          expect(browser.protractorImageComparison.checkScreen('page-two')).toBeLessThan(2);
        });
    });
  });
});
