import { Controller, Get, Route, Post, Body, Query } from "tsoa"
import { search, getRecipe } from "recipe-crawler"
import { SearchParams } from "../model/searchParams";
import { MarmitonSearch } from "recipe-crawler/lib/Marmiton/Model/MarmitonSearch";
import { MarmitonRecipe } from "recipe-crawler/lib/Marmiton/Model/MarmitonRecipe";

@Route("marmiton")
export class MarmitonController extends Controller {

  @Get()
  public async test(): Promise<string> {
    return "Ok"
  }

  @Post("search")
  public async searchRecipes(@Body() searchParams: SearchParams): Promise<MarmitonSearch[]> {
    return await search(searchParams.searchField, searchParams.filters ? searchParams.filters : {});
  }

  @Post("recipe")
  public async getRecipe(@Query() url: string): Promise<MarmitonRecipe> {
    return await getRecipe(url);
  }
}
