import { $ } from '@wdio/globals';
import Template from './template.js';

class Inventory extends Template {
    //GETTERS
    get productsPageTitle () {
        return $('span[data-test="title"]');
    }
    
}

export default new Inventory();