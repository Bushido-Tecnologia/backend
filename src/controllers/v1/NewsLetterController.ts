import { Handler, Router } from "express";
import { NewsLetterApp } from "../../models/app/NewsLetterApp";
import { authenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { EnrollmentViewModel } from "../../models/types/viewModel/EnrollmentViewModel";
import { Enrollment } from "../../models/types/Enrollment";
import { CreateEnrollmentDto } from "../../models/types/dto/newletter/CreateEnrollmentDto";
import { CreateEnrollmentSchema } from "../../utils/validation/newsletter/CreateEnrollmentValidation";

const prefix = '/v1/newsletter';

class NewsLetterController {

    constructor(private postApp: NewsLetterApp) {}

    public create: Handler = async (req, res) => {
        const dto = req.body as CreateEnrollmentDto;

        await CreateEnrollmentSchema.parseAsync(dto);

        const voluntary = await this.postApp.create(dto).then(this.mapToEnrollmentViewModel);

        return res.status(200).json(voluntary)
    }

    public delete: Handler = async (req, res) => {
        const id = req.query.id as string;

        await this.postApp.delete(id)

        return res.status(200).json({ message: 'deleted-voluntary' })
    } 

    public list: Handler = async (req, res) => {
        const list = await this.postApp.list().then(x => x.map(this.mapToEnrollmentViewModel))

        return res.status(200).json(list);
    }

    private mapToEnrollmentViewModel = (dto: Enrollment): EnrollmentViewModel => ({
        email: dto.email,
        id: String(dto._id),
        name: dto.name
    })

}

const newsLetterApp = new NewsLetterApp();
export const postController = new NewsLetterController(newsLetterApp);

const newsLetterRoute = Router();

newsLetterRoute.post(prefix, postController.create);
newsLetterRoute.delete(`${prefix}/:id`, authenticationMiddleware.handler, postController.delete);
newsLetterRoute.get(prefix, authenticationMiddleware.handler, postController.list);

export { newsLetterRoute };



