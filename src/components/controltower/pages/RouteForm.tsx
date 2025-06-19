import React, { useState } from 'react';
import {
  Card,
  Button,
  Input,
  Select,
  Form,
  Message,
  Space,
  Typography,
  Grid,
  InputNumber,
  DatePicker,
  Table,
  Tag,
  Tooltip,
  Tabs
} from '@arco-design/web-react';
import {
  IconPlus,
  IconDelete,
  IconEdit,
  IconSave,
  IconArrowLeft
} from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { Row, Col } = Grid;
const { Option } = Select;
const { TabPane } = Tabs;
const FormItem = Form.Item;

// 运价类型枚举
export enum RateType {
  BY_CONTAINER = 'by_container', // 按箱型计费
  NOT_BY_CONTAINER = 'not_by_container' // 非按箱型计费
}

// 箱型枚举
export enum ContainerType {
  GP20 = 'GP20',
  GP40 = 'GP40',
  HQ40 = 'HQ40',
  GP45 = 'GP45',
  RF20 = 'RF20',
  RF40 = 'RF40',
  OT20 = 'OT20',
  OT40 = 'OT40',
  FR20 = 'FR20',
  FR40 = 'FR40'
}

// 费用类型枚举
export enum ChargeType {
  OCEAN_FREIGHT = 'ocean_freight', // 海运费
  BAF = 'baf', // 燃油附加费
  CAF = 'caf', // 货币调节费
  PSS = 'pss', // 旺季附加费
  GRI = 'gri', // 运价上涨附加费
  ISPS = 'isps', // 港口安全费
  DOCUMENTATION = 'documentation', // 文件费
  SEAL = 'seal', // 铅封费
  CLEANING = 'cleaning', // 洗箱费
  INSPECTION = 'inspection', // 查验费
  OTHER = 'other' // 其他费用
}

// 币种枚举
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CNY = 'CNY',
  HKD = 'HKD',
  JPY = 'JPY'
}

// 计费单位枚举
export enum BillingUnit {
  PER_CONTAINER = 'per_container', // 每箱
  PER_TWENTY_CONTAINER = 'per_twenty_container', // 每20尺
  PER_FORTY_CONTAINER = 'per_forty_container', // 每40尺
  PER_TEU = 'per_teu', // 每TEU
  PER_CBM = 'per_cbm', // 每立方米
  PER_TON = 'per_ton', // 每吨
  PER_BILL = 'per_bill', // 每票
  PERCENTAGE = 'percentage' // 百分比
}

// 按箱型计费的运价明细
export interface ContainerRateDetail {
  id: string;
  containerType: ContainerType; // 箱型
  baseRate: number; // 基本运价
  currency: Currency; // 币种
  chargeDetails: ContainerChargeDetail[]; // 费用明细
  remarks?: string; // 备注
}

// 按箱型计费的费用明细
export interface ContainerChargeDetail {
  id: string;
  chargeType: ChargeType; // 费用类型
  chargeName: string; // 费用名称
  amount: number; // 金额
  currency: Currency; // 币种
  mandatory: boolean; // 是否必收
  remarks?: string; // 备注
}

// 非按箱型计费的运价明细
export interface NonContainerRateDetail {
  id: string;
  chargeType: ChargeType; // 费用类型
  chargeName: string; // 费用名称
  billingUnit: BillingUnit; // 计费单位
  unitPrice: number; // 单价
  currency: Currency; // 币种
  minimumCharge?: number; // 最低收费
  maximumCharge?: number; // 最高收费
  mandatory: boolean; // 是否必收
  remarks?: string; // 备注
}

// 运价表单数据接口
export interface RouteFormData {
  // 基本信息
  routeCode: string; // 运价号
  routeName: string; // 航线名称
  origin: string; // 起运港
  destination: string; // 目的港
  alliance: string; // 归属联盟
  spaceSharing: string[]; // 共舱方
  validFrom: string; // 生效日期
  validTo: string; // 失效日期
  transitTime: number; // 航程时间（天）
  frequency: string; // 班期
  carrier: string; // 承运人
  serviceType: string; // 服务类型
  bookingOffice: string; // 订舱代理
  remarks?: string; // 备注
  
  // 运价明细
  containerRates: ContainerRateDetail[]; // 按箱型计费
  nonContainerRates: NonContainerRateDetail[]; // 非按箱型计费
  
  // 状态信息
  status: 'draft' | 'active' | 'expired'; // 状态
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
}

// 选项数据
const allianceOptions = [
  { value: '2M', label: '2M联盟' },
  { value: 'OCEAN', label: '海洋联盟' },
  { value: 'THE', label: 'THE联盟' },
  { value: 'INDEPENDENT', label: '独立运营' }
];

const spaceSharingOptions = [
  { value: 'MAERSK', label: 'MAERSK | 马士基' },
  { value: 'MSC', label: 'MSC | 地中海航运' },
  { value: 'COSCO', label: 'COSCO | 中远海运' },
  { value: 'EVERGREEN', label: 'EVERGREEN | 长荣海运' },
  { value: 'OOCL', label: 'OOCL | 东方海外' },
  { value: 'CMA', label: 'CMA | 达飞轮船' },
  { value: 'ONE', label: 'ONE | 海洋网联船务' },
  { value: 'HAPAG', label: 'HAPAG | 赫伯罗特' },
  { value: 'YANG_MING', label: 'YANG_MING | 阳明海运' },
  { value: 'HMM', label: 'HMM | 现代商船' }
];

const portOptions = [
  { value: 'CNSHA', label: '上海港 Shanghai (CNSHA)' },
  { value: 'CNNGB', label: '宁波港 Ningbo (CNNGB)' },
  { value: 'CNSZN', label: '深圳港 Shenzhen (CNSZN)' },
  { value: 'CNQIN', label: '青岛港 Qingdao (CNQIN)' },
  { value: 'CNTXG', label: '天津港 Tianjin (CNTXG)' },
  { value: 'SGSIN', label: '新加坡港 Singapore (SGSIN)' },
  { value: 'JPYOK', label: '横滨港 Yokohama (JPYOK)' },
  { value: 'KRPUS', label: '釜山港 Busan (KRPUS)' },
  { value: 'USLAX', label: '洛杉矶港 Los Angeles (USLAX)' },
  { value: 'USLGB', label: '长滩港 Long Beach (USLGB)' },
  { value: 'DEHAM', label: '汉堡港 Hamburg (DEHAM)' },
  { value: 'NLRTM', label: '鹿特丹港 Rotterdam (NLRTM)' }
];

const containerTypeOptions = [
  { value: ContainerType.GP20, label: 'GP20 - 20尺普通干货箱' },
  { value: ContainerType.GP40, label: 'GP40 - 40尺普通干货箱' },
  { value: ContainerType.HQ40, label: 'HQ40 - 40尺高柜' },
  { value: ContainerType.GP45, label: 'GP45 - 45尺干货箱' },
  { value: ContainerType.RF20, label: 'RF20 - 20尺冷冻箱' },
  { value: ContainerType.RF40, label: 'RF40 - 40尺冷冻箱' },
  { value: ContainerType.OT20, label: 'OT20 - 20尺开顶箱' },
  { value: ContainerType.OT40, label: 'OT40 - 40尺开顶箱' },
  { value: ContainerType.FR20, label: 'FR20 - 20尺框架箱' },
  { value: ContainerType.FR40, label: 'FR40 - 40尺框架箱' }
];

const chargeTypeOptions = [
  { value: ChargeType.OCEAN_FREIGHT, label: '海运费 Ocean Freight' },
  { value: ChargeType.BAF, label: '燃油附加费 BAF' },
  { value: ChargeType.CAF, label: '货币调节费 CAF' },
  { value: ChargeType.PSS, label: '旺季附加费 PSS' },
  { value: ChargeType.GRI, label: '运价上涨附加费 GRI' },
  { value: ChargeType.ISPS, label: '港口安全费 ISPS' },
  { value: ChargeType.DOCUMENTATION, label: '文件费 Documentation' },
  { value: ChargeType.SEAL, label: '铅封费 Seal' },
  { value: ChargeType.CLEANING, label: '洗箱费 Cleaning' },
  { value: ChargeType.INSPECTION, label: '查验费 Inspection' },
  { value: ChargeType.OTHER, label: '其他费用 Other' }
];



const billingUnitOptions = [
  { value: BillingUnit.PER_CONTAINER, label: '每箱' },
  { value: BillingUnit.PER_TWENTY_CONTAINER, label: '每20尺' },
  { value: BillingUnit.PER_FORTY_CONTAINER, label: '每40尺' },
  { value: BillingUnit.PER_TEU, label: '每TEU' },
  { value: BillingUnit.PER_CBM, label: '每立方米' },
  { value: BillingUnit.PER_TON, label: '每吨' },
  { value: BillingUnit.PER_BILL, label: '每票' },
  { value: BillingUnit.PERCENTAGE, label: '百分比' }
];

const serviceTypeOptions = [
  { value: 'FCL', label: 'FCL - 整箱' },
  { value: 'LCL', label: 'LCL - 拼箱' },
  { value: 'BULK', label: 'BULK - 散货' }
];

const frequencyOptions = [
  { value: 'WEEKLY', label: '每周' },
  { value: 'BIWEEKLY', label: '隔周' },
  { value: 'MONTHLY', label: '每月' }
];

const RouteForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // 表单数据状态
  const [formData, setFormData] = useState<RouteFormData>({
    routeCode: '',
    routeName: '',
    origin: '',
    destination: '',
    alliance: '',
    spaceSharing: [],
    validFrom: '',
    validTo: '',
    transitTime: 0,
    frequency: '',
    carrier: '',
    serviceType: '',
    bookingOffice: '',
    remarks: '',
    containerRates: [],
    nonContainerRates: [],
    status: 'draft'
  });

  // 是否为编辑模式
  const isEdit = !!id;

  // 页面标题
  const pageTitle = isEdit ? '编辑运价' : '新增运价';

  // 删除箱型运价
  const deleteContainerRate = (index: number) => {
    const newRates = [...formData.containerRates];
    newRates.splice(index, 1);
    setFormData({ ...formData, containerRates: newRates });
    Message.success('删除成功');
  };

  // 添加箱型运价
  const addContainerRate = () => {
    Message.info('箱型运价添加功能待完善');
  };

  // 编辑箱型运价
  const editContainerRate = (_rate: ContainerRateDetail, _index: number) => {
    Message.info('箱型运价编辑功能待完善');
  };

  // 删除非箱型运价
  const deleteNonContainerRate = (index: number) => {
    const newRates = [...formData.nonContainerRates];
    newRates.splice(index, 1);
    setFormData({ ...formData, nonContainerRates: newRates });
    Message.success('删除成功');
  };

  // 添加非箱型运价
  const addNonContainerRate = () => {
    Message.info('非箱型运价添加功能待完善');
  };

  // 编辑非箱型运价
  const editNonContainerRate = (_rate: NonContainerRateDetail, _index: number) => {
    Message.info('非箱型运价编辑功能待完善');
  };

  return (
    <div style={{ padding: '24px', background: '#f5f6fa', minHeight: '100vh' }}>
      {/* 页面头部 */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<IconArrowLeft />}
            onClick={() => navigate('/controltower/route-maintenance')}
            style={{ marginRight: '12px' }}
          >
            返回
          </Button>
          <Title heading={4} style={{ margin: 0 }}>
            {pageTitle}
          </Title>
        </div>
        
        <Space>
          <Button onClick={() => navigate('/controltower/route-maintenance')}>
            取消
          </Button>
          <Button type="primary" loading={loading} icon={<IconSave />}>
            保存
          </Button>
        </Space>
      </div>

      {/* 主要内容区域 */}
      <Card>
        <Tabs activeTab={activeTab} onChange={setActiveTab} size="large">
          {/* 基本信息选项卡 */}
          <TabPane key="basic" title="基本信息">
            <div style={{ padding: '24px 0' }}>
              <Form
                form={form}
                layout="vertical"
                initialValues={formData}
                onValuesChange={(_changedValues, allValues) => {
                  setFormData({ ...formData, ...allValues });
                }}
              >
                {/* 运价基础信息 */}
                <Card title="运价基础信息" style={{ marginBottom: '24px' }}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <FormItem
                        label="运价号"
                        field="routeCode"
                        rules={[{ required: true, message: '请输入运价号' }]}
                      >
                        <Input placeholder="请输入运价号" maxLength={20} />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="航线名称"
                        field="routeName"
                        rules={[{ required: true, message: '请输入航线名称' }]}
                      >
                        <Input placeholder="请输入航线名称" maxLength={50} />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="服务类型"
                        field="serviceType"
                        rules={[{ required: true, message: '请选择服务类型' }]}
                      >
                        <Select placeholder="请选择服务类型">
                          {serviceTypeOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={8}>
                      <FormItem
                        label="起运港"
                        field="origin"
                        rules={[{ required: true, message: '请选择起运港' }]}
                      >
                        <Select placeholder="请选择起运港" showSearch>
                          {portOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="目的港"
                        field="destination"
                        rules={[{ required: true, message: '请选择目的港' }]}
                      >
                        <Select placeholder="请选择目的港" showSearch>
                          {portOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="航程时间"
                        field="transitTime"
                        rules={[{ required: true, message: '请输入航程时间' }]}
                      >
                        <InputNumber
                          placeholder="请输入航程时间"
                          suffix="天"
                          min={1}
                          max={90}
                          style={{ width: '100%' }}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>

                {/* 联盟和承运人信息 */}
                <Card title="联盟和承运人信息" style={{ marginBottom: '24px' }}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <FormItem
                        label="归属联盟"
                        field="alliance"
                        rules={[{ required: true, message: '请选择归属联盟' }]}
                      >
                        <Select placeholder="请选择归属联盟">
                          {allianceOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="承运人"
                        field="carrier"
                        rules={[{ required: true, message: '请输入承运人' }]}
                      >
                        <Input placeholder="请输入承运人" maxLength={100} />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="班期"
                        field="frequency"
                        rules={[{ required: true, message: '请选择班期' }]}
                      >
                        <Select placeholder="请选择班期">
                          {frequencyOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <FormItem
                        label="共舱方"
                        field="spaceSharing"
                        rules={[{ required: true, message: '请选择共舱方' }]}
                      >
                        <Select
                          placeholder="请选择共舱方"
                          mode="multiple"
                          maxTagCount={3}
                        >
                          {spaceSharingOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <FormItem
                        label="订舱代理"
                        field="bookingOffice"
                        rules={[{ required: true, message: '请输入订舱代理' }]}
                      >
                        <Input placeholder="请输入订舱代理" maxLength={100} />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>

                {/* 有效期信息 */}
                <Card title="有效期信息" style={{ marginBottom: '24px' }}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <FormItem
                        label="生效日期"
                        field="validFrom"
                        rules={[{ required: true, message: '请选择生效日期' }]}
                      >
                        <DatePicker
                          placeholder="请选择生效日期"
                          style={{ width: '100%' }}
                          format="YYYY-MM-DD"
                        />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="失效日期"
                        field="validTo"
                        rules={[{ required: true, message: '请选择失效日期' }]}
                      >
                        <DatePicker
                          placeholder="请选择失效日期"
                          style={{ width: '100%' }}
                          format="YYYY-MM-DD"
                        />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem
                        label="状态"
                        field="status"
                        rules={[{ required: true, message: '请选择状态' }]}
                      >
                        <Select placeholder="请选择状态">
                          <Option value="draft">草稿</Option>
                          <Option value="active">生效</Option>
                          <Option value="expired">失效</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                </Card>

                {/* 备注信息 */}
                <Card title="备注信息">
                  <Row gutter={24}>
                    <Col span={24}>
                      <FormItem
                        label="备注"
                        field="remarks"
                      >
                        <Input.TextArea
                          placeholder="请输入备注信息"
                          rows={4}
                          maxLength={500}
                          showWordLimit
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>
              </Form>
            </div>
          </TabPane>
          
          {/* 按箱型计费选项卡 */}
          <TabPane key="container_rates" title="按箱型计费">
            <div style={{ padding: '24px 0' }}>
              <Card
                title="按箱型计费运价明细"
                extra={
                  <Button type="primary" icon={<IconPlus />} onClick={addContainerRate}>
                    新增箱型运价
                  </Button>
                }
              >
                {formData.containerRates.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 0', 
                    color: '#999',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '6px',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>暂无箱型运价</div>
                    <div style={{ fontSize: '14px' }}>点击"新增箱型运价"开始添加</div>
                  </div>
                ) : (
                  <Table
                    columns={[
                      {
                        title: '箱型',
                        dataIndex: 'containerType',
                        width: 150,
                        render: (type: ContainerType) => {
                          const option = containerTypeOptions.find(opt => opt.value === type);
                          return <Tag color="blue">{option?.label || type}</Tag>;
                        }
                      },
                      {
                        title: '基本运价',
                        dataIndex: 'baseRate',
                        width: 120,
                        render: (rate: number, record: ContainerRateDetail) => (
                          <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                            {record.currency} {rate.toLocaleString()}
                          </span>
                        )
                      },
                      {
                        title: '费用明细',
                        dataIndex: 'chargeDetails',
                        render: (details: ContainerChargeDetail[]) => (
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {details.slice(0, 3).map((detail, index) => (
                              <Tag key={index} color="purple" size="small">
                                {detail.chargeName}
                              </Tag>
                            ))}
                            {details.length > 3 && (
                              <Tag color="gray" size="small">+{details.length - 3}</Tag>
                            )}
                          </div>
                        )
                      },
                      {
                        title: '备注',
                        dataIndex: 'remarks',
                        ellipsis: true,
                        render: (remarks: string) => (
                          <Tooltip content={remarks || '-'} mini>
                            <span>{remarks || '-'}</span>
                          </Tooltip>
                        )
                      },
                      {
                        title: '操作',
                        width: 120,
                        render: (_: unknown, record: ContainerRateDetail, index: number) => (
                          <Space>
                            <Button
                              type="text"
                              size="small"
                              icon={<IconEdit />}
                              onClick={() => editContainerRate(record, index)}
                            >
                              编辑
                            </Button>
                            <Button
                              type="text"
                              size="small"
                              status="danger"
                              icon={<IconDelete />}
                              onClick={() => deleteContainerRate(index)}
                            >
                              删除
                            </Button>
                          </Space>
                        )
                      }
                    ]}
                    data={formData.containerRates}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 800 }}
                  />
                )}
              </Card>
            </div>
          </TabPane>
          
          {/* 非按箱型计费选项卡 */}
          <TabPane key="non_container_rates" title="非按箱型计费">
            <div style={{ padding: '24px 0' }}>
              <Card
                title="非按箱型计费运价明细"
                extra={
                  <Button type="primary" icon={<IconPlus />} onClick={addNonContainerRate}>
                    新增费用项目
                  </Button>
                }
              >
                {formData.nonContainerRates.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 0', 
                    color: '#999',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '6px',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>暂无费用项目</div>
                    <div style={{ fontSize: '14px' }}>点击"新增费用项目"开始添加</div>
                  </div>
                ) : (
                  <Table
                    columns={[
                      {
                        title: '费用类型',
                        dataIndex: 'chargeType',
                        width: 150,
                        render: (type: ChargeType) => {
                          const option = chargeTypeOptions.find(opt => opt.value === type);
                          return <Tag color="green">{option?.label || type}</Tag>;
                        }
                      },
                      {
                        title: '费用名称',
                        dataIndex: 'chargeName',
                        width: 120,
                        ellipsis: true
                      },
                      {
                        title: '计费单位',
                        dataIndex: 'billingUnit',
                        width: 100,
                        render: (unit: BillingUnit) => {
                          const option = billingUnitOptions.find(opt => opt.value === unit);
                          return <Tag color="orange" size="small">{option?.label || unit}</Tag>;
                        }
                      },
                      {
                        title: '单价',
                        dataIndex: 'unitPrice',
                        width: 120,
                        render: (price: number, record?: NonContainerRateDetail) => (
                          <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                            {record?.currency} {price?.toLocaleString()}
                          </span>
                        )
                      },
                      {
                        title: '最低收费',
                        dataIndex: 'minimumCharge',
                        width: 100,
                        render: (charge?: number, record?: NonContainerRateDetail) => 
                          charge ? `${record?.currency} ${charge.toLocaleString()}` : '-'
                      },
                      {
                        title: '必收',
                        dataIndex: 'mandatory',
                        width: 60,
                        render: (mandatory: boolean) => (
                          <Tag color={mandatory ? 'red' : 'gray'} size="small">
                            {mandatory ? '是' : '否'}
                          </Tag>
                        )
                      },
                      {
                        title: '备注',
                        dataIndex: 'remarks',
                        ellipsis: true,
                        render: (remarks: string) => (
                          <Tooltip content={remarks || '-'} mini>
                            <span>{remarks || '-'}</span>
                          </Tooltip>
                        )
                      },
                      {
                        title: '操作',
                        width: 120,
                        render: (_: unknown, record?: NonContainerRateDetail, index?: number) => (
                          <Space>
                            <Button
                              type="text"
                              size="small"
                              icon={<IconEdit />}
                              onClick={() => record && typeof index === 'number' && editNonContainerRate(record, index)}
                            >
                              编辑
                            </Button>
                            <Button
                              type="text"
                              size="small"
                              status="danger"
                              icon={<IconDelete />}
                              onClick={() => typeof index === 'number' && deleteNonContainerRate(index)}
                            >
                              删除
                            </Button>
                          </Space>
                        )
                      }
                    ]}
                    data={formData.nonContainerRates}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 1000 }}
                  />
                )}
              </Card>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default RouteForm; 