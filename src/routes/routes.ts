/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MarmitonController } from './../controller/marmitonController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controller/userController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controller/authController';
import { koaAuthentication } from './../auth/index';
import * as KoaRouter from 'koa-router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "inputSearchParams": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["all"] },
            "offset": { "dataType": "double" },
            "recipeType": { "dataType": "array", "array": { "dataType": "enum", "enums": ["Entrée", "Plat", "principal", "Dessert", "Amuse-gueule", "Accompagnement", "Sauce", "Boisson", "Confiserie", "Conseil"] } },
            "difficulty": { "dataType": "enum", "enums": ["très facile", "facile", "Niveau moyen", "difficile"] },
            "cost": { "dataType": "enum", "enums": ["bon marché", "Coût moyen", "assez cher"] },
            "particularity": { "dataType": "enum", "enums": ["Végétarien", "Sans gluten", "Végan", "Sans lactose"] },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchParams": {
        "dataType": "refObject",
        "properties": {
            "searchField": { "dataType": "string", "required": true },
            "filters": { "ref": "inputSearchParams" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MarmitonRecipeStep": {
        "dataType": "refObject",
        "properties": {
            "step": { "dataType": "double", "required": true },
            "info": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MarmitonRecipe": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string" },
            "ingredients": { "dataType": "any", "required": true },
            "duration": { "dataType": "nestedObjectLiteral", "nestedProperties": { "cookingDuration": { "dataType": "double", "required": true }, "sleepDuration": { "dataType": "double" }, "preparationDuration": { "dataType": "double", "required": true }, "totalDuration": { "dataType": "double", "required": true } }, "required": true },
            "nbPerson": { "dataType": "double", "required": true },
            "steps": { "dataType": "array", "array": { "ref": "MarmitonRecipeStep" }, "required": true },
            "stepNumber": { "dataType": "double", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "username": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "hashedPassword": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "roles": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserInput": {
        "dataType": "refObject",
        "properties": {
            "username": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthInput": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    router.get('/api/marmiton',
        async (context: any, next: any) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new MarmitonController();

            const promise = controller.test.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/marmiton/search',
        async (context: any, next: any) => {
            const args = {
                searchParams: { "in": "body", "name": "searchParams", "required": true, "ref": "SearchParams" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new MarmitonController();

            const promise = controller.searchRecipes.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/marmiton/recipe',
        async (context: any, next: any) => {
            const args = {
                url: { "in": "query", "name": "url", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new MarmitonController();

            const promise = controller.getRecipe.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.get('/api/user',
        async (context: any, next: any) => {
            const args = {
                id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UserController();

            const promise = controller.getUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/user',
        async (context: any, next: any) => {
            const args = {
                userInput: { "in": "body", "name": "userInput", "required": true, "ref": "UserInput" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UserController();

            const promise = controller.createUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/auth/login',
        async (context: any, next: any) => {
            const args = {
                authInput: { "in": "body", "name": "authInput", "required": true, "ref": "AuthInput" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.authenticate.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/auth/refreshTokens',
        async (context: any, next: any) => {
            const args = {
                refreshToken: { "in": "body", "name": "refreshToken", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.refreshTokens.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/auth/logout',
        authenticateMiddleware([{ "jwt": [] }]),
        async (context: any, next: any) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.logout.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async (context: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = async (user: any) => {
                if (!success) {
                    success = true;
                    responded++;
                    context.request['user'] = user;
                    await next();
                }
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            const fail = async (error: any) => {
                responded++;
                if (responded == security.length && !success) {
                    // this is an authentication error
                    context.status = error.status || 401;
                    context.throw(context.status, error.message, error);
                } else if (success) {
                    // the authentication was a success but arriving here means the controller
                    // probably threw an error that we caught as well
                    // so just pass it on
                    throw error;
                }
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(koaAuthentication(context.request, name, secMethod[name]));
                    }

                    return Promise.all(promises)
                        .then((users) => succeed(users[0]))
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        return koaAuthentication(context.request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data || data === false) {
                    context.body = data;
                    context.status = 200;
                } else {
                    context.status = 204;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        context.set(name, headers[name]);
                    });

                    const statusCode = controllerObj.getStatus();
                    if (statusCode) {
                        context.status = statusCode;
                    }
                }
                return next();
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.throw(context.status, error.message, error);
            });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, { "specVersion": 2 });
                case 'path':
                    return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, { "specVersion": 2 });
                case 'header':
                    return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, { "specVersion": 2 });
                case 'body':
                    return validationService.ValidateParam(args[key], context.request.body, name, errorFields, name + '.', { "specVersion": 2 });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', { "specVersion": 2 });
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
