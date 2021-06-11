// 정석 버전
import {ThunkAction} from 'redux-thunk';
import { RootState } from '..';
import {GithubAction} from './types';
import {Dispatch} from 'redux';
import { getUserProfile } from '../../api/github';
import { getUserProfileAsync } from './actions';
export function getUserProfileThunk(username :string):ThunkAction<void,RootState ,null , GithubAction>{
  return async (dispatch:Dispatch) => {
        const {request ,success,failure} = getUserProfileAsync ;
          dispatch(request(''));
          try {
            const userProfile = await getUserProfile(username);
            dispatch(success(userProfile));
          } catch (e) {
            dispatch(failure(e));
};}}

//간편 버전 
// export function getUserProfileThunk (username: string){
//   return async (dispatch:Dispatch) => {
//     const {request ,success,failure} = getUserProfileAsync ;
//     dispatch(request()); //action 이 시작되었음을 알림
//     try {
//       const userProfile = await getUserProfile(username);
//       dispatch(success(userProfile));
//     } catch (e) {
//       dispatch(failure(e)) ; };} 