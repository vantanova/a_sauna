const SET_TASK = "task/setTask";
const REMOVE_TASK = "task/removeTask";
const GET_TASK = "task/getTask";
const SET_PROJECT_TASK = "task/getTask";

const setTask = (task) => ({
  type: SET_TASK,
  payload: task,
});

const getTask = (task) => ({
  type: GET_TASK,
  payload: task,
});

const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: taskId,
});

export const markComplete = (taskId, description) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ description }),
  });
  return await res.json();
};
export const createTask = ({
  taskTitle,
  dueDate,
  priority,
  status,
  description,
  projectId,
}) => async (dispatch) => {
  const res = await fetch("/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskTitle,
      dueDate,
      priority,
      status,
      description,
      projectId,
    }),
  });
  const data = await res.json();
  dispatch(setTask(data));
};

// export const deleteTask = (taskId) => async (dispatch) => {
//   // const res = await fetch('/api/tasks', {
//   //   method: 'DELETE',
//   //    headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify({taskId})
//   // })

//   dispatch(removeTask(taskId));
// };

export const deleteTask = (taskId) => async (dispatch) => {
  console.log("hit");
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
  const deleted = await res.json();
  console.log(deleted);
};

export const seeTask = () => async (dispatch) => {
  const res = await fetch("/api/tasks/");
  const data = await res.json();
  dispatch(getTask(data.tasks));
};

export const seeProjectTask = (id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/project/${id}`);
  const data = await res.json();
  dispatch(getTask(data.tasks));
  return data;
};

const initialState = { task: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_TASK: {
      if (state.task) {
        const newtask = [...state.task, action.payload];
        return { ...state, task: newtask };
      }
      return { ...state, task: action.payload };
    }
    case GET_TASK:
      return { ...state, task: action.payload };
    default:
      return state;
  }
}

export default reducer;
