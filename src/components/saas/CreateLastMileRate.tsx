import React, { useState } from 'react';
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
import { IconSave, IconDelete, IconRobot, IconPlus, IconMinus, IconSettings, IconUpload } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css'; // 复用已有的CSS

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

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
  specialNote: string;
}

// 非按箱型计费项目接口
interface NonContainerRateItem {
  key: number;
  feeName: string;
  currency: string;
  unit: string; // 计费单位
  price: string; // 单价
  specialNote: string;
}

// 目的港对应的码头选项 - 暂时未使用，保留供后续功能扩展使用
// @ts-ignore
const _terminalOptions: Record<string, { value: string; label: string }[]> = {
  'USLAX | LOS ANGELES': [
    { value: 'APM Terminals', label: 'APM Terminals' },
    { value: 'Everport Terminal', label: 'Everport Terminal' },
    { value: 'TraPac Terminal', label: 'TraPac Terminal' }
  ],
  'USNYC | NEW YORK': [
    { value: 'Maher Terminals', label: 'Maher Terminals' },
    { value: 'Port Newark Container', label: 'Port Newark Container' }
  ],
  'DEHAM | HAMBURG': [
    { value: 'HHLA Terminal', label: 'HHLA Terminal' },
    { value: 'Eurogate Container', label: 'Eurogate Container' }
  ],
  'NLRTM | ROTTERDAM': [
    { value: 'APM Terminals', label: 'APM Terminals' },
    { value: 'ECT Delta', label: 'ECT Delta' },
    { value: 'Rotterdam World Gateway', label: 'Rotterdam World Gateway' }
  ],
  'SGSIN | SINGAPORE': [
    { value: 'PSA Singapore', label: 'PSA Singapore' },
    { value: 'Tuas Terminal', label: 'Tuas Terminal' }
  ]
};

/**
 * 尾程运价表单组件
 */
const CreateLastMileRate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [addressText, setAddressText] = useState('');
  
  // 保存表单状态
  const [formState, setFormState] = useState({
    code: 'LMR' + new Date().getTime().toString().slice(-8), // 生成一个基于时间戳的编号
    addressType: '第三方地址',
    zipCode: '',
    address: '',
    warehouseCode: '',
    origins: [], // 改为数组存储多个目的港
    agentName: '',
    validDateRange: [],
    remark: ''
  });

  // 更新保存表单状态
  const handleFormChange = (key: string, value: any) => {
    if (key === 'addressType') {
      // 如果修改了地址类型，重置仓库代码（只有亚马逊仓库和易仓才有仓库代码）
      const newState = {
        ...formState,
        [key]: value
      };
      if (value !== '亚马逊仓库' && value !== '易仓') {
        newState.warehouseCode = '';
      }
      setFormState(newState);
    } else {
      setFormState({
        ...formState,
        [key]: value
      });
    }
  };
  
  // 集装箱运价列表状态
  const [rateList, setRateList] = useState<RateItem[]>([
    {
      key: 1,
      feeName: '尾程配送费',
      currency: 'CNY',
      '20gp': '',
      '40gp': '',
      '40hc': '',
      '45hc': '',
      '40nor': '',
      specialNote: ''
    }
  ]);
  
  // 非按箱型计费列表状态
  const [nonContainerRateList, setNonContainerRateList] = useState<NonContainerRateItem[]>([
    {
      key: 1,
      feeName: '文件费',
      currency: 'CNY',
      unit: '票',
      price: '',
      specialNote: ''
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

  // 处理表单提交
  const handleSubmit = () => {
    form.validate().then((values) => {
      // 整合表单数据
      const formData = {
        ...formState,
        ...values,
        // 确保目的港是数组形式
        origins: Array.isArray(formState.origins) ? formState.origins : [formState.origins].filter(Boolean),
        rateList,
        nonContainerRateList
      };
      
      console.log('表单数据:', formData);
      // 提交表单数据
      navigate('/lastmile-rates');
    }).catch(error => {
      console.error('表单错误:', error);
    });
  };

  // 返回尾程运价列表页面
  const handleCancel = () => {
    navigate('/lastmile-rates');
  };

  // 打开AI识别弹窗
  const openAiModal = () => {
    setAiModalVisible(true);
  };

  // 关闭AI识别弹窗
  const closeAiModal = () => {
    setAiModalVisible(false);
  };

  // 处理AI识别
  const handleAiRecognize = () => {
    // 模拟识别过程
    setTimeout(() => {
      if (addressText) {
        // 模拟美国地址识别
        let zipCode = '';
        let address = '';
        let isWarehouse = false;
        let warehouseType = '';
        let warehouseCode = '';
        
        // 检查是否包含仓库代码
        if (addressText.includes('ONT8') || addressText.includes('BFI4')) {
          isWarehouse = true;
          warehouseType = '亚马逊仓库';
          warehouseCode = addressText.includes('ONT8') ? 'ONT8' : 'BFI4';
        } else if (addressText.includes('LAX203') || addressText.includes('ATL205')) {
          isWarehouse = true;
          warehouseType = '易仓';
          warehouseCode = addressText.includes('LAX203') ? 'LAX203' : 'ATL205';
        }
        
        // 如果是仓库类型，只设置仓库相关信息
        if (isWarehouse) {
          setFormState(prev => ({
            ...prev,
            addressType: warehouseType,
            warehouseCode: warehouseCode,
            // 清空不需要的字段
            zipCode: '',
            address: ''
          }));
          
          Message.success(`已识别为${warehouseType}，代码：${warehouseCode}`);
        } else {
          // 尝试提取邮编（美国标准5位数字邮编）
          const zipMatch = addressText.match(/\b\d{5}\b/);
          if (zipMatch) {
            zipCode = zipMatch[0];
          }
          
          // 从文本中提取地址信息
          if (addressText.includes('CA')) {
            // 识别加利福尼亚州的地址
            if (addressText.includes('San Diego')) {
              address = 'San Diego, CA';
            } else if (addressText.includes('Los Angeles')) {
              address = 'Los Angeles, CA';
            } else if (addressText.includes('Ontario')) {
              address = 'Ontario, CA';
            } else if (addressText.includes('Redding')) {
              address = 'Redding, CA';
            } else {
              address = addressText.replace(/\d{5}/, '').trim();
            }
          } else if (addressText.includes('WA')) {
            // 识别华盛顿州的地址
            if (addressText.includes('Seattle')) {
              address = 'Seattle, WA';
            } else {
              address = addressText.replace(/\d{5}/, '').trim();
            }
          } else if (addressText.includes('GA')) {
            // 识别乔治亚州的地址
            if (addressText.includes('Atlanta')) {
              address = 'Atlanta, GA';
            } else {
              address = addressText.replace(/\d{5}/, '').trim();
            }
          } else {
            address = addressText.replace(/\d{5}/, '').trim();
          }
          
          // 如果找到了地址和邮编
          if (address) {
            setFormState(prev => ({
              ...prev,
              addressType: '第三方地址',
              address: address,
              zipCode: zipCode || '',
              // 清空仓库代码
              warehouseCode: ''
            }));
            
            Message.success('已识别地址信息');
          } else {
            Message.info('无法识别地址，请手动输入');
          }
        }
      }
      closeAiModal();
    }, 1000);
  };

  // 添加运价项目
  const addRateItem = () => {
    const newKey = rateList.length > 0 ? Math.max(...rateList.map(item => item.key)) + 1 : 1;
    setRateList([...rateList, {
      key: newKey,
      feeName: '码头附加费',
      currency: 'CNY',
      '20gp': '',
      '40gp': '',
      '40hc': '',
      '45hc': '',
      '40nor': '',
      specialNote: ''
    }]);
  };
  
  // 添加非按箱型计费项目
  const addNonContainerRateItem = () => {
    const newKey = nonContainerRateList.length > 0 ? Math.max(...nonContainerRateList.map(item => item.key)) + 1 : 1;
    setNonContainerRateList([...nonContainerRateList, {
      key: newKey,
      feeName: '清关费',
      currency: 'CNY',
      unit: '票',
      price: '',
      specialNote: ''
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
  
  // 删除非按箱型计费项目
  const removeNonContainerRateItem = (key: number) => {
    if (nonContainerRateList.length === 1) {
      Message.warning('至少需要保留一个计费项目');
      return;
    }
    const newRateList = nonContainerRateList.filter(item => item.key !== key);
    setNonContainerRateList(newRateList);
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
  
  // 更新非按箱型计费项目字段
  const updateNonContainerRateItem = (key: number, field: string, value: string) => {
    const newRateList = nonContainerRateList.map(item => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setNonContainerRateList(newRateList);
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
      menuSelectedKey="23" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>门点服务管理</Breadcrumb.Item>
          <Breadcrumb.Item>尾程运价</Breadcrumb.Item>
          <Breadcrumb.Item>新增尾程运价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form form={form} layout="vertical" initialValues={formState} requiredSymbol={{ position: 'start' }}>
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <Title heading={5}>新增尾程运价</Title>
            <Space>
              <Button type="primary" icon={<IconSave />} onClick={handleSubmit}>保存草稿</Button>
              <Button type="primary" status="success" icon={<IconUpload />} onClick={handleSubmit}>直接上架</Button>
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
                    <FormItem label="尾程运价编号" field="code">
                      <Input placeholder="自动生成" value={formState.code} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="配送地址类型" field="addressType" rules={[{ required: true, message: '请选择配送地址类型' }]}>
                      <RadioGroup 
                        value={formState.addressType}
                        onChange={(value) => handleFormChange('addressType', value)}
                      >
                        <Radio value="第三方地址">第三方地址</Radio>
                        <Radio value="亚马逊仓库">亚马逊仓库</Radio>
                        <Radio value="易仓">易仓</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  
                  {formState.addressType === '第三方地址' && (
                    <>
                      <Col span={24}>
                        <FormItem label="邮编" field="zipCode" rules={[{ required: true, message: '请输入邮编' }]}>
                          <Input 
                            placeholder="请输入邮编" 
                            value={formState.zipCode}
                            onChange={(value) => handleFormChange('zipCode', value)}
                            allowClear
                          />
                        </FormItem>
                      </Col>
                      
                      <Col span={24}>
                        <div className="flex items-center justify-between mb-2">
                          <FormItem label="地址" field="address" rules={[{ required: true, message: '请输入地址' }]} style={{ width: '100%', marginBottom: 0 }}>
                            <div className="flex items-center w-full">
                              <Input 
                                placeholder="例如：San Diego, CA" 
                                value={formState.address}
                                onChange={(value) => handleFormChange('address', value)}
                                allowClear
                                style={{ flexGrow: 1 }}
                              />
                              <Button 
                                type="primary" 
                                icon={<IconRobot />} 
                                onClick={openAiModal}
                                style={{ marginLeft: 8 }}
                              >
                                AI识别
                              </Button>
                            </div>
                          </FormItem>
                        </div>
                      </Col>
                    </>
                  )}
                  
                  {(formState.addressType === '亚马逊仓库' || formState.addressType === '易仓') && (
                    <Col span={24}>
                      <FormItem 
                        label="仓库代码" 
                        field="warehouseCode" 
                        rules={[{ required: true, message: '请输入仓库代码' }]}
                      >
                        <Input 
                          placeholder={formState.addressType === '亚马逊仓库' ? "例如：ONT8" : "例如：LAX203"} 
                          value={formState.warehouseCode}
                          onChange={(value) => handleFormChange('warehouseCode', value)}
                          allowClear
                        />
                      </FormItem>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
                    
            {/* 右侧区域：目的港、代理 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">目的港信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="目的港" field="origins" rules={[{ required: true, message: '请选择目的港' }]}>
                      <Select 
                        placeholder="请选择目的港（可多选）" 
                        style={{ width: '100%' }}
                        value={formState.origins}
                        onChange={(value) => handleFormChange('origins', value)}
                        allowClear
                        mode="multiple"
                        showSearch
                      >
                        <Option value="USLAX | LOS ANGELES">USLAX | LOS ANGELES</Option>
                        <Option value="USNYC | NEW YORK">USNYC | NEW YORK</Option>
                        <Option value="DEHAM | HAMBURG">DEHAM | HAMBURG</Option>
                        <Option value="NLRTM | ROTTERDAM">NLRTM | ROTTERDAM</Option>
                        <Option value="SGSIN | SINGAPORE">SGSIN | SINGAPORE</Option>
                      </Select>
                      <div className="mt-1 text-xs text-gray-400">提示: 可选择多个目的港，表示这些目的港到同一配送地址的运价相同</div>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="代理名称" field="agentName" rules={[{ required: true, message: '请选择代理名称' }]}>
                      <Select 
                        placeholder="请选择代理名称" 
                        style={{ width: '100%' }}
                        value={formState.agentName}
                        onChange={(value) => handleFormChange('agentName', value)}
                        allowClear
                      >
                        <Option value="XPO TRUCK LLC">XPO TRUCK LLC</Option>
                        <Option value="DRAYEASY INC">DRAYEASY INC</Option>
                        <Option value="AMERICAN FREIGHT SOLUTIONS">AMERICAN FREIGHT SOLUTIONS</Option>
                        <Option value="WEST COAST CARRIERS LLC">WEST COAST CARRIERS LLC</Option>
                        <Option value="EAGLE EXPRESS LOGISTICS">EAGLE EXPRESS LOGISTICS</Option>
                        <Option value="INTERMODAL TRANSPORT CO">INTERMODAL TRANSPORT CO</Option>
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
                  <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2">运价信息</div>
                </div>
                
                {/* 按箱型计费条目 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-700 font-medium">按箱型计费条目</div>
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
                            <Select.Option value="码头附加费">码头附加费</Select.Option>
                            <Select.Option value="送货费">送货费</Select.Option>
                            <Select.Option value="燃油附加费">燃油附加费</Select.Option>
                            <Select.Option value="车架分离">车架分离</Select.Option>
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
                      }] : []),
                      {
                        title: '特殊备注',
                        dataIndex: 'specialNote',
                        width: 180,
                        render: (value: string, record: RateItem) => (
                          <Input 
                            placeholder="请输入特殊备注" 
                            value={value}
                            onChange={val => updateRateItem(record.key, 'specialNote', val)}
                            allowClear
                          />
                        )
                      }
                    ]}
                    data={rateList}
                    pagination={false}
                    rowKey="key"
                  />
                </div>
                
                {/* 非按箱型计费条目 */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-700 font-medium">非按箱型计费条目</div>
                    <Button 
                      type="primary" 
                      icon={<IconPlus />} 
                      size="small"
                      onClick={addNonContainerRateItem}
                    >
                      增加条目
                    </Button>
                  </div>
                  
                  <Table
                    borderCell={true}
                    columns={[
                      {
                        title: '操作',
                        width: 80,
                        render: (_, record: NonContainerRateItem) => (
                          <Button 
                            type="text"
                            icon={<IconMinus />}
                            onClick={() => removeNonContainerRateItem(record.key)}
                            size="mini"
                          />
                        )
                      },
                      {
                        title: '费用名称',
                        dataIndex: 'feeName',
                        width: 180,
                        render: (value: string, record: NonContainerRateItem) => (
                          <Select
                            placeholder="请选择费用名称"
                            value={value}
                            onChange={val => updateNonContainerRateItem(record.key, 'feeName', val)}
                            style={{ width: '100%' }}
                            allowClear
                          >
                            <Select.Option value="清关费">清关费</Select.Option>
                            <Select.Option value="换单费">换单费</Select.Option>
                            <Select.Option value="ISF">ISF</Select.Option>
                            <Select.Option value="文件费">文件费</Select.Option>
                            <Select.Option value="待时费">待时费</Select.Option>
                            <Select.Option value="YARD">YARD</Select.Option>
                          </Select>
                        )
                      },
                      {
                        title: '币种',
                        dataIndex: 'currency',
                        width: 120,
                        render: (value: string, record: NonContainerRateItem) => (
                          <Select
                            placeholder="请选择币种"
                            value={value}
                            onChange={val => updateNonContainerRateItem(record.key, 'currency', val)}
                            style={{ width: '100%' }}
                            allowClear
                          >
                            <Select.Option value="CNY">CNY</Select.Option>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                          </Select>
                        )
                      },
                      {
                        title: '计费单位',
                        dataIndex: 'unit',
                        width: 120,
                        render: (value: string, record: NonContainerRateItem) => (
                          <Select
                            placeholder="请选择计费单位"
                            value={value}
                            onChange={val => updateNonContainerRateItem(record.key, 'unit', val)}
                            style={{ width: '100%' }}
                            allowClear
                          >
                            <Select.Option value="票">票</Select.Option>
                            <Select.Option value="单">单</Select.Option>
                            <Select.Option value="次">次</Select.Option>
                            <Select.Option value="天">天</Select.Option>
                            <Select.Option value="小时">小时</Select.Option>
                          </Select>
                        )
                      },
                      {
                        title: '单价',
                        dataIndex: 'price',
                        width: 120,
                        render: (value: string, record: NonContainerRateItem) => (
                          <Input 
                            placeholder="请输入单价" 
                            value={value}
                            onChange={val => updateNonContainerRateItem(record.key, 'price', val)}
                            allowClear
                          />
                        )
                      },
                      {
                        title: '特殊备注',
                        dataIndex: 'specialNote',
                        width: 180,
                        render: (value: string, record: NonContainerRateItem) => (
                          <Input 
                            placeholder="请输入特殊备注" 
                            value={value}
                            onChange={val => updateNonContainerRateItem(record.key, 'specialNote', val)}
                            allowClear
                          />
                        )
                      }
                    ]}
                    data={nonContainerRateList}
                    pagination={false}
                    rowKey="key"
                  />
                </div>
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
          <p className="mb-2 text-gray-500">请将美国地址信息粘贴到下方文本框中：</p>
          <Input.TextArea
            placeholder="例如：Ontario, CA 91761 ONT8 或 Los Angeles, CA 90001"
            style={{ minHeight: '120px' }}
            value={addressText}
            onChange={setAddressText}
          />
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500 mb-2">识别规则：</p>
            <ul className="text-sm text-gray-500 list-disc pl-5">
              <li>如包含亚马逊仓库代码(ONT8/BFI4等)，将自动设置为亚马逊仓库类型</li>
              <li>如包含易仓代码(LAX203/ATL205等)，将自动设置为易仓类型</li>
              <li>其他情况将设置为第三方地址，并解析地址和邮编</li>
            </ul>
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

export default CreateLastMileRate; 