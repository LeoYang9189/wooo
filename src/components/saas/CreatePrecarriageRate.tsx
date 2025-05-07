import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Breadcrumb, 
  Typography, 
  Button, 
  Space, 
  Input, 
  Select, 
  Form, 
  Grid, 
  Radio,
  DatePicker,
  Modal,
  Message,
  Table,
  Switch
} from '@arco-design/web-react';
import { IconSave, IconDelete, IconRobot, IconPlus, IconMinus, IconSettings } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css'; // 复用已有的CSS

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

// 省份数据
const provinceOptions = [
  { value: '浙江省', label: '浙江省' },
  { value: '江苏省', label: '江苏省' },
  { value: '上海市', label: '上海市' },
  { value: '河南省', label: '河南省' },
  { value: '广东省', label: '广东省' },
  { value: '内蒙古自治区', label: '内蒙古自治区' },
  { value: '黑龙江省', label: '黑龙江省' },
  { value: '新疆维吾尔自治区', label: '新疆维吾尔自治区' },
];

// 选项类型定义
interface OptionItem {
  value: string;
  label: string;
}

// 城市数据 (按省份分组)
const cityOptions: Record<string, OptionItem[]> = {
  '浙江省': [
    { value: '杭州市', label: '杭州市' },
    { value: '嘉兴市', label: '嘉兴市' },
    { value: '湖州市', label: '湖州市' },
    { value: '宁波市', label: '宁波市' },
    { value: '绍兴市', label: '绍兴市' },
    { value: '温州市', label: '温州市' },
    { value: '金华市', label: '金华市' },
  ],
  '江苏省': [
    { value: '苏州市', label: '苏州市' },
    { value: '南京市', label: '南京市' },
    { value: '无锡市', label: '无锡市' },
  ],
  '上海市': [
    { value: '上海市', label: '上海市' },
  ],
  '广东省': [
    { value: '广州市', label: '广州市' },
    { value: '佛山市', label: '佛山市' },
    { value: '深圳市', label: '深圳市' },
  ],
};

// 区县数据 (按城市分组)
const districtOptions: Record<string, OptionItem[]> = {
  '杭州市': [
    { value: '萧山区', label: '萧山区' },
    { value: '西湖区', label: '西湖区' },
    { value: '余杭区', label: '余杭区' },
    { value: '滨江区', label: '滨江区' },
    { value: '拱墅区', label: '拱墅区' },
    { value: '上城区', label: '上城区' },
  ],
  '嘉兴市': [
    { value: '海宁市', label: '海宁市' },
    { value: '平湖市', label: '平湖市' },
  ],
  '湖州市': [
    { value: '吴兴区', label: '吴兴区' },
  ],
  '苏州市': [
    { value: '工业园区', label: '工业园区' },
    { value: '姑苏区', label: '姑苏区' },
  ],
  '南京市': [
    { value: '鼓楼区', label: '鼓楼区' },
    { value: '江宁区', label: '江宁区' },
  ],
  '上海市': [
    { value: '嘉定区', label: '嘉定区' },
    { value: '浦东新区', label: '浦东新区' },
    { value: '黄浦区', label: '黄浦区' },
    { value: '松江区', label: '松江区' },
    { value: '闵行区', label: '闵行区' },
    { value: '奉贤区', label: '奉贤区' },
  ],
  '佛山市': [
    { value: '三水区', label: '三水区' },
    { value: '高明区', label: '高明区' },
    { value: '顺德区', label: '顺德区' },
    { value: '禅城区', label: '禅城区' },
    { value: '南海区', label: '南海区' },
  ],
};

// 街道/村镇数据 (按区县分组)
const streetOptions: Record<string, OptionItem[]> = {
  '萧山区': [
    { value: '新塘街道', label: '新塘街道' },
    { value: '北干街道', label: '北干街道' },
    { value: '宁围街道', label: '宁围街道' },
  ],
  '西湖区': [
    { value: '灵隐街道', label: '灵隐街道' },
    { value: '西溪街道', label: '西溪街道' },
    { value: '文新街道', label: '文新街道' },
  ],
  '余杭区': [
    { value: '良渚街道', label: '良渚街道' },
    { value: '未来科技城', label: '未来科技城' },
    { value: '闲林街道', label: '闲林街道' },
  ],
  '海宁市': [
    { value: '硖石街道', label: '硖石街道' },
    { value: '海昌街道', label: '海昌街道' },
  ],
  '平湖市': [
    { value: '当湖街道', label: '当湖街道' },
    { value: '乍浦镇', label: '乍浦镇' },
  ],
  '吴兴区': [
    { value: '龙泉街道', label: '龙泉街道' },
    { value: '东林镇', label: '东林镇' },
  ],
  '工业园区': [
    { value: '娄葑街道', label: '娄葑街道' },
    { value: '斜塘街道', label: '斜塘街道' },
    { value: '唯亭街道', label: '唯亭街道' },
  ],
  '姑苏区': [
    { value: '平江街道', label: '平江街道' },
    { value: '金阊街道', label: '金阊街道' },
  ],
  '鼓楼区': [
    { value: '宁海路街道', label: '宁海路街道' },
    { value: '华侨路街道', label: '华侨路街道' },
  ],
  '江宁区': [
    { value: '东山街道', label: '东山街道' },
    { value: '秣陵街道', label: '秣陵街道' },
    { value: '淳化街道', label: '淳化街道' },
  ],
  '嘉定区': [
    { value: '新成路街道', label: '新成路街道' },
    { value: '江桥镇', label: '江桥镇' },
    { value: '安亭镇', label: '安亭镇' },
  ],
  '浦东新区': [
    { value: '陆家嘴街道', label: '陆家嘴街道' },
    { value: '张江镇', label: '张江镇' },
    { value: '金桥镇', label: '金桥镇' },
  ],
  '黄浦区': [
    { value: '南京东路街道', label: '南京东路街道' },
    { value: '外滩街道', label: '外滩街道' },
  ],
  '三水区': [
    { value: '西南街道', label: '西南街道' },
    { value: '云东海街道', label: '云东海街道' },
  ],
};

// 区域项接口定义
interface AreaItem {
  key: number;
  province: string;
  city: string;
  district: string;
  street: string;
}

// 集装箱运价项目接口
interface RateItem {
  key: number;
  feeName: string;
  currency: string;
  '20gp': string;
  '40gp': string;
  '40hc': string;
  '45hc': string;
  '40nor': string;
}

/**
 * 港前运价表单组件
 */
const CreatePrecarriageRate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [addressText, setAddressText] = useState('');
  
  // 区域选择相关状态
  const [areaList, setAreaList] = useState<AreaItem[]>([{
    key: 1,
    province: '',
    city: '',
    district: '',
    street: ''
  }]);
  
  // 城市选项状态
  const [citiesForProvince, setCitiesForProvince] = useState<Record<number, any[]>>({});
  // 区县选项状态
  const [districtsForCity, setDistrictsForCity] = useState<Record<number, any[]>>({});
  // 街道选项状态
  const [streetsForDistrict, setStreetsForDistrict] = useState<Record<number, any[]>>({});
  
  // 详细地址是否可编辑状态
  const [isOriginDetailDisabled, setIsOriginDetailDisabled] = useState(false);
  
  // 集装箱运价列表状态
  const [rateList, setRateList] = useState<RateItem[]>([
    {
      key: 1,
      feeName: '支线拖车费',
      currency: 'CNY',
      '20gp': '',
      '40gp': '',
      '40hc': '',
      '45hc': '',
      '40nor': ''
    }
  ]);
  
  // 箱型设置状态
  const [boxTypeModalVisible, setBoxTypeModalVisible] = useState(false);
  // 箱型显示设置
  const [boxTypeVisibility, setBoxTypeVisibility] = useState({
    '20gp': true,
    '40gp': true,
    '40hc': true,
    '45hc': true,
    '40nor': true
  });
  
  // 保存表单状态
  const [formState, setFormState] = useState({
    code: 'PCR' + new Date().getTime().toString().slice(-8), // 生成一个基于时间戳的编号
    rateType: '直拖',
    sublineType: '',
    originDetail: '',
    destination: '',
    terminal: '',
    vendor: '',
    validDateRange: [],
    remark: ''
  });

  // 目的港对应的码头选项
  const terminalOptions: Record<string, OptionItem[]> = {
    'CNSHA | SHANGHAI': [
      { value: '外高桥', label: '外高桥' },
      { value: '洋山', label: '洋山' }
    ],
    'CNNGB | NINGBO': [
      { value: '北仑', label: '北仑' },
      { value: '大榭', label: '大榭' },
      { value: '梅山', label: '梅山' }
    ]
  };

  // 更新保存表单状态
  const handleFormChange = (key: string, value: any) => {
    if (key === 'destination') {
      // 如果修改了目的港，重置码头选择
      setFormState({
        ...formState,
        [key]: value,
        terminal: '' // 清空码头
      });
    } else {
    setFormState({
      ...formState,
      [key]: value
    });
    }
  };

  // 添加新区域
  const addArea = () => {
    const newKey = areaList.length > 0 ? Math.max(...areaList.map(area => area.key)) + 1 : 1;
    
    // 获取最后一个区域信息，复制到倒数第二级
    const lastArea = areaList[areaList.length - 1];
    const newArea: AreaItem = {
      key: newKey,
      province: '',
      city: '',
      district: '',
      street: ''
    };
    
    // 如果存在上一个区域，则复制到区/县级别
    if (lastArea) {
      newArea.province = lastArea.province || '';
      newArea.city = lastArea.city || '';
      newArea.district = lastArea.district || '';
      
      // 复制相应的选项数据
      if (newArea.province && cityOptions[newArea.province]) {
        setCitiesForProvince(prev => ({ ...prev, [newKey]: cityOptions[newArea.province] }));
      }
      
      if (newArea.city && districtOptions[newArea.city]) {
        setDistrictsForCity(prev => ({ ...prev, [newKey]: districtOptions[newArea.city] }));
      }
      
      if (newArea.district && streetOptions[newArea.district]) {
        setStreetsForDistrict(prev => ({ ...prev, [newKey]: streetOptions[newArea.district] }));
      }
    }
    
    setAreaList([...areaList, newArea]);
  };

  // 检查区域选择是否重复
  const isAreaDuplicate = (currentKey: number, province: string, city: string, district: string, street: string): boolean => {
    return areaList.some(area => 
      area.key !== currentKey && 
      area.province === province && 
      area.city === city && 
      area.district === district && 
      ((street && area.street === street) || (!street && !area.street))
    );
  };
  
  // 获取已选择的街道列表（用于禁用已选择的街道）
  const getSelectedStreets = (currentKey: number, district: string): string[] => {
    if (!district) return [];
    
    return areaList
      .filter(area => area.key !== currentKey && area.district === district)
      .map(area => area.street)
      .filter(street => street !== '');
  };

  // 移除区域
  const removeArea = (key: number) => {
    if (areaList.length === 1) {
      Message.warning('至少需要保留一个区域');
      return;
    }
    const newAreaList = areaList.filter(area => area.key !== key);
    setAreaList(newAreaList);
    
    // 更新详细地址禁用状态
    checkOriginDetailStatus(newAreaList);
  };

  // 更新区域字段
  const updateAreaField = (key: number, field: string, value: string) => {
    const newAreaList = areaList.map(area => {
      if (area.key === key) {
        const updatedArea = { ...area, [field]: value };
        
        // 当选择省份时，重置下级选项
        if (field === 'province') {
          updatedArea.city = '';
          updatedArea.district = '';
          updatedArea.street = '';
          
          // 更新城市选项
          if (value && cityOptions[value]) {
            setCitiesForProvince(prev => ({ ...prev, [key]: cityOptions[value] }));
          }
        }
        
        // 当选择城市时，重置下级选项
        if (field === 'city') {
          updatedArea.district = '';
          updatedArea.street = '';
          
          // 更新区县选项
          if (value && districtOptions[value]) {
            setDistrictsForCity(prev => ({ ...prev, [key]: districtOptions[value] }));
          }
        }
        
        // 当选择区县时，重置街道
        if (field === 'district') {
          updatedArea.street = '';
          
          // 更新街道选项
          if (value && streetOptions[value]) {
            setStreetsForDistrict(prev => ({ ...prev, [key]: streetOptions[value] }));
          }
        }
        
        // 检查是否重复选择
        if (isAreaDuplicate(
          key, 
          field === 'province' ? value : updatedArea.province,
          field === 'city' ? value : updatedArea.city,
          field === 'district' ? value : updatedArea.district,
          field === 'street' ? value : updatedArea.street
        )) {
          Message.warning('不能选择重复的区域');
          return area; // 保持原值不变
        }
        
        return updatedArea;
      }
      return area;
    });
    
    setAreaList(newAreaList);
    
    // 检查详细地址输入框状态
    checkOriginDetailStatus(newAreaList);
  };

  // 检查详细地址输入框状态
  const checkOriginDetailStatus = (areas: AreaItem[]) => {
    // 计算有多少个街道被选择了
    const streetSelectedCount = areas.filter(area => area.street).length;
    
    // 如果选择了2个或以上的街道，则禁用详细地址
    const shouldDisable = streetSelectedCount >= 2;
    
    if (shouldDisable) {
      // 如果之前是启用状态，现在要禁用，清空详细地址
      if (!isOriginDetailDisabled) {
        setFormState(prev => ({
          ...prev,
          originDetail: ''
        }));
      }
    }
    
    setIsOriginDetailDisabled(shouldDisable);
  };

  // 处理AI识别
  const handleAiRecognize = () => {
    // 模拟识别过程
    setTimeout(() => {
      if (addressText) {
        let recognizedAreas: AreaItem[] = [];
        
        // 根据文本内容模拟识别结果
        if (addressText.includes('杭州') && addressText.includes('萧山')) {
          const area: AreaItem = {
            key: 1,
            province: '浙江省',
            city: '杭州市',
            district: '萧山区',
            street: addressText.includes('新塘') ? '新塘街道' : ''
          };
          recognizedAreas.push(area);
          
          // 更新选项列表
          if (cityOptions['浙江省']) {
            setCitiesForProvince(prev => ({ ...prev, [1]: cityOptions['浙江省'] }));
          }
          if (districtOptions['杭州市']) {
            setDistrictsForCity(prev => ({ ...prev, [1]: districtOptions['杭州市'] }));
          }
          if (area.district && streetOptions[area.district]) {
            setStreetsForDistrict(prev => ({ ...prev, [1]: streetOptions[area.district] }));
          }
        }
        
        if (addressText.includes('苏州') && addressText.includes('工业园')) {
          const area: AreaItem = {
            key: recognizedAreas.length > 0 ? 2 : 1,
            province: '江苏省',
            city: '苏州市',
            district: '工业园区',
            street: addressText.includes('娄葑') ? '娄葑街道' : ''
          };
          recognizedAreas.push(area);
          
          // 更新选项列表
          const key = area.key;
          if (cityOptions['江苏省']) {
            setCitiesForProvince(prev => ({ ...prev, [key]: cityOptions['江苏省'] }));
          }
          if (districtOptions['苏州市']) {
            setDistrictsForCity(prev => ({ ...prev, [key]: districtOptions['苏州市'] }));
          }
          if (area.district && streetOptions[area.district]) {
            setStreetsForDistrict(prev => ({ ...prev, [key]: streetOptions[area.district] }));
          }
        }
        
        if (addressText.includes('上海') && addressText.includes('浦东')) {
          const area: AreaItem = {
            key: recognizedAreas.length > 0 ? recognizedAreas.length + 1 : 1,
            province: '上海市',
            city: '上海市',
            district: '浦东新区',
            street: addressText.includes('张江') ? '张江镇' : ''
          };
          recognizedAreas.push(area);
          
          // 更新选项列表
          const key = area.key;
          if (cityOptions['上海市']) {
            setCitiesForProvince(prev => ({ ...prev, [key]: cityOptions['上海市'] }));
          }
          if (districtOptions['上海市']) {
            setDistrictsForCity(prev => ({ ...prev, [key]: districtOptions['上海市'] }));
          }
          if (area.district && streetOptions[area.district]) {
            setStreetsForDistrict(prev => ({ ...prev, [key]: streetOptions[area.district] }));
          }
        }
        
        if (recognizedAreas.length > 0) {
          setAreaList(recognizedAreas);
          
          // 判断详细地址是否需要禁用
          checkOriginDetailStatus(recognizedAreas);
          
          // 如果只有一个区域且有街道，则自动填入详细地址
          if (recognizedAreas.length === 1 && recognizedAreas[0].street && !isOriginDetailDisabled) {
            setFormState(prev => ({
              ...prev,
              originDetail: '详细地址：' + addressText
            }));
          }
        } else {
          Message.info('无法识别地址，请手动选择');
        }
      }
      closeAiModal();
    }, 1000);
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validate().then((values) => {
      // 整合表单数据
      const formData = {
        ...formState,
        ...values,
        areaList,
        rateList
      };
      
      console.log('表单数据:', formData);
      // 提交表单数据
      navigate('/precarriage-rates');
    }).catch(error => {
      console.error('表单错误:', error);
    });
  };

  // 返回港前运价列表页面
  const handleCancel = () => {
    navigate('/precarriage-rates');
  };

  // 支线类型是否显示
  const showSublineType = formState.rateType === '支线';

  // 打开AI识别弹窗
  const openAiModal = () => {
    setAiModalVisible(true);
  };

  // 关闭AI识别弹窗
  const closeAiModal = () => {
    setAiModalVisible(false);
  };
  
  // 初始化组件时设置第一个区域的城市选项
  useEffect(() => {
    if (areaList[0].province && cityOptions[areaList[0].province]) {
      setCitiesForProvince({ 1: cityOptions[areaList[0].province] });
    }
  }, []);

  // 添加运价项目
  const addRateItem = () => {
    const newKey = rateList.length > 0 ? Math.max(...rateList.map(item => item.key)) + 1 : 1;
    setRateList([...rateList, {
      key: newKey,
      feeName: '支线订舱费',
      currency: 'CNY',
      '20gp': '',
      '40gp': '',
      '40hc': '',
      '45hc': '',
      '40nor': ''
    }]);
  };
  
  // 删除运价项目
  const removeRateItem = (key: number) => {
    if (rateList.length === 1) {
      Message.warning('至少需要保留一个运价项目');
      return;
    }
    const newRateList = rateList.filter(item => item.key !== key);
    setRateList(newRateList);
  };
  
  // 更新运价项目字段
  const updateRateItem = (key: number, field: string, value: string) => {
    const newRateList = rateList.map(item => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setRateList(newRateList);
  };
  
  // 打开箱型设置弹窗
  const openBoxTypeModal = () => {
    setBoxTypeModalVisible(true);
  };
  
  // 关闭箱型设置弹窗
  const closeBoxTypeModal = () => {
    setBoxTypeModalVisible(false);
  };
  
  // 更新箱型显示状态
  const handleBoxTypeVisibilityChange = (boxType: string, visible: boolean) => {
    setBoxTypeVisibility(prev => ({
      ...prev,
      [boxType]: visible
    }));
  };
  
  // 重置箱型显示状态
  const resetBoxTypeVisibility = () => {
    setBoxTypeVisibility({
      '20gp': true,
      '40gp': true,
      '40hc': true,
      '45hc': true,
      '40nor': true
    });
  };

  return (
    <SaasLayout 
      menuSelectedKey="22" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>门点服务管理</Breadcrumb.Item>
          <Breadcrumb.Item>港前运价</Breadcrumb.Item>
          <Breadcrumb.Item>新增港前运价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form form={form} layout="vertical" initialValues={formState} requiredSymbol={{ position: 'start' }}>
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <Title heading={5}>新增港前运价</Title>
            <Space>
              <Button type="primary" icon={<IconSave />} onClick={handleSubmit}>保存</Button>
              <Button icon={<IconDelete />} onClick={handleCancel}>取消</Button>
            </Space>
          </div>
          
          <Row gutter={[16, 16]}>
            {/* 左侧区域：基本信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">基本信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="港前运价编号" field="code">
                      <Input placeholder="自动生成" value={formState.code} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="运价类型" field="rateType" rules={[{ required: true, message: '请选择运价类型' }]}>
                      <RadioGroup 
                        value={formState.rateType}
                        onChange={(value) => handleFormChange('rateType', value)}
                      >
                        <Radio value="直拖">直拖</Radio>
                        <Radio value="支线">支线</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  
                  {showSublineType && (
                    <Col span={24}>
                      <FormItem label="支线类型" field="sublineType" rules={[{ required: true, message: '请选择支线类型' }]}>
                        <Select 
                          placeholder="请选择支线类型" 
                          style={{ width: '100%' }}
                          value={formState.sublineType}
                          onChange={(value) => handleFormChange('sublineType', value)}
                          allowClear
                        >
                          <Option value="湖州海铁">湖州海铁</Option>
                          <Option value="海宁支线">海宁支线</Option>
                          <Option value="乍浦支线">乍浦支线</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  )}
                  
                  <Col span={24}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-800 font-medium">起运地区域选择</div>
                      <div className="flex items-center gap-2">
                      <Button 
                        type="outline" 
                        icon={<IconRobot />} 
                        onClick={openAiModal}
                          size="mini"
                      >
                        AI识别
                      </Button>
                        <Button 
                          type="primary" 
                          icon={<IconPlus />} 
                          size="mini"
                          onClick={addArea}
                        >
                          添加区域
                        </Button>
                    </div>
                    </div>
                    <div className="mb-2 text-xs text-gray-500">
                      提示：可添加多个区域，当选择2个及以上街道/村镇时，详细地址将禁用
                    </div>
                    
                    {areaList.map((area, index) => (
                      <div key={area.key} className="mb-3 border-b border-gray-200 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-xs text-gray-500">区域 {index + 1}</div>
                          <Button 
                            type="text" 
                            icon={<IconMinus />} 
                            onClick={() => removeArea(area.key)} 
                            size="mini"
                          />
                        </div>
                        <Row gutter={[8, 0]}>
                          <Col span={5}>
                            <FormItem label="" required style={{ marginBottom: 0 }}>
                              <Select 
                                placeholder="省份"
                                options={provinceOptions}
                                value={area.province}
                                onChange={(value) => updateAreaField(area.key, 'province', value)}
                                style={{ width: '100%' }}
                                size="default"
                                allowClear
                              />
                            </FormItem>
                          </Col>
                          <Col span={5}>
                            <FormItem label="" required style={{ marginBottom: 0 }}>
                              <Select 
                                placeholder="城市"
                                options={citiesForProvince[area.key] || []}
                                value={area.city}
                                onChange={(value) => updateAreaField(area.key, 'city', value)}
                                style={{ width: '100%' }}
                                size="default"
                                disabled={!area.province}
                                allowClear
                              />
                            </FormItem>
                          </Col>
                          <Col span={5}>
                            <FormItem label="" required style={{ marginBottom: 0 }}>
                              <Select 
                                placeholder="区/县"
                                options={districtsForCity[area.key] || []}
                                value={area.district}
                                onChange={(value) => updateAreaField(area.key, 'district', value)}
                                style={{ width: '100%' }}
                                size="default"
                                disabled={!area.city}
                                allowClear
                              />
                            </FormItem>
                          </Col>
                          <Col span={9}>
                            <FormItem label="" style={{ marginBottom: 0 }}>
                              <Select 
                                placeholder="街道/村镇"
                                options={streetsForDistrict[area.key] ? 
                                  streetsForDistrict[area.key].map(option => {
                                    // 检查该街道是否已被其他区域选择
                                    const isDisabled = getSelectedStreets(area.key, area.district).includes(option.value);
                                    return {
                                      ...option,
                                      disabled: isDisabled
                                    };
                                  }) : []
                                }
                                value={area.street}
                                onChange={(value) => updateAreaField(area.key, 'street', value)}
                                style={{ width: '100%' }}
                                size="default"
                                disabled={!area.district}
                                allowClear
                              />
                            </FormItem>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="详细地址" field="originDetail">
                      <Input.TextArea
                        placeholder={isOriginDetailDisabled ? "选择多个街道/村镇时不可填写详细地址" : "请输入详细地址"}
                        value={formState.originDetail}
                        onChange={(value) => handleFormChange('originDetail', value)}
                        style={{ minHeight: '60px' }}
                        disabled={isOriginDetailDisabled}
                        allowClear
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
                  </Col>
                  
            {/* 右侧区域：目的港、码头、供应商 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">目的信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="目的港" field="destination" rules={[{ required: true, message: '请选择目的港' }]}>
                      <Select 
                        placeholder="请选择目的港" 
                        style={{ width: '100%' }}
                        value={formState.destination}
                        onChange={(value) => handleFormChange('destination', value)}
                        allowClear
                      >
                        <Option value="CNSHA | SHANGHAI">CNSHA | SHANGHAI</Option>
                        <Option value="CNNGB | NINGBO">CNNGB | NINGBO</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="码头" field="terminal">
                      <Select 
                        placeholder="请选择码头" 
                        style={{ width: '100%' }}
                        value={formState.terminal}
                        onChange={(value) => handleFormChange('terminal', value)}
                        disabled={!formState.destination}
                        options={formState.destination ? terminalOptions[formState.destination] || [] : []}
                        allowClear
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="供应商" field="vendor" rules={[{ required: true, message: '请选择供应商' }]}>
                      <Select 
                        placeholder="请选择供应商" 
                        style={{ width: '100%' }}
                        value={formState.vendor}
                        onChange={(value) => handleFormChange('vendor', value)}
                        allowClear
                      >
                        <Option value="安吉物流">安吉物流</Option>
                        <Option value="德邦物流">德邦物流</Option>
                        <Option value="中远海运">中远海运</Option>
                        <Option value="顺丰物流">顺丰物流</Option>
                        <Option value="海得航运">海得航运</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="有效期" field="validDateRange" rules={[{ required: true, message: '请选择有效期' }]}>
                      <RangePicker 
                        style={{ width: '100%' }} 
                        onChange={(value) => handleFormChange('validDateRange', value)}
                        allowClear
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="备注" field="remark">
                      <Input.TextArea 
                        placeholder="请输入备注信息" 
                        style={{ minHeight: '80px' }}
                        value={formState.remark}
                        onChange={(value) => handleFormChange('remark', value)}
                        allowClear
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
            
            {/* 运价信息模块 - 占据整行 */}
            <Col span={24}>
              <div className="border rounded p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2">集装箱运价信息</div>
                  <Space>
                    <Button 
                      type="secondary" 
                      icon={<IconSettings />} 
                      size="small"
                      onClick={openBoxTypeModal}
                    >
                      设置箱型
                    </Button>
                    <Button 
                      type="primary" 
                      icon={<IconPlus />} 
                      size="small"
                      onClick={addRateItem}
                    >
                      增加条目
                    </Button>
                  </Space>
                </div>
                
                <Table
                  borderCell={true}
                  columns={[
                    {
                      title: '操作',
                      width: 80,
                      render: (_, record: RateItem) => (
                        <Button 
                          type="text"
                          icon={<IconMinus />}
                          onClick={() => removeRateItem(record.key)}
                          size="mini"
                        />
                      )
                    },
                    {
                      title: '费用名称',
                      dataIndex: 'feeName',
                      width: 180,
                      render: (value: string, record: RateItem) => (
                        <Select
                          placeholder="请选择费用名称"
                          value={value}
                          onChange={val => updateRateItem(record.key, 'feeName', val)}
                          style={{ width: '100%' }}
                          allowClear
                        >
                          <Select.Option value="支线订舱费">支线订舱费</Select.Option>
                          <Select.Option value="支线拖车费">支线拖车费</Select.Option>
                          <Select.Option value="支线包干费">支线包干费</Select.Option>
                          <Select.Option value="拖车包干费">拖车包干费</Select.Option>
                        </Select>
                      )
                    },
                    {
                      title: '币种',
                      dataIndex: 'currency',
                      width: 120,
                      render: (value: string, record: RateItem) => (
                        <Select
                          placeholder="请选择币种"
                          value={value}
                          onChange={val => updateRateItem(record.key, 'currency', val)}
                          style={{ width: '100%' }}
                          allowClear
                        >
                          <Select.Option value="CNY">CNY</Select.Option>
                          <Select.Option value="USD">USD</Select.Option>
                          <Select.Option value="EUR">EUR</Select.Option>
                        </Select>
                      )
                    },
                    ...(boxTypeVisibility['20gp'] ? [{
                      title: '20GP',
                      dataIndex: '20gp',
                      width: 120,
                      render: (value: string, record: RateItem) => (
                      <Input 
                        placeholder="请输入运价" 
                          value={value}
                          onChange={val => updateRateItem(record.key, '20gp', val)}
                          allowClear
                        />
                      )
                    }] : []),
                    ...(boxTypeVisibility['40gp'] ? [{
                      title: '40GP',
                      dataIndex: '40gp',
                      width: 120,
                      render: (value: string, record: RateItem) => (
                      <Input 
                        placeholder="请输入运价" 
                          value={value}
                          onChange={val => updateRateItem(record.key, '40gp', val)}
                          allowClear
                        />
                      )
                    }] : []),
                    ...(boxTypeVisibility['40hc'] ? [{
                      title: '40HC',
                      dataIndex: '40hc',
                      width: 120,
                      render: (value: string, record: RateItem) => (
                      <Input 
                        placeholder="请输入运价" 
                          value={value}
                          onChange={val => updateRateItem(record.key, '40hc', val)}
                          allowClear
                        />
                      )
                    }] : []),
                    ...(boxTypeVisibility['45hc'] ? [{
                      title: '45HC',
                      dataIndex: '45hc',
                      width: 120,
                      render: (value: string, record: RateItem) => (
                      <Input 
                        placeholder="请输入运价" 
                          value={value}
                          onChange={val => updateRateItem(record.key, '45hc', val)}
                          allowClear
                        />
                      )
                    }] : []),
                    ...(boxTypeVisibility['40nor'] ? [{
                      title: '40NOR',
                      dataIndex: '40nor',
                      width: 120,
                      render: (value: string, record: RateItem) => (
                      <Input 
                        placeholder="请输入运价" 
                          value={value}
                          onChange={val => updateRateItem(record.key, '40nor', val)}
                          allowClear
                        />
                      )
                    }] : [])
                  ]}
                  data={rateList}
                  pagination={false}
                  rowKey="key"
                />
              </div>
            </Col>
          </Row>
        </Card>
      </Form>

      {/* AI识别地址弹窗 */}
      <Modal
        title="AI智能识别地址"
        visible={aiModalVisible}
        onCancel={closeAiModal}
        footer={[
          <Button key="cancel" onClick={closeAiModal}>取消</Button>,
          <Button key="recognize" type="primary" onClick={handleAiRecognize}>识别</Button>
        ]}
      >
        <div className="p-4">
          <p className="mb-2 text-gray-500">请将地址信息粘贴到下方文本框中：</p>
          <Input.TextArea
            placeholder="例如：浙江省杭州市萧山区新塘街道萧山经济技术开发区红垦路535号"
            style={{ minHeight: '120px' }}
            value={addressText}
            onChange={setAddressText}
          />
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">提示：系统将自动解析省市区信息，详细地址将填入详细地址栏</p>
          </div>
        </div>
      </Modal>

      {/* 箱型设置弹窗 */}
      <Modal
        title="设置箱型"
        visible={boxTypeModalVisible}
        onCancel={closeBoxTypeModal}
        footer={[
          <Button key="reset" onClick={resetBoxTypeVisibility} style={{ float: 'left' }}>重置</Button>,
          <Button key="cancel" onClick={closeBoxTypeModal}>取消</Button>,
          <Button key="apply" type="primary" onClick={closeBoxTypeModal}>确认</Button>
        ]}
        style={{ width: 500 }}
      >
        <div className="p-4">
          <div className="text-gray-500 mb-4">选择需要显示的箱型</div>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div className="flex items-center justify-between p-2 border-b">
              <span>20GP</span>
              <Switch 
                checked={boxTypeVisibility['20gp']} 
                onChange={checked => handleBoxTypeVisibilityChange('20gp', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span>40GP</span>
              <Switch 
                checked={boxTypeVisibility['40gp']} 
                onChange={checked => handleBoxTypeVisibilityChange('40gp', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span>40HC</span>
              <Switch 
                checked={boxTypeVisibility['40hc']} 
                onChange={checked => handleBoxTypeVisibilityChange('40hc', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span>45HC</span>
              <Switch 
                checked={boxTypeVisibility['45hc']} 
                onChange={checked => handleBoxTypeVisibilityChange('45hc', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span>40NOR</span>
              <Switch 
                checked={boxTypeVisibility['40nor']} 
                onChange={checked => handleBoxTypeVisibilityChange('40nor', checked)}
              />
            </div>
          </Space>
        </div>
      </Modal>
    </SaasLayout>
  );
};

export default CreatePrecarriageRate; 