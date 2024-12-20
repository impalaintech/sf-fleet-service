import { z } from "zod";

export const createFuelSupplierDTOSchema = z.object({
    id: z.string(),
    FuelSupplier_id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    lat: z.number().optional(),
    long: z.number().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const updateFuelSupplierDTOSchema = createFuelSupplierDTOSchema.omit({}).partial();

export const fuelSuppliersQuerySchema = z.object({
    sort: z.enum(["ASC", "DESC"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    search: z.string().optional(),
});

export type createFuelSupplierInputsTypes = z.infer<typeof createFuelSupplierDTOSchema>;
export type updateFuelSupplierInputTypes = z.infer<typeof updateFuelSupplierDTOSchema>;
export type fuelSuppliersQueryInputTypes = z.infer<typeof fuelSuppliersQuerySchema>;
