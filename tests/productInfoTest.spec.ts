import {test,expect} from '../fixtures/baseFixture';
import {productInfo} from '../pages/productInfo';
import { ResultsPage } from '../pages/ResultsPage';


const search = [
    {searchKey:'macbook',productName:'MacBook',header:'MacBook',imagecount:5,Brand:'Apple',ProductCode:'Product 16',RewardPoints:'600',Availability:'In Stock',ProductPrice:'$602.00',ExTaxPrice:'$500.00'},
    {searchKey:'macbook',productName:'MacBook Pro',header:'MacBook Pro',imagecount:4,Brand:'Apple',ProductCode:'Product 18',RewardPoints:'800',Availability:'Out Of Stock',ProductPrice:'$2,000.00',ExTaxPrice:'$2,000.00'},
    {searchKey:'samsung',productName:'Samsung Galaxy Tab 10.1',header:'Samsung Galaxy Tab 10.1',imagecount:7,ProductCode:'SAM1',RewardPoints:'1000',Availability:'Pre-Order',ProductPrice:'$241.99',ExTaxPrice:'$199.99'},
];

for(const searchdata of search){

    test.skip(`Verify Product Header for ${searchdata.productName}`,async({homePage})=>{

    
        const resultsPage:ResultsPage = await homePage.searchProduct(searchdata.searchKey);
        const productInfo:productInfo = await resultsPage.selectProduct(searchdata.productName);
        expect(await productInfo.verifyProductHeader()).toBe(searchdata.header);
    
    });
}    

for(const searchdata of search){

    test.skip(`Verify the Product Images count for ${searchdata.productName}`, async({homePage})=>{

        const resultsPage:ResultsPage = await homePage.searchProduct(searchdata.searchKey);
        const productInfo:productInfo = await resultsPage.selectProduct(searchdata.productName);
        expect(await productInfo.verifyImageCount()).toBe(searchdata.imagecount);

    });

}
    
for(const searchdata of search){

    test(`Verify the Product MetaData for ${searchdata.productName}`, async({homePage})=>{

        const resultsPage:ResultsPage = await homePage.searchProduct(searchdata.searchKey);
        const productInfo:productInfo = await resultsPage.selectProduct(searchdata.productName);
        
        const actualFullProductDetails = await productInfo.getProductDetails();

        expect.soft(actualFullProductDetails.get('Header')).toBe(searchdata.header);
        expect.soft(actualFullProductDetails.get('Product Image Count')).toBe(searchdata.imagecount);
        expect.soft(actualFullProductDetails.get('Brand')).toBe(searchdata.Brand);
        expect.soft(actualFullProductDetails.get('Product Code')).toBe(searchdata.ProductCode);
        expect.soft(actualFullProductDetails.get('Reward Points')).toBe(searchdata.RewardPoints);
        expect.soft(actualFullProductDetails.get('Availability')).toBe(searchdata.Availability);
       
    });

}

for(const searchdata of search){

    test(`Verify the Product Pricing for ${searchdata.productName}`, async({homePage})=>{

        const resultsPage:ResultsPage = await homePage.searchProduct(searchdata.searchKey);
        const productInfo:productInfo = await resultsPage.selectProduct(searchdata.productName);
        
        const actualFullProductDetails = await productInfo.getProductDetails();

        expect.soft(actualFullProductDetails.get('Header')).toBe(searchdata.header);
        expect.soft(actualFullProductDetails.get('ProductPrice')).toBe(searchdata.ProductPrice);
        expect.soft(actualFullProductDetails.get('ExTaxPrice')).toBe(searchdata.ExTaxPrice);
       
    });

}