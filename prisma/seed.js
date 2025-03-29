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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var argon2 = require("argon2");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var companyNames, _i, companyNames_1, name_1, companies, hashedPassword, categoryNames, _a, categoryNames_1, name_2, categories, productCatalog, _b, companies_1, company, numProducts, shuffled, selectedProducts, _c, selectedProducts_1, item, product, _loop_1, _d, _e, catName;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    companyNames = [
                        'Carrefour',
                        'Leclerc',
                        'Intermarché',
                        'Auchan',
                        'Monoprix',
                    ];
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
                    return [4 /*yield*/, argon2.hash('admin')];
                case 6:
                    hashedPassword = _f.sent();
                    return [4 /*yield*/, prisma.employee.create({
                            data: {
                                name: 'Admin',
                                email: 'admin@admin.com',
                                password: hashedPassword,
                                role: 'patron',
                                companyId: companies[0].id,
                            },
                        })];
                case 7:
                    _f.sent();
                    categoryNames = [
                        'Informatique',
                        'Bureautique',
                        'Électroménager',
                        'Multimédia',
                        'Téléphonie',
                        'Jeux vidéo',
                        'Mobilier',
                        'Papeterie',
                        'Image et Son',
                        'Réseau',
                        'Accessoires',
                    ];
                    _a = 0, categoryNames_1 = categoryNames;
                    _f.label = 8;
                case 8:
                    if (!(_a < categoryNames_1.length)) return [3 /*break*/, 11];
                    name_2 = categoryNames_1[_a];
                    return [4 /*yield*/, prisma.category.create({ data: { name: name_2 } })];
                case 9:
                    _f.sent();
                    _f.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 8];
                case 11: return [4 /*yield*/, prisma.category.findMany()];
                case 12:
                    categories = _f.sent();
                    productCatalog = [
                        { name: 'Ordinateur portable', categories: ['Informatique'] },
                        { name: 'Imprimante laser', categories: ['Informatique', 'Bureautique'] },
                        { name: 'Réfrigérateur', categories: ['Électroménager'] },
                        { name: 'Télévision LED', categories: ['Multimédia', 'Image et Son'] },
                        { name: 'Clé USB 64 Go', categories: ['Informatique', 'Accessoires'] },
                        { name: 'Smartphone Android', categories: ['Téléphonie', 'Multimédia'] },
                        { name: 'Scanner A4', categories: ['Bureautique'] },
                        { name: 'Micro-ondes', categories: ['Électroménager'] },
                        { name: 'Routeur Wi-Fi', categories: ['Informatique', 'Réseau'] },
                        { name: 'Enceinte Bluetooth', categories: ['Multimédia', 'Accessoires'] },
                        { name: 'Casque audio', categories: ['Multimédia', 'Image et Son'] },
                        { name: 'Machine à laver', categories: ['Électroménager'] },
                        { name: 'Tablette tactile', categories: ['Téléphonie', 'Informatique'] },
                        { name: 'Clavier mécanique', categories: ['Informatique', 'Accessoires'] },
                        { name: 'Lampe LED USB', categories: ['Bureautique'] },
                        { name: 'Disque dur externe 1To', categories: ['Informatique'] },
                        { name: 'Fauteuil de bureau ergonomique', categories: ['Mobilier'] },
                        { name: 'Jeu vidéo PS5', categories: ['Jeux vidéo'] },
                        { name: 'Caméra de surveillance', categories: ['Multimédia', 'Réseau'] },
                        { name: 'Chargeur sans fil', categories: ['Accessoires', 'Téléphonie'] },
                        { name: 'Carnet A5', categories: ['Papeterie'] },
                        { name: 'Stylo plume', categories: ['Papeterie'] },
                        { name: 'Bureau en bois', categories: ['Mobilier'] },
                        { name: 'Imprimante photo', categories: ['Multimédia', 'Bureautique'] },
                        { name: 'Répéteur Wi-Fi', categories: ['Réseau'] },
                        { name: 'Webcam HD', categories: ['Multimédia'] },
                        { name: 'Ventilateur USB', categories: ['Accessoires'] },
                        { name: 'Projecteur LED', categories: ['Image et Son'] },
                        {
                            name: 'Écouteurs intra-auriculaires',
                            categories: ['Accessoires', 'Multimédia'],
                        },
                        { name: 'Switch réseau 8 ports', categories: ['Réseau'] },
                        { name: 'Souris sans fil', categories: ['Accessoires', 'Informatique'] },
                        { name: 'Tapis de souris RGB', categories: ['Accessoires'] },
                        { name: 'Support pour ordinateur portable', categories: ['Mobilier'] },
                        { name: 'Chaise gaming', categories: ['Mobilier'] },
                        { name: 'Lecteur DVD externe', categories: ['Informatique'] },
                        { name: 'Station de charge multiple', categories: ['Accessoires'] },
                        { name: 'Lampe de bureau réglable', categories: ['Bureautique'] },
                        { name: 'Plastifieuse A4', categories: ['Bureautique'] },
                        { name: 'Tableau blanc magnétique', categories: ['Bureautique'] },
                        { name: 'Boîte de classement A4', categories: ['Papeterie'] },
                        { name: 'Trousse scolaire', categories: ['Papeterie'] },
                        { name: 'Téléphone sans fil DECT', categories: ['Téléphonie'] },
                        { name: 'Caméscope HD', categories: ['Multimédia'] },
                        { name: 'Console de jeu portable', categories: ['Jeux vidéo'] },
                        { name: 'Chaise pliante', categories: ['Mobilier'] },
                        { name: 'Carte SD 128 Go', categories: ['Accessoires'] },
                        { name: 'Support mural TV', categories: ['Image et Son'] },
                        { name: 'Écran PC 27 pouces', categories: ['Informatique'] },
                        { name: 'Mini projecteur portable', categories: ['Image et Son'] },
                        { name: 'Multiprise parafoudre', categories: ['Accessoires'] },
                        { name: 'Pochettes plastiques perforées', categories: ['Papeterie'] },
                    ];
                    _b = 0, companies_1 = companies;
                    _f.label = 13;
                case 13:
                    if (!(_b < companies_1.length)) return [3 /*break*/, 21];
                    company = companies_1[_b];
                    numProducts = Math.floor(Math.random() * 6) + 15;
                    shuffled = __spreadArray([], productCatalog, true).sort(function () { return 0.5 - Math.random(); });
                    selectedProducts = shuffled.slice(0, numProducts);
                    _c = 0, selectedProducts_1 = selectedProducts;
                    _f.label = 14;
                case 14:
                    if (!(_c < selectedProducts_1.length)) return [3 /*break*/, 20];
                    item = selectedProducts_1[_c];
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: item.name,
                                quantity: Math.floor(Math.random() * 46) + 5, // entre 5 et 50
                                companyId: company.id,
                            },
                        })];
                case 15:
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
                    _f.label = 16;
                case 16:
                    if (!(_d < _e.length)) return [3 /*break*/, 19];
                    catName = _e[_d];
                    return [5 /*yield**/, _loop_1(catName)];
                case 17:
                    _f.sent();
                    _f.label = 18;
                case 18:
                    _d++;
                    return [3 /*break*/, 16];
                case 19:
                    _c++;
                    return [3 /*break*/, 14];
                case 20:
                    _b++;
                    return [3 /*break*/, 13];
                case 21:
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
