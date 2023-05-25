"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
const product_category_1 = require("../model/product-category");
class CategoryService {
    constructor() {
        this.getAll = async () => {
            let categories = await this.categoryRepository.find();
            if (!categories) {
                return 'Can not get categories';
            }
            return categories;
        };
        this.save = async (productCategory) => {
            let pc = this.product_categoryRepository.save(productCategory);
            if (!pc) {
                return 'Can not save product-category';
            }
            return 'Saved product-category';
        };
        this.saveCategory = async (category) => {
            return this.categoryRepository.save(category);
        };
        this.remove = async (idProduct) => {
            let pc = await this.product_categoryRepository.findOneBy({ idProduct: idProduct });
            if (!pc) {
                return "Can not remove product-category";
            }
            this.product_categoryRepository.delete({ idProduct: idProduct });
            return "Removed product-category";
        };
        this.update = async (value) => {
            let pc1 = await this.product_categoryRepository.findOneBy({ idProduct: value.idProduct });
            if (!pc1) {
                return "Can not find by id product-category";
            }
            let pc2 = this.product_categoryRepository.update({ id: pc1.id }, value);
            if (!pc2) {
                return "Can not update product-category";
            }
            return 'Updated product-category';
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
        this.product_categoryRepository = data_source_1.AppDataSource.getRepository(product_category_1.ProductCategory);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=CategoryService.js.map