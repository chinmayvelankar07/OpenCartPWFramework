import {test,expect} from '../fixtures/baseFixture';
import {LoginPage} from '../pages/LoginPage';


// let loginPage:LoginPage;

// test.beforeEach(async({page})=>{
//     loginPage = new LoginPage(page);
// })

test('@login Login with valid credentials',async({homePage})=>{

    expect (await homePage.verifyHeading()).toBeTruthy();
    expect (await homePage.verifyLogoutLink()).toBeTruthy();

});

test('Login with Invalid Credentials',async({page,baseURL})=>{

    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage(baseURL);
    await loginPage.doLogin('random','random');
    await loginPage.getInvalidLoginMessage();

});
