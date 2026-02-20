const Product = require("../../models/products");
const { getIO } = require("../../src/socket/socket");

exports.getProducts = async (req, res) => {
    console.log("Entrando a get Products");
    const { page = 1, limit = 50 } = req.query;
    const io = getIO();

    const parsedLimit = Math.min(parseInt(limit), 50);
    const parsedPage = Math.max(parseInt(page), 1);
    const offset = (parsedPage - 1) * parsedLimit;

    console.log(parsedLimit, parsedPage, offset);

    try {
        const { rows, count } = await Product.findAndCountAll({
            limit: parsedLimit,
            offset: offset,
            order: [["id", "DESC"]]
        });
        res.status(200).json({
            products: rows,
            total: count,
            page: parsedPage,
            limit: parsedLimit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al obtener los productos",
        });
    }
};

exports.createProduct = async (req, res) => {
    console.log("Entrando a create Product");
    const { name, price, stock } = req.body;
    // const io = getIO();

    try {
        const product = await Product.create({ name, price, stock });
        // io.emit("product:created", product);
        res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al crear el producto",
        });
    }
};

exports.updateProduct = async (req, res) => {
    console.log("Entrando a update Product");
    const { id } = req.params;
    const { name, price, stock } = req.body;
    // const io = getIO();

    try {
        const product = await Product.update({ name, price, stock }, { where: { id } });
        // io.emit("product:updated", product);
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al actualizar el producto",
        });
    }
};

exports.deleteProduct = async (req, res) => {
    console.log("Entrando a delete Product");
    const { id } = req.params;
    // const io = getIO();

    try {
        const product = await Product.destroy({ where: { id } });
        // io.emit("product:deleted", product);
        res.status(200).json({
            ok: true,
            code: "PRODUCT_DELETED",
            message: "Producto eliminado correctamente",
            id: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al eliminar el producto",
        });
    }
};
