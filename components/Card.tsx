import { TodoCardProps } from "@/types/types";
import { Layout, Code, CheckCircle, Book, Users, Sparkles, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskItem } from "./TaskItem";

const iconMap: Record<string, LucideIcon> = {
    Layout,
    Code,
    CheckCircle,
    Book,
    Users,
    Sparkles,
};

export const Card = ({ id, title, iconName, taskCount, tasks }: TodoCardProps) => {
    const Icon = iconMap[iconName] || Layout;

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-xl bg-neutral-900 border border-white/5 p-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                        <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">{title}</h3>
                </div>
                <span className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-400">{taskCount}</span>
            </div>

            {tasks && tasks.length > 0 && (
                <div className="mt-2 space-y-1">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}

            {/* Decorative / Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
};
