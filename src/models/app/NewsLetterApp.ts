import { logger } from "../../utils/logger";
import { enrollmentModel } from "../schemas/EnrollmentSchema";
import { Enrollment } from "../types/Enrollment";
import { CreateEnrollmentDto } from "../types/dto/newletter/CreateEnrollmentDto";

export class NewsLetterApp {
    
    public create = async (dto: CreateEnrollmentDto): Promise<Enrollment> => {

        const enrollment: Enrollment = {
            email: dto.email,
            name: dto.name,
        }
       const newEnrollment = await enrollmentModel.create(enrollment).then(x => x.toObject()) as Enrollment;

       return newEnrollment;
    }

    public delete = async (voluntaryId: string): Promise<void> => {
        await enrollmentModel.deleteOne({_id: voluntaryId})
    } 

    public list = async (): Promise<Enrollment[]> => {
        const postList = await enrollmentModel.find().limit(8).then(x => x.map(y => y.toObject())) as Enrollment[];
        
        if (!postList.length) {
            logger.info('EnrollmentApp > list > No has enrollment in newsletter')
            return [];
        }

        return postList
    }

}