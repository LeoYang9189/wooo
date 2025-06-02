import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';

interface GlobeMapProps {
  height?: string;
}

// 定义Globe实例类型
type GlobeInstance = ReturnType<typeof Globe>;

const GlobeMap: React.FC<GlobeMapProps> = ({ height = '600px' }) => {
  const globeRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeInstance = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // 清理之前的实例
    if (globeInstance.current) {
      try {
        globeInstance.current.destroy?.();
      } catch {
        console.log('Globe instance cleanup');
      }
    }

    // 创建Globe实例
    try {
      globeInstance.current = new Globe(globeRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('#ff6b6b')
        .atmosphereAltitude(0.1);

      // 模拟航线数据
      const routes = [
        { startLat: 31.2304, startLng: 121.4737, endLat: 34.0522, endLng: -118.2437, color: '#00f7ff' },
        { startLat: 29.8683, startLng: 121.5440, endLat: 51.9225, endLng: 4.4792, color: '#00ff88' },
        { startLat: 36.0986, startLng: 120.3719, endLat: 53.5511, endLng: 9.9937, color: '#ffcc00' },
        { startLat: 39.1612, startLng: 117.3238, endLat: 40.7128, endLng: -74.0060, color: '#ff6b6b' },
        { startLat: 24.4798, startLng: 118.0819, endLat: 51.3890, endLng: 1.3167, color: '#9966ff' },
      ];

      globeInstance.current
        .arcsData(routes)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcStroke(2);

      // 添加城市标记
      const cities = [
        { lat: 31.2304, lng: 121.4737, label: '上海', color: '#00f7ff' },
        { lat: 29.8683, lng: 121.5440, label: '宁波', color: '#00ff88' },
        { lat: 36.0986, lng: 120.3719, label: '青岛', color: '#ffcc00' },
        { lat: 39.1612, lng: 117.3238, label: '天津', color: '#ff6b6b' },
        { lat: 24.4798, lng: 118.0819, label: '厦门', color: '#9966ff' },
        { lat: 34.0522, lng: -118.2437, label: '洛杉矶', color: '#00f7ff' },
        { lat: 51.9225, lng: 4.4792, label: '鹿特丹', color: '#00ff88' },
        { lat: 53.5511, lng: 9.9937, label: '汉堡', color: '#ffcc00' },
        { lat: 40.7128, lng: -74.0060, label: '纽约', color: '#ff6b6b' },
        { lat: 51.3890, lng: 1.3167, label: '费利克斯托', color: '#9966ff' },
      ];

      globeInstance.current
        .labelsData(cities)
        .labelLat('lat')
        .labelLng('lng')
        .labelText('label')
        .labelSize(1.5)
        .labelColor('color')
        .labelResolution(2);

      // 自动旋转
      if (globeInstance.current.controls) {
        globeInstance.current.controls().autoRotate = true;
        globeInstance.current.controls().autoRotateSpeed = 0.5;
      }
    } catch (error) {
      console.error('Failed to initialize Globe:', error);
    }

    return () => {
      if (globeInstance.current) {
        try {
          globeInstance.current.destroy?.();
        } catch {
          console.log('Globe cleanup');
        }
      }
    };
  }, []);

  return (
    <div 
      ref={globeRef} 
      style={{ 
        width: '100%', 
        height,
        background: 'transparent'
      }}
    />
  );
};

export default GlobeMap; 