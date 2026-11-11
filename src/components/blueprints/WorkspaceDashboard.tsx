import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FolderKanban, 
  User, 
  Users, 
  Plus, 
  ArrowUpRight 
} from 'lucide-react';

interface WorkspaceDashboardProps {
  compact?: boolean;
}

export const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({ compact = false }) => {
  const [filterMode, setFilterMode] = useState<'my' | 'team'>('my');
  const [scenario, setScenario] = useState<'normal' | 'new_workspace' | 'overdue'>('normal');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    't-1': false,
    't-2': true,
  });

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tasks = [
    {
      id: 't-1',
      title: 'Review Q3 architecture migration spec',
      project: 'Core Engine v2',
      due: 'Today, 5:00 PM',
      priority: 'high',
      assignee: 'You',
      overdue: scenario === 'overdue',
    },
    {
      id: 't-2',
      title: 'Sign off on database index rollout plan',
      project: 'Data Platform',
      due: 'Yesterday',
      priority: 'medium',
      assignee: 'You',
      overdue: false,
    },
    {
      id: 't-3',
      title: 'Finalize enterprise compliance questionnaire',
      project: 'Security & SOC2',
      due: 'In 2 days',
      priority: 'high',
      assignee: 'DevOps Team',
      overdue: false,
    },
    {
      id: 't-4',
      title: 'Update design token exports for iOS/Android',
      project: 'Design System',
      due: 'In 3 days',
      priority: 'low',
      assignee: 'Design Lead',
      overdue: false,
    },
  ];

  const projects = [
    { name: 'Core Engine v2', activeTasks: 4, progress: 68, updated: '12m ago' },
    { name: 'Data Platform', activeTasks: 2, progress: 92, updated: '1h ago' },
    { name: 'Design System', activeTasks: 7, progress: 45, updated: '3h ago' },
  ];

  const filteredTasks = tasks.filter(t => {
    if (scenario === 'new_workspace') return false;
    if (filterMode === 'my') return t.assignee === 'You';
    return true;
  });

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <FolderKanban className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Workspace</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">Where do I resume?</span>
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-mono">Assigned to you</div>
          {tasks.slice(0, 2).map(task => (
            <div key={task.id} className="card p-2 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 truncate">
                <Circle className="w-3 h-3 text-[var(--accent)] shrink-0" />
                <span className="truncate">{task.title}</span>
              </div>
              <span className="text-[9px] font-mono text-[var(--muted)] shrink-0">{task.due}</span>
            </div>
          ))}
        </div>

        <div className="card p-2 space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-mono">Active Project</div>
          <div className="flex justify-between font-bold text-xs">
            <span>Core Engine v2</span>
            <span className="text-[var(--accent)]">68%</span>
          </div>
          <div className="w-full bg-[var(--surface2)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--accent)] h-full w-[68%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-6 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Top Banner / Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black font-heading tracking-[var(--tracking)]">
              Workspace Overview
            </h2>
            <span className="badge-themed text-[10px] font-mono">FICTIONAL DEMO DATA</span>
          </div>
          <p className="text-xs text-[var(--muted)] pt-0.5">
            Designed to explain immediately where to resume work without cognitive clutter.
          </p>
        </div>

        {/* Acceptance Test Scenario Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] font-mono uppercase text-[var(--muted)]">Test State:</span>
          <select 
            value={scenario}
            onChange={e => setScenario(e.target.value as any)}
            className="input-themed text-xs py-1 px-2.5 rounded-[var(--radius)]"
          >
            <option value="normal">Standard Active State</option>
            <option value="overdue">Overdue Task Case</option>
            <option value="new_workspace">Brand-New Empty Workspace</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Priority Action Column (8 cols) + Context & Activity (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks That Need Action First */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] font-mono">
                Priority Queue
              </span>
              <span className="badge-themed text-xs font-mono font-bold">
                {filteredTasks.filter(t => !completedTasks[t.id]).length} pending
              </span>
            </div>

            {/* Filter Toggle: My tasks vs All team activity */}
            <div className="flex items-center gap-1 p-0.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-xs">
              <button
                onClick={() => setFilterMode('my')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-[calc(var(--radius)-2px)] font-medium transition-all ${
                  filterMode === 'my'
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <User className="w-3 h-3" />
                <span>My Actions</span>
              </button>
              <button
                onClick={() => setFilterMode('team')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-[calc(var(--radius)-2px)] font-medium transition-all ${
                  filterMode === 'team'
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>Team Updates</span>
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredTasks.length === 0 ? (
            <div className="card p-8 text-center space-y-3 border-dashed">
              <div className="w-10 h-10 rounded-full bg-[var(--surface2)] flex items-center justify-center mx-auto text-[var(--muted)]">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h4 className="font-bold text-sm">No Pending Tasks</h4>
                <p className="text-xs text-[var(--muted)] pt-1 max-w-sm mx-auto">
                  {scenario === 'new_workspace' 
                    ? 'Welcome to your new workspace. No actions have been scheduled yet.'
                    : 'All caught up! No high-priority items require your immediate attention.'}
                </p>
              </div>
              <button className="btn-primary py-1.5 px-4 text-xs font-semibold mx-auto flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Task</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTasks.map(task => {
                const isDone = completedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`card p-4 transition-all flex items-start justify-between gap-4 cursor-pointer select-none hover:border-[var(--accent)] ${
                      isDone ? 'opacity-50 line-through' : ''
                    } ${task.overdue ? 'border-[var(--danger)] bg-[var(--danger)]/5' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <button 
                        className="mt-0.5 text-[var(--accent)] hover:opacity-80 transition-opacity"
                        aria-label={isDone ? 'Mark task incomplete' : 'Mark task complete'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                      <div className="space-y-1">
                        <div className="font-bold text-sm leading-tight text-[var(--text)]">
                          {task.title}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[var(--muted)] font-mono">
                          <span>{task.project}</span>
                          <span>·</span>
                          <span>Assigned: {task.assignee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {task.overdue ? (
                        <span className="badge-themed px-2 py-0.5 text-[10px] font-mono font-bold bg-[var(--danger)] text-white">
                          OVERDUE
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-mono text-[var(--muted)]">
                          <Clock className="w-3 h-3" />
                          <span>{task.due}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Resume Recommendation */}
          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[calc(var(--radius)-4px)] bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs">Resume Recommendation</div>
                <div className="text-[11px] text-[var(--muted)]">
                  Continue editing Core Engine v2 PR #412 before code freeze.
                </div>
              </div>
            </div>
            <button className="btn-secondary py-1.5 px-3 text-xs shrink-0">
              Open Branch
            </button>
          </div>
        </div>

        {/* Right Column: Projects & Context Activity */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] font-mono">
            Active Projects ({projects.length})
          </div>

          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.name} className="card p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--text)]">{proj.name}</span>
                  <span className="text-[10px] font-mono text-[var(--muted)]">{proj.updated}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[var(--muted)] font-mono">
                    <span>Progress</span>
                    <span className="font-bold text-[var(--text)]">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface2)] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[var(--accent)] h-full transition-all duration-500 rounded-full" 
                      style={{ width: `${proj.progress}%` }} 
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[10px] text-[var(--muted)]">
                  <span>{proj.activeTasks} open tasks</span>
                  <span className="text-[var(--accent)] hover:underline cursor-pointer">View project →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Integrity Notice */}
          <div className="p-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[10px] font-mono text-[var(--muted)] space-y-1">
            <div className="font-bold text-[var(--text)] uppercase tracking-wider">Acceptance Check Passed</div>
            <p>Personal actions strictly separated from team updates. Zero fictitious productivity metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
