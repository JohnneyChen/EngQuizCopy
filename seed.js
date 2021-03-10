const mysql = require('mysql')

const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

const item1 = ['Mini French Baguette', 'https://images.unsplash.com/photo-1568471173242-461f0a730452?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80', 'Salt, Flour', 1.50, 'loaf']
const item2 = ['Bacon & Potato Bun', 'https://images.unsplash.com/photo-1588861472194-6883d8b5e552?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 'Cheddar Cheese, Potato, Mozzarella Cheese, Corn, Bacon, Salt, Sugar, Flour.', 3.80, 'bun']
const item3 = ['Ham & Cheese Danish', 'https://images.unsplash.com/photo-1571870251082-d965ef9e7530?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 'Ham, Cheese, Onions. Sugar, Eggs, Butter, Milk, Flour', 3.80, 'bun']
const item4 = ['Tiramisu Cake', 'https://images.unsplash.com/photo-1542326237-94b1c5a538d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80', 'A traditional Italian cake made with soft mascarpone cream cheese and intense flavours of espresso syrup.', 35.00, 'cake']
const item5 = ['Black Forest Cake', 'https://images.unsplash.com/photo-1518047601542-79f18c655718?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 'Classic chocolate sponge cake, delicious whipped cream with sweet, heavenly cherries in the middle.', 35.00, 'cake']
const item6 = ['Red Velvet Cake', 'https://images.unsplash.com/photo-1543287920-26349b5b1376?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 'This popular dessert has layers of rich cream cheese frosting and dense sheets of red velvet cake.', 35.99, 'cake']
const value = [item1, item2, item3, item4, item5, item6]

connection.connect();
const query = 'INSERT INTO products (name,image_url,description,cost,type) VALUES ?'
connection.query(query, [value], (error, result) => {
    if (error) throw error
    console.log('successfully seeded')
})