import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../context/AuthContext";

interface TopBarProps {
    handleLogOut: () => void;
}

export default function TopBar(props: TopBarProps) {
    const { isLoggedIn } = useAuth();

    return (
      <div className="grid grid-cols-2 p-8 h-24">
        <div className="col-span-1 flex flex-row gap-4">
          <h1 className="text-5xl font-semibold">Homeward Bound</h1>
          <FontAwesomeIcon icon={faPaw} className="text-3xl self-center" />
        </div>
        {isLoggedIn && <button onClick={props.handleLogOut} className="col-span-1 text-xl justify-self-end content-center">Logout</button> }
      </div>
      );
}