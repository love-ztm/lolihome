export default function Snowfall() {
  // 生成 35 个雪花，每个随机延迟和大小
  const flakes = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,       // 2~6px
    delay: -(Math.random() * 8),      // -8s~0s
    duration: Math.random() * 4 + 6,  // 6~10s
    opacity: Math.random() * 0.5 + 0.5, // 0.5~1
  }));

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map(f => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            opacity: f.opacity,
          }}
        />
      ))}
    </div>
  );
}
