/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriesController } from './controllers/categories';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CompaniesController } from './controllers/companies';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ElementsController } from './controllers/elements';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MenuController } from './controllers/menu';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrdersController } from './controllers/orders';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PositionsController } from './controllers/positions';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TablesController } from './controllers/tables';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './controllers/user';
import { expressAuthentication } from './services/user/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ICategory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IElement": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "element": {"dataType":"string","required":true},
            "price": {"dataType":"string","required":true},
            "priceForCount": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrder": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "tableId": {"dataType":"double"},
            "createTime": {"dataType":"string"},
            "readyTime": {"dataType":"string"},
            "finishTime": {"dataType":"string"},
            "comment": {"dataType":"string"},
            "status": {"dataType":"string"},
            "discount": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "orderId": {"dataType":"double"},
            "tableId": {"dataType":"double","required":true},
            "createTime": {"dataType":"string"},
            "positions": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string"},"additional":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"count":{"dataType":"double","required":true},"id":{"dataType":"double","required":true}}}},"positionId":{"dataType":"double","required":true},"id":{"dataType":"double"}}},"required":true},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDayReportResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "time": {"dataType":"string","required":true},
            "date": {"dataType":"string","required":true},
            "discount": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "positions": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreatePositionRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "price": {"dataType":"string","required":true},
            "isAdditional": {"dataType":"boolean","required":true},
            "sort": {"dataType":"double"},
            "categories": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"categoryId":{"dataType":"double","required":true}}},"required":true},
            "composition": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"weight":{"dataType":"string","required":true},"element":{"dataType":"double","required":true}}},"required":true},
            "additional": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"positionId":{"dataType":"double","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITableImageResponse": {
        "dataType": "refObject",
        "properties": {
            "filePath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITable": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "number": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "positionX": {"dataType":"string","required":true},
            "positionY": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthorizationResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthorizationRequest": {
        "dataType": "refObject",
        "properties": {
            "login": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "login": {"dataType":"string"},
            "password": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/categories/search',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.search)),

            function CategoriesController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoriesController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/categories/create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.create)),

            function CategoriesController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICategory"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoriesController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/categories/update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.update)),

            function CategoriesController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICategory"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoriesController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/categories/remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.remove)),

            function CategoriesController_remove(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICategory"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoriesController();


              const promise = controller.remove.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/companies/changePassword',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CompaniesController)),
            ...(fetchMiddlewares<RequestHandler>(CompaniesController.prototype.changePassword)),

            function CompaniesController_changePassword(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"newPassword":{"dataType":"string","required":true},"oldPassword":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CompaniesController();


              const promise = controller.changePassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/elements/search',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.search)),

            function ElementsController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/elements/create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.create)),

            function ElementsController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IElement"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/elements/update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.update)),

            function ElementsController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IElement"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/elements/remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.remove)),

            function ElementsController_remove(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IElement"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.remove.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/menu/search',
            ...(fetchMiddlewares<RequestHandler>(MenuController)),
            ...(fetchMiddlewares<RequestHandler>(MenuController.prototype.search)),

            function MenuController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MenuController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/search',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.search)),

            function OrdersController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.create)),

            function OrdersController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IOrderCreateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.update)),

            function OrdersController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IOrderCreateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.remove)),

            function OrdersController_remove(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.remove.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/order-position-start',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.orderPositionStart)),

            function OrdersController_orderPositionStart(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"orderPositionId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.orderPositionStart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/order-position-ready',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.orderPositionReady)),

            function OrdersController_orderPositionReady(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"orderPositionId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.orderPositionReady.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/order-position-given',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.orderPositionGiven)),

            function OrdersController_orderPositionGiven(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"orderPositionId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.orderPositionGiven.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/order-position-restart',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.orderPositionRestart)),

            function OrdersController_orderPositionRestart(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"orderPositionId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.orderPositionRestart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/finish',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.finish)),

            function OrdersController_finish(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"discount":{"dataType":"double","required":true},"id":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.finish.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/get-day-report',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.getDayReport)),

            function OrdersController_getDayReport(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"date":{"dataType":"datetime","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.getDayReport.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/day-report',
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.dayReport)),

            function OrdersController_dayReport(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"stringDate":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.dayReport.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/get-day-positions-report',
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.getDayPositionsStatic)),

            function OrdersController_getDayPositionsStatic(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"stringDate":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.getDayPositionsStatic.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/orders/get-period-positions-report',
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.getPeriodPositionsStatic)),

            function OrdersController_getPeriodPositionsStatic(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"stringEndDate":{"dataType":"string","required":true},"stringStartDate":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.getPeriodPositionsStatic.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/positions/search',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(PositionsController)),
            ...(fetchMiddlewares<RequestHandler>(PositionsController.prototype.search)),

            function PositionsController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PositionsController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/positions/create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(PositionsController)),
            ...(fetchMiddlewares<RequestHandler>(PositionsController.prototype.create)),

            function PositionsController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICreatePositionRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PositionsController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/positions/update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(PositionsController)),
            ...(fetchMiddlewares<RequestHandler>(PositionsController.prototype.update)),

            function PositionsController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICreatePositionRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PositionsController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/positions/remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(PositionsController)),
            ...(fetchMiddlewares<RequestHandler>(PositionsController.prototype.remove)),

            function PositionsController_remove(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PositionsController();


              const promise = controller.remove.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables/uploadImage',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            upload.array('files'),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.uploadImage)),

            function TablesController_uploadImage(request: any, response: any, next: any) {
            const args = {
                    files: {"in":"formData","name":"files","required":true,"dataType":"array","array":{"dataType":"file"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.uploadImage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables/findImage',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.findImage)),

            function TablesController_findImage(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.findImage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables/search',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.search)),

            function TablesController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables/create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.create)),

            function TablesController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ITable"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables/update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.update)),

            function TablesController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ITable"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables/remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.remove)),

            function TablesController_remove(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ITable"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.remove.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/authorization',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.authorization)),

            function UserController_authorization(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"AuthorizationRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.authorization.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/whoami',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.whoami)),

            function UserController_whoami(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.whoami.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/get-users-for-company',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsersForCompany)),

            function UserController_getUsersForCompany(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUsersForCompany.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
