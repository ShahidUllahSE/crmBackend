import jwt from "jsonwebtoken";

export const extractUserIdFromToken = (token: string): number | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return (decoded as { id: number }).id;  
  } catch (error) {
    return null;
  }
};
