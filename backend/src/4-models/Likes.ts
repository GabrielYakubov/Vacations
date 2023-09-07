class Likes {
    public followerId: number;
    public vacationId: number;
    public userId: number;


    public constructor(user: Likes) {
        this.followerId = user.followerId;
        this.vacationId = user.vacationId;
        this.userId = user.userId;
    }
}



export default Likes;