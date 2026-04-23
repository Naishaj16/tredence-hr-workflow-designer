import { useEffect, useState } from 'react';
import type { AutomationAction, WorkflowNode } from '../../types/workflow';
import { FieldArray } from './FieldArray';

type Props = {
  node: WorkflowNode | null;
  automationActions: AutomationAction[];
  onChangeNode: (nodeId: string, updater: (node: WorkflowNode) => WorkflowNode) => void;
  onDeleteNode: () => void;
};

const inputClassName = 'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400';

export const NodeFormPanel = ({ node, automationActions, onChangeNode, onDeleteNode }: Props) => {
  const [selectedActionId, setSelectedActionId] = useState('');

  useEffect(() => {
    if (node?.data.type === 'automated') {
      setSelectedActionId(node.data.actionId);
    }
  }, [node]);

  if (!node) {
    return (
      <aside className="h-full w-[360px] border-l border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Node Configuration</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">Select a node from the canvas to edit its configuration.</p>
      </aside>
    );
  }

  const update = (updater: (current: WorkflowNode) => WorkflowNode) => onChangeNode(node.id, updater);

  return (
    <aside className="h-full w-[360px] overflow-y-auto border-l border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">Configuration</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">{node.type} node</h2>
        </div>
        <button onClick={onDeleteNode} className="rounded-xl border border-rose-200 px-3 py-2 text-sm text-rose-600">
          Delete
        </button>
      </div>

      <div className="space-y-4">
        {node.data.type === 'start' && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">Start title</label>
              <input
                value={node.data.title}
                onChange={(e) => update((current) => ({ ...current, data: { ...current.data, title: e.target.value } as typeof current.data }))}
                className={inputClassName}
              />
            </div>
            <FieldArray
              label="Metadata"
              values={node.data.metadata}
              onChange={(values) => update((current) => ({ ...current, data: { ...current.data, metadata: values } as typeof current.data }))}
            />
          </>
        )}

        {node.data.type === 'task' && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">Title</label>
              <input value={node.data.title} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, title: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea value={node.data.description} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, description: e.target.value } as typeof current.data }))} className={`${inputClassName} min-h-[90px]`} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Assignee</label>
              <input value={node.data.assignee} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, assignee: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Due date</label>
              <input type="date" value={node.data.dueDate} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, dueDate: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <FieldArray
              label="Custom fields"
              values={node.data.customFields}
              onChange={(values) => update((current) => ({ ...current, data: { ...current.data, customFields: values } as typeof current.data }))}
            />
          </>
        )}

        {node.data.type === 'approval' && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">Title</label>
              <input value={node.data.title} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, title: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Approver role</label>
              <input value={node.data.approverRole} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, approverRole: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Auto-approve threshold</label>
              <input type="number" value={node.data.autoApproveThreshold} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, autoApproveThreshold: Number(e.target.value) } as typeof current.data }))} className={inputClassName} />
            </div>
          </>
        )}

        {node.data.type === 'automated' && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">Title</label>
              <input value={node.data.title} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, title: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Action</label>
              <select
                value={selectedActionId}
                onChange={(e) => {
                  const action = automationActions.find((item) => item.id === e.target.value);
                  setSelectedActionId(e.target.value);
                  update((current) => ({
                    ...current,
                    data: {
                      ...current.data,
                      actionId: action?.id ?? '',
                      actionLabel: action?.label ?? '',
                      actionParams: Object.fromEntries((action?.params ?? []).map((param) => [param, ''])),
                    } as typeof current.data,
                  }));
                }}
                className={inputClassName}
              >
                <option value="">Select an action</option>
                {automationActions.map((action) => (
                  <option key={action.id} value={action.id}>
                    {action.label}
                  </option>
                ))}
              </select>
            </div>
            {Object.keys(node.data.actionParams).map((param) => (
              <div key={param}>
                <label className="text-sm font-medium capitalize text-slate-700">{param}</label>
                <input
                  value={node.data.actionParams[param] ?? ''}
                  onChange={(e) =>
                    update((current) => ({
                      ...current,
                      data: {
                        ...current.data,
                        actionParams: {
                          ...current.data.actionParams,
                          [param]: e.target.value,
                        },
                      } as typeof current.data,
                    }))
                  }
                  className={inputClassName}
                />
              </div>
            ))}
          </>
        )}

        {node.data.type === 'end' && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">End message</label>
              <input value={node.data.endMessage} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, endMessage: e.target.value } as typeof current.data }))} className={inputClassName} />
            </div>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
              <input type="checkbox" checked={node.data.summaryFlag} onChange={(e) => update((current) => ({ ...current, data: { ...current.data, summaryFlag: e.target.checked } as typeof current.data }))} />
              Include summary in final output
            </label>
          </>
        )}
      </div>
    </aside>
  );
};
