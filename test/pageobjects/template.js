import { browser } from '@wdio/globals'

export default class Template {
    //For opening subpages
    open (path) {
        return browser.url(`https://www.saucedemo.com/${path}`);
    }
}