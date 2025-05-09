import React from 'react';
import { Typography, Card, DatePicker, Button } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const ReportingPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-bg-2)', borderRadius: 'var(--border-radius-medium)' }}>
      <Title heading={5}>报表管理</Title>
      <Paragraph>生成和查看各类业务报表。</Paragraph>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <RangePicker style={{ marginRight: '16px'}} />
        <Button type='primary' icon={<IconDownload />}>生成报表</Button>
      </div>
      <Card title="报表预览区">
        <Paragraph>这里将展示生成的报表数据或图表。</Paragraph>
      </Card>
    </div>
  );
};

export default ReportingPage; 