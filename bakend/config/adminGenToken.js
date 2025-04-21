import jwt from "jsonwebtoken";

const adminGenToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.log("Token generation error:", error);
    throw new Error("Token generation failed");
  }
};

export default adminGenToken;