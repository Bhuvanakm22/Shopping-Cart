const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product]) => {
    res.render("shop/product-detail", {
      product: product[0],
      pageTitle: product.title,
      path: "/product",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  // Cart.getCart(cart=>{
  //  });
  Cart.getCart()
    .then(([carts, fieldData]) => {
      //  const cartProducts=[];
      // for(product of products){
      //   const cartProductData=cart.products.find(prod=>prod.id===product.id)
      //   if(cartProductData){
      //     cartProducts.push({productData: product, qty:cartProductData.qty})
      //   }
      // }
      // cartProducts=products.filter();
      let total=0;
      for(pro of carts){
        total+= ((+pro.price) * (+pro.qty))
      }
      // products.for(pro=>{
        
      // })
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: carts,
        subtotal:total,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCard = (req, res, next) => {
  const prodId = req.body.productId;
  let reqStatus = req.body.btnsubmit;

  //   Product.fetchAll()
  //   .then(([products,fieldData])=>{
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err=>{ console.log(err) });
  // };
  // Product.findById(prodId)
  // .then([[product],fld]=>{

    if(reqStatus===undefined){
      reqStatus="+";
    }
  Cart.getCart()
    .then(([Carts, fieldData]) => {
      let qty = 1;
      const cartItem = Carts.find((p) => p.id === +prodId);
      if (cartItem) {
        if (reqStatus === "-" && +cartItem.qty === 1) {
          Cart.deleteProduct(prodId).then(r=>{
            res.redirect("/cart");
          });
        } else {
          if (reqStatus === "+") {
            qty = +cartItem.qty + 1;
          } else qty = +cartItem.qty - 1;

          Cart.addProductToCart(prodId, qty).then((result) => {
            res.redirect("/cart");
          });
        }
        //(+product.price) + qty;
      }
      else{
        Cart.addProductToCart(prodId, qty).then((result) => {
          res.redirect("/cart");
        });
      }
    })
    // })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(prodId,product=>{
  Cart.deleteProduct(prodId);
  res.redirect("/cart");
  // });
};

exports.getOrders = (req, res, next) => {
  Cart.getCart()
  .then(([carts, fieldData]) => {
    let total=0;
    for(pro of carts){
      total+= ((+pro.price) * (+pro.qty))
    }
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      products:carts,
      total:total,
    });
  });

};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
