import React from "react";

interface FilterBarProps {
  onFilter: (type: string, status: string) => void;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState("");

  return (
    <div>
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
      <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
      <button onClick={() => onFilter(type, status)}>Filter</button>
    </div>
  );
}
