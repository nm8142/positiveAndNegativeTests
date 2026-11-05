import { $ } from '@wdio/globals';
import Template from './template.js';

class Login extends Template {
    // OBJECTS
    users = {
        usernames: ["standard_user", "locked_out_user", "problem_user", "performance_glitch_user", "error_user", "visual_user"],
        password: ["secret_sauce", "bad"]
    };
    // GETTERS
    get usernameField () {
        return $('input[data-test="username"]');
    }
    get passwordField () {
        return $('input[data-test="password"]');
    }
    get loginButton () {
        return $('input[data-test="login-button"]');
    }
    get loginError () {
        return $('h3[data-test="error"]');
    }

    // FUNCTIONS
    async attemptLogin (username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();

    }
    // Tells wdio the login page has a blank endpoint
    open () {
        return super.open('');
    }
}

export default new Login();