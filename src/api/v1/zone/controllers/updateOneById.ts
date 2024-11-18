import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import zoneService from "@/lib/zone";
import { requiredIdSchema } from "@/schemas/idValidation";
import { notFoundError, serverError } from "@/utils/errors";
import convertFormData from "@/utils/convertFormData";
import { updateFuelSupplierDTOSchema } from "@/schemas/fuelSupplier";
import { updateZoneDTOSchema } from "@/schemas/zone";

const numericFields: Set<string> = new Set(["record", "milage", "amount"]);

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const convertedData = convertFormData(req.body, numericFields);

    //validate incoming params id
    const validatedId = requiredIdSchema.parse(req.params);

    //Validate incoming body data with defined schema
    const validatedData = updateZoneDTOSchema.parse(convertedData);

    //get single item with validated id
    const data = await zoneService.getSingleById(validatedId);

    if (!data) {
      notFoundError("Item not found!");
    }

    //create new with validated data
    const updated = await zoneService.updateById(
      validatedId,
      validatedData
    );

    if (!updated) {
      serverError("Item not updated");
    }

    //get single item with validated id
    const finalData = await zoneService.getSingleById(validatedId);

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
