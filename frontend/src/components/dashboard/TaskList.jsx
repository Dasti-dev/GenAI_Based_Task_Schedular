import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import LoadingSkeleton from "./LoadingSkeleton";

import { getTasks } from "../../services/api";

function TaskList({ refreshKey }) {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();

      setTasks(response.data || []);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!tasks.length) {
    return (
      <div className="
        border border-zinc-800
        rounded-2xl
        p-10
        text-center
        text-zinc-500
        bg-zinc-900
      ">
        No tasks scheduled yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
}

export default TaskList;