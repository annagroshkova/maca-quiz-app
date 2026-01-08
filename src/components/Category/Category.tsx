interface CategoryProps {
  text: string;
  apiQuery: string;
  imageUrl: string;
}

export default function Category({
  text,
  imageUrl,
  apiQuery,
}: CategoryProps) {
  return (
    <label className="category">
      <input type='radio' name={apiQuery} />
      <div className='category__image-container'>
        <img className='category__image' src={imageUrl} alt={text} />
      </div>
      <p className='category__text'>{text}</p>
    </label>
  );
}
