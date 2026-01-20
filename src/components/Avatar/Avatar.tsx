interface AvatarProps {
  name: string;
  size?: number;
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`;
}

export default function Avatar({ name, size = 48 }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  const backgroundColor = stringToColor(name);

  return (
    <div className="avatar" style={{ width: size, height: size }}>
      <div
        className="avatar__icon"
        aria-label={`User avatar for ${name}`}
        style={{
          backgroundColor,
          fontSize: size * 0.45,
        }}
      >
        {initial}
      </div>
    </div>
  );
}
