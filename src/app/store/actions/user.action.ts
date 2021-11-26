import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';

export const setUser = createAction('[USER] Set', props<{ payload: User }>());
