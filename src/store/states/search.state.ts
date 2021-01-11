
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Navigate } from "@ngxs/router-plugin";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetSearchAction, ClearSearchAction } from '../actions/search.action';

export interface Search {
    query: string;
}

@State<Search>({
    name: 'SearchState',
    defaults: {
        query: null
    }
  })

  @Injectable()
  export class SearchState {

    @Selector()
    static getQuery(state: Search) {
      return state.query;
    }

    constructor(private router: Router) { }
  
    @Action(SetSearchAction)
    setMessage({ patchState, getState, dispatch }: StateContext<Search>, payload: SetSearchAction) {
       const state = getState();
       state.query = payload.query;
       patchState(state);
      dispatch(new Navigate(['/search']));
      
    }
  
    @Action(ClearSearchAction)
    clearRequest({ patchState, getState }: StateContext<Search>) {
       const state = getState();
       state.query = null;
       patchState(state);
    }

  }

