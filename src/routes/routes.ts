/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, TsoaResponse, HttpStatusCodeLiteral } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MarmitonController } from './../controller/marmitonController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controller/userController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controller/authController';
import { koaAuthentication } from './../auth/index';
import * as KoaRouter from '@koa/router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "MarmitonSearchCategory": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["Category"], "required": true },
            "title": { "dataType": "string", "required": true },
            "img": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "link": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MarmitonSearchRecipe": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["Recipe"], "required": true },
            "title": { "dataType": "string", "required": true },
            "img": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "rating": { "dataType": "double" },
            "ratingFrac": { "dataType": "double" },
            "nbRating": { "dataType": "double" },
            "duration": { "dataType": "double", "required": true },
            "link": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "category": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MarmitonSearch": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "MarmitonSearchCategory" }, { "ref": "MarmitonSearchRecipe" }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "recipeType": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["Entrée"] }, { "dataType": "enum", "enums": ["Plat"] }, { "dataType": "enum", "enums": ["principal"] }, { "dataType": "enum", "enums": ["Dessert"] }, { "dataType": "enum", "enums": ["Amuse-gueule"] }, { "dataType": "enum", "enums": ["Accompagnement"] }, { "dataType": "enum", "enums": ["Sauce"] }, { "dataType": "enum", "enums": ["Boisson"] }, { "dataType": "enum", "enums": ["Confiserie"] }, { "dataType": "enum", "enums": ["Conseil"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "difficultyType": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["très facile"] }, { "dataType": "enum", "enums": ["facile"] }, { "dataType": "enum", "enums": ["Niveau moyen"] }, { "dataType": "enum", "enums": ["difficile"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "costType": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["bon marché"] }, { "dataType": "enum", "enums": ["Coût moyen"] }, { "dataType": "enum", "enums": ["assez cher"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "particularityType": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["Végétarien"] }, { "dataType": "enum", "enums": ["Sans gluten"] }, { "dataType": "enum", "enums": ["Végan"] }, { "dataType": "enum", "enums": ["Sans lactose"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "inputSearchParams": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["all"] },
            "offset": { "dataType": "double" },
            "recipeType": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "recipeType" } },
            "difficulty": { "ref": "difficultyType" },
            "cost": { "ref": "costType" },
            "particularity": { "ref": "particularityType" },
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
    router.get('/marmiton',
        async (context: any, next: any) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new MarmitonController();

            const promise = controller.test.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/marmiton/search',
        async (context: any, next: any) => {
            const args = {
                searchParams: { "in": "body", "name": "searchParams", "required": true, "ref": "SearchParams" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new MarmitonController();

            const promise = controller.searchRecipes.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/marmiton/recipe',
        async (context: any, next: any) => {
            const args = {
                url: { "in": "query", "name": "url", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new MarmitonController();

            const promise = controller.getRecipe.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.get('/user',
        async (context: any, next: any) => {
            const args = {
                id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UserController();

            const promise = controller.getUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/user',
        async (context: any, next: any) => {
            const args = {
                userInput: { "in": "body", "name": "userInput", "required": true, "ref": "UserInput" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UserController();

            const promise = controller.createUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/auth/login',
        async (context: any, next: any) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                authInput: { "in": "body", "name": "authInput", "required": true, "ref": "AuthInput" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.login.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/auth/refreshTokens',
        async (context: any, next: any) => {
            const args = {
                data: { "in": "body", "name": "data", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "refreshtoken": { "dataType": "string", "required": true } } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.refreshTokens.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/auth/refreshAccessToken',
        async (context: any, next: any) => {
            const args = {
                data: { "in": "body", "name": "data", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "refreshtoken": { "dataType": "string", "required": true } } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.refreshAccessToken.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/auth/logout',
        authenticateMiddleware([{ "jwt": [] }]),
        async (context: any, next: any) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                data: { "in": "body", "name": "data", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "refreshtoken": { "dataType": "string", "required": true } } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.logout.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/auth/register',
        async (context: any, next: any) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                userInput: { "in": "body", "name": "userInput", "required": true, "ref": "UserInput" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.register.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.get('/auth/isauth',
        authenticateMiddleware([{ "jwt": [] }]),
        async (context: any, next: any) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.isAuth.apply(controller, validatedArgs as any);
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                let headers;

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();

                    statusCode = controllerObj.getStatus();
                }
                return returnHandler(context, next, statusCode, data, headers);
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.throw(context.status, error.message, error);
            });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(context: any, next: () => any, statusCode?: number, data?: any, headers: any = {}) {
        if (!context.response.__tsoaResponded) {
            context.set(headers);

            if (data || data === false) {
                context.body = data;
                context.status = 200;
            } else {
                context.status = 204;
            }

            if (statusCode) {
                context.status = statusCode;
            }

            context.response.__tsoaResponded = true;
            return next();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any, next: () => any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'path':
                    return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'header':
                    return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'body':
                    return validationService.ValidateParam(args[key], context.request.body, name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', { "noImplicitAdditionalProperties": "ignore" });
                case 'res':
                    return responder(context, next);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(context: any, next: () => any): TsoaResponse<HttpStatusCodeLiteral, unknown> {
        return function(status, data, headers) {
            returnHandler(context, next, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
