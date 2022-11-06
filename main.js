var errorMessage = "";
var pass = true; //true: the inputs are valid. false: inputs are invalid.
// submit the form
function submitForm()
{
    errorMessage = "";
    pass = true;

    //Get the form data
    let useName = document.getElementById("useName").value.trim();
    let useEmail = document.getElementById("useEmail").value.trim();
    let cardNum = document.getElementById("ccn").value;
    let cardMonth = document.getElementById("month").value;
    let cardYear = document.getElementById("year").value;
    let waterNum = document.getElementById("water").value;
    let lollipopNum = document.getElementById("lollipop").value;
    let cakeNum = document.getElementById("cake").value;
    let shirtNum = document.getElementById("shirt").value;
    let chocolateNum = document.getElementById("chocolate").value;

    // validte the user personal information
    validateUserInfo(useName, useEmail, cardNum, cardMonth,cardYear); 
    //validate the quantity of purchased
    validateBuyItem(waterNum, lollipopNum, cakeNum, shirtNum, chocolateNum); 
    
    document.getElementById("errorMes").innerHTML = errorMessage;
    document.getElementById("errorMes").style.color = "red";

    if(pass == true){
            let url = "receipt.html?useName=" + useName + "&useEmail=" + useEmail + "&cardNum=" + cardNum
        + "&cardMonth=" + cardMonth + "&cardYear=" + cardYear + "&Water=" + waterNum
        + "&Lollipop=" + lollipopNum + "&Cake=" + cakeNum + "&Shirt=" + shirtNum 
        + "&Chocolate=" + chocolateNum;
        window.open(url);
    }
    return pass;
}

//Validate the User Personal Information
function validateUserInfo(useName, useEmail, cardNum, cardMonth,cardYear){

    // Regular Expressions for User Information
    let regCardNum = /^(\d{4})\-(\d{4})\-(\d{4})\-(\d{4})$/; // Regular Expression for Credit Card Number
    let regCardMonth = /^JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC$/; //Regular Expression for Credit Card Month
    let regCardYear = /^(202[2-9]|20[3-9][0-9])$/; //Regular Expression for Credit Card Year

    //user name is mandatory
    if(useName == ""){
        errorMessage += `Please Enter the Name.</br>`;
        pass = false;
    }
    //user email is mandatory 
    if(useEmail == ""){
        errorMessage += `Please Enter the Email.</br>`;
        pass = false;
    }

    //Validate the Credit Card Number
    if(cardNum!= "" && !regCardNum.test(cardNum)){
        errorMessage += `The input credit card number is invalid.</br>`;
        pass = false;
    }
    //Validate the Credit Card Expiry Month
    if(cardMonth!= "" && !regCardMonth.test(cardMonth)){
        errorMessage += `The input credit card expire month is invalid.</br>`;
        pass = false;
    }
    //Validate the Credit Card Expiry Year
    if(cardYear!= "" && !regCardYear.test(cardYear)){
        errorMessage += `The input credit card expire year is invalid.</br>`;
        pass = false;
    }
}

//validate the quantity of purchased
function validateBuyItem(waterNum, lollipopNum, cakeNum, shirtNum, chocolateNum){
    
    let regPositive = /^[1-9]\d*$/; //Regular expression for positive number

    //Check at least one item should be bought
    if(waterNum == "" && lollipopNum == "" && cakeNum == "" && shirtNum == "" && chocolateNum == ""){
        errorMessage += `At least one item should be bought.</br>`;
        pass = false;
    }
    //The quantity of water bottles should be a number 
    if(waterNum != "" && !regPositive.test(waterNum)){
        errorMessage += `Please input a positive number for waters you want to buy.</br>`;
        pass = false;
    }
    //The quantity of lollipops should be a number 
    if(lollipopNum != "" && !regPositive.test(lollipopNum)){
        errorMessage += `Please input a positive number for lollipops you want to buy.</br>`;
        pass = false;
    }
    //The quantity of cakes should be a number 
    if(cakeNum != "" && !regPositive.test(cakeNum)){
        errorMessage += `Please input a positive number for cakes you want to buy.</br>`;
        pass = false;
    }
    //The quantity of shirts should be a number 
    if(shirtNum != "" && !regPositive.test(shirtNum)){
        errorMessage += `Please input a positive number for shirts you want to buy.</br>`;
        pass = false;
    }
    //The quantity of chocolate bars should be a number 
    if(chocolateNum != "" && !regPositive.test(chocolateNum)){
        errorMessage += `Please input a positive number for chocolates you want to buy.</br>`;
        pass = false;
    }
}
var itemsPrice = 0;
var tableCode1 = ``;
var tableCode2 = `<tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th></tr>`;
var contentArray = new Array(10); //contentArray is a 10 * 3 metrix, save all the input data
for(i=0; i< contentArray.length; i++){
    contentArray[i] = new Array(3);
}
function load(){
    var queryString = decodeURIComponent(window.location.search); //get the data of URL
    queryString = queryString.substring(1); //get the data after ?
    var queries = queryString.split("&"); //queries is an array that save all the data transfered from the index page
    for (var i = 0; i < queries.length; i++)
    {
        contentArray[i] = queries[i].split("=");
    }
    display();
}
function display(){
    var tbody1 = document.getElementById("tb1");
    var tbody2 = document.getElementById("tb2");
    //display the customer information in table 1
    for(i=0; i<3; i++){
        addFirstTableRow(contentArray[i][0], contentArray[i][1]);
    }
    tbody1.innerHTML = tableCode1;

    //save the items price in contentArray
    contentArray[5][2] = "3";
    contentArray[6][2] = "1";
    contentArray[7][2] = "2";
    contentArray[8][2] = "10";
    contentArray[9][2] = "5";

    //display the buying items in table 2
    for(i=5; i<contentArray.length; i++){
        if(!contentArray[i][1] == "")
        addSecondTableRow(contentArray[i][0], contentArray[i][1], contentArray[i][2]);
    }
    //display the donation and total
    let donation = itemsPrice / 10 > 10 ? itemsPrice/10 : 10;
    tableCode2 += `<tr><td>Donation</td><td colspan="2">Minimum</td><td>$${donation.toFixed(2)}</td></tr>`;
    tableCode2 += `<tr><th colspan="3">Total</td><td>$${(donation + itemsPrice).toFixed(2)}</td></tr>`;
    tbody2.innerHTML = tableCode2;
}

//add the customer information in table 1
function addFirstTableRow(item, count)
{
    if(item == "cardNum" && count != ""){
        count = "xxxx-xxxx-xxxx-" + count.substring(count.length-4);
    }
    tableCode1 += `<tr><th>${item}</th><td>${count}</td></tr>`; 
}

//add the buying items details in table 2
function addSecondTableRow(item, count, price)
{
    price = parseFloat(price);
    itemsPrice += count * price;
    tableCode2 += `<tr><td>${item}</td><td>${count}</td><td>$${price.toFixed(2)}</td><td>$${(count * price).toFixed(2)}</td></tr>`; 
}