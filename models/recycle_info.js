var mongoose = require("mongoose");

var recycle_infoSchema = new mongoose.Schema(
	{
		totalMerit: { type: Number, required: true },
		studentInfo: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "student_infos",
		},
	},
	{
		collection: "merit_infos",
	}
);

const RecycleInfo = mongoose.model("recycle_infos", recycle_infoSchema);
module.exports = { RecycleInfo };
