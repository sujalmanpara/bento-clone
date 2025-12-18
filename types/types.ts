export interface TaskItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface TodoCardProps {
    id: string;
    title: string;
    iconName: "Layout" | "Code" | "CheckCircle" | "Book" | "Users" | "Sparkles"; // Limited set for simplicity initially
    taskCount: number;
    tasks?: TaskItem[]; // Optional for now, just visual count might be used or actual items
}
