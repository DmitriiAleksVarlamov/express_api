enum StatusCode {
  OK = 200,
  NoContent = 204,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

enum Sessions {
  userAgent = 'agent',
}

export { StatusCode, Sessions };
