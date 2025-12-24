
import {test,expect} from '../fixtures/baseFixture';
import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';

let searchData = [
    {searchKey:'macbook',resultsCount:3},
    {searchKey:'samsung',resultsCount:2},
];

for(let data of searchData){

    test(`Verify Product Search for ${data.searchKey}`,async({homePage})=>{

    
        let resultsPage = await homePage.searchProduct(data.searchKey);
        expect (await resultsPage.searchResultsCount()).toBe(data.resultsCount)
    
    });
}
