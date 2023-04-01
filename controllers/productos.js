const { matchedData } = require("express-validator");
const { productosModel, variantesModel } = require("../models/index.js");
const { handleHttpError } = require("../utils/handleError.js");
const XLSX = require("xlsx");

const getItems = async (req, res) => {
    try {
        const { page, limit, categoria, titulo, precio } = req.query;
        const data = await productosModel.findAllData(
            page,
            limit,
            categoria,
            titulo,
            precio
        );
        res.send({ data });
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR GET PRODUCTOS", err, 500);
    }
};
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await productosModel.findOneData(id);
        res.send({ data });
    } catch (err) {
        handleHttpError(res, "ERROR GET PRODUCTO", err, 500);
    }
};
const createItems = async (req, res) => {
    try {
        const { title, categoryId } = matchedData(req);
        const { description, variants } = req.body;
        const body = { title, description, categoryId, variants };
        const data = await productosModel.create(body);
        res.send({ data });
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR CREATE PRODUCTO", err, 500);
    }
};
const updateItems = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, categoryId, variants } = req.body;
        body = { title, description, categoryId, variants };
        const data = await productosModel.findOneAndUpdate({ _id: id }, body, {
            new: true,
            upsert: false,
        });
        res.send({ data });
    } catch (err) {
        handleHttpError(res, "ERROR UPDATE PRODUCTOS", err, 500);
    }
};
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await productosModel.findByIdAndDelete(id);
        const variantStrings = data.variants.map((variant) =>
            variant.toString()
        );
        for (let i = 0; i < variantStrings.length; i++) {
            await variantesModel.deleteOne({_id: variantStrings[i]})
        }
        res.send({ data });
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR DELETE PRODUCTOS", err, 500);
    }
};

const updateItemsExcel = async (req, res) => {
    try {
        //recupero la categoria de la url y el array de productos del body
        const { categoria } = req.query;
        const { productos } = req.body;
        let arrayProductos = [];
        //Por cada producto, lo busco en la base de datos filtrando por titulo y categoria
        productos.forEach(async (producto) => {
            const data = await productosModel.findExcelData(
                producto.title,
                categoria
            );
            console.log(producto.title);
            //por cada variante del producto, busco sus datos con su _id y actualizo su precio
            data.variants.forEach((variante, index) => {
                console.log(producto.price[index]);
                //variantesModel.findByIdAndUpdate({_id: variante._id}, producto.price[index], {new: true, upsert: false})
            });
        });
        //console.log({arrayProductos})
        //res.send({data})
        res.send("hola");
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR ACTUALIZAR PRODUCTOS EXCEL", err, 500);
    }
};

const getExcel = async (req, res) => {
    try {
        let { categoria } = req.query;
        const data = await productosModel.findAllData(
            null,
            null,
            categoria,
            null,
            null
        );
        console.log(data);
        let arrayData = [];
        let jsonData = {};
        data.forEach((producto) => {
            categoria = producto.categoryId.name;
            jsonData.NOMBRE = producto.title;
            let preciosVariante = "";
            producto.variants.forEach((variante, index) => {
                let precio = variante.price;
                /* if(variante.price == null)
                    { precio = 0 } */
                if (index == 0) {
                    preciosVariante = `${precio}`;
                } else {
                    preciosVariante = preciosVariante + "-" + `${precio}`;
                }
            });
            jsonData.PRECIO = preciosVariante;
            arrayData.push(jsonData);
            jsonData = {};
        });
        console.log({ arrayData });
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(arrayData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "buffer",
        });

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=precios${categoria}.xlsx`
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Length", excelBuffer.length);

        res.send(excelBuffer);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR ACTUALIZAR PRODUCTOS EXCEL", err, 500);
    }
};

module.exports = {
    getItems,
    getItem,
    updateItems,
    createItems,
    deleteItems,
    getExcel,
};
