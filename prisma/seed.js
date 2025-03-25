"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var companyNames, _i, companyNames_1, name_1, companies, categoryNames, _a, categoryNames_1, name_2, categories, productCatalog, _b, companies_1, company, _c, productCatalog_1, item, product, _loop_1, _d, _e, catName;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    companyNames = ['Carrefour', 'Leclerc', 'Intermarché'];
                    _i = 0, companyNames_1 = companyNames;
                    _f.label = 1;
                case 1:
                    if (!(_i < companyNames_1.length)) return [3 /*break*/, 4];
                    name_1 = companyNames_1[_i];
                    return [4 /*yield*/, prisma.company.create({ data: { name: name_1 } })];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, prisma.company.findMany()];
                case 5:
                    companies = _f.sent();
                    categoryNames = [
                        'Informatique',
                        'Bureautique',
                        'Électroménager',
                        'Multimédia',
                        'Téléphonie',
                    ];
                    _a = 0, categoryNames_1 = categoryNames;
                    _f.label = 6;
                case 6:
                    if (!(_a < categoryNames_1.length)) return [3 /*break*/, 9];
                    name_2 = categoryNames_1[_a];
                    return [4 /*yield*/, prisma.category.create({ data: { name: name_2 } })];
                case 7:
                    _f.sent();
                    _f.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9: return [4 /*yield*/, prisma.category.findMany()];
                case 10:
                    categories = _f.sent();
                    productCatalog = [
                        { name: 'Ordinateur portable', categories: ['Informatique'] },
                        { name: 'Imprimante laser', categories: ['Informatique', 'Bureautique'] },
                        { name: 'Réfrigérateur', categories: ['Électroménager'] },
                        { name: 'Télévision LED', categories: ['Multimédia'] },
                        { name: 'Clé USB 64 Go', categories: ['Informatique'] },
                        { name: 'Smartphone Android', categories: ['Téléphonie', 'Multimédia'] },
                        { name: 'Scanner A4', categories: ['Bureautique'] },
                        { name: 'Micro-ondes', categories: ['Électroménager'] },
                        { name: 'Routeur Wi-Fi', categories: ['Informatique'] },
                        { name: 'Enceinte Bluetooth', categories: ['Multimédia'] },
                        { name: 'Casque audio', categories: ['Multimédia'] },
                        { name: 'Machine à laver', categories: ['Électroménager'] },
                        { name: 'Tablette tactile', categories: ['Téléphonie', 'Informatique'] },
                        { name: 'Clavier mécanique', categories: ['Informatique'] },
                        { name: 'Lampe LED USB', categories: ['Bureautique'] },
                    ];
                    _b = 0, companies_1 = companies;
                    _f.label = 11;
                case 11:
                    if (!(_b < companies_1.length)) return [3 /*break*/, 19];
                    company = companies_1[_b];
                    _c = 0, productCatalog_1 = productCatalog;
                    _f.label = 12;
                case 12:
                    if (!(_c < productCatalog_1.length)) return [3 /*break*/, 18];
                    item = productCatalog_1[_c];
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: item.name,
                                quantity: Math.floor(Math.random() * 46) + 5, // entre 5 et 50
                                companyId: company.id,
                            },
                        })];
                case 13:
                    product = _f.sent();
                    _loop_1 = function (catName) {
                        var category;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    category = categories.find(function (c) { return c.name === catName; });
                                    if (!category) return [3 /*break*/, 2];
                                    return [4 /*yield*/, prisma.productCategory.create({
                                            data: {
                                                productId: product.id,
                                                categoryId: category.id,
                                            },
                                        })];
                                case 1:
                                    _g.sent();
                                    _g.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _d = 0, _e = item.categories;
                    _f.label = 14;
                case 14:
                    if (!(_d < _e.length)) return [3 /*break*/, 17];
                    catName = _e[_d];
                    return [5 /*yield**/, _loop_1(catName)];
                case 15:
                    _f.sent();
                    _f.label = 16;
                case 16:
                    _d++;
                    return [3 /*break*/, 14];
                case 17:
                    _c++;
                    return [3 /*break*/, 12];
                case 18:
                    _b++;
                    return [3 /*break*/, 11];
                case 19:
                    console.log('✅ Données seed insérées avec succès !');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Erreur dans le seed :', e);
    process.exit(1);
})
    .finally(function () {
    prisma.$disconnect();
});
