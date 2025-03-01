import axios from '../axios'
import Like from '../models/Like';
import Follower from '../models/Follower';
import Vacation from '../models/Vacation';
import { BASE_API_URL } from '../config';




export const getVacations = async (page:number | null): Promise<Vacation[]> => {

    const response = await axios.get<Vacation[]>(`${BASE_API_URL}/vacation/${page}`);

    const vacations = response.data;


    // return vacations;
    return vacations;

}


export const getFollowers = async ():Promise<Follower[]> => {

    const response = await axios.get<Follower[]>(`${BASE_API_URL}/followers`);

    const followers = response.data;

    // return followers;
    return followers

}




export const downloadCsv = async (): Promise<void> => {
    try {
        const response = await axios.get<Blob>(`${BASE_API_URL}/followers/csv`, { responseType: 'blob' });
        const csvBlob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(csvBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'vacations.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download CSV file:', error);
      throw error;
    }
  };




export const addVacation = async (vacation: Vacation): Promise<Vacation> => {

    const formData = new FormData(); // can contain string and / or files
    // formData.append('vacationId', vacation.vacationId)
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', vacation.startDate.toString())
    formData.append('endDate', vacation.endDate.toString())
    formData.append('price', vacation.price.toString());
    formData.append('image', vacation.image[0]);   //image = FileList image[0] = File  / Blob

    const response = await axios.post<Vacation>(`${BASE_API_URL}/vacation/`, formData);

    const addedVacation = response.data;

    return addedVacation;

}

export const getLikes = async ():Promise<Like[]> => {

    const response = await axios.get<Like[]>(`${BASE_API_URL}/likes`);

    const likes = response.data;

    // return likes;
    return likes

}



export const addLike = async (vacationId:number, userId:number):Promise<Like> => {

    const response = await axios.post<Like>(`${BASE_API_URL}/likes/`, {vacationId,userId})

    const addedLike = response.data


    return addedLike;
}


export const deleteLike = async (vacationId: number, userId:number): Promise<boolean> => {

    await axios.delete(`${BASE_API_URL}/likes/${vacationId}/${userId}`);

    return true

}






export const getVacation = async (vacationId: number): Promise<Vacation> => {

    //ajax req
    const response = await axios.get(`/vacation/${vacationId}`);

    const vacation = response.data;

    return vacation

}


export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {

  const formData = new FormData();
  formData.append('destination', vacation.destination);
  formData.append('description', vacation.description);
  formData.append('startDate', vacation.startDate.toString());
  formData.append('endDate', vacation.endDate.toString());
  formData.append('price', vacation.price.toString());
  formData.append('imageName',vacation.imageName)

  if (vacation.image && vacation.image[0]) {
    formData.append('image', vacation.image[0]);
  }
    const response = await axios.put<Vacation>(`${BASE_API_URL}/vacation/${vacation.vacationId}`, formData);

    const updatedVacation = response.data;

    return updatedVacation

}

export const deleteVacation = async (vacationId: number): Promise<boolean> => {

    await axios.delete(`${BASE_API_URL}/vacation/${vacationId}`);

    return true

}
