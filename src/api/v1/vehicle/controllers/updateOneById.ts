import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import vehicleService from "@/lib/vehicle";
import { requiredIdSchema } from "@/schemas/idValidation";
import { notFoundError, serverError } from "@/utils/errors";
import convertFormData from "@/utils/convertFormData";
import { updateVehicleTOSchema } from "@/schemas/vehicle";

const numericFields: Set<string> = new Set(["record", "milage", "amount"]);

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const convertedData = convertFormData(req.body, numericFields);

    //validate incoming params id
    const validatedId = requiredIdSchema.parse(req.params);

    //Validate incoming body data with defined schema
    const validatedData = updateVehicleTOSchema.parse(convertedData);

    //get single item with validated id
    const data = await vehicleService.getSingleById(validatedId);

    if (!data) {
      notFoundError("Item not found!");
    }

    //create new with validated data
    const updated = await vehicleService.updateById(
      validatedId,
      validatedData
    );

    if (!updated) {
      serverError("Item not updated");
    }

    //get single item with validated id
    const finalData = await vehicleService.getSingleById(validatedId);

    const responseData = {
      status: 201,
      message: "Item updated successfully!",
      data: finalData,
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    //send error response
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
};

export default updateById;
