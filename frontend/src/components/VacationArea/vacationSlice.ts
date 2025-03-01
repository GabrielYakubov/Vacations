import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Vacation from '../../models/Vacation';

interface VacationState {
    vacations: Vacation[],
    vacation?: Vacation
}

const initialState: VacationState = {
    vacations: []
}

export const vacationSlice = createSlice({
    name: 'vacations',
    initialState: initialState,
    reducers: {
        setVacations: (state, { payload: vacations }: PayloadAction<Vacation[]>) => {

            state.vacations = vacations;


        },
        setVacation: (state, action: PayloadAction<Vacation>) => {
            const { payload } = action; // payload === product

            state.vacation = payload;

        },
        addVacation: (state, { payload: vacation }: PayloadAction<Vacation>) => {

            
            state.vacations.push(vacation);

        },
        updateVacation: (state, { payload: updatedVacation }: PayloadAction<Vacation>) => {
            const indexToUpdate = state.vacations.findIndex(
                
              (v) => v.vacationId === updatedVacation.vacationId

            );
          
            if (indexToUpdate >= 0) {
              state.vacations[indexToUpdate] = updatedVacation;
            }
          
            state.vacation = updatedVacation;
          },
          
        deleteVacation: (state, { payload: id }: PayloadAction<number>) => {
            const indexToDelete = state.vacations.findIndex((v) => v.vacationId === id);
            if (indexToDelete >= 0) {
                state.vacations.splice(indexToDelete, 1);
            }
        }
    }
});

//Action creators are generated for each case reducer function 
export const { setVacations, addVacation, updateVacation, deleteVacation, setVacation } = vacationSlice.actions;



export default vacationSlice.reducer;