import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import vehicleService from "@/lib/vehicle";
import { vehiclesQuerySchema } from "@/schemas/vehicle";

const getMulti = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = vehiclesQuerySchema.parse(req.query);

    //get all items with validated queries
    const data = await vehicleService.getMulti(validatedData);

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
