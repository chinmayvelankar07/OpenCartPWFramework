
import {test,expect} from '../fixtures/baseFixture';

const searchData = [
    {searchKey:'macbook',resultsCount:3},
    {searchKey:'samsung',resultsCount:2},
];

for(const data of searchData){

    test(`Verify Product Search for ${data.searchKey}`,async({homePage})=>{

    
        const resultsPage = await homePage.searchProduct(data.searchKey);
        expect (await resultsPage.searchResultsCount()).toBe(data.resultsCount);
    
    });
}
