var bycrypt = require("bcryptjs");
var mongoose = require("mongoose");

const SALT_FACTOR = 10;

/* Creating a schema for the student_info collection. */
var student_infoSchema = new mongoose.Schema(
	{
		studentID: { type: String, required: true },
		password: { type: String, required: false },
		studentName: { type: String, required: true },
		totalMerit: { type: Number, required: true },
	},
	{
		collection: "student_infos",
	}
);

student_infoSchema.pre("save", function (done) {
	var student = this;

	if (!student.isModified("password")) {
		return done();
	}

	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) {
			return done(err);
		}
		bcrypt.hash(user.password, salt, function (err, hashedPassword) {
			if (err) {
				return done(err);
			}
			student.password = hashedPassword;
			done();
		});
	});
});

student_infoSchema.methods.checkPassword = function (guess, done) {
	if (this.password != null) {
		bcrypt.compare(guess, this.password, function (err, isMatch) {
			done(err, isMatch);
		});
	}
};

/* Creating a model for each of the schemas. */
const StudentInfo = mongoose.model("student_infos", student_infoSchema);

module.exports = { StudentInfo };
