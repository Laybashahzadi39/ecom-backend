import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ===== Register =====
const registerUser = async (req, res) => {
  try {
    // body se name, email, password aur role liya
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    // koi zaroori field khali ho to yahin rok do
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // check karo ye email pehle se registered to nahi
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password ko hash kiya, plain password database mein nahi jata
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // naya user banaya
    // role agar nahi aya to model ka default "user" apply ho jayega
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    // register ke sath hi login, isliye token bana diya
    const token = generateToken(user._id, user.role);

    // response mein password nahi bhejte
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== Login =====
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // email se user dhoondo
    const user = await User.findOne({ email: email });
    if (!user) {
      // same message dono cases mein, taake pata na chale email exist karta hai ya nahi
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // diya hua password aur database wala hash compare karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // sab theek hai, token banao
    const token = generateToken(user._id, user.role);

    // login response mein role bhi jata hai, isi se frontend ko pata chalta hai user hai ya admin
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser };



// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// // ===== Register =====
// const registerUser = async (req, res) => {
//   try {
//     // body se sirf name, email, password liya
//     // role ko jaan boojh kar NAHI liya, taake koi bahar se admin na ban sake
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     // koi field khali ho to yahin rok do
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please fill all fields" });
//     }

//     // check karo ye email pehle se registered to nahi
//     const userExists = await User.findOne({ email: email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // password ko hash kiya, plain password kabhi database mein nahi jata
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // naya user banaya, role hamesha "user" rakha (admin sirf database se banega)
//     const user = await User.create({
//       name: name,
//       email: email,
//       password: hashedPassword,
//       role: "user",
//     });

//     // login token banaya taake register ke sath hi login ho jaye
//     const token = generateToken(user._id, user.role);

//     // response mein password kabhi nahi bhejte
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ===== Login =====
// const loginUser = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     // email se user dhoondo
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       // jaan boojh kar same message, taake pata na chale email exist karta hai ya nahi
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // diya hua password aur database wala hash compare karo
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // sab theek hai, naya token banao
//     const token = generateToken(user._id, user.role);

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { registerUser, loginUser };


