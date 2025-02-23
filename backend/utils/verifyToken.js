import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    if (token === "admin-secret-token-123") {
        req.user = { id: "admin", isAdmin: true };
        return next();
    }

    if (token === "user-secret-token-456") {
        req.user = { id: "user", isAdmin: false };
        return next();
    }

    return next(createError(403, "Invalid token"));
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);

        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not an admin"));
        }
    });
};
