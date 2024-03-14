import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const CheckButton = ({ checked, handleCheck }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const checkVariants = {
    initial: {
      color: "#fff",
    },
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };

  const boxVariants = {
    checked: {
      background: "var(--primaryPurple)",
      transition: { duration: 0.1 },
    },
    unchecked: { background: "var(--gray-2)", transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      animate={checked ? "checked" : "unchecked"}
      className="w-8 h-8 cursor-pointer  "
      variants={boxVariants}
    >
      <input
        onClick={handleCheck}
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-secondary"
      />
    </motion.div>
  );
};

export default CheckButton;
