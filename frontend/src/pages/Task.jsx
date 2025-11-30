import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);

  // ⭐ FORM DATA (new fields added)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: ""
  });

  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Edit Task";
  }, [mode]);

  // ⭐ Load task when editing
  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({
          title: data.task.title,
          description: data.task.description,
          priority: data.task.priority,
          status: data.task.status,
          dueDate: data.task.dueDate ? data.task.dueDate.split("T")[0] : ""
        });
      });
    }
  }, [mode, authState, taskId, fetchData]);


  const handleChange = e => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    // You can extend your validation file later for new fields
    setFormErrors({});

    if (formData.title.trim() === "") {
      setFormErrors(prev => ({ ...prev, title: "Title is required" }));
      return;
    }
    if (formData.description.trim() === "") {
      setFormErrors(prev => ({ ...prev, description: "Description is required" }));
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token }
    };

    fetchData(config).then(() => navigate("/"));
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )


  return (
    <MainLayout>
      <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>

        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>

            {/* ⭐ Title */}
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input 
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="Task Title"
              />
              {fieldError("title")}
            </div>

            {/* ⭐ Description */}
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <Textarea 
                name="description"
                id="description"
                value={formData.description}
                placeholder="Write task description..."
                onChange={handleChange}
              />
              {fieldError("description")}
            </div>

            {/* ⭐ Priority */}
            <div className="mb-4">
              <label htmlFor="priority">Priority</label>
              <select 
                name="priority" 
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* ⭐ Status */}
            <div className="mb-4">
              <label htmlFor="status">Status</label>
              <select 
                name="status" 
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* ⭐ Due Date */}
            <div className="mb-4">
              <label htmlFor="dueDate">Due Date</label>
              <input 
                type="date"
                name="dueDate"
                id="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            {/* ⭐ Buttons */}
            <button 
              className='bg-green-600 text-white px-4 py-2 font-medium hover:bg-green-700 rounded-md'
              onClick={handleSubmit}
            >
              {mode === "add" ? "Add Task" : "Update Task"}
            </button>

            <button 
              className='ml-4 bg-red-500 text-white px-4 py-2 font-medium rounded-md' 
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            {mode === "update" && (
              <button 
                className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600 rounded-md'
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </>
        )}

      </form>
    </MainLayout>
  );
}

export default Task;
