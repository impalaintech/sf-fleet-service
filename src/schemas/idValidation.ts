import { z } from "zod";

export const requiredIdSchema = z.object({
  id: z.string(),
  // export const requiredIdSchema = z.object({
  //   id: z.string().transform((val) => {
  //     const parsedId = Number(val);
  //     if (!Number.isInteger(parsedId) || parsedId <= 0) {
  //       throw new z.ZodError([
  //         {
  //           path: ["id"],
  //           message: "ID must be a positive integer",
  //           code: z.ZodIssueCode.custom,
  //         },
  //       ]);
  //     }
  //     return parsedId;
  //   }),
});

export type requiredIdTypes = z.infer<typeof requiredIdSchema>;
