'use strict';
class Product {
    constructor(productName, quantity, bought, price) {
        this.productName = productName,
        this.quantity = quantity,
        this.bought = bought,
        this.price = price
    }
};

const purchaseList = [
    new Product('canvas', 3, false, 90,),
    new Product('acrylicPaint', 15, false, 70,),
    new Product('brush', 3, false, 15,),
    new Product('easel', 1, true, 350,),
    new Product('sponge', 1, false, 14,),
    new Product('acrylicVarnish', 1, true, 125,),
];

class PurchaseListActions {
    constructor(purchaseList) {
        this.purchaseList = purchaseList;
    }

    calcAmount() {
        this.purchaseList.forEach(element => {
            element.amount = element.quantity * element.price;
        });
        return this.purchaseList;
    }

    findProductIndex (productName) {
        return this.purchaseList.findIndex(item => item.productName === productName);
    }

    validateProductName(productName) {
        if (!productName) {
            alert(`You did not enter a product name.`);
            return false;
        }
        return true;
    }

    sortByPurchaseListStatus() {
        return this.purchaseList.sort((a, b) => a.bought - b.bought);
    }

    changeOfPurchaseStatus(product) {
        if (!this.validateProductName(product)) return;

        let idx = this.findProductIndex(product);
    
        if (idx === -1) {
            alert(`There is no such product in the list`);
            return;
        };
        this.purchaseList[idx].bought = true;       
    }

    removeProductFromNewList(newList, product) {
        if (!this.validateProductName(product)) return;

        newList = this.purchaseList.slice();
        
        let idx = this.findProductIndex(product);
    
        if (idx === -1) {
            alert(`There is no such product in the list`);
            return
        } 
        newList.splice([idx], 1);
        console.log(newList);
    }

    addProductToPurchaseList (addProduct) {
        if (!this.validateProductName(addProduct)) return;

        let idx = this.findProductIndex(this.purchaseList, addProduct);
        
        if (idx === -1) {
            let addQuantity = Number(prompt(`Enter the quantity:`));
            let addBouth = confirm(`Have you already bought this product?`);
            let addPrice = Number(prompt(`What is the price of this product?`));
            this.purchaseList.push(new Product(addProduct, addQuantity, addBouth, addPrice));
        } else {
            this.purchaseList[idx].quantity ++;
        }  

        this.calcAmount(this.purchaseList);
        return this.purchaseList;
    }

    calcTotalAmount(list = this.purchaseList) {
        let totalAmount = list.reduce((sum, current) => sum + (current.quantity * current.price), 0);
        return totalAmount;
    }

    calcTotalByStatus (status) {
        let filteredList = this.purchaseList.filter(({bought}) => bought === status);
        return this.calcTotalAmount(filteredList);
    }

    showSortedListFrom (respond = true) {
        return this.purchaseList.sort((a, b) => {
            return respond ? b.amount - a.amount : a.amount - b.amount;
        });
    }
}

const mainListActions = new PurchaseListActions(purchaseList);
console.log(mainListActions.calcAmount());

let sortedListByStatus = new PurchaseListActions(purchaseList.slice());
console.log(sortedListByStatus.sortByPurchaseListStatus());

let boughtProduct = prompt(`Enter the purchased product to change the status`);
mainListActions.changeOfPurchaseStatus(boughtProduct);

let newPurchaseList;
let removeProduct = prompt(`Enter the product to be removed`);
mainListActions.removeProductFromNewList(newPurchaseList, removeProduct);

let addProductToList = prompt(`Enter the product to be added`);
console.log(mainListActions.addProductToPurchaseList(addProductToList));

let amountToPayAll = mainListActions.calcTotalAmount();
console.log(`Amount to pay for all products: ${amountToPayAll}`);

let totalPurchased = mainListActions.calcTotalByStatus(true);
let totalNotPurchased = mainListActions.calcTotalByStatus(false);
console.log(`Total amount of purchased products: ${totalPurchased}`);
console.log(`Total amount of unpurchased products: ${totalNotPurchased}`);

let sortByDescending = confirm(`Sort the list from largest to smallest?`);
console.log(mainListActions.showSortedListFrom(sortByDescending)); 