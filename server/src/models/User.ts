import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document
interface IUser extends Document {
    username: string;
    // email: string;
    selectedAvatar: string;
    password: string;
    correctAnswers: number;
    wrongAnswers: number;
    isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // email: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     match: [/.+@.+\..+/, 'Must match an email address!'],
        // },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },

        selectedAvatar: {
            type: String,
            required: true,
        },
        correctAnswers: {
            type: Number,
            default: 0,
        },
        wrongAnswers: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;

