import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { User } from 'src/app/store/models/user.model';

const InitialState: User[] = [{}];

export const userReducer = createReducer(
  InitialState,
  on(UserActions.setUser, (state, { payload }) => {
    let array = [...state];
    array = [];
    array.push(payload);
    return array;
  })
);
