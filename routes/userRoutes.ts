import express, { Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/User';
import { generateUniqueId } from '../utils/generateUniqueId';

const router = express.Router();

// Set up multer storage for profile photo uploads
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      username,
      displayName,
      bio,
      links,
      currentlySelectedSegments,
      segmentsSelectedOverall,
      gender,
      age,
      walletAddress,
      nftProfileAddress,
      nftId,
    } = req.body;

    const profilePhoto = req.file ? req.file.filename : undefined;
    const profileId = generateUniqueId(); // Implement the function to generate a unique ID

    const user = new UserModel({
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

    await user.save();

    res.status(201).json({ profileId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
