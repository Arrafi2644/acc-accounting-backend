/* eslint-disable no-console */
import bcryptjs from 'bcryptjs';
import { envVars } from '../config/env';
import { User } from '../modules/user/user.model';
import { IUser, Role } from '../modules/user/user.interface';


export const seedAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({ email: envVars.ADMIN_EMAIL })

        if (isAdminExist) {
            console.log("Admin already exist");
            return;
        }

        const hashPassword = await bcryptjs.hash(envVars.ADMIN_CREDENTIAL, Number(envVars.BCRYPT_SALT_ROUND))

        const payload: IUser = {
            name: "admin",
            email: envVars.ADMIN_EMAIL,
            password: hashPassword,
            role: Role.ADMIN,
            isVerified: true
        }
        const admin = await User.create(payload)
        console.log("Admin created successfully!");
        console.log(admin);
    } catch (error) {
        console.log(error);
    }

}