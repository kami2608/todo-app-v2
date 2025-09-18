import z from "zod";

function getCurrentDateTime() {
  return new Date();
}

export const DateSchema = z
  .object({
    startDate: z.iso
      .datetime({ local: true })
      .refine(
        (val) => {
          if (!val) return true;
          return new Date(val) > getCurrentDateTime();
        },
        {
          error: "Date must be in the future!",
        },
      )
      .optional(),
    endDate: z.iso.datetime({ local: true }).optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      error: "Due date must be after start date!",
      path: ["endDate"],
    },
  );
