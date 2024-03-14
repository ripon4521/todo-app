import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button, SelectButton } from './Button'; // Assuming Button and SelectButton components are implemented
import TodoModal from "./TodoModal";
import { updateFilterStatus } from "../slice/slices";

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    dispatch(updateFilterStatus(selectedStatus));
  };

  return (
    <div className="flex justify-center gap-20 md:gap-80 mt-5   ">
      <button
        className="bg-yellow-500 px-2 py-1 text-white rounded-md "
        onClick={() => setModalOpen(true)}
      >
        Add Task
      </button>
      <select
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
        className="pl-5 w-36 py-1 rounded-md text-white "
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
