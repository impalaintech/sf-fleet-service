import prisma from "@/prisma";
import {
    createZoneInputsTypes,
    updateZoneInputTypes,
    zonesQueryInputTypes
} from "@/schemas/zone";
import { requiredIdTypes } from "@/schemas/idValidation";

//get single by id
const getSingleById = async (idObj: requiredIdTypes) => {
    const { id } = idObj;

    //extract id from validated id by zod
    const data = await prisma.zone.findUnique({
        where: { id },
        include: {
            institution: true,
        },
    });

    return data;
};

//Get multiple
const getMulti = async (queries: zonesQueryInputTypes) => {

    const { search, status} = queries

    const where: any = {};

    // if (status) {
    //     where.status = status;
    // }

    // if (approve_status) {
    //     where.status = approve_status;
    // }

    // if (search) {
    //     where.OR = [
    //         { designation: { contains: search, mode: 'insensitive' } },
    //         { is_currently_working_here: { contains: search, mode: 'insensitive' } },
    //     ];
    // }

    // if (dr_id) {
    //     where.dr_id = dr_id;
    // }

    // if (institute_id) {
    //     where.institute_id = institute_id;
    // }

    const data = await prisma.zone.findMany({
        where,
        // orderBy: [{ createdAt: order_by?.toLowerCase() == "asc" ? 'asc' : 'desc' }],
        include: {
            institution: true,
        },
    })

    return data;
};

// Create
const createNew = async (info: createZoneInputsTypes) => {
    const data = await prisma.zone.create({
        data: {
            ...info,
        },
    });

    return data;
};

//Update
const updateById = async (
    idObj: requiredIdTypes,
    info: updateZoneInputTypes
) => {
    //extract id from validated id by zod
    const { id } = idObj;

    const updatedData = await prisma.zone.update({
        where: { id: id },
        data: { ...info },
    });
    return updatedData;
};

//Delete single
const deleteById = async (idObj: requiredIdTypes) => {
    //extract id from validated id by zod
    const { id } = idObj;

    const deleted = await prisma.zone.delete({
        where: { id: id },
    });

    return deleted;
};

export = {
    getSingleById,
    getMulti,
    createNew,
    updateById,
    deleteById,
};
