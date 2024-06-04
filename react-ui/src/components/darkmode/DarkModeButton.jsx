import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDark } from "../../features/theme-slice";
import { PiSunDimBold } from "react-icons/pi";
import { LuMoon } from "react-icons/lu";

const DarkModeButton = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

    return (
      <div>
        <button
          onClick={() => {
            dispatch(toggleDark());
          }}
          style={{
            height: "34px",
            width: "34px",
            borderRadius: "7px",
            border: "1px solid #c3bebe",
            background: isDark ? "#414141" : "white",
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          {isDark ? (
            <PiSunDimBold
              style={{
                fontSize: "18px",
                display: "grid",
                color: "white",
              }}
            />
          ) : (
            <LuMoon
              style={{
                fontSize: "18px",
                display: "grid",
              }}
            />
          )}
        </button>
      </div>
    );

};

export default DarkModeButton;
