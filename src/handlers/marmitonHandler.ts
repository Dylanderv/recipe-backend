import { BaseContext } from 'koa';
import { RouterContext } from "koa-router"
import { inputSearchParams } from 'recipe-crawler/lib/Marmiton/Model/MarmitonSearchParams';
import { HttpError } from "../model/HttpError"
import { ErrorCode, ErrorMessage } from "../model/EnumError"
import { searchParamChecker } from "../helper/parameterChecker";
import { MarmitonController } from '../controller/marmitonController';

export class MarmitonHandler {
  public static test(ctx: BaseContext) {
    ctx.body = "Hello"
  }

  public static async searchMarmiton(ctx: RouterContext) {
    // TODO: Use bodyparser ctx type with body included
    let params = (ctx.request as any).body;
    let filter: inputSearchParams = {
      type: params.type,
      cost: params.cost,
      difficulty: params.difficulty,
      offset: parseInt(params.offset),
      particularity: params.particularity,
      recipeType: params.recipeType
    };
    let searchField = params.search;
    try {
      searchParamChecker(searchField, filter);
    } catch (err) {
      throw new HttpError(ErrorCode.INVALID_PARAMETERS, ErrorMessage.INVALID_PARAMETERS + err.message)
    }
    try {
      ctx.body = await MarmitonController.searchRecipes(searchField, filter);
    } catch (err) {
      throw new HttpError(ErrorCode.INTERNAL_ERROR, ErrorMessage.INTERNAL_ERROR + err);
    }
  }

  public static getRecipe() {

  }
}
