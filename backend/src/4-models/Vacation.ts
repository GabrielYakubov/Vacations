import Joi from 'joi';
import {UploadedFile} from 'express-fileupload'


class Vacation {

    public vacationId: number;
    public destination: string;
    public description:string;
    public startDate:string;
    public endDate:string;
    public price: number;
    public image?:UploadedFile;
    public imageName?:string;

    public constructor(vacation: Vacation) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(100),
        description:Joi.string().required().min(2).max(1000),
        startDate:Joi.string().required().min(2).max(100),
        endDate:Joi.string().required().min(2).max(100),
        price: Joi.number().required().min(2).max(10000),
        image: Joi.object().optional(),
        imageName:Joi.string().optional(),
    });



    public validate(): string | undefined {
        console.log('validate vacation')
        const result = Vacation.validationSchema.validate(this);

        return result.error?.message;

    }


}


export default Vacation;