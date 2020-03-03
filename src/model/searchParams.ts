import { inputSearchParams } from "recipe-crawler/lib/Marmiton/Model/MarmitonSearchParams";

export interface SearchParams {
  searchField: string;
  filters?: inputSearchParams
}
