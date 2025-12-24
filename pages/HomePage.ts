import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil';
import {ResultsPage} from '../pages/ResultsPage';

export class HomePage{

    private readonly page:Page;
    private readonly heading:Locator;
    private readonly util:ElementUtil;
    private readonly logoutLink:Locator;
    private readonly searchKey:Locator;
    private readonly searchBtn:Locator;

    constructor(page:Page){
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'My Account', level: 2 });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.searchKey = page.getByRole('textbox', { name: 'Search' });
        this.searchBtn = page.locator('.btn.btn-default.btn-lg');
        this.util = new ElementUtil(page);
    }



    async verifyHeading():Promise<boolean>{

        return this.util.isVisible(this.heading);

    }

    async verifyLogoutLink():Promise<boolean>{

        return this.util.isVisible(this.logoutLink,1);

    }

    async searchProduct(productName:string):Promise<ResultsPage>{

        this.util.fill(this.searchKey,productName);
        this.util.click(this.searchBtn);
        return new ResultsPage(this.page);

    }







}