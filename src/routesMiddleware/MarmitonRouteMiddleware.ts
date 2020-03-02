import { MarmitonController } from "../controller/marmitonController"
import { BaseContext } from "koa";

export async function testMiddleware(ctx: BaseContext) {
  const marmitonController = new MarmitonController();
  const promise = marmitonController.test();

  ctx.body = await promise;

}