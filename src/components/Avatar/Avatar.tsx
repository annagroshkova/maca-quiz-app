interface AvatarProps {
  name: string;
  size?: number;
  bgColor?: string;
}

export default function Avatar({ name, size = 48, bgColor }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  const backgroundColor = bgColor;

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
