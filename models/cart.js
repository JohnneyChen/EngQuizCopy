module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalCost = oldCart.totalCost || 0;
    this.add = function (item, itemId, qty) {
        const cartItem = this.items[itemId]
        if (!cartItem) {
            this.items[itemId] = { item: item, qty: 0, cost: 0 }
        }
        this.items[itemId].qty += qty;
        this.items[itemId].cost += item.cost * qty;
        this.items[itemId].cost = Math.round(this.items[itemId].cost * 100 + Number.EPSILON) / 100;
        this.totalQty += qty;
        this.totalCost += qty * item.cost;
        this.totalCost = Math.round(this.totalCost * 100 + Number.EPSILON) / 100;
    }
    this.change = function (itemId, newQty) {
        const diff = newQty - this.items[itemId].qty;
        this.items[itemId].qty = newQty;
        this.items[itemId].cost += diff * this.items[itemId].item.cost;
        this.items[itemId].cost = Math.round(this.items[itemId].cost * 100 + Number.EPSILON) / 100;
        this.totalQty += diff;
        this.totalCost += diff * this.items[itemId].item.cost;
        this.totalCost = Math.round(this.totalCost * 100 + Number.EPSILON) / 100;
        if (this.items[itemId].qty <= 0) {
            delete this.items[itemId];
        }

    }
    this.clear = function (itemId) {
        this.totalQty -= this.items[itemId].qty;
        this.totalCost -= this.items[itemId].qty * this.items[itemId].item.cost
        this.totalCost = Math.round(this.totalCost * 100 + Number.EPSILON) / 100;
        delete this.items[itemId];
    }
    this.array = function () {
        let array = [];
        for (let itemId in this.items) {
            array.push(this.items[itemId]);
        }
        return array;
    }
}