import React from "react";
import Account from "../component/Account";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

const About = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="">
      <div className="">
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <div className="aboutdiv">  
             <nav className="fullscreenNavbar">
        <div>
      <Link className="Logo" href="/">
          InviteGo
        </Link> 
        </div>

        <div className="insidenavbar">
          <div className="innav">
        <Link className="Logo" href="/about">
          My Account 
        </Link> 
        </div>
          <div className="innav">
        <Link className="Logo" href="/Publicpost">
          PublicPost 
        </Link> 
        </div>
          <div className="innav">
        <Link className="Logo" href="/Videos">
          Videos
        </Link>
        </div>
        </div>

      </nav>
           <Account session={session} />
          <footer className="footer">
          <Link className="Logo" href="/about">
            👤
          </Link>
          <Link className="Logo" href="/">
            Go
          </Link>
          <Link className="Logo" href="/Publicpost">
          ❌
          </Link>
          <Link className="Logo" href="/Videos">
          🎥
          </Link>
        </footer>
        </div>
         
        )}
      
      </div>
    </div>
  );
};
export default About;
