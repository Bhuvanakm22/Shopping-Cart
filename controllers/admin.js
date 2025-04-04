const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save()
  .then(()=>{
    res.redirect('/')
  })
  .catch(err=> console.log(err));
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode= req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  const prodId=req.params.productId;
  Product.findById(prodId).then(([[product],filedata])=>{
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })

};

exports.postEditProduct=(req,res,next)=>{
  const updatedProductId=req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    updatedProductId,
    updatedTitle, 
    updatedImageUrl, 
    updatedDescription, 
    updatedPrice);
  updatedProduct. updateProduct().then(result=>{
    res.redirect('/admin/products');
  });
  
};

exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.deleteById(prodId).then(result=>{
    res.redirect('/admin/products');
  });  
  
}

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
   Product.fetchAll()
  .then(([products,fieldData])=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>{ console.log(err) });
};
