
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList].sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center flex-col gap-5 p-5 bg-lime-500 lg:w-[30%] md:w-[70%] rounded-md"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => (
          <motion.div className='bg-slate-700 rounded-md' key={todo.id} variants={child}>
            <TodoItem  todo={todo}  />
          </motion.div>
        ))
      ) : (
        <motion.p variants={child} className="text-white-500 text-center ">
          No Todos
        </motion.p>
      )}
    </motion.div>
  );
}

export default AppContent;
