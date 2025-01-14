import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete Assignment',
      description: 'Finish the research paper for Computer Networks',
      deadline: new Date('2024-03-20'),
      completed: false,
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Study for Test',
      description: 'Review chapters 1-5 for the upcoming Mathematics test',
      deadline: new Date('2024-03-25'),
      completed: false,
      priority: 'medium' as const,
    },
  ]);

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus className="h-5 w-5" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => {
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className={`mt-1 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                >
                  <CheckCircle2 className="h-6 w-6" />
                </button>
                <div>
                  <h3 className={`text-xl font-semibold ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{format(task.deadline, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{format(task.deadline, 'h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}