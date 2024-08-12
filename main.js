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

const purchaseListActions = {
    calcAmount (list) {
        list.forEach(element => {
            element.amount = element.quantity * element.price;
        });
    },

    findProductIndex (list, productName) {
        return list.findIndex(item => item.productName === productName);
    },

    validateProductName(productName) {
        if (!productName) {
            alert(`You did not enter a product name.`);
            return false;
        }
        return true;
    },

    sortByPurchaseListStatus(list) {
        return list.sort((a, b) => a.bought - b.bought);
    },

    changeOfPurchaseStatus(list, product) {
        if (!this.validateProductName(product)) return;

        let idx = this.findProductIndex(list, product);
    
        if (idx === -1) {
            alert(`There is no such product in the list`);
            return;
        };
        list[idx].bought = true;       
    },

    removeProductFromNewList(list, newList, product) {
        if (!this.validateProductName(product)) return;

        newList = list.slice();
        
        let idx = this.findProductIndex(newList, product);
    
        if (idx === -1) {
            alert(`There is no such product in the list`);
            return
        } 
        newList.splice([idx], 1);
        console.log(newList);
    },

    addProductToPurchaseList (list, addProduct) {
        if (!this.validateProductName(addProduct)) return;

        let idx = this.findProductIndex(list, addProduct);
        
        if (idx === -1) {
            let addQuantity = Number(prompt(`Enter the quantity:`));
            let addBouth = confirm(`Have you already bought this product?`);
            let addPrice = Number(prompt(`What is the price of this product?`));
            list.push(new Product(addProduct, addQuantity, addBouth, addPrice));
        } else {
            list[idx].quantity ++;
        }  

        this.calcAmount(list);
        return list;
    },

    calcTotalAmount(list) {
        let totalAmount = list.reduce((sum, current) => sum + (current.quantity * current.price), 0);
        return totalAmount;
    },

    calcTotalByStatus (list, status) {
        let filteredList = list.filter(({bought}) => bought === status);
        return this.calcTotalAmount(filteredList);
    },

    showSortedListFrom (list, respond = true) {
        return list.sort((a, b) => {
            return respond ? b.amount - a.amount : a.amount - b.amount;
        });
    },
}

purchaseListActions.calcAmount(purchaseList);
console.log(purchaseList);

let sortedListByStatus = purchaseList.slice();
purchaseListActions.sortByPurchaseListStatus(sortedListByStatus);
console.log(sortedListByStatus);

let boughtProduct = prompt(`Enter the purchased product to change the status`);
purchaseListActions.changeOfPurchaseStatus(purchaseList, boughtProduct);

let newPurchaseList;
let removeProduct = prompt(`Enter the product to be removed`);
purchaseListActions.removeProductFromNewList(purchaseList, newPurchaseList, removeProduct);

let addProductToList = prompt(`Enter the product to be added`);
console.log(purchaseListActions.addProductToPurchaseList(purchaseList, addProductToList));

let amountToPayAll = purchaseListActions.calcTotalAmount(purchaseList);
console.log(`Amount to pay for all products: ${amountToPayAll}`);

let totalPurchased = purchaseListActions.calcTotalByStatus(purchaseList, true);
let totalNotPurchased = purchaseListActions.calcTotalByStatus(purchaseList, false);
console.log(`Total amount of purchased products: ${totalPurchased}`);
console.log(`Total amount of unpurchased products: ${totalNotPurchased}`);

let sortByDescending = confirm(`Sort the list from largest to smallest?`);
console.log(purchaseListActions.showSortedListFrom(purchaseList, sortByDescending)); 