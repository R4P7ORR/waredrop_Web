import React from "react";

interface PropsTokenContext{
    token1:string|null
    getToken:(accessToken:string)=>void
}

const TokenContext = React.createContext<PropsTokenContext>(null as any)
export default TokenContext