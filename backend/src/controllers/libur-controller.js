import ResponseError from "../error/response-error.js";
import Libur from "../models/libur-schema.js";

export const togglePerpekan = async (req, res, next) => {
  try {
    const { hari, status } = req.body;

    let libur = await Libur.findOne();

    if (!libur) {
      libur = Libur({
        perpekan: [
          {
            hari,
            status,
          },
        ],
      });
    } else {
      const index = libur.perpekan.findIndex((p) => p.hari === hari);

      if (index !== -1) {
        libur.perpekan[index].status = status;
      } else {
        libur.perpekan.push({ hari, status });
      }
    }

    await libur.save();

    res.status(200).json({
      success: true,
      message: "Berhasil mengupdate libur perpekan",
      libur,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getLibur = async (req, res, next) => {
  try {
    let libur = (await Libur.findOne()) || [];

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil hari libur",
      libur,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
