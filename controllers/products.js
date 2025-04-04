const Products =require('../models/product');

exports.getAddProduct= (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'));\
    res.render('add-product',{
        pageTitle: 'Add Product',
        path:'/admin/add-product',
        activeShop: true,
        productCSS: true,
        activeAddProduct:true,
        layout: false
    })
};

exports.postAddProduct =(req,res,next)=> {
    const product= new Products(req.body.title);
    product.save();
    res.redirect('/');

};

exports.getProducts = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    Products.fetchAll((products)=>{
        //Template engine to load template
        res.render("shop",{
            prods:products,
            pageTitle:'Shop',
            path:'/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
    
};

