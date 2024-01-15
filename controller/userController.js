const bcrypt = require("bcrypt");
const saltround = 10;

const users = [
  {
    fullname: "abc",
    email: "abc@gmail.com",
    password: "$2b$10$qaCJaY5xiWgEm9XMmOr2luG6vRYQ8NMRGkZREaQbUI4NYmTJ2tbA.",
  },
];

exports.getData = async (req, res) => {
  const { fullname, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltround);

  const user = {
    fullname,
    email,
    password: hash,
  };

  console.log(user);

  res.status(200).json({
    success: true,
    message: "user registretion succuessfully compleated",
    user,
  });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((value) => value.email === email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found",
    });
  }

  try {
    const userPasswordMatch = await bcrypt.compare(password, user.password);

    if (!userPasswordMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successfully completed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
