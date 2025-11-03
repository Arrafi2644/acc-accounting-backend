import httpStatus from 'http-status-codes';
import { IUser } from "./user.interface";
import { User } from "./user.model";
import AppError from '../../errorHelpers/appError';
import bcryptjs from "bcryptjs";

const createUserService = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
        throw new AppError(httpStatus.CONFLICT, "User already exist")
    }

    const hashPassword = await bcryptjs.hash(password as string, 10)
    const user = await User.create({
        email,
        password: hashPassword,
        ...rest
    })

    return user;

}

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};

const getAllUser = async () => {
    const user = await User.find();
    return {
        data: user
    }
};

export const UserServices = {
    createUserService,
    getMe,
    getAllUser
}
