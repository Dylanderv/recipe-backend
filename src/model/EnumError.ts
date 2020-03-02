// TODO: Follow http error codes
export enum ErrorCode {
  "INVALID_PARAMETERS" = 1,
  "INTERNAL_ERROR" = 500
}

export enum ErrorMessage {
  "INVALID_PARAMETERS" = "Invalid parameters: ",
  "INTERNAL_ERROR" = "Internal Error: "
}

export enum SearchParamError {
  "EMPTY_SEARCH_FIELD" = "Searchfield cannot be empty",
  "INVALID_SEARCH_FIELD" = "Invalid searchfield",
  "INVALID_OFFSET" = "Offset field must be a number"
}