function TaskCard({ task }) {
  return (
    <div className="
      bg-zinc-900
      border border-zinc-800
      rounded-2xl
      p-5
      hover:border-zinc-700
      transition-all
    ">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {task.task}
        </h3>

        <span className="text-sm text-zinc-400">
          {task.startTime}
        </span>
      </div>

      <p className="text-zinc-400 mt-2">
        {task.date}
      </p>
    </div>
  );
}

export default TaskCard;