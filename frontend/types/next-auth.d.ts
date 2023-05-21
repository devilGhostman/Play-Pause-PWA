import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
    //   address: string
        id:string
        image:string
        name:string
        email:string
        token:string
    },
     expires: Date
  }
}