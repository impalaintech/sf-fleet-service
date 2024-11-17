import { z } from "zod";

export const createZoneDTOSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    lat: z.number().optional(),
    long: z.number().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const updateZoneTOSchema = createZoneDTOSchema.omit({}).partial();

export const zonesQuerySchema = z.object({
    sort: z.enum(["ASC", "DESC"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    search: z.string().optional(),
});

export type createZoneInputsTypes = z.infer<typeof createZoneDTOSchema>;
export type updateZoneInputTypes = z.infer<typeof updateZoneTOSchema>;
export type zonesQueryInputTypes = z.infer<typeof zonesQuerySchema>;
