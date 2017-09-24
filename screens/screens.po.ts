import { browser, by, element } from 'protractor';

export class ScreensPageObject {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getMenuButton() {
    return element.all(by.css('.bar-button-menutoggle')).get(0);
  }

  getMenuItems() {
    return element(by.css('ion-menu')).all(by.css('button'));
  }

  getMenuItemButton(index: number) {
    return this.getMenuItems().get(index);
  }

}
