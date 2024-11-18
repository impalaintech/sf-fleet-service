import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import zoneService from "@/lib/zone";
import { requiredIdSchema } from "@/schemas/idValidation";
import { notFoundError } from "@/utils/errors";

const getSingleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await zoneService.getSingleById(validatedData);

    if (!data) {
      notFoundError("Item not found!");
    }

    const responseData = {
      status: 200,
      message: "Get details successfully!", 
      data: data,
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    //send error response
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.log("error is : ", error);
      next(error);
    }
  }
};

export default getSingleById;
