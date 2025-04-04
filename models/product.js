const fs = require('node:fs');
const path = require('node:path');

const db=require('../util/database');
const Cart=require('./cart');


module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
  return db.execute('INSERT INTO products (title,price,imageUrl,description) values (?,?,?,?)',
    [    this.title,this.price, this.imageUrl ,this.description,
         ]
   )
  }
  updateProduct(){
    return db.execute('update nodecomplete.products set title=?,price=?,description=?,imageURL=? where id=?',
      [    this.title,this.price,this.description, this.imageUrl ,this.id
      ]
    );
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static findById(id){
   return db.execute('SELECT * from products where id=?',[id] );
  }
static deleteById(id){
  console.log(id)
  return db.execute('Delete from products where id=?',[id])
  .then(result=>{
    Cart.deleteProduct(id);
  });
    // getProductsFromFile(products => {
    //     const product=products.find(p=> p.id===id);
    //     const updatedProduct=product
    //     const updatedProducts=  products.filter(p=> p.id!==id);
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //         console.log(err);
    //         if(!err){
    //             Cart.deleteProduct(id,product.price);
    //         }
    //       });
    //   });
}


};
