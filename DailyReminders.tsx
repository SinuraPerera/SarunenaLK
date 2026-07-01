import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Square, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface Reminder {
  id: string;
  task: string;
  dueDate: string;
  category: string;
  completed: boolean;
  isPredefined?: boolean;
}

const DEFAULT_REMINDERS: Reminder[] = [
  { id: 'rem-1', task: 'Check soil moisture sensors in Northern Paddy Plot', dueDate: 'Today', category: 'Sensor Check', completed: false, isPredefined: true },
  { id: 'rem-2', task: 'Apply organic compost split (Basal Dressing) to Green Chilli', dueDate: 'Today', category: 'Fertilizer', completed: false, isPredefined: true },
  { id: 'rem-3', task: 'Spray herbal neem water to protect onions against Thrips', dueDate: 'Tomorrow', category: 'Pest Control', completed: false, isPredefined: true },
  { id: 'rem-4', task: 'Clear drainage channels in Southern coconut palm trenches', dueDate: 'In 3 Days', category: 'Water', completed: true, isPredefined: true },
];

export default function DailyReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    try {
      const saved = localStorage.getItem('sarunena_reminders');
      return saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
    } catch {
      return DEFAULT_REMINDERS;
    }
  });

  const [newTask, setNewTask] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newDueDate, setNewDueDate] = useState('Today');

  useEffect(() => {
    try {
      localStorage.setItem('sarunena_reminders', JSON.stringify(reminders));
    } catch (e) {
      // Silent localStorage failure
    }
  }, [reminders]);

  const handleToggle = (id: string) => {
    setReminders(prev => prev.map(rem => 
      rem.id === id ? { ...rem, completed: !rem.completed } : rem
    ));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newRem: Reminder = {
      id: `rem-custom-${Date.now()}`,
      task: newTask.trim(),
      dueDate: newDueDate,
      category: newCategory,
      completed: false
    };

    setReminders(prev => [newRem, ...prev]);
    setNewTask('');
  };

  const handleDelete = (id: string) => {
    setReminders(prev => prev.filter(rem => rem.id !== id));
  };

  const completedCount = reminders.filter(r => r.completed).length;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md space-y-4" id="daily-reminders-widget">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-50 pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-[#2E7D32]" />
          <h4 className="text-sm font-bold text-gray-900">සරුනැණ Daily Tasks & Work Reminders</h4>
        </div>
        <div className="bg-emerald-50 text-[#2E7D32] px-2 py-1 rounded-xl text-[10px] font-black flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{completedCount} / {reminders.length} Done</span>
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100">
        <div className="sm:col-span-6">
          <input
            type="text"
            required
            placeholder="Add a new farming chore (e.g., Water paddy)..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
          />
        </div>
        
        <div className="sm:col-span-3">
          <select
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="w-full px-2 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <button
            type="submit"
            className="w-full py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
              rem.completed
                ? 'bg-gray-50/50 border-gray-100/70 opacity-60'
                : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-3 max-w-[85%]">
              <button
                type="button"
                onClick={() => handleToggle(rem.id)}
                className="mt-0.5 text-gray-400 hover:text-[#2E7D32] transition-colors cursor-pointer shrink-0"
              >
                {rem.completed ? (
                  <CheckSquare className="h-4 w-4 text-[#2E7D32]" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
              </button>
              <div>
                <p className={`text-xs font-semibold leading-relaxed text-gray-800 ${rem.completed ? 'line-through text-gray-400' : ''}`}>
                  {rem.task}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                    {rem.category}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400">
                    Due: <strong className="text-gray-500">{rem.dueDate}</strong>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(rem.id)}
              className="text-gray-300 hover:text-rose-600 p-1 rounded-lg transition-colors shrink-0 cursor-pointer"
              title="Delete task"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {reminders.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-xs">
            🎉 All farming tasks are complete! Add a new chore above to get started.
          </div>
        )}
      </div>

    </div>
  );
}
