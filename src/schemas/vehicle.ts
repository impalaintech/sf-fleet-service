import { z } from "zod";

export const createVehicleDTOSchema = z.object({
    id: z.string().optional(),
    brand: z.string(),
    vehicle_type: z.enum(["truck", "van"]),
    model: z.string(),
    photo: z.string().optional(),
    engine_capacity: z.number(),
    engine_number: z.string(),
    reg_number: z.string(),
    manufacture_year: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg),z.date()).optional(),
    color: z.string().optional(),
    reg_date: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()).optional(),
    wheel_size: z.string(),
    fuel_type: z.string(),
    tax_token_validity: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()).optional(),
    reg_validity: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()).optional(),
    fitness_validity: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()).optional(),
    insurance_validity: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()).optional(),
    insurance: z.string().optional(),
    milage: z.number(),
    weight: z.string(),
    wheel_base: z.string(),
    status: z.enum(["active", "paused"]).default("active"),
    created_by: z.number().int().optional(),
    updated_by: z.number().int().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const updateVehicleTOSchema = createVehicleDTOSchema.omit({}).partial();

export const vehiclesQuerySchema = z.object({
    sort: z.enum(["ASC", "DESC"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    search: z.string().optional(),
});

export type createVehicleInputsTypes = z.infer<typeof createVehicleDTOSchema>;
export type updateVehicleInputTypes = z.infer<typeof updateVehicleTOSchema>;
export type vehiclesQueryInputTypes = z.infer<typeof vehiclesQuerySchema>;
