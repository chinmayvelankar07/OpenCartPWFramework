import {Page} from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil';
import { productInfo } from '../pages/productInfo';


export class ResultsPage{

    private readonly page:Page;
    private readonly util:ElementUtil;
    private readonly productResults;
    
    
    constructor(page:Page){
        this.page = page;
        this.util = new ElementUtil(page);
        this.productResults = page.locator('.product-thumb');
    }

    async searchResultsCount():Promise<number>{

        await this.productResults.first().waitFor({state:'visible',timeout:5000});
        return await this.productResults.count();
    }

    async selectProduct(productName:string){

        console.log('=====Selected Product is '+productName);
        await this.util.click(this.page.getByRole('link', { name: `${productName}` ,exact:true}));
        return new productInfo(this.page);
        
    }
    

}