import { Search, Plus, Layout, Code, CheckCircle, Book, Users, Sparkles, LucideIcon, Image as ImageIcon, Briefcase, Smile, X, Home, Asterisk, Archive, Command, EyeOff, Check, Loader, Heart, ArrowLeft, MoreHorizontal, Circle, Trash2, Copy, Eraser, ToggleLeft, ToggleRight, XCircle, GripVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface SubTask {
    id: string;
    title: string;
    completed: boolean;
}

interface ListItem {
    id: string;
    title: string;
    count: number;
    icon: LucideIcon;
    color: string;
    tasks: SubTask[];
}

const icons = [
    { name: "Home", icon: Home },
    { name: "Sparkles", icon: Sparkles },
    { name: "Archive", icon: Archive },
    { name: "Command", icon: Command },
    { name: "User", icon: Users },
    { name: "EyeOff", icon: EyeOff },
    { name: "Check", icon: CheckCircle },
    { name: "Layout", icon: Layout },
    { name: "Loader", icon: Loader },
    { name: "Heart", icon: Heart },
    { name: "Image", icon: ImageIcon },
    { name: "Book", icon: Book },
];

const colors = [
    "bg-neutral-600", // Gray
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-purple-400",
    "bg-indigo-500",
];

const initialItems: ListItem[] = [
    {
        id: "1",
        title: "Design Tasks",
        count: 3,
        icon: ImageIcon,
        color: "bg-neutral-600",
        tasks: [
            { id: "1-1", title: "Create new brand guidelines", completed: true },
            { id: "1-2", title: "Design homepage hero section", completed: false },
            { id: "1-3", title: "Update icon set", completed: false }
        ]
    },
    {
        id: "2",
        title: "Development Tasks",
        count: 5,
        icon: Briefcase,
        color: "bg-neutral-600",
        tasks: [
            { id: "2-1", title: "Setup Next.js project", completed: true },
            { id: "2-2", title: "Configure Tailwind CSS", completed: true },
            { id: "2-3", title: "Implement authentication", completed: false },
            { id: "2-4", title: "Connect to database", completed: false },
            { id: "2-5", title: "Deploy to production", completed: false }
        ]
    },
    {
        id: "3",
        title: "Meeting Prep",
        count: 12,
        icon: CheckCircle,
        color: "bg-neutral-600",
        tasks: [
            { id: "3-1", title: "Review Q3 metrics", completed: true },
            { id: "3-2", title: "Prepare slide deck", completed: true },
            { id: "3-3", title: "Update roadmap", completed: false },
            { id: "3-4", title: "Check team availability", completed: true },
            { id: "3-5", title: "Book conference room", completed: true },
            { id: "3-6", title: "Send agenda invites", completed: true },
            { id: "3-7", title: "Print handouts", completed: false },
            { id: "3-8", title: "Test projector", completed: false },
            { id: "3-9", title: "Order catering", completed: false },
            { id: "3-10", title: "Review competitor analysis", completed: false },
            { id: "3-11", title: "Draft budget proposal", completed: false },
            { id: "3-12", title: "Finalize presentation notes", completed: false }
        ]
    },
    {
        id: "4",
        title: "Learning Goals",
        count: 3,
        icon: Book,
        color: "bg-neutral-600",
        tasks: [
            { id: "4-1", title: "Complete React course", completed: false },
            { id: "4-2", title: "Read 'Clean Code'", completed: false },
            { id: "4-3", title: "Practice TypeScript", completed: false }
        ]
    },
    {
        id: "5",
        title: "Team Collaboration",
        count: 4,
        icon: Users,
        color: "bg-neutral-600",
        tasks: [
            { id: "5-1", title: "Code review for Sarah", completed: true },
            { id: "5-2", title: "Weekly sync meeting", completed: false },
            { id: "5-3", title: "Brainstorming session", completed: false },
            { id: "5-4", title: "Update documentation", completed: false }
        ]
    },
    {
        id: "6",
        title: "Personal Development",
        count: 5,
        icon: Sparkles,
        color: "bg-neutral-600",
        tasks: [
            { id: "6-1", title: "Morning meditation", completed: true },
            { id: "6-2", title: "Read 30 mins", completed: true },
            { id: "6-3", title: "Gym workout", completed: false },
            { id: "6-4", title: "Drink 2L water", completed: false },
            { id: "6-5", title: "Journaling", completed: false }
        ]
    },
];

const Confetti = () => {
    const particles = Array.from({ length: 30 });
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-50">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                        x: (Math.random() - 0.5) * 600,
                        y: (Math.random() - 0.5) * 600,
                        rotate: Math.random() * 720,
                        opacity: 0,
                        scale: Math.random() * 1.5 + 0.5
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`absolute w-3 h-3 rounded-full ${['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'][Math.floor(Math.random() * 6)]}`}
                />
            ))}
        </div>
    );
};

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08 // Delay between each child
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 } as const
    }
};

export const SimpleList = () => {
    const [items, setItems] = useState<ListItem[]>(initialItems);
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Customization State
    const [showCustomize, setShowCustomize] = useState(false);
    const [selectedIconName, setSelectedIconName] = useState("Home");
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    // Nested View State
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
    const [isAddingSubTask, setIsAddingSubTask] = useState(false);
    const [newSubTaskTitle, setNewSubTaskTitle] = useState("");

    // Options Menu State
    const [showOptions, setShowOptions] = useState(false);
    const [showCompleted, setShowCompleted] = useState(true);

    // Quick Action State (Main List)
    const [actionMenuId, setActionMenuId] = useState<string | null>(null);

    // Celebration State
    const [showCelebration, setShowCelebration] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const subTaskInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAdding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdding]);

    useEffect(() => {
        if (isAddingSubTask && subTaskInputRef.current) {
            subTaskInputRef.current.focus();
        }
    }, [isAddingSubTask]);

    // Check for completion celebration
    useEffect(() => {
        if (selectedItem) {
            const completedCount = selectedItem.tasks.filter(t => t.completed).length;
            const totalCount = selectedItem.tasks.length;

            if (totalCount > 0 && completedCount === totalCount) {
                if (!showCelebration) {
                    setShowCelebration(true);
                    const timer = setTimeout(() => setShowCelebration(false), 2500);
                    return () => clearTimeout(timer);
                }
            } else {
                setShowCelebration(false);
            }
        }
    }, [selectedItem]);

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const selectedIconObj = icons.find(i => i.name === selectedIconName) || icons[0];

        const newItem: ListItem = {
            id: Date.now().toString(),
            title: newTaskTitle,
            count: 0,
            icon: selectedIconObj.icon,
            color: selectedColor,
            tasks: []
        };

        setItems([...items, newItem]);
        setNewTaskTitle("");
        setIsAdding(false);
        setShowCustomize(false);
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sub-task handlers
    const handleAddSubTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem || !newSubTaskTitle.trim()) return;

        const newSubTask: SubTask = {
            id: Date.now().toString(),
            title: newSubTaskTitle,
            completed: false
        };

        const updatedItem = {
            ...selectedItem,
            tasks: [...selectedItem.tasks, newSubTask],
            count: selectedItem.count + 1
        };

        setSelectedItem(updatedItem);
        setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
        setNewSubTaskTitle("");
        setIsAddingSubTask(false);
    };

    const toggleSubTask = (taskId: string) => {
        if (!selectedItem) return;

        const updatedTasks = selectedItem.tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
        );

        const updatedItem = { ...selectedItem, tasks: updatedTasks };
        setSelectedItem(updatedItem);
        setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
    };

    // Options Handlers
    const handleDeleteList = () => {
        if (!selectedItem) return;
        setItems(items.filter(i => i.id !== selectedItem.id));
        setSelectedItem(null);
        setShowOptions(false);
    };

    const handleDuplicateList = () => {
        if (!selectedItem) return;
        const newItem = {
            ...selectedItem,
            id: Date.now().toString(),
            title: `${selectedItem.title} Copy`,
            tasks: selectedItem.tasks.map(t => ({ ...t, id: Date.now().toString() + Math.random() }))
        };

        const currentIndex = items.findIndex(i => i.id === selectedItem.id);
        const newItems = [...items];
        newItems.splice(currentIndex + 1, 0, newItem);

        setItems(newItems);
        setShowOptions(false);
    };

    const handleClearAll = () => {
        if (!selectedItem) return;
        const updatedItem = { ...selectedItem, tasks: [], count: 0 };
        setSelectedItem(updatedItem);
        setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
        setShowOptions(false);
    };

    // Quick Actions (Main List)
    const handleQuickCopy = (e: React.MouseEvent, item: ListItem) => {
        e.stopPropagation();
        const newItem = {
            ...item,
            id: Date.now().toString(),
            title: `${item.title} Copy`,
            tasks: item.tasks.map(t => ({ ...t, id: Date.now().toString() + Math.random() }))
        };
        const currentIndex = items.findIndex(i => i.id === item.id);
        const newItems = [...items];
        newItems.splice(currentIndex + 1, 0, newItem);
        setItems(newItems);
        setActionMenuId(null);
    };

    const handleQuickDelete = (e: React.MouseEvent, item: ListItem) => {
        e.stopPropagation();
        setItems(items.filter(i => i.id !== item.id));
        setActionMenuId(null);
    };

    const toggleActionMenu = (e: React.MouseEvent, itemId: string) => {
        e.stopPropagation();
        if (actionMenuId === itemId) {
            setActionMenuId(null);
        } else {
            setActionMenuId(itemId);
        }
    };

    const completedCount = selectedItem ? selectedItem.tasks.filter(t => t.completed).length : 0;
    const totalCount = selectedItem ? selectedItem.tasks.length : 0;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const isCompleted = progress === 100 && totalCount > 0;

    const visibleTasks = selectedItem ? (showCompleted ? selectedItem.tasks : selectedItem.tasks.filter(t => !t.completed)) : [];

    return (
        <div className={`w-full max-w-[400px] bg-[#1a1a1a] rounded-[32px] p-3 shadow-2xl border mx-auto relative overflow-hidden h-[85vh] max-h-[600px] flex flex-col transition-colors duration-500 ${isCompleted && selectedItem ? 'border-green-500/30' : 'border-white/5'}`}>
            <AnimatePresence mode="wait">
                {!selectedItem ? (
                    // MAIN LIST VIEW
                    <motion.div
                        key="main-list"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-2 relative z-20 shrink-0">
                            <div className={`flex-1 bg-[#262626] h-12 rounded-full flex items-center px-4 gap-3 text-neutral-500 transition-opacity duration-300 ${isAdding ? 'opacity-30' : 'opacity-100'}`}>
                                <Search size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search list"
                                    disabled={isAdding}
                                    className="bg-transparent border-none outline-none text-neutral-200 placeholder-neutral-500 w-full text-[15px] font-medium"
                                />
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                    setIsAdding(!isAdding);
                                    setShowCustomize(false);
                                }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isAdding ? 'bg-[#333] text-white' : 'bg-[#262626] text-neutral-400 hover:bg-[#333] hover:text-white'}`}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: isAdding ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Plus size={24} />
                                </motion.div>
                            </motion.button>
                        </div>

                        {/* List */}
                        <motion.div
                            className={`flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1 transition-opacity duration-300 ${isAdding ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence initial={false}>
                                {filteredItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        layout
                                        variants={itemVariants} // Applied here
                                        // initial/animate inherited from parent
                                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                                        onMouseLeave={() => { if (actionMenuId === item.id) setActionMenuId(null); }}
                                        className="group flex items-center justify-between p-3 rounded-[24px] hover:bg-[#262626] transition-colors duration-200 cursor-pointer relative"
                                    >
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                className={`w-12 h-12 rounded-[20px] ${item.color} flex items-center justify-center text-white border border-white/5`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <item.icon size={20} />
                                            </motion.div>
                                            <span className="text-[15px] font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* Right Side */}
                                        <div className="pr-2 flex items-center justify-end h-8 min-w-[60px]">
                                            <AnimatePresence mode="wait">
                                                {actionMenuId === item.id ? (
                                                    <motion.div
                                                        key="actions"
                                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <motion.button
                                                            whileHover={{ scale: 1.2, color: "#fff" }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => handleQuickCopy(e, item)}
                                                            className="text-neutral-400 transition-colors"
                                                            title="Duplicate"
                                                        >
                                                            <Copy size={18} />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.2, color: "#f87171" }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => handleQuickDelete(e, item)}
                                                            className="text-neutral-400 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.2, color: "#fff" }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => toggleActionMenu(e, item.id)}
                                                            className="text-neutral-500 transition-colors"
                                                        >
                                                            <X size={18} />
                                                        </motion.button>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="count"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-end"
                                                    >
                                                        <span className="text-sm font-bold text-neutral-600 group-hover:hidden transition-all duration-200">
                                                            {item.tasks.length}
                                                        </span>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => toggleActionMenu(e, item.id)}
                                                            className="hidden group-hover:flex items-center justify-center text-neutral-600 hover:text-white transition-colors"
                                                        >
                                                            <GripVertical size={20} />
                                                        </motion.button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {filteredItems.length === 0 && (
                                <div className="p-8 text-center text-neutral-500 text-sm">
                                    No lists found
                                </div>
                            )}
                        </motion.div>

                        {/* Add Item Overlay */}
                        <AnimatePresence>
                            {isAdding && (
                                <>
                                    {/* Customization Popup */}
                                    {showCustomize && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className="absolute bottom-24 left-4 right-4 bg-[#262626] rounded-2xl border border-white/10 p-4 shadow-xl z-40"
                                        >
                                            <div className="mb-4">
                                                <label className="text-xs font-bold text-neutral-500 mb-2 block uppercase tracking-wider">Icon</label>
                                                <div className="grid grid-cols-6 gap-2">
                                                    {icons.map((iconOption) => (
                                                        <button
                                                            key={iconOption.name}
                                                            onClick={() => setSelectedIconName(iconOption.name)}
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedIconName === iconOption.name ? 'bg-white text-black' : 'text-neutral-500 hover:bg-[#333] hover:text-white'}`}
                                                        >
                                                            <iconOption.icon size={16} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-neutral-500 mb-2 block uppercase tracking-wider">Color</label>
                                                <div className="flex gap-2">
                                                    {colors.map((color) => (
                                                        <button
                                                            key={color}
                                                            onClick={() => setSelectedColor(color)}
                                                            className={`w-6 h-6 rounded-full ${color} ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#262626]' : ''} transition-all`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 50, opacity: 0 }}
                                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                        className="absolute bottom-4 left-3 right-3 z-30"
                                    >
                                        <form onSubmit={handleAddItem} className="bg-[#262626] h-16 rounded-[24px] flex items-center px-4 gap-3 shadow-2xl border border-white/10 relative">
                                            <button
                                                type="button"
                                                onClick={() => setShowCustomize(!showCustomize)}
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-[#333] hover:text-white transition-colors"
                                            >
                                                <Smile size={20} />
                                            </button>
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                                placeholder="List name...."
                                                className="bg-transparent border-none outline-none text-white placeholder-neutral-500 flex-1 text-[15px] font-medium"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!newTaskTitle.trim()}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${newTaskTitle.trim() ? 'bg-neutral-500 text-neutral-900' : 'bg-neutral-800 text-neutral-600'}`}
                                            >
                                                <Check size={16} strokeWidth={3} className={newTaskTitle.trim() ? "text-neutral-900" : "text-neutral-500"} />
                                            </button>
                                        </form>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    // DETAIL VIEW (NESTED TASKS)
                    <motion.div
                        key="detail-view"
                        initial={{ opacity: 20, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex flex-col h-full text-white relative"
                    >
                        {/* Celebration Overlay */}
                        {showCelebration && <Confetti />}

                        {/* Detail Header */}
                        <div className="flex items-center justify-between mb-6 px-1 relative z-20">
                            <div className={`flex items-center gap-4 transition-opacity duration-300 ${isAddingSubTask ? 'opacity-30' : 'opacity-100'}`}>
                                <motion.button
                                    whileHover={{ scale: 1.1, x: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedItem(null)}
                                    className="text-neutral-400 hover:text-white transition-colors"
                                    disabled={isAddingSubTask}
                                >
                                    <ArrowLeft size={24} />
                                </motion.button>
                                <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setIsAddingSubTask(!isAddingSubTask)}
                                disabled={showOptions}
                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isAddingSubTask ? 'bg-[#333] text-white' : 'bg-[#262626] text-neutral-400 hover:bg-[#333] hover:text-white'}`}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: isAddingSubTask ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Plus size={20} />
                                </motion.div>
                            </motion.button>
                        </div>

                        {/* Sub-task List */}
                        <motion.div
                            className={`flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2 transition-opacity duration-300 ${isAddingSubTask || showOptions ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {visibleTasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        variants={itemVariants} // Applied here too
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, x: 20 }}
                                        onClick={() => toggleSubTask(task.id)}
                                        className="bg-[#262626] p-4 rounded-xl flex items-center justify-between cursor-pointer group hover:bg-[#2a2a2a] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-neutral-500 border-neutral-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}
                                                animate={{ scale: task.completed ? [1, 1.2, 1] : 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {task.completed && (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                        <Check size={14} className="text-[#1a1a1a]" strokeWidth={3} />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                            <span className={`font-medium transition-all duration-300 ${task.completed ? 'text-neutral-500 line-through decoration-neutral-500' : 'text-neutral-200'}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <MoreHorizontal size={18} className="text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Detail Footer (Progress) */}
                        <div className={`mt-4 flex items-center justify-between px-2 pt-4 border-t border-white/5 transition-opacity duration-300 ${isAddingSubTask ? 'opacity-20' : 'opacity-100'}`}>
                            <div className="w-8 h-8 relative flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
                                    <circle cx="16" cy="16" r="12" fill="none" stroke="#333" strokeWidth="4" />
                                    <motion.circle
                                        cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="4"
                                        strokeDasharray="75.39"
                                        initial={{ strokeDashoffset: 75.39 }}
                                        animate={{ strokeDashoffset: 75.39 - (75.39 * progress / 100) }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className={`transition-colors ${isCompleted ? 'text-green-500' : 'text-neutral-400'}`}
                                    />
                                </svg>
                                {/* Optional Checkmark in center if completed */}
                                <AnimatePresence>
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0 }}
                                            className="absolute text-green-500"
                                        >
                                            <Check size={14} strokeWidth={4} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className={`text-xs font-bold tracking-wider transition-colors ${isCompleted ? 'text-green-500' : 'text-neutral-600'}`}>
                                {isCompleted ? "ALL COMPLETED!" : `COMPLETED: ${completedCount}/${totalCount}`}
                            </span>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setShowOptions(!showOptions)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${showOptions ? 'bg-white text-black' : 'text-neutral-600 hover:text-white hover:bg-[#262626]'}`}
                            >
                                {showOptions ? <X size={20} /> : <MoreHorizontal size={20} />}
                            </motion.button>
                        </div>

                        {/* Options Menu Overlay */}
                        <AnimatePresence>
                            {showOptions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                    className="absolute bottom-20 right-4 bg-[#262626] border border-white/10 rounded-2xl shadow-2xl p-2 w-64 z-50 flex flex-col gap-1"
                                >
                                    <button
                                        onClick={handleDeleteList}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#333] text-neutral-500 hover:text-white text-[15px] font-extrabold transition-colors flex items-center gap-3"
                                    >
                                        Delete list
                                    </button>
                                    <button
                                        onClick={handleDuplicateList}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#333] text-neutral-500 hover:text-white text-[15px] font-extrabold transition-colors flex items-center gap-3"
                                    >
                                        Duplicate
                                    </button>
                                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#333] text-neutral-500 hover:text-white text-[15px] font-extrabold transition-colors cursor-pointer group" onClick={() => setShowCompleted(!showCompleted)}>
                                        <span>Show completed</span>
                                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${showCompleted ? 'bg-neutral-200' : 'bg-neutral-600 group-hover:bg-neutral-500'}`}>
                                            <motion.div
                                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                                                animate={{ x: showCompleted ? 16 : 0 }}
                                                layout
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClearAll}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#333] text-neutral-500 hover:text-white text-[15px] font-extrabold transition-colors flex items-center gap-3"
                                    >
                                        Clear all
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Add Sub-Task Overlay */}
                        <AnimatePresence>
                            {isAddingSubTask && (
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                    className="absolute bottom-4 left-3 right-3 z-30"
                                >
                                    <form onSubmit={handleAddSubTask} className="bg-[#262626] h-16 rounded-[24px] flex items-center px-4 gap-3 shadow-2xl border border-white/10 relative">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500">
                                            <div className="w-6 h-6 rounded-full border-2 border-neutral-600" />
                                        </div>
                                        <input
                                            ref={subTaskInputRef}
                                            type="text"
                                            value={newSubTaskTitle}
                                            onChange={(e) => setNewSubTaskTitle(e.target.value)}
                                            placeholder="Task name...."
                                            className="bg-transparent border-none outline-none text-white placeholder-neutral-500 flex-1 text-[15px] font-medium"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newSubTaskTitle.trim()}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${newSubTaskTitle.trim() ? 'bg-neutral-500 text-neutral-900' : 'bg-neutral-800 text-neutral-600'}`}
                                        >
                                            <Check size={16} strokeWidth={3} className={newSubTaskTitle.trim() ? "text-neutral-900" : "text-neutral-500"} />
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
