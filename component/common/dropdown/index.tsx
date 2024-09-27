type TDropdownProps = {
  name: string;
  register?: any; // Optional, if not using react-hook-form
  value?: string; // Optional, for controlled components
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Optional, for controlled components
  options: { value: string; label: string }[];
};

export default function DropDown(props: TDropdownProps) {
  return (
    <select
      className="border min-w-[14.6rem] rounded-lg border-slate-300 py-2 px-1"
      name={props.name}
      value={props.value} // Optional: For controlled input
      onChange={props.onChange} // Optional: For controlled input
      {...(props.register ? props.register(props.name) : {})} // Conditionally apply register if available
    >
      {props.options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
