import mongoose from "mongoose";
import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import Center from "../models/Center";

interface CenterParams {
  id: string;
}

interface CenterBody {
  name: string;
  city: string;
  address: string;
  phone: string;
  openingHours: string;
  available?: boolean;
}

interface UpdateCenterBody {
  name?: string;
  city?: string;
  address?: string;
  phone?: string;
  openingHours?: string;
  available?: boolean;
}

export async function getAllCenters(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const centers = await Center.find().sort({
      createdAt: -1,
    });

    return reply.status(200).send({
      success: true,
      count: centers.length,
      centers,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to get donation centers",
    });
  }
}

export async function getCenterById(
  request: FastifyRequest<{
    Params: CenterParams;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return reply.status(400).send({
        success: false,
        message: "Invalid center ID",
      });
    }

    const center = await Center.findById(id);

    if (!center) {
      return reply.status(404).send({
        success: false,
        message: "Donation center not found",
      });
    }

    return reply.status(200).send({
      success: true,
      center,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to get donation center",
    });
  }
}

export async function createCenter(
  request: FastifyRequest<{
    Body: CenterBody;
  }>,
  reply: FastifyReply,
) {
  try {
    const center = await Center.create(
      request.body,
    );

    return reply.status(201).send({
      success: true,
      message: "Donation center created successfully",
      center,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to create donation center",
    });
  }
}

export async function updateCenter(
  request: FastifyRequest<{
    Params: CenterParams;
    Body: UpdateCenterBody;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return reply.status(400).send({
        success: false,
        message: "Invalid center ID",
      });
    }

    const center = await Center.findByIdAndUpdate(
      id,
      request.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!center) {
      return reply.status(404).send({
        success: false,
        message: "Donation center not found",
      });
    }

    return reply.status(200).send({
      success: true,
      message: "Donation center updated successfully",
      center,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to update donation center",
    });
  }
}

export async function deleteCenter(
  request: FastifyRequest<{
    Params: CenterParams;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return reply.status(400).send({
        success: false,
        message: "Invalid center ID",
      });
    }

    const center =
      await Center.findByIdAndDelete(id);

    if (!center) {
      return reply.status(404).send({
        success: false,
        message: "Donation center not found",
      });
    }

    return reply.status(200).send({
      success: true,
      message: "Donation center deleted successfully",
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to delete donation center",
    });
  }
}