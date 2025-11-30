import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  // ⭐ Priority Badge Colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ⭐ Status Badge Colors
  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-600";
      case "in-progress":
        return "bg-blue-100 text-blue-600";
      case "done":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && <h2 className='my-3 ml-2 md:ml-0 text-xl font-semibold'>Your Tasks ({tasks.length})</h2>}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span className='text-gray-500 text-lg'>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (

              tasks.map((task) => (
                <div key={task._id} className='bg-white my-4 p-5 text-gray-700 rounded-lg shadow-md border'>

                  {/* Header Row */}
                  <div className='flex items-center mb-3'>

                    <h3 className='font-semibold text-lg'>{task.title}</h3>

                    {/* Edit */}
                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-4 text-blue-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    {/* Delete */}
                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>

                  {/* Status + Priority */}
                  <div className='flex gap-3 mb-2'>

                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>

                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </span>

                    {task.dueDate && (
                      <span className='ml-auto text-sm text-gray-600'>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}

                  </div>

                  {/* Description */}
                  <p className='mt-2 text-gray-600 whitespace-pre-line'>
                    {task.description}
                  </p>

                </div>
              ))

            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks
