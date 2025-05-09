import React from 'react';
import './ContainerSystem.css';

const ContainerBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
      {/* 弧形波浪线 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        {/* 顶部左侧弧形 */}
        <div className="curved-line" style={{
          top: '-60%',
          left: '-30%',
          width: '120%',
          height: '120%',
          transform: 'rotate(15deg)',
          borderColor: 'rgba(34, 197, 94, 0.1)'
        }}></div>

        {/* 右上角弧形 */}
        <div className="curved-line" style={{
          top: '-80%',
          right: '-50%',
          width: '140%',
          height: '140%',
          transform: 'rotate(-5deg)',
          borderColor: 'rgba(20, 184, 166, 0.08)'
        }}></div>

        {/* 左下方弧形 */}
        <div className="curved-line" style={{
          bottom: '-70%',
          left: '-20%',
          width: '100%',
          height: '120%',
          transform: 'rotate(10deg)',
          borderColor: 'rgba(34, 197, 94, 0.07)'
        }}></div>

        {/* 底部中央弧形 */}
        <div className="curved-line" style={{
          bottom: '-90%',
          left: '20%',
          width: '140%',
          height: '140%',
          transform: 'rotate(-15deg)',
          borderColor: 'rgba(20, 184, 166, 0.05)'
        }}></div>

        {/* 中部弧形 */}
        <div className="curved-line" style={{
          top: '10%',
          right: '-40%',
          width: '90%',
          height: '90%',
          transform: 'rotate(5deg)',
          opacity: '0.05',
          borderColor: 'rgba(34, 197, 94, 0.1)'
        }}></div>
      </div>
    </div>
  );
};

export default ContainerBackground; 