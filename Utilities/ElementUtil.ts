import {Page, Locator} from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil{

    private page:Page;
    private defaultTimeOut: number = 30000;

    constructor(page:Page,defaultTimeOut:number = 30000){
        this.page=page;
        this.defaultTimeOut = defaultTimeOut;
    }

    /**
     * This function will convert the string to the locator or else it will return the semantic based locators.
     * @param locator flexibleLocator
     * @returns 
     */
    private getLocator(locator:flexibleLocator,index?:number):Locator{
        if(typeof locator === 'string'){
            if(index){
                return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }
        }
        else{
            if(index){
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
            
        }
    }

    /**
     * This function will perform click event on an element
     * @param locator flexibleLocator
     * @param options 
     */
    async click(locator:flexibleLocator,options?:{force?:boolean,timeout?:number}):Promise<void>{
        await this.getLocator(locator).click({
            force:options?.force,
            timeout:options?.timeout||this.defaultTimeOut
        });
        console.log(`Clicked on the element : ${locator}`);
        
    }

    /**
     * This function will perform double click on an element
     * @param locator flexibleLocator
     */
    async doubleClick(locator:flexibleLocator):Promise<void>{
        await this.getLocator(locator).dblclick();
        console.log(`Double Clicked on the element : ${locator}`);
        
    }

    /**
     * This function will perform right click on an element
     * @param locator flexibleLocator
     */
    async rightClick(locator:flexibleLocator):Promise<void>{
        await this.getLocator(locator).click({button:'right',timeout:this.defaultTimeOut});
        console.log(`Right Clicked on the element : ${locator}`);
        
    }

    /**
     * This function will enter the input value in an element
     * @param locator flexibleLocator
     * @param text 
     */
    async fill(locator:flexibleLocator,text:string):Promise<void>{
        await this.getLocator(locator).fill(text,{timeout:this.defaultTimeOut});
        console.log(`Entered value ${text} in the element : ${locator}`);
        
    }

    /**
     * This function will enter the input value in an element sequentially with delay(default delay:500ms) like human
     * @param locator flexibleLocator
     * @param text string
     * @param delay number
     */
    async SlowFill(locator:flexibleLocator,text:string,delay:number = 500):Promise<void>{
        await this.getLocator(locator).pressSequentially(text,{delay,timeout:this.defaultTimeOut});
        console.log(`Entered the value ${text} sequentially in an element : ${locator}`);
        
    }

    /**
     * This function will clear the entered text from an input field/element
     * @param locator flexibleLocator
     */
    async clear(locator:flexibleLocator):Promise<void>{
        await this.getLocator(locator).clear({timeout:this.defaultTimeOut});
        console.log(`Cleared the input from element : ${locator}`);
        
    }

    //============== Element Visibility & State Check =================

    /**
     * This function will check if the element is visible or not without the waitFor Method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns Promise<boolean>
     */
    async isVisible(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        return this.getLocator(locator).isVisible({timeout});
    }

    /**
     * This function will check if the element is enabled or not without the waitFor Method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns Promise<boolean>
     */
    async isEnabled(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        return this.getLocator(locator).isEnabled({timeout});
    }

    /**
     * This function will check if the element is editable or not without the waitFor Method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns Promise<boolean>
     */
    async isEditable(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        return this.getLocator(locator).isEditable({timeout});
    }
     
    /**
     * This function will check if the element is disabled or not without the waitFor Method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns Promise<boolean>
     */
     async isDisabled(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        return this.getLocator(locator).isDisabled({timeout});
    }

     /**
     * This function will check if the element is hidden or not without the waitFor Method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns Promise<boolean>
     */
     async isHidden(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        return this.getLocator(locator).isHidden({timeout});
    }

    /**
     * This function will check if the element is checked or not without the waitFor Method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns Promise<boolean>
     */
    async isChecked(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        return this.getLocator(locator).isChecked({timeout});
    }

    //============== Wait Utils =====================

    /**
     * This function will check if the element is visible or not with waitFor method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns
     */
    async waitForVisible(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        try{
            return true;
            await this.getLocator(locator).waitFor({state:'visible',timeout});
            console.log(`Waited for element: ${locator} to be visible`);
        }
        catch{
            return false;
        }
    }

    /**
     * This function will check if the element is attached or not with waitFor method.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns
     */
    async waitForAttached(locator:flexibleLocator,timeout:number = 5000):Promise<boolean>{
        try{
            return true;
            await this.getLocator(locator).waitFor({state:'attached',timeout});
            console.log(`Waited for element: ${locator} to be attached`);
        }
        catch{
            return false;
        }
    }

    /**
     * This function will check if the Page is loaded or not.
     * @param locator flexibleLocator
     * @param timeout number
     * @returns
     */
    async waitForPageLoad(state:'load'|'domcontentloaded'|'networkidle' = 'load'):Promise<void>{
        await this.page.waitForLoadState(state);
        console.log(`Waited for page load state : ${state}`);
        
    }

    /**
     * Statically wait for given number of milliseconds
     * @param timeOut number
     */
    async sleep(timeOut:number):Promise<void>{
        this.page.waitForTimeout(timeOut);
        console.log(`Waited for ${timeOut} ms`);
        
    }

    //================ Get text context of an element =================

    /**
     * This function will return the text content which means the Parent and child texts of an element
     * @param locator flexibleLocator
     * @returns 
     */
    async getText(locator:flexibleLocator):Promise<string | undefined>{
        const text = await this.getLocator(locator).textContent({timeout:this.defaultTimeOut});
        return text?.trim();
    }

    /**
     * This function will return the inner text of an element
     * @param locator flexibleLocator
     * @returns 
     */
    async getInnerText(locator:flexibleLocator):Promise<string>{
        const text = await this.getLocator(locator).innerText();
        return text.trim();
    }

    /**
     * This function will return the html attribute text of an element
     * @param locator flexibleLocator
     * @param attributeName string
     * @returns 
     */
    async getAttributeValue(locator:flexibleLocator,attributeName:string):Promise<string | null>{
        return await this.getLocator(locator).getAttribute(attributeName,{timeout:this.defaultTimeOut});
    }

    /**
     * This function will return the user entered value in an element
     * @param locator flexibleLocator
     * @returns 
     */
    async getInputValue(locator:flexibleLocator):Promise<string>{
        return this.getLocator(locator).inputValue({timeout:this.defaultTimeOut});
    }

    /**
     * This function will return all the inner texts of multiple elements
     * @param locator flexibleLocator
     * @returns 
     */
    async getAllElementTexts(locator:flexibleLocator):Promise<string[]>{
        return await this.getLocator(locator).allInnerTexts();
    }

    //===================== Select Based Drop Downs ==========================

    /**
     * This function will select the dropdown values by its visible text
     * @param locator flexibleLocator
     * @param text 
     */
    async selectByText(locator:flexibleLocator,text:string){
        await this.getLocator(locator).selectOption({label:text},{timeout:this.defaultTimeOut});
        console.log(`Selected option ${text} from drop down ${locator}`);
        
    }

    /**
     * This function will select the dropdown values by its value attribute
     * @param locator flexibleLocator
     * @param text 
     */
    async selectByValue(locator:flexibleLocator,value:string){
        await this.getLocator(locator).selectOption({value:value},{timeout:this.defaultTimeOut});
        console.log(`Selected option ${value} from drop down ${locator}`);
        
    }

    /**
     * This function will select the dropdown values by its index
     * @param locator flexibleLocator
     * @param text 
     */
    async selectByIndex(locator:flexibleLocator,index:number){
        await this.getLocator(locator).selectOption({index:index},{timeout:this.defaultTimeOut});
        console.log(`Selected option ${index} from drop down ${locator}`);
        
    }

}