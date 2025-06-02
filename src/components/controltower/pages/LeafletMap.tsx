import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 自定义图标
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${color};
      border: 2px solid #fff;
      box-shadow: 0 0 10px ${color};
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const portIcon = createCustomIcon('#00f7ff');

// 曲线航线组件
const FlowingRoutes: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // 航线数据，使用明确的元组类型
    const routes = [
      { from: [31.22, 121.48] as [number, number], to: [34.05, -118.24] as [number, number], color: '#00ff88', name: '上海-洛杉矶', orders: Math.floor(Math.random() * 500) + 200 },
      { from: [31.22, 121.48] as [number, number], to: [51.92, 4.47] as [number, number], color: '#00f7ff', name: '上海-鹿特丹', orders: Math.floor(Math.random() * 400) + 150 },
      { from: [22.62, 114.07] as [number, number], to: [33.77, -118.19] as [number, number], color: '#ffcc00', name: '深圳-长滩', orders: Math.floor(Math.random() * 350) + 180 },
      { from: [22.62, 114.07] as [number, number], to: [53.55, 9.99] as [number, number], color: '#6633ff', name: '深圳-汉堡', orders: Math.floor(Math.random() * 300) + 120 },
      { from: [1.29, 103.85] as [number, number], to: [51.92, 4.47] as [number, number], color: '#ff66cc', name: '新加坡-鹿特丹', orders: Math.floor(Math.random() * 280) + 100 },
      { from: [1.29, 103.85] as [number, number], to: [25.25, 55.27] as [number, number], color: '#00ccff', name: '新加坡-迪拜', orders: Math.floor(Math.random() * 220) + 80 }
    ];

    // 创建曲线路径的函数
    const createCurvedPath = (start: [number, number], end: [number, number]) => {
      const startLat = start[0];
      const startLng = start[1];
      const endLat = end[0];
      const endLng = end[1];

      // 计算中点和控制点
      const midLat = (startLat + endLat) / 2;
      const midLng = (startLng + endLng) / 2;
      
      // 根据距离调整曲度
      const distance = Math.sqrt(Math.pow(endLat - startLat, 2) + Math.pow(endLng - startLng, 2));
      const curvature = distance * 0.3; // 曲度系数
      
      // 计算控制点（向北偏移以创建弧形）
      const controlLat = midLat + curvature;
      const controlLng = midLng;

      // 生成曲线上的点
      const points: [number, number][] = [];
      const steps = 50; // 曲线分段数
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = Math.pow(1 - t, 2) * startLat + 2 * (1 - t) * t * controlLat + Math.pow(t, 2) * endLat;
        const lng = Math.pow(1 - t, 2) * startLng + 2 * (1 - t) * t * controlLng + Math.pow(t, 2) * endLng;
        points.push([lat, lng]);
      }
      
      return points;
    };

    // 路线类型
    interface RouteData {
      from: [number, number];
      to: [number, number];
      color: string;
      name: string;
      orders: number;
    }

    // 创建流动动画的SVG样式
    const createFlowingPolyline = (route: RouteData, index: number) => {
      const path = createCurvedPath(route.from, route.to);
      
      // 创建基础路径
      const baseLine = L.polyline(path, {
        color: route.color,
        weight: 3,
        opacity: 0.4
      }).addTo(map);

      // 创建流动效果的SVG
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('class', 'flowing-route');
      svgElement.style.position = 'absolute';
      svgElement.style.top = '0';
      svgElement.style.left = '0';
      svgElement.style.width = '100%';
      svgElement.style.height = '100%';
      svgElement.style.pointerEvents = 'none';
      svgElement.style.zIndex = '1000';

      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      // 将经纬度转换为像素坐标
      const convertToPixels = () => {
        const pixelPoints = path.map(point => {
          const latLng = L.latLng(point[0], point[1]);
          return map.latLngToContainerPoint(latLng);
        });

        // 创建SVG路径字符串
        let pathString = `M ${pixelPoints[0].x} ${pixelPoints[0].y}`;
        for (let i = 1; i < pixelPoints.length; i++) {
          pathString += ` L ${pixelPoints[i].x} ${pixelPoints[i].y}`;
        }
        
        pathElement.setAttribute('d', pathString);
        pathElement.setAttribute('fill', 'none');
        pathElement.setAttribute('stroke', route.color);
        pathElement.setAttribute('stroke-width', '4');
        pathElement.setAttribute('opacity', '0.8');
        
        // 添加流动动画 - 改为实线流动效果
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linearGradient.setAttribute('id', `gradient-${index}`);
        linearGradient.setAttribute('x1', '0%');
        linearGradient.setAttribute('y1', '0%');
        linearGradient.setAttribute('x2', '100%');
        linearGradient.setAttribute('y2', '0%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', route.color);
        stop1.setAttribute('stop-opacity', '0.3');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '50%');
        stop2.setAttribute('stop-color', route.color);
        stop2.setAttribute('stop-opacity', '1');
        
        const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop3.setAttribute('offset', '100%');
        stop3.setAttribute('stop-color', route.color);
        stop3.setAttribute('stop-opacity', '0.3');
        
        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);
        linearGradient.appendChild(stop3);
        gradient.appendChild(linearGradient);
        svgElement.appendChild(gradient);
        
        pathElement.setAttribute('stroke', `url(#gradient-${index})`);
        pathElement.style.animation = `flow-${index} 3s linear infinite`;
        
        // 添加订单数量标签
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const midPointIndex = Math.floor(pixelPoints.length / 2);
        const midPoint = pixelPoints[midPointIndex];
        
        textElement.setAttribute('x', midPoint.x.toString());
        textElement.setAttribute('y', (midPoint.y - 8).toString());
        textElement.setAttribute('fill', route.color);
        textElement.setAttribute('font-size', '12');
        textElement.setAttribute('font-weight', 'bold');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('dominant-baseline', 'middle');
        textElement.style.filter = `drop-shadow(0 0 3px ${route.color})`;
        textElement.style.fontFamily = 'Arial, sans-serif';
        textElement.textContent = `${route.orders}票订单`;
        
        // 添加背景矩形
        const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const textWidth = route.orders.toString().length * 8 + 40; // 估算文字宽度
        rectElement.setAttribute('x', (midPoint.x - textWidth/2).toString());
        rectElement.setAttribute('y', (midPoint.y - 18).toString());
        rectElement.setAttribute('width', textWidth.toString());
        rectElement.setAttribute('height', '20');
        rectElement.setAttribute('fill', 'rgba(0, 20, 40, 0.8)');
        rectElement.setAttribute('stroke', route.color);
        rectElement.setAttribute('stroke-width', '1');
        rectElement.setAttribute('rx', '8');
        rectElement.setAttribute('ry', '8');
        rectElement.style.filter = `drop-shadow(0 0 5px ${route.color})`;
        
        svgElement.appendChild(rectElement);
        svgElement.appendChild(textElement);
      };

      // 添加CSS动画 - 实线流动效果
      const style = document.createElement('style');
      style.textContent += `
        @keyframes flow-${index} {
          0% { stroke-dasharray: 40 0; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 40 0; stroke-dashoffset: -40; }
        }
        .flowing-route path {
          filter: drop-shadow(0 0 3px ${route.color});
        }
      `;
      document.head.appendChild(style);

      svgElement.appendChild(pathElement);
      map.getContainer().appendChild(svgElement);

      // 初始转换
      convertToPixels();

      // 监听地图事件以更新路径
      const updatePath = () => {
        convertToPixels();
      };

      map.on('zoom', updatePath);
      map.on('move', updatePath);

      return () => {
        map.removeLayer(baseLine);
        if (svgElement.parentNode) {
          svgElement.parentNode.removeChild(svgElement);
        }
        map.off('zoom', updatePath);
        map.off('move', updatePath);
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };
    };

    // 创建所有流动路线
    const cleanupFunctions = routes.map((route, index) => 
      createFlowingPolyline(route, index)
    );

    // 清理函数
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [map]);

  return null;
};

interface LeafletMapProps {
  height?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ height = '600px' }) => {
  // 港口数据 - 添加英文名称
  const ports = [
    { name: '上海港', englishName: 'Port of Shanghai', position: [31.22, 121.48] as [number, number] },
    { name: '深圳港', englishName: 'Port of Shenzhen', position: [22.62, 114.07] as [number, number] },
    { name: '洛杉矶港', englishName: 'Port of Los Angeles', position: [34.05, -118.24] as [number, number] },
    { name: '长滩港', englishName: 'Port of Long Beach', position: [33.77, -118.19] as [number, number] },
    { name: '鹿特丹港', englishName: 'Port of Rotterdam', position: [51.92, 4.47] as [number, number] },
    { name: '汉堡港', englishName: 'Port of Hamburg', position: [53.55, 9.99] as [number, number] },
    { name: '新加坡港', englishName: 'Port of Singapore', position: [1.29, 103.85] as [number, number] },
    { name: '迪拜港', englishName: 'Port of Dubai', position: [25.25, 55.27] as [number, number] }
  ];

  return (
    <div style={{ height, width: '100%' }}>
      <style>{`
        .leaflet-container {
          background: transparent !important;
        }
        .leaflet-tile-pane {
          opacity: 0.3;
        }
        .flowing-route {
          pointer-events: none;
          z-index: 1000;
        }
        .port-popup {
          color: #00f7ff;
          font-weight: bold;
          text-align: center;
          min-width: 150px;
          z-index: 2000 !important;
          position: relative;
        }
        .port-name-chinese {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .port-name-english {
          font-size: 12px;
          color: #99ccff;
          font-weight: normal;
        }
        .leaflet-tooltip {
          z-index: 2000 !important;
          background: rgba(0, 20, 40, 0.95) !important;
          border: 1px solid #00f7ff !important;
          border-radius: 6px !important;
          box-shadow: 0 0 15px rgba(0, 247, 255, 0.5) !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: #00f7ff !important;
        }
        .map-title {
          color: #00f7ff;
          font-size: 16px;
          font-weight: normal;
          text-align: center;
          margin-bottom: 20px;
          text-shadow: 0 0 5px rgba(0, 247, 255, 0.5);
        }
      `}</style>
      
      {/* 地图标题 */}
      <div className="map-title">全球订单流向图</div>
      
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: 'calc(100% - 40px)', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* 港口标记 */}
        {ports.map((port, index) => (
          <Marker key={index} position={port.position} icon={portIcon}>
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
              <div className="port-popup">
                <div className="port-name-chinese">{port.name}</div>
                <div className="port-name-english">{port.englishName}</div>
              </div>
            </Tooltip>
          </Marker>
        ))}
        
        {/* 流动航线组件 */}
        <FlowingRoutes />
      </MapContainer>
    </div>
  );
};

export default LeafletMap; 