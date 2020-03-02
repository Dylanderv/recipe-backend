import Router from "koa-router";
import { MarmitonHandler } from "../handlers/marmitonHandler"
import { MARMITON_ROUTE } from "../const/RouteControllerConst";
import { testMiddleware } from "../routesMiddleware/MarmitonRouteMiddleware";

export const marmitonRouter = new Router({prefix: "/" + MARMITON_ROUTE});

marmitonRouter.get("/", testMiddleware);

// marmitonRouter.post("/search", MarmitonHandler.searchMarmiton);
