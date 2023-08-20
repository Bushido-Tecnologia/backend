import crypto from "crypto";
import { promisify } from "util";
import { logger } from "../../utils/logger";
import { userModel } from "../schemas/UserSchema";
import { jwtService } from "../services/JWTService";
import { User } from "../types/User";
import { CreateUserDto } from "../types/dto/user/CreateUserDto";
import { LoginDto } from "../types/dto/user/LoginDto";
import { UpdateUserDto } from "../types/dto/user/UpdateUserDto";

export class UserApp {
  public create = async (dto: CreateUserDto): Promise<User> => {
    const password = await this.cryptPassword(dto.password);

    const user: User = {
      email: dto.email,
      name: dto.name,
      password,
    };
    const createdUser = await userModel.create(user).then((x) => x.toObject()) as User;

    return createdUser;
  };

  public delete = async (voluntaryId: string): Promise<void> => {
    await userModel.deleteOne({ _id: voluntaryId });
  };

  public list = async (): Promise<User[]> => {
    const userList = await userModel
      .find()
      .then((x) => x.map((y) => y.toObject())) as User[]

      if (!userList.length) {
        logger.info("UserApp > list > No has users");
        return [];
    }

    return userList;
  };

  public update = async (dto: UpdateUserDto) => {
    const user = await userModel.findById(dto.id);
    if (!user) {
      throw new Error("user-not-found");
    }
    
    const now = new Date();
    const updatedUser: User = {
      ...user.toObject(),
      email: dto.email,
      name: dto.name,
      createdAt: now,
      updatedAt: now,
    };
    const createdVoluntary = await userModel.findByIdAndUpdate(
      user._id,
      updatedUser,
      { new: true }
    )

    return createdVoluntary?.toObject();
  };

  public login = async (dto: LoginDto) => {
    const user = await userModel.findOne({ email: dto.email}).then(x => x?.toObject());
    
    if (!user) {
        throw new Error('not-found');
    }
    
    if (await this.comparePassword(user.password ,dto.password)) {
        return jwtService.generate({
            email: user.email,
            id: user._id.toString(),
            name: user.name
        })
    } else {
        throw new Error('invalid-password');
    }

  }

  private async cryptPassword(password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const scryptAsync = promisify(crypto.scrypt);

    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  private async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const scryptAsync = promisify(crypto.scrypt);

    const [hashedPassword, salt] = storedPassword.split(".");
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;
    return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}
