import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil';

export class productInfo{

    private readonly page:Page;
    private readonly util:ElementUtil;
    private readonly header:Locator;
    private readonly imageCount:Locator;
    private readonly productMetaData:Locator;
    private readonly productPriceData:Locator;

    private readonly productMap = new Map<string,string|null|number>;

    constructor(page:Page){

        this.page = page;
        this.util = new ElementUtil(page);
        this.header = page.locator('h1');
        this.imageCount = page.locator(`div#content img`);
        this.productMetaData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[position()=1]/li`);
        this.productPriceData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[position()=2]/li`);
    }

    async verifyImageCount():Promise<number>{
        await this.imageCount.first().waitFor({state:'visible',timeout:5000});
        const imgCount = await this.imageCount.count();
        return imgCount;
    }

    async verifyProductHeader():Promise<string>{
        const header = await this.util.getInnerText(this.header);
        return header;
    }

    private async getProductMetaData(){
        let productMetaData:string[] = await this.productMetaData.allInnerTexts();

        for (let meta of productMetaData){

            let metaData:string[] = meta.split(':');
            let metaKey = metaData[0].trim();
            let metaValue = metaData[1].trim();
            this.productMap.set(metaKey,metaValue);
        }

    }

    private async getProductPriceData(){
        let productPriceData:string[] = await this.productPriceData.allInnerTexts();
        let productPrice = productPriceData[0].trim();
        let productExtPrice = productPriceData[1].split(':')[1].trim();
        
        this.productMap.set('ProductPrice',productPrice);
        this.productMap.set('ExTaxPrice',productExtPrice);

    }

    /**
     * 
     * @returns This function will return the Product Map containing all the product information
     */
    async getProductDetails():Promise<Map<string,string|null|number>>{
        this.productMap.set('Header',await this.verifyProductHeader());
        this.productMap.set('Product Image Count',await this.verifyImageCount());
        await this.getProductMetaData();
        await this.getProductPriceData();

        console.log(`Full Product details for the ${this.verifyProductHeader}`);
        await this.printProductDetails();
        return this.productMap;
        
    }

    private async printProductDetails(){
        for (const [key,value] of this.productMap)
        {
            console.log(key,value);
            
        }
    }

}
