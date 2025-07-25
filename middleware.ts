import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import path from "path";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({token, req}) => {
                const {pathname} = req.nextUrl
                
                // Allow access to the root path and public paths
                if(
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register"
                ){
                 return true   
                }

                //public paths
                if(pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true;
                }

                return !!token; // Allow access if the user is authenticated
            }
        }
    }
)

export const config = {
    matcher : ["/((?!_next/static|_next/image|favicon.ico|public/).*)",]
}