import ResponseError from "../error/response-error.js";
import Libur from "../models/libur-model.js";

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
      message: "Berhasil mengubah libur perpekan",
      libur,
    });
  } catch (error) {
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
    next(error);
  }
};

export const liburNasional = async (req, res, next) => {
  try {
    const { tanggal, keterangan } = req.body.data;

    let libur = await Libur.findOne();

    if (!libur) {
      libur = Libur({
        nasional: [
          {
            tanggal,
            keterangan,
          },
        ],
      });
    } else {
      const formatTanggal = new Date(tanggal).toISOString().split("T")[0];

      const isExist = libur.nasional.some(
        (free) =>
          new Date(free.tanggal).toISOString().split("T")[0] === formatTanggal
      );

      if (isExist) {
        throw new ResponseError(400, "Libur pada tanggal yang sama sudah ada.");
      }

      libur?.nasional?.push({ tanggal, keterangan });
    }

    await libur.save();

    res.status(200).json({
      success: true,
      message: "Berhasil menambah hari libur nasional.",
      libur,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLiburNasional = async (req, res, next) => {
  try {
    const { tanggal } = req.params;

    const formatTanggal = new Date(tanggal);

    const libur = await Libur.updateOne(
      {},
      {
        $pull: {
          nasional: { tanggal: formatTanggal },
        },
      }
    );

    if (libur.modifiedCount === 0) {
      throw new ResponseError(404, "Hari libur tidak detemukan");
    }

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus hari libur nasional.",
    });
  } catch (error) {
    next(error);
  }
};
