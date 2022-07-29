var mongoose = require("mongoose");

var merit_infoSchema = new mongoose.Schema(
	{
		meritID: { type: String, required: true },
		type: { type: String, required: true },
	},
	{
		collection: "merit_infos",
	}
);

const MeritInfo = mongoose.model("merit_infos", merit_infoSchema);
module.exports = { MeritInfo };
