/* eslint-disable no-console */
import bcryptjs from 'bcryptjs';
import { envVars } from '../config/env';
import { User } from '../modules/user/user.model';
import { IUser, Role } from '../modules/user/user.interface';


export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })

        if (isSuperAdminExist) {
            console.log("Super admin already exist");
            return;
        }

        const hashPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_CREDENTIAL, Number(envVars.BCRYPT_SALT_ROUND))

        const payload: IUser = {
            name: "Super admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            role: Role.SUPER_ADMIN,
            isVerified: true
        }
        const superAdmin = await User.create(payload)
        console.log("User created successfully!");
        console.log(superAdmin);
    } catch (error) {
        console.log(error);
    }

}