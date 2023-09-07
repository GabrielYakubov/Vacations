import Vacation from "../4-models/Vacation";
import { v4 as uuid } from "uuid";


//function to save image with new name using uuid
export const saveVacationImage = async (vacation: Vacation) => {
  if (vacation.image) {
    const extension = vacation.image.name.split(".").pop();
    vacation.imageName = `${uuid()}.${extension}`;
    await vacation.image.mv(`./src/1-assets/images/${vacation.imageName}`);
    return vacation.imageName;
  }
};

//getting vacation image function
export const getImageName = async (vacation:Vacation) => {
    if(vacation.image) return vacation.imageName

}