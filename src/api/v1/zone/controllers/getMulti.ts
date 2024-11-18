import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import zoneService from "@/lib/zone";
import { zonesQuerySchema } from "@/schemas/zone";

const getMulti = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = zonesQuerySchema.parse(req.query);

    //get all items with validated queries
    const data = await zoneService.getMulti(validatedData);

    const responseData = {
      status: 200,
      message: "All items get successfully!",
      data: data,
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
};

export default getMulti;
