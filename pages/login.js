import React from 'react';
import {getProviders, signIn} from "next-auth/react";

function Login({providers}) {
    return (
        <div className="h-screen flex flex-col items-center justify-between h-screen p-32 bg-black">
            <div className="bg-[url('../public/loginBackground.png')] top-0 z-0 absolute blur-[12px] grayscale brightness-[0.10] w-screen h-screen bg-cover ">

            </div>
            <div className="bg-emerald-900 w-screen h-screen absolute top-0 opacity-[0.05]"></div>
            <div className="z-10 flex flex-col items-center justify-around h-screen px-20 my-20 bg-black/60 rounded-lg border-2 border-gray-900" >
                <p className="text-transparent font-black text-transparent bg-clip-text bg-gradient-to-br brightness-75 hover:brightness-100 from-green-400/70 to-emerald-900 h-48 text-6xl">
                    Matify</p>
                {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className="text-gray-300 font-bold py-2 px-4 border-b-2 border-gray-900 "
                                    onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                                Login with {provider.name}
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}