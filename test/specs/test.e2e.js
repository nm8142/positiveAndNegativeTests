import { expect } from '@wdio/globals'
import Login from '../pageobjects/login.js';
import Inventory from '../pageobjects/inventory.js'

describe('Login tests', () => {
    it('all users except locked_out_user can log in', async () => {
        for (let i = 0; i < Login.users.usernames.length; i++) {
            // Skips locked_out_user
            if (i === 1) {
                continue;
            }
            await Login.open();
            await Login.attemptLogin(Login.users.usernames[i], Login.users.password[0]);
            await Inventory.open('inventory.html');
            await expect(Inventory.productsPageTitle).toBeExisting();
            await expect(Inventory.productsPageTitle).toHaveText(
                expect.stringContaining('Products')
            );
        }
    })
    it('locked_out_user is locked out', async () => {
        await Login.open();
        await Login.attemptLogin(Login.users.usernames[1], Login.users.password[0]);
        await expect(Login.loginError).toBeExisting();
        await expect(Login.loginError).toHaveText(
            expect.stringContaining('Epic sadface: Sorry, this user has been locked out.')
        );
    })
    it('can\'t log in with bad password', async () => {
        for (let i = 0; i < Login.users.usernames.length; i++) {
            await Login.open();
            await Login.attemptLogin(Login.users.usernames[i], Login.users.password[1]);
            await expect(Login.loginError).toBeExisting();
            await expect(Login.loginError).toHaveText(
            expect.stringContaining('Epic sadface: Username and password do not match any user in this service')
            );
        }
    })
})