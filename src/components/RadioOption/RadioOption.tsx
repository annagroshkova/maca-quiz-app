interface RadioOptionProps {
  name: string;
  value: string | undefined;
  text: string;
  imageUrl?: string;
  checked: boolean;
  onChange: () => void;
}

export default function RadioOption({
  name,
  value,
  text,
  imageUrl,
  checked,
  onChange,
}: RadioOptionProps) {
  return (
    <label className={imageUrl ? "category" : "level"}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange()}
      />
      {imageUrl && (
        <div className='category__image-container'>
          <img className='category__image' src={imageUrl} alt={text} />
        </div>
      )}
      <p className={imageUrl ? "category__text" : "level__text"}>{text}</p>
    </label>
  );
}

