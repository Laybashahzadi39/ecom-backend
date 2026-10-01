
// check krta h k user "admin" h ya nai
const isAdmin = (req, res, next) => {
  // req.user pehle wale "protect" middleware se aaya hoga

  if (req.user && req.user.role === "admin") {
    next(); // admin h, aage jaane do
  } else {
    // admin nai h to yahi rok do
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

export default isAdmin; 