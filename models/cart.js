const fs = require("node:fs");
const path = require("node:path");
const db=require('../util/database');

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static addProductToCart(id, productPrice) {
      Cart.deleteProduct(id);
      return db.execute('INSERT INTO cart (id,qty) values (?,?)',
        [id,productPrice]
       )    
    // fs.readFile(p, (err, fileContent) => {
    //   let cart = { products: [], totalPrice: 0 };
    //   if (!err) {
    //     cart = JSON.parse(fileContent);
    //   }

    //   if (cart.products) {
    //     const existingProductIndex = cart.products.findIndex(
    //       (product) => product.id === id
    //     );
    //     const existingProduct = cart.products[existingProductIndex];
    //     let updateProduct;
    //     if (existingProduct) {
    //       updateProduct = { ...existingProduct };
    //       updateProduct.qty = +updateProduct.qty + 1;
    //       cart.products[existingProductIndex] = updateProduct;
    //     } else {
    //       updateProduct = { id: id, qty: 1 };
    //       cart.products = [...cart.products, updateProduct];
    //     }
    //   } else {
    //     cart.products = [{ id: id, qty: 1 }];
    //   }

    //   cart.totalPrice = cart.totalPrice + (+productPrice);

    //   fs.writeFile(p, JSON.stringify(cart), (err) => {
    //     console.log(err);
    //   });
    // });
  }

  static deleteProduct(id) {
   return db.execute('delete from cart where id=?',
      [id]
     )
    // fs.readFile(p, (err, fileContent) => {
    //   let cart = { products: [], totalPrice: 0 };
    //   if (err) {
    //     return;
    //   }

    //   cart = JSON.parse(fileContent);
    //   const updatedCart= {...cart};   
    //  const product= updatedCart.products.find(p=>p.id===id);
    //  if(product){
    //  const productQty= product.qty;
    //  updatedCart.totalPrice = updatedCart.totalPrice - (productQty * productPrice);
    //  updatedCart.products=updatedCart.products.filter(p=>p.id!==id);
    //  fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
    //     console.log(err);
    //  });
    // }
    // });
    
}

static getCart(){
// fs.readFile(p,(err,fileContent)=>{
//     const cart=JSON.parse(fileContent);
//     if(err){
//         cb(null);
//     }
//     else{
//         cb(cart);
//     }
// });
return db.execute('SELECT p.id,p.title,c.qty,p.price FROM products p inner join cart c on p.id=c.id;');
}

};
