import { Controller, Get, Route, Post } from "tsoa"
import { inputSearchParams } from "recipe-crawler/lib/Marmiton/Model/MarmitonSearchParams";
import { search } from "recipe-crawler"
import { MARMITON_ROUTE } from "../const/RouteControllerConst";

@Route(MARMITON_ROUTE)
export class MarmitonController extends Controller {

  @Get("/")
  public async test(): Promise<string> {
    return "Ok"
  }

  @Post("/search")
  public async searchRecipes(searchField: string, filter: inputSearchParams) {
    return await search(searchField, filter);
  }
}