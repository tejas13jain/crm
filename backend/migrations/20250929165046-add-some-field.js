module.exports.up = async function(db, mongoose) {
  // example: add 'status' field to all users
  await db.collection("users").updateMany({}, { $set: { status: "active" } });
};
module.exports.down = async function(db, mongoose) {
  await db.collection("users").updateMany({}, { $unset: { status: "" } });
};
