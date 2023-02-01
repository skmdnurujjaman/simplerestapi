const connectDB = require("../db");
const AgencyModel = require("../models/Agency.model");
const ClientModel = require("../models/Client.model");

module.exports = async (req, res) => {
  const session = await connectDB.startSession();
  try {
    const { agency, client } = req.body;

    session.startTransaction();
    const newAgency = new AgencyModel({
      name: agency.name,
      address1: agency.address1,
      address2: agency.address2,
      state: agency.state,
      city: agency.city,
      phoneNumber: agency.phoneNumber,
      createdby: req.userInfo.userId,
    });

    const savedAgency = await newAgency.save();

    const newClient = new ClientModel({
      name: client.name,
      email: client.email,
      phoneNumber: agency.phoneNumber,
      totalBill: agency.totalBill,
      agencyId: savedAgency._id,
      createdby: req.userInfo.userId,
    });

    const savedClient = await newClient.save();
    await session.commitTransaction();

    res.status(200).json({
      message: "Data inserted successfully",
      savedAgency,
      savedClient,
    });
  } catch (error) {
    console.log("error");
    await session.abortTransaction();
  }
  session.endSession();
};
