import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { addTodo, updateTodo } from "../slice/slices";
// import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: format(new Date(), "p, MM/dd/yyyy"),
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700  "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-slate-700 bg-opacity-80 rounded-lg overflow-hidden shadow-lg p-8"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                onClick={() => setModalOpen(false)}
              >
                <MdOutlineClose className="h-6 w-6" />
              </button>
            </div>

            <form className="" onSubmit={(e) => handleSubmit(e)}>
              <h1 className="text-2xl font-semibold mb-4 ">
                {type === "add" ? "Add" : "Update"} TODO
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block   text-white font-semibold"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-lime-500 text-white px-2 py-1 rounded-md"
                  type="submit"
                >
                  {type === "add" ? "Add Task" : "Update Task"}
                </button>
                <button
                  className="bg-lime-500 text-white px-2 py-1 rounded-md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
