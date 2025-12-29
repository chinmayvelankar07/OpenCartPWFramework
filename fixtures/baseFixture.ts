import {test as base,expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';

type MyFixtures = {
    homePage : HomePage;
};

export const test = base.extend<MyFixtures>({

    homePage: async({page,baseURL},use,testInfo)=>{

        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(baseURL);
        const userName = testInfo.project.metadata.appUsername;
        const password = testInfo.project.metadata.password;
        const homePage = await loginPage.doLogin(userName,password);
        expect(await homePage.verifyLogoutLink()).toBeTruthy();

        await use(homePage);

    }

});
export {expect};