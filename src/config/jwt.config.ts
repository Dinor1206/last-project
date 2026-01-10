export const jwtConfig = {
  secret: process.env.JWT_SECRET || "SUPER_SECRET_KEY",
  expiresIn: "1d",
};
