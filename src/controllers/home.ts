import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
    res.render("home", {
        title: "Healthy Feeding guidelines for Infants"
    });
};
