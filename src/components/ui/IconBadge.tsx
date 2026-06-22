import type { ComponentType } from 'react';

export default function IconBadge({
  Icon,
  ring,
  iconColor,
  glow,
  size = 48,
  iconSize = 23,
  radius = 14,
}: {
  Icon: ComponentType<any>;
  ring: string;
  iconColor: string;
  glow?: string;
  size?: number;
  iconSize?: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: ring,
        padding: 1.5,
        flexShrink: 0,
        boxShadow: glow ? `0 10px 26px -12px ${glow}` : undefined,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: radius - 1.5,
          background: '#150813',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
        }}
      >
        <Icon size={iconSize} weight="duotone" />
      </div>
    </div>
  );
}
