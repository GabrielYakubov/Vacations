import dal from '../2-utils/dal';
import Vacation from '../4-models/Vacation';
import { OkPacket } from 'mysql';
import { ResourceNotFoundError, ValidationError, Error } from '../4-models/Error';
import { saveVacationImage } from '../2-utils/vacation-utils';
import fs from 'fs';

export const getAllVacations = async (offset: number): Promise<Vacation[]> => {

  const sql = `
    SELECT V.*,
      COUNT(F.userID) AS userCount,
      GROUP_CONCAT(F.userID) AS userIds
    FROM vacations AS V
    LEFT JOIN followers AS F ON V.vacationId = F.vacationId
    GROUP BY V.vacationId, V.description, V.endDate, V.price, V.startDate, V.destination, V.imageName
    ORDER BY V.startDate ASC
    LIMIT 10
    OFFSET ?;
  `;

  return await dal.execute(sql, [offset]);
};


export const getOneVacation = async (vacationId:number):Promise<Vacation> => {
  const sql = `SELECT vacationId, imageName FROM vacations WHERE vacationId = ${vacationId}`
  const vacation = await dal.execute<Vacation[]>(sql)
  const vacationOne = vacation[0]
  return vacationOne
}


export const addVacation = async (vacation: Vacation): Promise<Vacation> => {
  let { destination, description, startDate, endDate, price, image } = vacation;

  const error = vacation.validate();

  if (error) throw new ValidationError(error);

  let imageName = vacation.imageName;

  if (image) {
    imageName = await saveVacationImage(vacation);
    delete vacation.image;
  }

  if(!imageName) throw new Error('Image was not provided', 404)

  const sql = `
    INSERT INTO vacations(vacationId, destination, description, startDate, endDate, price, imageName)
    VALUES(DEFAULT, ?, ?, ?, ?, ?, ?);
  `;

  const info = await dal.execute<OkPacket>(sql, [destination, description, startDate, endDate, price, imageName]);

  vacation.vacationId = info.insertId;

  return vacation;
};

export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  let { vacationId, destination, description, startDate, endDate, price, image, imageName } = vacation;

  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  if (vacation.image) {
    const currentImage = imageName;
    if (fs.existsSync(`./src/1-assets/images/${currentImage}`)) {
      // delete the image
      fs.unlinkSync(`./src/1-assets/images/${currentImage}`);
    }

    imageName = await saveVacationImage(vacation);

    delete vacation.image;
  }

  if(!imageName) throw new Error('Image was not provided', 404)

  
  const sql = `
    UPDATE vacations SET
    destination = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageName = ?
    WHERE vacationId = ?;
  `;

  const info = await dal.execute<OkPacket>(sql, [destination, description, startDate, endDate, price, imageName, vacationId]);

  if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

  return vacation;
};

export const deleteVacation = async (vacationId: number): Promise<void> => {
  const vacation = await getOneVacation(vacationId);

  if (vacation.imageName) {
    if (fs.existsSync(`./src/1-assets/images/${vacation.imageName}`)) {
      // delete the image
      fs.unlinkSync(`./src/1-assets/images/${vacation.imageName}`);
    }
  }

  const sql = `DELETE FROM vacations WHERE vacationId = ?;`;
  
  const info = await dal.execute<OkPacket>(sql, [vacationId]);
  

  if (info.affectedRows === 0) {
    throw new ResourceNotFoundError(vacationId);
  }
};
