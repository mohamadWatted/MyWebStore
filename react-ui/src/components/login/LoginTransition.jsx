import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user-slice";
import Swal from "sweetalert2";
import { ColorRing } from "react-loader-spinner";

export default function LoginTransition() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("mywebsite_token"));
  useEffect(() => {
    if (!token) {
      nav("/");
      return;
    }

    fetchUser()
      .then((user) => {
        // dispatch the user into the redux
        // also do this in the App it self
        // if there is a token in the localStorage
        // do the action we did here and store the user object in redux
        dispatch(setUser(user));

        const isAdmin = user.type === 999;
        
        if (isAdmin) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Welcome to the backoffice",
                showConfirmButton: false,
                timer: 1500,
                position: "center",
              });
          nav("/backoffice");
        } else {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Welcome User",
                showConfirmButton: false,
                timer: 1500,
                position: "center",
              });
          nav("/");
        }
      })
      .catch((e) => {
        alert(e.message);
        nav("/");
      });
  }, [token, nav, dispatch]);

  return (
    <div>
      <ColorRing style={{ display: "flex" }} />
    </div>
  );
}
