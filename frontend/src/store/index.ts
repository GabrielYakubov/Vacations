import { configureStore } from '@reduxjs/toolkit';
import vacationReducer from '../components/VacationArea/vacationSlice';
import authReducer from '../auth/authSlice';
import followerReducer from '../components/VacationArea/followersSlice'

const store = configureStore({
    reducer: {
        vacationState: vacationReducer,
        authState: authReducer,
        followerState:followerReducer,
    }
});


//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;