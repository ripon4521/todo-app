import  { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { deleteTodo, updateTodo } from '../slice/slices';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';
const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    setChecked(todo.status === 'complete');
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className="flex items-center justify-between py-4 px-6 border-b border-gray-200 transition duration-300 ease-in-out" variants={child}>
        <div className="flex items-center space-x-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={`flex flex-col ${checked ? 'line-through text-yellow-500' : 'text-yellow-300'}`}>
            <p className="text-lg font-semibold">{todo.title}</p>
            <p className="text-sm">{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
          </div>
        </div>
        <div className="flex items-center mt-6 px-2">
          <MdDelete className="text-red-500" onClick={handleDelete}>
          
          </MdDelete>
          <button className="text-blue-500 px-2" onClick={handleUpdate}>
            <MdEdit />
          </button>
        </div>
      </motion.div>
      <TodoModal type="update" modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} todo={todo} />
    </>
  );
}

export default TodoItem;
