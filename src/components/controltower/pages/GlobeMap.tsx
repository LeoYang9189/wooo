import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';

interface GlobeMapProps {
  width?: number;
  height?: number;
}

interface PortData {
  name: string;
  lat: number;
  lng: number;
  size: number;
}

interface RouteData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

const GlobeMap: React.FC<GlobeMapProps> = ({ width = 800, height = 600 }) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<ReturnType<typeof Globe> | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // 港口数据
    const ports: PortData[] = [
      { name: '上海港', lat: 31.22, lng: 121.48, size: 25 },
      { name: '深圳港', lat: 22.62, lng: 114.07, size: 21 },
      { name: '洛杉矶港', lat: 34.05, lng: -118.24, size: 18 },
      { name: '长滩港', lat: 33.77, lng: -118.19, size: 16 },
      { name: '鹿特丹港', lat: 51.92, lng: 4.47, size: 19 },
      { name: '汉堡港', lat: 53.55, lng: 9.99, size: 14 },
      { name: '新加坡港', lat: 1.29, lng: 103.85, size: 22 },
      { name: '迪拜港', lat: 25.25, lng: 55.27, size: 13 }
    ];

    // 航线数据
    const routes: RouteData[] = [
      { startLat: 31.22, startLng: 121.48, endLat: 34.05, endLng: -118.24, color: '#00ff88' },
      { startLat: 31.22, startLng: 121.48, endLat: 51.92, endLng: 4.47, color: '#00f7ff' },
      { startLat: 22.62, startLng: 114.07, endLat: 33.77, endLng: -118.19, color: '#ffcc00' },
      { startLat: 22.62, startLng: 114.07, endLat: 53.55, endLng: 9.99, color: '#6633ff' },
      { startLat: 1.29, startLng: 103.85, endLat: 51.92, endLng: 4.47, color: '#ff66cc' },
      { startLat: 1.29, startLng: 103.85, endLat: 25.25, endLng: 55.27, color: '#00ccff' }
    ];

    // 创建Globe实例
    globeInstance.current = Globe()(globeRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .width(width)
      .height(height)
      .pointsData(ports)
      .pointColor(() => '#00f7ff')
      .pointAltitude(0.01)
      .pointRadius((d: PortData) => d.size / 100)
      .pointLabel((d: PortData) => d.name)
      .arcsData(routes)
      .arcColor((d: RouteData) => d.color)
      .arcDashLength(2)
      .arcDashGap(0.5)
      .arcDashAnimateTime(4000)
      .arcStroke(0.5)
      .arcsTransitionDuration(0)
      .enablePointerInteraction(false);

    // 自动旋转
    if (globeInstance.current && globeInstance.current.controls) {
      globeInstance.current.controls().autoRotate = true;
      globeInstance.current.controls().autoRotateSpeed = 0.5;
    }

    return () => {
      if (globeInstance.current && typeof globeInstance.current._destructor === 'function') {
        globeInstance.current._destructor();
      }
    };
  }, [width, height]);

  return (
    <div 
      ref={globeRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'transparent'
      }} 
    />
  );
};

export default GlobeMap; 