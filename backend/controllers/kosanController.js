const Kosan = require("../models/Kosan");

// Fungsi createKosan (Tidak diubah)
exports.createKosan = async (req, res) => {
  try {
    const { lat, lng, ...rest } = req.body.lokasi;
    const kosan = new Kosan({
      ...req.body,
      lokasi: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });
    await kosan.save();
    res.status(201).json(kosan);
  } catch (err) {
    console.error("[ERROR] createKosan:", err);
    res.status(400).json({ error: "Gagal membuat kosan" });
  }
};

// Fungsi getAllKosan (Sudah dimodifikasi agar cocok dengan frontend)
exports.getAllKosan = async (req, res) => {
  try {
    // Mengambil parameter dari frontend Anda (location, minBudget, maxBudget)
    const { location, minBudget, maxBudget, search } = req.query;

    const match = {}; // Objek untuk menampung semua filter // Filter berdasarkan nama (jika ada parameter 'search')

    // Jika Anda punya field 'tersedia' di model, Anda bisa uncomment baris ini
    // match.tersedia = true;

    if (search) {
      match.nama = { $regex: search, $options: "i" };
    } // Filter berdasarkan lokasi (kota)

    if (location) {
      // Menggunakan regex agar tidak peduli huruf besar/kecil (case-insensitive)
      match.kota = { $regex: `^${location}$`, $options: "i" };
    } // Filter berdasarkan rentang harga (budget)

    if (minBudget && maxBudget) {
      match.harga = {
        $gte: parseInt(minBudget),
        $lte: parseInt(maxBudget),
      };
    } // Pipeline agregasi dimulai dengan $match

    const pipeline = [{ $match: match }]; // Gabungkan dengan data review (lookup)

    pipeline.push(
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "kosan_id",
          as: "reviews",
        },
      },
      {
        $addFields: {
          rating_avg: { $avg: "$reviews.rating" },
          jumlah_review: { $size: "$reviews" },
        },
      },
      {
        $project: {
          // Hapus field reviews yang detail dari hasil akhir
          reviews: 0,
        },
      }
    );

    const kosans = await Kosan.aggregate(pipeline);
    res.json(kosans);
  } catch (err) {
    console.error("[ERROR] getAllKosan:", err);
    res.status(500).json({ error: "Gagal mengambil data kosan" });
  }
};

// Fungsi getKosanById (Tidak diubah)
exports.getKosanById = async (req, res) => {
  try {
    const kosan = await Kosan.findById(req.params.id);
    if (!kosan) return res.status(404).json({ error: "Kosan tidak ditemukan" });
    res.json(kosan);
  } catch (err) {
    console.error("[ERROR] getKosanById:", err);
    res.status(500).json({ error: "Gagal mengambil data kosan" });
  }
};
