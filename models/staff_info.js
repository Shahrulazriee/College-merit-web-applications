var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

const SALT_FACTOR = 10;

/* Creating a schema for the student_info collection. */
var staff_infoSchema = new mongoose.Schema(
	{
		staffID: { type: String, required: true },
		password: { type: String, required: false },
		role: { type: Boolean, required: true },
		staffName: { type: String, required: true },
		email: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		// status: { type: Boolean, required: true },
	},
	{
		collection: "staff_infos",
	}
);

staff_infoSchema.pre("save", function (done) {
	var staff = this;

	if (!staff.isModified("password")) {
		return done();
	}

	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) {
			return done(err);
		}
		bcrypt.hash(staff.password, salt, function (err, hashedPassword) {
			if (err) {
				return done(err);
			}
			staff.password = hashedPassword;
			done();
		});
	});
});

staff_infoSchema.methods.checkPassword = function (guess, done) {
	if (this.password != null) {
		bcrypt.compare(guess, this.password, function (err, isMatch) {
			done(err, isMatch);
		});
	}
};

/* Creating a model for each of the schemas. */
const StaffInfo = mongoose.model("staff_infos", staff_infoSchema);

module.exports = { StaffInfo };
