declare class CategoryService {
    private categoryRepository;
    private product_categoryRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (productCategory: any) => Promise<"Can not save product-category" | "Saved product-category">;
    saveCategory: (category: any) => Promise<any>;
    remove: (idProduct: any) => Promise<"Can not remove product-category" | "Removed product-category">;
    update: (value: any) => Promise<"Can not find by id product-category" | "Can not update product-category" | "Updated product-category">;
}
declare const _default: CategoryService;
export default _default;
