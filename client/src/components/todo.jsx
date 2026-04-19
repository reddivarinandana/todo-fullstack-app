// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api/tasks";

// function Todo() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");

//   // GET TASKS
//   const getTasks = async () => {
//     const res = await axios.get(API);
//     setTasks(res.data);
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   // ADD TASK
//   const addTask = async () => {
//     if (!title.trim()) return;

//     await axios.post(API, { title });
//     setTitle("");
//     getTasks();
//   };

//   // DELETE TASK
//   const deleteTask = async (id) => {
//     await axios.delete(`${API}/${id}`);
//     getTasks();
//   };

//   // TOGGLE COMPLETE
//   const toggleTask = async (id) => {
//     await axios.put(`${API}/${id}`);
//     getTasks();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Todo App</h1>

//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter task"
//       />
//       <button onClick={addTask}>Add</button>

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {tasks.map((task) => (
//           <li key={task.id} style={{ margin: "10px" }}>
//             <span
//               onClick={() => toggleTask(task.id)}
//               style={{
//                 textDecoration: task.completed ? "line-through" : "none",
//                 cursor: "pointer",
//                 marginRight: "10px"
//               }}
//             >
//               {task.title}
//             </span>

//             <button onClick={() => deleteTask(task.id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Todo;
import { useEffect, useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage
  const saveToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  // Add task
  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    const updatedTasks = [...tasks, newTask];
    saveToLocalStorage(updatedTasks);
    setTitle("");
  };

  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage(updatedTasks);
  };

  // Toggle complete
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    saveToLocalStorage(updatedTasks);
  };

  return (
    <div className="container">
    <div className="todo-card">
      <h1>Todo App</h1>
       <div className="input-section">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: "10px" }}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Todo;