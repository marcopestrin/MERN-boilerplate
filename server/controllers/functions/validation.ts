import { NextFunction } from "express";

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    // inseire qui la validazione del body quando faccio update
    return true
};

export const validationInput = (username: string, password: string) => {
    // inserire qui il valiatore dei dati di input
    return true;
};

export const isValidPassword = (password: string) => {
    // validatore della password in caso di recovery
    return true
};