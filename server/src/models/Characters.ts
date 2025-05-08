import mongoose, { Schema, Document } from 'mongoose';

export interface ICharacter extends Document {
  name: string;
  picture: string;
  voice: string;
}

const CharacterSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true,
    },
    voice: {
      type: String,
      required: true,
    },
  },
);

const Character = mongoose.model<ICharacter>('Character', CharacterSchema);

export default Character;
