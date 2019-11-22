import { Response, Request, NextFunction } from 'express';
/**
 * lib/utils/restful.js
 *
 * Accept handlers via function currying, returning express router handler
 *
 * Configuration is via obj with event handlers specified as { [verb]: (req, res) => ... }
 *
 * @example
 *	 app.all("/",
 *		 restful({
 *			 get: (req, res) => res.sendStatus(200),
 *			 post: (req, res) => res.sendStatus(201),
 *			 ...etc
 *		 })
 *	 );
 *
 * @param {Object} handlers
 * @param {Function} [handlers.get] get HTTP handler
 * @param {Function} [handlers.put] put HTTP handler
 * @param {Function} [handlers.post] post HTTP handler
 * @param {Function} [handlers.patch] patch HTTP handler
 * @param {Function} [handlers.delete] delete HTTP handler
 * @return {Function} Express routing middleware configuration
 */
export default (handlers: any) => (req: Request, res: Response, next: NextFunction) => {
    // Extract method from request object
    const method = (req.method || '').toLowerCase();

    // Check if handler exists for HTTP verb
    if (!(method in handlers)) {
        // If no handler exists set allow headers for applicable verbs
        res.set(
            'Allow',
            Object.keys(handlers)
                .join(', ')
                .toUpperCase(),
        );
        // Send HTTP 405 response back to client
        res.sendStatus(405);
    } else {
        // Invoke handler passing through request and response objects.
        handlers[method](req, res, next);
    }
};
