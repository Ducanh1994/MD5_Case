"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const adminAuth_1 = require("../middleware/adminAuth");
const adminController_1 = __importDefault(require("../controller/adminController"));
const productRouter = (0, express_1.Router)();
productRouter.use(auth_1.auth);
productRouter.get('/alluser', adminAuth_1.adminAuth, adminController_1.default.showAllAcount);
productRouter.put('/rerole', adminAuth_1.adminAuth, adminController_1.default.reRole);
exports.default = productRouter;
//# sourceMappingURL=adminRouter.js.map