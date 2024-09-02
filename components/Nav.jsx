'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useEffect } from "react"
import {signIn , signOut , useSession , getProviders} from 'next-auth/react'
import Provider from "./Provider"
const Nav = () => {
    const {data:session} = useSession();
    const [providers ,setProviders] = useState(null);

    const [ToggleDropDown ,setToggleDropDown] = useState(false);

    

    // useEffect(()=>{
    //     (async () => {
    //         const res = await getProviders();
    //         setProviders(res);
    //       })();
    // },[])
    useEffect(() => {
        const setUpProviders = async () => {
          const response = await getProviders();
          // alert(response);
          console.log(response);
          setProviders(response);
          console.log(providers);
        };
        setUpProviders();
      }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
        <Image src='/assets/images/logo.svg'
        alt="Promptzone Logo"
        width={30}
        height={30}
        className="object-contain"></Image>
        <p className="logo_text">PromptZone</p>
        </Link>
        {/* {Mobile Navigation} */}
        <div className="sm:flex hidden">
            {session ?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href='/create-prompt' className="black_btn">Create Post</Link>
                    <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                    <Link href = "/profile">
                    <Image src= {session?.user.image}
                    className="rounded-full"
                    alt="profile"
                    width={37}
                    height={37}>

                    </Image>    
                    
                    </Link>
                </div>
            ):(<>
            {
                providers && 
                Object.values(providers).map((provider)=>(
                   <button
                   type="button"
                   key={provider.name}
                   onClick={()=> signIn(provider.id)}
                   className="black_btn">Sign In</button>
                ))
            }
            
            </>) }
        </div>
        {/* {Mobile Navigation} */}
            <div className="sm:hidden flex relative">
                {session ?.user  ? (
                    <div className="flex">
                        <Image src={session?.user.image}
                    className="rounded-full"
                    alt="profile"
                    width={37}
                    height={37}
                    onClick={()=>setToggleDropDown((prev)=>!prev)
                    }>

                    </Image>

                    {ToggleDropDown &&(
                        <div className="dropdown">
                            <Link
                            href='/profile'
                            className="dropdown_link"
                            onClick={()=>setToggleDropDown(false)}>
                                My profile
                            </Link> <Link
                            href='/create-prompt'
                            className="dropdown_link"
                            onClick={()=>setToggleDropDown(false)}>
                                Create Prompt
                            </Link>
                            <button type="button"
                            onClick={()=>{
                                setToggleDropDown(false);
                                signOut();
                                
                            }} 
                            className="mt-5 w-full black_btn">
                                Sign Out
                            </button>
                        </div>
                    )}
                    </div>
                ):(<>
                    {
                        providers && 
                        Object.values(providers).map((provider)=>(
                           <button
                           type="button"
                           key={provider.name}
                           onClick={()=> signIn(provider.id)}
                           className="black_btn">Sign In</button>
                        ))
                    }
                    
                    </>) }
            </div>

    </nav>
  )
}

export default Nav