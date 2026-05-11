import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { createTask } from "../../services/api";

function AIInputBox({ refreshTasks }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      await createTask(input);

      setInput("");

      if (refreshTasks) {
        refreshTasks();
      }

    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Failed to create task"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-blue-400" size={18} />

        <h2 className="text-lg font-medium">
          AI Scheduler
        </h2>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Schedule gym tomorrow morning..."
        className="
          w-full h-32
          bg-zinc-950
          border border-zinc-800
          rounded-xl
          p-4
          resize-none
          outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
        "
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          mt-4
          px-5 py-2
          bg-blue-500
          hover:bg-blue-600
          rounded-xl
          transition-all
          flex items-center gap-2
          disabled:opacity-50
        "
      >
        {loading ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />
            Scheduling...
          </>
        ) : (
          "Schedule Task"
        )}
      </button>
    </div>
  );
}

export default AIInputBox;