require("dotenv").config();
const router = require("express").Router();
const { User: Users } = require("../../server/database/Index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// / Post to add user /api/users/addUser
const hashPasswordMiddleware = async (req, res, next) => {
  try {
    // Hash the password if it exists in the request body
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Apply the middleware to all relevant routes
router.post("/addUsers", hashPasswordMiddleware, async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/users/:userId
router.get("/:Id", async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.params.Id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Check if the username and password are correct

    const user = await Users.findOne({ where: { username } });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate an access Token for user
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    console.log(process.env.ACCESS_TOKEN_SECRET);

    // generate a refresh token for user
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log(process.env.REFRESH_TOKEN_SECRET);

    //  // Verify an Access Token and extract the user ID
    //     const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    //     const id = verified.id;
    console.log({ accessToken, refreshToken });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to verify the access token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Access token is invalid or has expired" });
    }
    console.log("User authenticated:", user);
    req.user = user;
    next();
  });
}

// Get a user's profileyf
router.get("/profile", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "nothing server error" });
  }
});

module.exports = router;
