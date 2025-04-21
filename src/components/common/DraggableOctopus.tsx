import { useState, useRef, useEffect } from 'react';
import octopusAvatar from '../../assets/octopus-avatar.svg';

interface Position {
  x: number;
  y: number;
}

interface Props {
  onOpen: () => void;
}

const DraggableOctopus: React.FC<Props> = ({ onOpen }) => {
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const octopusRef = useRef<HTMLDivElement>(null);

  // 处理拖拽开始
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (octopusRef.current) {
      setIsDragging(true);
      const rect = octopusRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    e.preventDefault();
  };

  // 处理拖拽
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // 计算新位置，确保不超出屏幕边界
    const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragOffset.y));
    
    setPosition({ x: newX, y: newY });
  };

  // 处理拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加和移除鼠标事件监听器
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={octopusRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1000,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: isDragging ? 'none' : 'all 0.1s ease'
      }}
      onMouseDown={handleMouseDown}
      onClick={() => !isDragging && onOpen()}
    >
      <img 
        src={octopusAvatar} 
        alt="AI 沃宝" 
        style={{ 
          width: '32px', 
          height: '32px',
          pointerEvents: 'none'
        }} 
      />
    </div>
  );
};

export default DraggableOctopus; 