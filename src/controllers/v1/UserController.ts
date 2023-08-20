import { Handler, Router } from "express";
import { UserApp } from "../../models/app/UserApp";
import { User } from "../../models/types/User";
import { LoginDto } from "../../models/types/dto/user/LoginDto";
import { UpdateUserDto } from "../../models/types/dto/user/UpdateUserDto";
import { UserViewModel } from "../../models/types/viewModel/UserViewModel";
import { authenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { CreateUserSchema } from "../../utils/validation/user/CreateUserValidation";
import { UpdatePostSchema } from "../../utils/validation/post/UpdatePostSchema";
import { LoginSchema } from "../../utils/validation/user/LoginValidation";
import { CreateUserDto } from "../../models/types/dto/user/CreateUserDto";

const prefix = '/v1/user';

class UserController {

    constructor(private userApp: UserApp) {}

    public create: Handler = async (req, res, next) => {
        const dto = req.body as CreateUserDto;
        await CreateUserSchema.parseAsync(dto)

        const user = await this.userApp.create(dto).then(this.mapToUserViewModel);

        return res.status(200).json(user)
    }

    public delete: Handler = async (req, res) => {
        const id = req.query.id as string;

        await this.userApp.delete(id)

        return res.status(200).json({ message: 'deleted-user' })
    } 

    public list: Handler = async (req, res) => {
        const list = await this.userApp.list().then(x => x.map(this.mapToUserViewModel));

        return res.status(200).json(list)
    }

    public update: Handler = async (req, res) => {
        const dto = req.body as UpdateUserDto;
        await UpdatePostSchema.parseAsync(dto);

        const user = await this.userApp.update(dto);

        return res.status(200).json(user);
    }
    
    public login: Handler = async (req, res) => {
        const dto = req.body as LoginDto;
        await LoginSchema.parseAsync(dto);

        const token = await this.userApp.login(dto);

        res.status(200).json({ token });
    }
    
    // public updatePassword: Handler = async (req, res) => {
    //     const id = req.query.id as string;

    //     const voluntary = await this.userApp.delete(id);

    //     return res.status(200).json(voluntary);
    // } 

    private mapToUserViewModel = (user: User): UserViewModel => ({
        email: user.email,
        name: user.name,
        id: String(user._id)
    })
}

const userApp = new UserApp();
export const userController = new UserController(userApp)

const userRoute = Router();

userRoute.post(prefix, authenticationMiddleware.handler, userController.create);
userRoute.delete(`${prefix}/:id`, authenticationMiddleware.handler, userController.delete);
userRoute.get(prefix, authenticationMiddleware.handler, userController.list);
userRoute.put(`${prefix}/:id`, authenticationMiddleware.handler, userController.update);
userRoute.post(`${prefix}/login`, userController.login);

export { userRoute };



