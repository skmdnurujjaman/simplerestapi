const ClientModel = require("../models/Client.model");

module.exports = async (req, res) => {
  const { _id, name, agencyId, email, phoneNumber, totalBill } = req.body;

  ClientModel.findOne({ _id }, (err, doc) => {
    if (err) {
      res.send("Something went wrong! try again later.");
      console.log(err);
    } else {
      ClientModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            name,
            agencyId,
            email,
            phoneNumber,
            totalBill,
            updatedBy: req.userInfo.userId,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            res.send("Something went wrong! try again later.");
            console.log(err);
          } else {
            res.send("Client edited successfully!");
          }
        }
      );
    }
  });
};
