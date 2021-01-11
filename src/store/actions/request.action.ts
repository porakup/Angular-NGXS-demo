
export class AddRequestAction {
    static readonly type = '[Request] Add Request';
  }

export class ClearRequestAction {
    static readonly type = '[Request] Clear Request';
  }

export class SetMessageAction {
    static readonly type = '[Request] Set Message';
    constructor(public message: string) {}
  }

export class ClearMessageAction {
    static readonly type = '[Request] Clear Message';
  }

export class SetLoginMessageAction {
    static readonly type = '[Request] Set Login Message';
    constructor(public message: string) {}
  }

export class ClearLoginMessageAction {
    static readonly type = '[Request] Clear Login Message';
  }



  

