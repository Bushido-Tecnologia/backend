import { Handler, Router } from "express";
import { VoluntaryApp } from "../../models/app/VoluntaryApp";
import { Voluntary } from "../../models/types/Voluntary";
import { UpdateVoluntaryDto } from "../../models/types/dto/voluntary/UpdateVoluntaryDto";
import { VoluntaryViewModel } from "../../models/types/viewModel/VoluntaryViewModel";
import { authenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { CreateVoluntaryDto } from "../../models/types/dto/voluntary/CreateVoluntaryDto";
import { CreateVoluntarySchema } from "../../utils/validation/voluntary/CreateVoluntaryValidation";
import { UpdateVoluntarySchema } from "../../utils/validation/voluntary/UpdateVoluntaryValidation";

const prefix = '/v1/voluntary';

class VoluntaryController {

    constructor(private voluntaryApp: VoluntaryApp) {}

    public create: Handler = async (req, res) => {
        const dto = req.body as CreateVoluntaryDto;
        await CreateVoluntarySchema.parseAsync(dto);

        const voluntary = await this.voluntaryApp.create(dto).then(this.mapToVoluntaryViewModel);

        return res.status(200).json(voluntary)
    }

    public delete: Handler = async (req, res) => {
        const id = req.query.id as string;

        await this.voluntaryApp.delete(id)

        return res.status(200).json({ message: 'deleted-voluntary' })
    } 

    public list: Handler = async (req, res) => {
        const list = this.voluntaryApp.list().then(x => x.map(this.mapToVoluntaryViewModel))

        return res.status(200).json(list);
    }

    public update: Handler = async (req, res) => {
        const dto = req.body as UpdateVoluntaryDto;
        await UpdateVoluntarySchema.parseAsync(dto);

        const voluntary = await this.voluntaryApp.update(dto)

        return res.status(200).json(voluntary);
    }

    private mapToVoluntaryViewModel = (dto: Voluntary): VoluntaryViewModel => ({
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        id: String(dto._id),
    })
}

const voluntaryApp = new VoluntaryApp();
export const voluntaryController = new VoluntaryController(voluntaryApp)

const voluntaryRoute = Router();

voluntaryRoute.post(prefix, voluntaryController.create);
voluntaryRoute.delete(`${prefix}/:id`, authenticationMiddleware.handler, voluntaryController.delete);
voluntaryRoute.get(prefix, authenticationMiddleware.handler, voluntaryController.list);
voluntaryRoute.put(`${prefix}/:id`, authenticationMiddleware.handler, voluntaryController.update);

export { voluntaryRoute };



