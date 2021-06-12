# Typescript 에서 redux middleware 사용하기 1. redux-thunk

### <"Typescript 에서 redux middleware 사용하기" 시리즈>
###### * 위의 시리즈는 🎇**[해당 수업 내용](https://react.vlpt.us/using-typescript/06-ts-redux-middleware.html)** 을 실습하고 공부하며 개인적으로 보충한 것입니다. ☺

#### 1. 시리즈
  * [redux- thunk](https://github.com/BadaHertz52/practice_ts_redux-thunk)
  * [redux- saga](https://github.com/BadaHertz52/practic_ts_redux-saga)
  * [redux- thunk, redux-saga 리팩토링](https://github.com/BadaHertz52/practice_ts_redux_middleware ) 

#### 2. 구현하고자 한 기능 
##### 검색창에 사용자명을 조회하면  Git hub에서의 사용자가 있는 지 확인하고, 사용자가 있을 시 해당 계정의 username, thumbnail, bio, blog  를 보여주고 사용자가 없을 시 에러가 발생했다는 것을 보여주는 것을 구현하고 자 했다. 
-------------------------------------------------------------------------------------------------------------------------------------

### < Typescript 에서 redux-thunk 사용하기>

#### 1. 사용된 라이브러리
##### react, redux, redux-react, typesafe-actions, redux-thunk, acxios 


#### 2. 코드 구성
|reducer store |middleware|presentational components|container|
|--------------|----------|-------------------------|-------------------|
|ations <br >types <br> reducers <br> index|thunks     |GithubProfileInfo <br> GithubUsernameForm         |GithubProfileLoader|

* ations : 액션 타입과 액션 생성함수 정의

* types : 리듀서 함수의 인자인 state, action의 타입을 정의

* reducer : 초기 상태와 리듀서 함수 정의

* index : 
  *  moduels/github/index.ts : actions , types,reducers, thunks 를 외부로 내보냄 
  * moduels/index.ts : 루트 리듀서와 Rootstate (루트 리듀서와 같은 타입) 을 생성하고 외부로 보냄 
  
* thunks : redux-thunk 함수 정의 

* GithubProfileInfo : 조회 결과에 따른 사용자 정보를 보여주는 뷰

* GithubUsername : username을 입력하고 결과를 조회할 수 있는 뷰 

* GithubProfileLoader : 스토어에 상태 조회, 액션을 디스패치 함 


#### 3. 배운 내용 : ThunkAction 

* What is ThunkAction ? 
```typescript
export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
 ```` = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
 
 * ThunkAction 을 사용해 작성한 정식 버전 
 ```typescript
 import {ThunkAction} from 'redux-thunk';
 import { RootState } from '..';
 import { GithubAction } from './type';
 
 export function getUserProfileThunk(username :string):ThunkAction<void,RootState ,null , GithubAction>{
   return async (dipatch ) => {
  }
 };
```


* 해당 저장소에서 사용한 **간편한** 버전 

 
```typescript
import { getUserProfile } from '../../api/github';
import {Dispatch} from 'redux';

export function getUserProfileThunk (username: string){
        return async (dispatch:Dispatch) => {
        const {request ,success,failure} = getUserProfileAsync ;
        dispatch(request()); //action 이 시작되었음을 알림
        try {
          const userProfile = await getUserProfile(username);
          dispatch(success(userProfile));
        } catch (e) {
          dispatch(failure(e));
```
