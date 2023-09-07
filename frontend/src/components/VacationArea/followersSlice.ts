import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Follower from '../../models/Follower';
import Like from '../../models/Like';

interface FollowerState {
    follower: Follower[],
    like:Like[]
}

const initialState: FollowerState = {
    follower: [],
    like:[]

}

export const followerSlice = createSlice({
    name: 'followers',
    initialState: initialState,
    reducers: {
        setFollowers: (state, { payload: followers }: PayloadAction<Follower[]>) => {

            state.follower = followers;

        },
        setlikes: (state, { payload: likes }: PayloadAction<Like[]>) => {

            state.like = likes;

        },
        setLike: (state, { payload: like }: PayloadAction<Like>) => {

            
            state.like.push(like);

        }
    }
});

//Action creators are generated for each case reducer function 
export const { setFollowers, setlikes, setLike } = followerSlice.actions;



export default followerSlice.reducer;
