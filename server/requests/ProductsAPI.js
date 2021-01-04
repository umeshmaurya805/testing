const Product=require('../model/Products')

const newProduct = async(req, res) => {
    try {
        const { name, image, description, price, category } = req.body;
        const product_info = await new Product({ name, image, description, price, category }).save();
        console.log(product_info)
        if (!product_info) {
            res.json("cannot add")
        }
        else
            res.json("done")
    } catch (error) {
        console.log(error);
    }
}
const updateProduct = async (req, res) => {
    try {
        const { _id, name, image, description, price, category } = req.body;
        const updated_Product = {}
        if (name) updated_Product.name = name;
        if (image) updated_Product.image = image;
        if (description) updated_Product.description = description;
        if (price) updated_Product.price = price;
        if (category) updated_Product.category = category; else updated_Product.category="Services"
        const update_info = await Product.updateOne({ _id }, { $set: updated_Product });
        update_info?res.json("updated"):res.json("not updated")
    } catch (error) {
        console.log(error);
    }
}

const findAllProducts = (async (req, res) => {
    try {
        const products = await Product.find({});
        products ? res.json(products) : res.json("cannot find products");
    } catch (error) {
        console.log(error);
    }   
    
})

module.exports={
    newProduct,findAllProducts,updateProduct
}