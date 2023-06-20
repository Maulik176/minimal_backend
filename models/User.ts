import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  displayName: string;
  bio: string;
  links: string[];
  currentlySelectedSegments: string[];
  segmentsSelectedOverall: string[];
  profilePhoto: string; // Path to the uploaded file
  gender: string;
  age: number;
  walletAddress: string;
  nftProfileAddress: string;
  nftId: string;
  profileId: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  bio: { type: String, required: true },
  links: [{ type: String }],
  currentlySelectedSegments: [{ type: String }],
  segmentsSelectedOverall: [{ type: String }],
  profilePhoto: { type: String },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  walletAddress: { type: String, required: true },
  nftProfileAddress: { type: String, required: true },
  nftId: { type: String, required: true },
  profileId: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
