import Joi from "joi";
import Role from "./Role";


class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email:string;
    public password: string;
    public role?: Role

    public constructor(user: User) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email
        this.password = user.password;
        this.role = user.role;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().min(5).max(100),
        password: Joi.string().required().min(2).max(200),
        role: Joi.forbidden()
    });


    public validate(): string | undefined {
        const result = User.validationSchema.validate(this);
        return result.error?.message;
    }


}

export default User;