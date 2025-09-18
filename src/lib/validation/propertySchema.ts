// src/validation/propertySchema.ts
import { z } from "zod";

export const getPropertySchema = (t: (key: string, opts?: Record<string, any>) => string) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(5, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.title_min", { min: 5 }) })
      .max(120, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.title_max", { max: 120 }) }),

    city: z
      .string()
      .trim()
      .min(3, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.city_min", { min: 3 }) })
      .regex(/^[\p{L}\s'.-]{2,}$/u, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.city_invalid") }),

    country: z
      .string()
      .trim()
      .min(3, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.country_min", { min: 3 }) })
      .regex(/^[\p{L}\s'.-]{2,}$/u, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.country_invalid") }),

    property_type: z.enum(["apartment", "studio", "house", "other"], {
      message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.property_type_required"),
    }),

    building_name: z
      .string()
      .trim()
      .min(5, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.building_name_min", { min: 5 }) })
      .regex(/^[\p{L}\p{N}\s'.-]+$/u, {
        message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.building_name_invalid"),
      }),

    building_number: z
      .string()
      .trim()
      .min(3, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.building_number_min", { min: 3 }) })
      .regex(/^[\p{L}\p{N}\-\/]{1,20}$/u, {
        message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.building_number_invalid"),
      }),

    floor_number: z.number().min(-3, {
      message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.floor_number_min", { min: -3 }),
    }),

    // number_of_rooms: z.preprocess(
    //   (val) => (val === "" ? undefined : Number(val)),
    //   z.number().min(0, {
    //     message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.number_of_rooms_min", { min: 0 }),
    //   })
    // ),

    description: z
      .string()
      .max(1000, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.description_max", { max: 1000 }) })
      .optional(),

    gender_preference: z.enum(["male", "female", "any"], {
      message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.gender_preference_invalid"),
    }),

    location_lat: z
      .number()
      .min(-90, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.latitude_range") })
      .max(90, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.latitude_range") }),

    location_lon: z
      .number()
      .min(-180, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.longitude_range") })
      .max(180, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.longitude_range") }),

    images: z
      .array(
        z.any().refine((file) => file instanceof File, {
          message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.images_required"),
        })
      )
      .min(1, { message: t("landlord.manageListings.addPropertyPage.detailsCard.validation.images_required") }),
  });

export type PropertyFormData = z.infer<ReturnType<typeof getPropertySchema>>;
