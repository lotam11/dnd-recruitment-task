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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createPerson = exports.getCurrentPerson = void 0;
const joi_1 = __importDefault(require("joi"));
const PersonController_1 = __importDefault(require("./PersonController"));
const getCurrentPerson = (persons) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return persons.get(req.body.id);
});
exports.getCurrentPerson = getCurrentPerson;
const createPerson = (persons) => {
    const validation = joi_1.default.object().keys({
        nickname: joi_1.default.string().required(),
        fullname: joi_1.default.string().required(),
        description: joi_1.default.string().required()
    });
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        joi_1.default.attempt(req.body, validation);
        const person = yield persons.create(req.body);
        res.json(person).end();
    });
};
exports.createPerson = createPerson;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const persons = yield PersonController_1.default.create(data);
        return {
            getCurrent: exports.getCurrentPerson(persons),
            create: exports.createPerson(persons),
        };
    });
}
exports.create = create;
exports.default = { create };
