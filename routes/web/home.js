var express = require("express");
var bcrypt = require("bcryptjs");
var flash = require("connect-flash");

var router = express.Router();

var { StudentInfo } = require("../../models/student_info");
var { StaffInfo } = require("../../models/staff_info");
var { MeritInfo } = require("../../models/merit_info");
var { RecycleInfo } = require("../../models/recycle_info");
// var User = require("../../models/user");
const { default: mongoose } = require("mongoose");
const { append } = require("express/lib/response");

router.get("/", function (req, res) {
	res.render("home/index");
});

// router.use("/student", require("./studentroutes"));
// router.use("/staff", require("./staffroutes"));

//login function for student
router.post("/studentlogin", function (req, res, next) {
	console.log(req.body);
	StudentInfo.findOne(
		{ studentID: req.body.studentID },
		function (err, data) {
			if (data) {
				if (data.password == req.body.password) {
					req.session.studentID = data.studentID;
					session = req.session;
					console.log(session);
					res.render("student/studenthome");
				} else {
					req.flash("message", "Wrong password!!!");
					res.send(req.flash("message"));
				}
			} else {
				req.flash("message", "Wrong student ID!!!");
				res.send(req.flash("message"));
			}
		}
	);
});

router.get("/stafflogin", function (req, res) {
	res.render("home/stafflogin");
});

//login function for staff
// router.post("/stafflogin", function (req, res, next) {
// 	console.log(req.body);
// 	StaffInfo.findOne({ staffID: req.body.staffID }, function (err, data) {
// 		if (data) {
// 			if (bcrypt.compare(req.body.password, data.password)) {
// 				req.session.staffID = data.unique_id;
// 				console.log(data.password);
// 				console.log(req.body.password);
// 				if (data.role == true) {
// 					res.render("admin/adminhome");
// 				} else {
// 					res.render("staff/staffhome");
// 				}
// 			} else {
// 				req.flash("message", "Wrong password!!!");
// 				res.send(req.flash("message"));
// 			}
// 		} else {
// 			req.flash("message", "Wrong staff ID!!!");
// 			res.send(req.flash("message"));
// 		}
// 	});
// });
router.post("/stafflogin", function (req, res, next) {
	console.log(req.body);
	StaffInfo.findOne({ staffID: req.body.staffID }, function (err, data) {
		if (data) {
			bcrypt
				.compare(req.body.password, data.password)
				.then((doMatch) => {
					if (doMatch) {
						if (data.role == true) {
							req.session.staffID = data.staffID;
							session = req.session;
							console.log(session);
							res.render("admin/adminhome");
						} else {
							res.render("staff/staffhome");
						}
					} else {
						req.flash("message", "Wrong password!!!");
						res.send(req.flash("message"));
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			req.flash("message", "Wrong staff ID!!!");
			res.send(req.flash("message"));
		}
	});
});

// user = student !
router.get("/studenthome", function (req, res) {
	res.render("student/studenthome");
});

router.get("/viewprofile", function (req, res) {
	StudentInfo.findOne(
		{ studentID: req.session.studentID },
		function (err, data) {
			if (data) {
				// console.log(data.studentName);
				res.render("student/viewprofile", { data });
			}
		}
	);
});

router.get("/leaderboard", function (req, res) {
	StudentInfo.find({}, function (err, data) {
		if (data) {
			res.render("student/leaderboard", { data });
		}
	}).sort({ totalMerit: -1 });
});

// user = staff !
router.get("/staffhome", function (req, res) {
	res.render("staff/staffhome");
});

router.get("/insertmerit", function (req, res) {
	res.render("staff/insertmerit");
});

router.post("/insertmerit1", function (req, res) {
	console.log(req.body);
	StudentInfo.findOne({ studentID: req.body.search2 }, function (err, data) {
		if (data) {
			res.render("staff/insertmerit1", { data });
		}
	});
});

router.post("/insertmerit2", function (req, res) {
	console.log(req.body);
	MeritInfo.findOne({ meritID: req.body.type }, function (err, data) {
		if (data) {
			if (data.type == "Paper") {
				if (req.body.mass < 500) {
					var merit = 2;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass >= 501 && req.body.mass <= 1000) {
					var merit = 6;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass > 1000) {
					var merit = 10;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				}
			} else if (data.type == "Plastic") {
				if (req.body.mass < 500) {
					var merit = 4;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass >= 501 && req.body.mass <= 1000) {
					var merit = 8;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass > 1000) {
					var merit = 12;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				}
			} else if (data.type == "Metal") {
				if (req.body.mass < 500) {
					var merit = 6;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass >= 501 && req.body.mass <= 1000) {
					var merit = 12;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass > 1000) {
					var merit = 24;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("staff/insertmerit");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				}
			}
		}
	});
});

router.get("/studentlist", function (req, res) {
	StudentInfo.find({}, function (err, data) {
		if (data) {
			res.render("staff/studentlist", { data });
		}
	});
});

router.get("/insertmerit", function (req, res) {
	res.render("staff/insertmerits");
});

router.get("/studentlist1", function (req, res) {
	res.render("staff/studentlist1");
});

// admin
router.get("/adminhome", function (req, res) {
	res.render("admin/adminhome");
});

router.get("/insertmerits", function (req, res) {
	res.render("admin/insertmerits");
});

router.post("/insertmerits1", function (req, res) {
	console.log(req.body);
	StudentInfo.findOne({ studentID: req.body.search2 }, function (err, data) {
		if (data) {
			res.render("admin/insertmerits1", { data });
		}
	});
});

router.post("/insertmerits2", function (req, res) {
	console.log(req.body);
	MeritInfo.findOne({ meritID: req.body.type }, function (err, data) {
		if (data) {
			if (data.type == "Paper") {
				if (req.body.mass < 500) {
					var merit = 2;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass >= 501 && req.body.mass <= 1000) {
					var merit = 6;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass > 1000) {
					var merit = 10;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				}
			} else if (data.type == "Plastic") {
				if (req.body.mass < 500) {
					var merit = 4;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass >= 501 && req.body.mass <= 1000) {
					var merit = 8;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass > 1000) {
					var merit = 12;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				}
			} else if (data.type == "Metal") {
				if (req.body.mass < 500) {
					var merit = 6;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass >= 501 && req.body.mass <= 1000) {
					var merit = 12;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				} else if (req.body.mass > 1000) {
					var merit = 24;
					let newmerit;
					StudentInfo.findOne(
						{ studentID: req.body.student },
						function (err, data1) {
							if (data1) {
								console.log(req.body.student);
								var i = data1.totalMerit;
								newmerit = merit + i;
								data1.totalMerit = newmerit;
								data1
									.save()
									.then(() => {
										res.render("admin/insertmerits");
									})
									.catch((err) => console.log(err));
							}
						}
					);
				}
			}
		}
	});
});

router.get("/studentlists", function (req, res) {
	StudentInfo.find({}, function (err, data) {
		if (data) {
			res.render("admin/studentlists", { data });
		}
	});
});

router.get("/studentlists1/:id", function (req, res) {
	console.log(req.params.id);
	StudentInfo.findOne({ studentID: req.params.id }, function (err, data) {
		if (data) {
			console.log(data.studentName);
			res.render("admin/studentlists1", { data });
		}
	});
});

router.get("/insertmerits1", function (req, res) {
	res.render("admin/insertmerits1");
});

router.get("/addstaff", function (req, res) {
	res.render("admin/addstaff");
});

router.post("/addstaff", function (req, res) {
	console.log(req.body);
	StaffInfo.findOne({ staffID: req.body.search2 }, function (err, data) {
		if (data) {
			res.render("admin/addstaff1", { data });
		}
	});
});

router.post("/addstaff1", function (req, res) {
	console.log(req.body);
	const data = new StaffInfo({
		staffID: req.body.staffID,
		password: req.body.password,
		role: req.body.role,
		staffName: req.body.staffName,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
	});
	data.save()
		.then(() => {
			res.render("admin/adminhome");
		})
		.catch((err) => console.log(err));
});

router.get("/addstaff1", function (req, res) {
	res.render("admin/addstaff1");
});

router.get("/stafflist", function (req, res) {
	StaffInfo.find({}, function (err, data) {
		if (data) {
			res.render("admin/stafflist", { data });
		}
	});
});

router.get("/stafflist/:id", function (req, res) {
	console.log(req.params.id);
	StaffInfo.findOne({ staffID: req.params.id }, function (err, data) {
		if (data) {
			res.render("admin/stafflist1", { data });
		}
	});
});

router.post("/editstaff", function (req, res) {
	console.log(req.body.staff);
	const update = {
		staffName: req.body.staffName,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
	};
	StaffInfo.findOneAndUpdate({ staffID: req.body.staff }, update)
		.then(() => {
			StaffInfo.find({}, function (err, data) {
				console.log(req.body.staff);
				if (data) {
					res.render("admin/stafflist", { data });
				}
			});
		})
		.catch((err) => console.log(err));
});

router.get("/deletestaff/:id", function (req, res) {
	console.log(req.params.id);
	StaffInfo.findOneAndDelete({ staffID: req.params.id })
		.exec()
		.then(() => {
			StaffInfo.find({}, function (err, data) {
				if (data) {
					res.render("admin/stafflist", { data });
				}
			});
		});
});

// logout
router.get("/index", function (req, res) {
	res.render("home/index");
});

// tah
router.get("/about", function (req, res) {
	res.render("home/about");
});

//logout function for all user
router.get("/logout", function (req, res, next) {
	console.log("logout");
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect("/");
			}
		});
	}
});

module.exports = router;
