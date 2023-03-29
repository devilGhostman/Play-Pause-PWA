import { useEffect, useState } from "react";
import { Menucontainer } from "./Menucontainer";

import { GiPopcorn } from "react-icons/gi";
import { SiApplemusic, SiGooglechat } from "react-icons/si";
import { FaHome } from "react-icons/fa";

import LoginSignup from "../loginSignup/LoginSignup";

import { useSession } from "next-auth/react";

const BottomBar = () => {
  const [active, setactive] = useState("active");
  const [removeActive, setremoveActive] = useState("");

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive(this: any) {
      menuLi.forEach((n) => n.classList.remove(active));
      this.classList.add(active);
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));
  }, []);

  const { data } = useSession();

  return (
    <div className="leftMenu fixed bottom-0 md:bottom-2 left-0 flex items-center w-[100%]  h-[60px] bg-[#292727] z-[101] md:w-[50%] md:left-[12rem] lg:left-[19rem] xl:left-[27rem] rounded-b-none md:rounded-b-3xl">
      <ul id="menu" className="flex">
        <Menucontainer
          link={"/music"}
          icon={<SiApplemusic className="text-2xl" />}
          name="Music"
          isHome={""}
        />

        <Menucontainer
          link={"/meme"}
          icon={<GiPopcorn className="text-2xl" />}
          name="Memes"
          isHome={""}
        />

        <Menucontainer
          link={"/"}
          icon={<FaHome className="text-2xl" />}
          name="Home"
          isHome={"active"}
        />

        <Menucontainer
          link={"/underWork"}
          icon={<SiGooglechat className="text-2xl" />}
          name="Community"
          isHome={""}
        />
        {data ? (
          <Menucontainer
            link={""}
            icon={<LoginSignup />}
            name="Logout"
            isHome={""}
          />
        ) : (
          <Menucontainer
            link={""}
            icon={<LoginSignup />}
            name="Login"
            isHome={""}
          />
        )}

        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default BottomBar;
