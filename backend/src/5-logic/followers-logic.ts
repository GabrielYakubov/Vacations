import Likes from "../4-models/Likes"
import dal from "../2-utils/dal"
import { ResourceNotFoundError } from "../4-models/Error"
import { OkPacket } from "mysql"



export const getAllLikes = async (): Promise<Likes[]> => {

    const sql = `
      SELECT * from followers
    `
    const liked = dal.execute<Likes[]>(sql)
  
    return liked
  }
  


  export const addLike = async (vacationId: number, userId: number): Promise<Likes> => {
    const sql = `
      INSERT INTO followers (vacationId, userId) VALUES (?, ?)
    `;
  
    const liked = await dal.execute<Likes>(sql, [vacationId, userId]);
  
    return liked;
  };
  
  
  export const deleteLike = async (vacationId: number, userId: number): Promise<void> => {
    const sql = `
      DELETE FROM followers WHERE vacationId = ? AND userId = ?
    `;
  
    const info = await dal.execute<OkPacket>(sql, [vacationId, userId]);
  
    if (info.affectedRows === 0) {
      throw new ResourceNotFoundError(vacationId);
    }
  };
  
  
  
  
  export const getGraphData = async () => {
  
    const sql = `
    SELECT V.destination, V.vacationId, COUNT(*) AS followers
    FROM vacations AS V
    INNER JOIN followers AS F ON V.vacationId = F.vacationId
    GROUP BY V.vacationId, V.destination
    ORDER BY followers DESC;
    `
  
    const followers = await dal.execute(sql)
  
    return followers
  
  }