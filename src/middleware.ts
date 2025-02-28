// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { jwtVerify } from "jose";

// // export async function middleware(request: NextRequest) {
// //   const token =request.cookies.get("token")?.value;

// //   const publicPaths = ["/login", "/signup"];
// //   const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

// //   if (!token) {
// //     if (!isPublicPath) {
// //       return NextResponse.redirect(new URL("/login", request.url));
// //     }
// //     return NextResponse.next();
// //   }

// //   try {
// //     const { payload } = await jwtVerify(
// //       token,
// //       new TextEncoder().encode(process.env.JWT_SECRET!)
// //     );
// //     console.log(payload, "payload");
// //     const currentPath = request.nextUrl.pathname;

// //     if (currentPath === "/admin/dashboard") {
// //       if (payload?.role !== "admin") {
// //         return NextResponse.redirect(new URL("/login", request.url));
// //       }
// //     }

// //     if (payload?.role === "admin" && currentPath !== "/admin/dashboard") {
// //       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
// //     }

// //     if (payload?.role === "user" && currentPath !== "/dashboard") {
// //       return NextResponse.redirect(new URL("/dashboard", request.url));
// //     }

// //     return NextResponse.next();
// //   } catch (error) {
// //     console.error("Token verification error:", error);
// //     if (!isPublicPath) {
// //       return NextResponse.redirect(new URL("/login", request.url));
// //     }
// //     return NextResponse.next();
// //   }
// // }

// // export const config = {
// //   matcher: [
// //     "/dashboard",
// //     "/admin/dashboard",
// //     "/login",
// //     "/signup",
// //     "/((?!api|_next/static|_next/image|favicon.ico).*)",
// //   ],
// // };


// // premier-properties/src/middleware.ts
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// export default withAuth(
//   async function middleware(request: NextRequest) {
//     // Custom JWT token logic
//     const customToken = request.cookies.get("token")?.value;

//     if (customToken) {
//       try {
//         const { payload } = await jwtVerify(
//           customToken,
//           new TextEncoder().encode(process.env.JWT_SECRET!)
//         );

//         const role = payload.role;
//         const currentPath = request.nextUrl.pathname;
//         console.log(role, "role");
//         console.log(currentPath, "currentPath");

//         if (role === "admin" && currentPath !== "/admin/dashboard") {
//           return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//         }

//         if (role === "user" && currentPath !== "/dashboard") {
//           return NextResponse.redirect(new URL("/dashboard", request.url));
//         }
//       } catch (error) {
//         console.error("Custom token verification error:", error);
//         return NextResponse.redirect(new URL("/login", request.url));
//       }
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Ensure the user is authenticated
//     },
//     pages: {
//       signIn: '/login', // Redirect to login if not authenticated
//     },
//   }
// );

// export const config = {
//   matcher: [
//     '/dashboard',
//     '/admin/dashboard',
//     '/login',
//     '/signup',
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };


// premier-properties/src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    // You can add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure the user is authenticated
    },
    pages: {
      signIn: '/login', // Redirect to login if not authenticated
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*', // Protect all routes under /dashboard
    '/admin/:path*',     // Protect all routes under /admin
    '/api/protected/:path*', // Protect specific API routes
    // Exclude /signup from protected routes
  ],
};