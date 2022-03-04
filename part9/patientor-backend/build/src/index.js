"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnose_1 = __importDefault(require("./routes/diagnose"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3001;
app.get('/api/ping', (_req, _res) => {
    console.log('someone pinged here');
});
app.use('/api/diagnoses', diagnose_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
