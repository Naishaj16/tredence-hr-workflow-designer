import type { KeyValue } from '../../types/workflow';

type Props = {
  label: string;
  values: KeyValue[];
  onChange: (values: KeyValue[]) => void;
};

export const FieldArray = ({ label, values, onChange }: Props) => {
  const updateValue = (index: number, key: 'key' | 'value', next: string) => {
    onChange(values.map((item, idx) => (idx === index ? { ...item, [key]: next } : item)));
  };

  const addItem = () => onChange([...values, { key: '', value: '' }]);
  const removeItem = (index: number) => onChange(values.filter((_, idx) => idx !== index));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <button type="button" onClick={addItem} className="text-xs font-medium text-indigo-600">
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {values.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              value={item.key}
              onChange={(e) => updateValue(index, 'key', e.target.value)}
              placeholder="Key"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
            <input
              value={item.value}
              onChange={(e) => updateValue(index, 'value', e.target.value)}
              placeholder="Value"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
            <button type="button" onClick={() => removeItem(index)} className="rounded-xl px-3 text-sm text-rose-600">
              ✕
            </button>
          </div>
        ))}
        {values.length === 0 && <p className="text-xs text-slate-400">No entries added yet.</p>}
      </div>
    </div>
  );
};
