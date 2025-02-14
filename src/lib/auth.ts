// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

// export const getUserFromToken = () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get('token')?.value;

//   if (!token) {
//     throw new Error('Not authenticated');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       email: string;
//     };
//     return decoded;
//   } catch (error) {
//     throw new Error('Invalid token');
//   }
// };