// TODO (MATT): check this pattern
import { Expression } from './expression';
import { ThreeValuedLogic } from '../datatypes/datatypes';
import { Context } from '../runtime/context';

class And extends Expression {
  constructor(json: any) {
    super(json);
  }

  async exec(ctx: Context) {
    return ThreeValuedLogic.and(...(await this.execArgs(ctx)));
  }
}

class Or extends Expression {
  constructor(json: any) {
    super(json);
  }

  async exec(ctx: Context) {
    return ThreeValuedLogic.or(...(await this.execArgs(ctx)));
  }
}

class Not extends Expression {
  constructor(json: any) {
    super(json);
  }

  async exec(ctx: Context) {
    return ThreeValuedLogic.not(await this.execArgs(ctx));
  }
}

class Xor extends Expression {
  constructor(json: any) {
    super(json);
  }

  async exec(ctx: Context) {
    return ThreeValuedLogic.xor(...(await this.execArgs(ctx)));
  }
}

class IsTrue extends Expression {
  constructor(json: any) {
    super(json);
  }

  async exec(ctx: Context) {
    return true === (await this.execArgs(ctx));
  }
}

class IsFalse extends Expression {
  constructor(json: any) {
    super(json);
  }

  async exec(ctx: Context) {
    return false === (await this.execArgs(ctx));
  }
}

export { And, IsFalse, IsTrue, Not, Or, Xor };
