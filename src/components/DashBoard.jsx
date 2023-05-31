import React, { useState } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export default function DashBoard({ dashItem }) {
  const [isVisible, setIsVisible] = useState(
    new Array(dashItem.length).fill(false)
  );
  function toggleVisibility(index) {
    const newVisibility = isVisible.map((value, i) => i === index);
    setIsVisible(newVisibility);
  }

  return (
    <>
      <section>
        <div className=" fixed  top-0 bottom-0  ">
          <PerfectScrollbar>
            <div className=" flex flex-col gap-6  p-6 border-2 bg-slate-100 ">
              <div className="flex justify-between items-center  text-2xl p-2 border-b-2 border-mainColor">
                <FaUserCircle className="h-12 w-12" />
                <h1 className="font-semibold ">ERS Admin</h1>
              </div>
              {dashItem.map((item, id) => (
                <button
                  key={id}
                  onClick={() => toggleVisibility(id)}
                  className={`flex gap-3 items-center  cursor-pointer px-2 ${
                    isVisible[id]
                      ? "bg-mainColor text-white rounded-lg"
                      : "bg-slate-100 text-black"
                  }`}
                >
                  <CgShapeCircle />
                  <h1 className="py-2 ">{item}</h1>
                </button>
              ))}
            </div>
          </PerfectScrollbar>
        </div>
      </section>
    </>
  );
}
