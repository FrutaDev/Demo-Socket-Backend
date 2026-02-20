const Product = require("../../../models/products");

exports.seedProducts = async () => {
    try {

        const products = []

        for (let i = 0; i < 50000; i++) {
            products.push({
                name: `Product ${i}`,
                price: i + 500,
                stock: i + 100
            })
        }

        await Product.bulkCreate(products);
    } catch (error) {
        console.error(error);
    }
};