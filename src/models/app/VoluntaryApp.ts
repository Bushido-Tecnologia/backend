import { logger } from "../../utils/logger";
import { voluntaryModel } from "../schemas/VoluntarySchema";
import { Voluntary } from "../types/Voluntary";
import { CreateVoluntaryDto } from "../types/dto/voluntary/CreateVoluntaryDto";
import { UpdateVoluntaryDto } from "../types/dto/voluntary/UpdateVoluntaryDto";

export class VoluntaryApp {
    
    public create = async (dto: CreateVoluntaryDto): Promise<Voluntary> => {
        const voluntary: Voluntary = {
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phoneNumber: dto.phoneNumber,
        }
       const createdVoluntary = await voluntaryModel.create(voluntary).then(x => x.toObject()) as Voluntary;

       return createdVoluntary
    }

    public delete = async (voluntaryId: string): Promise<void> => {
        await voluntaryModel.deleteOne({_id: voluntaryId})
    } 

    public list = async (): Promise<Voluntary[]> => {
        const voluntaryList = await voluntaryModel.find().then(x => x.map(y => y.toObject())) as Voluntary[];
        
        if (!voluntaryList.length) {
            logger.info('VoluntaryApp > list > No has voluntaries')
            return [];
        }

        return voluntaryList
    }

    public update = async (dto: UpdateVoluntaryDto) => {
        const voluntary = await voluntaryModel.findById(dto.id);
        
        if (!voluntary) {
            throw new Error('voluntary-not-found');
        }

        const now = new Date();
        const updatedVoluntary: Voluntary = {
            ...voluntary.toObject(),
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phoneNumber: dto.phoneNumber,
            updatedAt: now
        };
        
       const createdVoluntary = await voluntaryModel.findByIdAndUpdate(voluntary._id, updatedVoluntary, {new: true});

       if (!createdVoluntary) {
        throw new Error('voluntary-not-found');
       }

       return createdVoluntary.toObject()
    }
}