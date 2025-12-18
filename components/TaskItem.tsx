import { TaskItem as TaskItemType } from "@/types/types";
import { CheckCircle2, Circle } from "lucide-react";

interface TaskItemProps {
    task: TaskItemType;
}

export const TaskItem = ({ task }: TaskItemProps) => {
    return (
        <div className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0 group/item">
            <button className="text-neutral-500 hover:text-neutral-300 transition-colors">
                {task.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            </button>
            <span className={`text-sm ${task.completed ? "text-neutral-600 line-through" : "text-neutral-400 group-hover/item:text-neutral-300"} transition-colors`}>
                {task.text}
            </span>
        </div>
    );
};
