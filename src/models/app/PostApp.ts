import { logger } from "../../utils/logger";
import { postModel } from "../schemas/PostSchema";
import { jwtService } from "../services/JWTService";
import { Post } from "../types/Post";
import { CreatePostDto } from "../types/dto/post/CreatePostDto";
import { UpdatePostDto } from "../types/dto/post/UpdatePostDto";

export class PostApp {
    
    public create = async (dto: CreatePostDto, token: string): Promise<Post> => {
        const user = jwtService.decoded(token)

        const post: Omit<Post, 'createdAt'> = {
            title: dto.title,
            base64: dto.base64,
            body: dto.body,
            createdBy: user.name || '',
        }
       const newPost = await postModel.create(post).then(x => x.toObject()) as Post;

       return newPost;
    }

    public delete = async (voluntaryId: string): Promise<void> => {
        await postModel.deleteOne({_id: voluntaryId})
    } 

    public list = async (): Promise<Post[]> => {
        const postList = await postModel.find().limit(8).then(x => x.map(y => y.toObject())) as Post[];
        
        if (!postList.length) {
            logger.info('PostApp > list > No has posts')
            return [];
        }

        return postList
    }

    public update = async (dto: UpdatePostDto) => {
        const post = await postModel.findById(dto.id);

        if (!post) {
            throw new Error('voluntary-not-found');
        }

        const now = new Date();
        const updatedPost: Post = {
            ...post.toObject(),
            title: dto.title,
            base64: dto.base64,
            body: dto.body,
            updatedAt: now,
        }
       const newPost = await postModel.findByIdAndUpdate(post._id, updatedPost, {new: true});

       return newPost?.toObject()
    }
}