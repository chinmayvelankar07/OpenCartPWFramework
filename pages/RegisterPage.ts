import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil';

export class RegisterPage{

    private readonly page:Page;
    private readonly util:ElementUtil;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly emailID:Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly confirmPassword:Locator;
    private readonly subscribeNewsletterYes:Locator;
    private readonly subscribeNewsletterNo:Locator;
    private readonly checkBox:Locator;
    private readonly continueBtn:Locator;
    private readonly successMsg:Locator;

    constructor(page:Page){
        this.page = page;
        this.util = new ElementUtil(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.emailID = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByRole('textbox', { name: 'Password'});
        this.confirmPassword = page.getByRole('textbox', { name: 'Password Confirm'});
        this.subscribeNewsletterYes = page.getByRole('radio', { name: 'Yes', checked: false });
        this.subscribeNewsletterNo = page.getByRole('radio', { name: 'No', checked: true });
        this.checkBox = page.locator('[name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByRole('heading',{name:'Your Account Has Been Created!'});
    }

    async registerUser(
        firstName:string,
        lastName:string,
        emailID:string,
        telephone:string,
        password:string,
        subscribeNewsletter:string
    ):Promise<boolean>{

        await this.util.fill(this.firstName,firstName);
        await this.util.fill(this.lastName,lastName);
        await this.util.fill(this.emailID,emailID);
        await this.util.fill(this.telephone,telephone);
        await this.util.fill(this.password,password);
        await this.util.fill(this.confirmPassword,password);

        if(subscribeNewsletter === 'Yes'){
            await this.util.click(this.subscribeNewsletterYes);
        }
        else{
            await this.util.click(this.subscribeNewsletterNo);
        }

        await this.util.click(this.checkBox);
        await this.util.click(this.continueBtn);

        return await this.util.isVisible(this.successMsg);
    }

   



}