import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil';
import {HomePage} from '../pages/HomePage';
import {RegisterPage} from '../pages/RegisterPage';

export class LoginPage{
    //page locators/Objects

    private readonly page:Page;
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly warningMsg:Locator;
    private readonly util:ElementUtil;
    private readonly registerLink:Locator;

    constructor(page:Page){
        this.page = page;
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.locator(`//input[@type='submit']`);
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.util = new ElementUtil(page);
        this.registerLink = page.locator(`//div[@class='list-group']/a[text()='Register']`);

    }
    //Page methods/behavior
    async gotoLoginPage(baseURL: undefined|string):Promise<void>{
        await this.page.goto(baseURL+`?route=account/login`);
    }

    async doLogin(emailID:string,password:string):Promise<HomePage>{
        await this.util.fill(this.emailId,emailID);
        await this.util.fill(this.password,password);
        await this.util.click(this.loginBtn,{force:true,timeout:5000});
        // const title:string = await this.page.title();
        // console.log(`The title of the homepage is: ${title}`);
        // return title;
        return new HomePage(this.page);
        
    }

    async getInvalidLoginMessage():Promise<string>{
        const invalidLoginMsg:string = await this.util.getInnerText(this.warningMsg);
        console.log(`Invalid Login message: ${invalidLoginMsg}`);
        return invalidLoginMsg;
    }

    async clickOnRegisterLink():Promise<RegisterPage>{

        await this.util.click(this.registerLink);
        return new RegisterPage(this.page);

    }


}