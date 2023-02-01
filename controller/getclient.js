const AgencyModel = require("../models/Agency.model");
const ClientModel = require("../models/Client.model");

module.exports = async (req, res) => {
  try {
    const clients = await ClientModel.aggregate([
      {
        $group: {
          _id: "$_id",
          maxBill: { $max: "$totalBill" },
          clients: { $push: { name: "$name", totalBill: "$totalBill" } },
        },
      },
      {
        $sort: { maxBill: -1 },
      },
    ]);
    const agencies = await AgencyModel.find({
      _id: { $in: clients.map((c) => c._id) },
    });
    const result = clients.map((c) => {
      const agency = agencies.find((a) => a._id === c._id);
      return {
        name: agency.name,
        clients: c.clients.filter((client) => client.totalBill === c.maxBill),
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
