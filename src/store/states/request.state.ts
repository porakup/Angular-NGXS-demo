import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as RequestAction from '../actions/request.action';

export interface Request {
    request: number;
    message: string;
    loginMessage: string;
}

@State<Request>({
    name: 'RequestState',
    defaults: {
        request: 0,
        message: null,
        loginMessage: null
    }
  })

  @Injectable()
  export class RequestState {

   @Selector()
   static getRequest(state: Request) {
     return state.request;
   }
 
   @Selector()
   static getMessage(state: Request) {
     return state.message;
   }
 
   @Selector()
   static getLoginMessage(state: Request) {
     return state.loginMessage;
   }

    constructor() { }
  
    @Action(RequestAction.AddRequestAction)
    addRequest({ patchState, getState }: StateContext<Request>) {
       const state = getState();
       state.request++;
       patchState(state);
    }
  
    @Action(RequestAction.ClearRequestAction)
    clearRequest({ patchState, getState }: StateContext<Request>) {
       const state = getState();
       state.request = 0;
       patchState(state);
    }

    @Action(RequestAction.SetMessageAction)
    setMessage({ patchState, getState }: StateContext<Request>, payload: RequestAction.SetMessageAction) {
       const state = getState();
       state.message = payload.message;
       patchState(state);
    }

    @Action(RequestAction.ClearMessageAction)
    clearMessage({ patchState, getState }: StateContext<Request>) {
       const state = getState();
       state.message = null;
       patchState(state);
    }

    @Action(RequestAction.SetLoginMessageAction)
    setLoginMessage({ patchState, getState }: StateContext<Request>, payload: RequestAction.SetMessageAction) {
       const state = getState();
       state.loginMessage = payload.message;
       patchState(state);
    }

    @Action(RequestAction.ClearLoginMessageAction)
    clearLoginMessage({ patchState, getState }: StateContext<Request>) {
       const state = getState();
       state.loginMessage = null;
       patchState(state);
    }

  }

