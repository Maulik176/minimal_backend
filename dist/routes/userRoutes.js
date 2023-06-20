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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../models/User"));
const generateUniqueId_1 = require("../utils/generateUniqueId");
const router = express_1.default.Router();
// Set up multer storage for profile photo uploads
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = (0, uuid_1.v4)();
        const filename = `${uniqueSuffix}-${file.originalname}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage });
// Create a new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, displayName, bio, links, currentlySelectedSegments, segmentsSelectedOverall, gender, age, walletAddress, nftProfileAddress, nftId, } = req.body;
        const profilePhoto = req.file ? req.file.filename : undefined;
        const profileId = (0, generateUniqueId_1.generateUniqueId)(); // Implement the function to generate a unique ID
        const user = new User_1.default({
            username,
            displayName,
            bio,
            links,
            currentlySelectedSegments,
            segmentsSelectedOverall,
            profilePhoto,
            gender,
            age,
            walletAddress,
            nftProfileAddress,
            nftId,
            profileId,
        });
        yield user.save();
        res.status(201).json({ profileId });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
