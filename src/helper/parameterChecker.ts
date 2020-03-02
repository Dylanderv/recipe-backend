import { ParameterError } from "../model/ParameterError";
import { SearchParamError } from "../model/EnumError"
import { inputSearchParams } from "recipe-crawler/lib/Marmiton/Model/MarmitonSearchParams";

export function searchParamChecker(searchParam: string, filter: inputSearchParams) {
  if (typeof searchParam !== 'string') {
    throw new ParameterError(SearchParamError.INVALID_SEARCH_FIELD);
  } else if (searchParam.length === 0) {

    throw new ParameterError(SearchParamError.EMPTY_SEARCH_FIELD);
  }

  if (filter.offset && Number.isNaN(filter.offset)) {
    throw new ParameterError(SearchParamError.INVALID_OFFSET);
  }
}