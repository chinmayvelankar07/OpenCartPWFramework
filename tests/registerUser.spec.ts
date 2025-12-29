import {test,expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';


type regData = {
    firstName:string,
    lastName:string,
    telephone:string,
    password:string,
    subscribeNewsletter:string
}

const fileContent = fs.readFileSync('./testData/registration.csv','utf-8');
const registrationData:regData[] = parse(fileContent,{
    columns:true,
    skip_empty_lines:true      
});

for (const data of registrationData){

    test(`@registration Verify User registration for ${data.firstName}`,async({page,baseURL})=>{

        const loginPage:LoginPage = new LoginPage(page);
        loginPage.gotoLoginPage(baseURL);
        const registerPage:RegisterPage = await loginPage.clickOnRegisterLink();
        const isUserRegistered:boolean = await registerPage.registerUser(data.firstName,data.lastName,getRandomEmailID(),data.telephone,data.password,data.subscribeNewsletter);
        expect(isUserRegistered).toBeTruthy();

    });
}




function getRandomEmailID():string{

    const randomValue = Math.random().toString(36).substring(2,9);
    return `auto_${randomValue}@nal.com`;
}
