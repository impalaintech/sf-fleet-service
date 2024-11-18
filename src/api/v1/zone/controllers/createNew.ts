import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import zoneService from "@/lib/zone";
import convertFormData from "@/utils/convertFormData";
import { createZoneDTOSchema } from "@/schemas/zone";

const numericFields: Set<string> = new Set(["record", "amount", "milage"]);

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const convertedData = convertFormData(req.body, numericFields);

    //Validate incoming body data with defined schema
    const validatedData = createZoneDTOSchema.parse(convertedData);

    //check zone 
    // const service = await prisma.specialties.findUnique({
    //   where: { id: validatedData.specialty_id },
    // });

    // if (!service) {
    //   notFoundError('Specialty not found');
    // }

    //create new with validated data
    const created = await zoneService.createNew(validatedData);

    const responseData = {
      status: 201,
      message: "New item created successfully!",
      data: created,
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

export default createNew;
