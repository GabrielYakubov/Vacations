interface Vacation {
  vacationId: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: string;
  image: FileList;
  imageName: string;
  userCount: number;
  userIds:string;
}

export default Vacation;
