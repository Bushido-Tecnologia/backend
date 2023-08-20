import { Handler, Router } from "express";
import { PostApp } from "../../models/app/PostApp";
import { Post } from "../../models/types/Post";
import { UpdatePostDto } from "../../models/types/dto/post/UpdatePostDto";
import { PostViewModel } from "../../models/types/viewModel/PostViewModel";
import { authenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { CreatePostDto } from "../../models/types/dto/post/CreatePostDto";
import { CreatePostSchema } from "../../utils/validation/post/CreatePostValidation";
import { UpdatePostSchema } from "../../utils/validation/post/UpdatePostSchema";

const prefix = '/v1/post';

class PostController {

    constructor(private postApp: PostApp) {}

    public create: Handler = async (req, res) => {
        const token = req.headers['authorization'];
        const dto = req.body as CreatePostDto;

        if (!token) {
            throw new Error('forbidden-resources')
        }

        await CreatePostSchema.parseAsync(dto);

        const voluntary = await this.postApp.create(dto, token).then(this.mapToVoluntaryViewModel);

        return res.status(200).json(voluntary)
    }

    public delete: Handler = async (req, res) => {
        const id = req.query.id as string;

        await this.postApp.delete(id);

        return res.status(200).json({ message: 'deleted-voluntary' })
    } 

    public list: Handler = async (req, res) => {
        const list = this.postApp.list().then(x => x.map(this.mapToVoluntaryViewModel))

        return res.status(200).json(list);
    }

    public update: Handler = async (req, res) => {
        const dto = req.body as UpdatePostDto;
        await UpdatePostSchema.parseAsync(dto);

        const voluntary = await this.postApp.update(dto)

        return res.status(200).json(voluntary);
    }

    private mapToVoluntaryViewModel = (dto: Post): PostViewModel => ({
        base64: dto.base64,
        body: dto.body,
        title: dto.title,
        createdAt: dto.createdAt,
        createdBy: dto.createdBy,
        id: String(dto._id)
    })
}

const postApp = new PostApp();
export const postController = new PostController(postApp);

const postRoute = Router();

postRoute.post(prefix, authenticationMiddleware.handler, postController.create);
postRoute.delete(`${prefix}/:id`, authenticationMiddleware.handler, postController.delete);
postRoute.get(prefix, postController.list);
postRoute.put(`${prefix}/:id`, authenticationMiddleware.handler, postController.update);

export { postRoute };



