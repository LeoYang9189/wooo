# React 19 兼容性说明

## 已知问题

### Arco Design 组件库警告

**警告信息：**
```
Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.
```

**问题来源：**
- 这个警告来自 `@arco-design/web-react` 组件库的内部实现
- 主要出现在 Form 组件的 `setFieldsValue` 方法调用时
- 这是第三方库在 React 19 中的兼容性问题

**影响范围：**
- 不影响应用功能
- 仅在开发环境控制台显示警告
- 生产环境不受影响

**解决方案：**
- 等待 Arco Design 发布 React 19 兼容版本
- 或者考虑降级到 React 18 (不推荐)
- 当前可以安全忽略此警告

**相关文件：**
- `src/components/platformadmin/pages/ExchangeRateManagement.tsx`
- `src/components/controltower/pages/ExchangeRateManagement.tsx`
- 以及其他使用 Arco Design Form 组件的文件

## 其他问题

### ReactDOM.render 渲染错误
```
CopyReactDOM.render is not a function
```

**问题来源：**
- Arco Design 组件库在 React 19 中的兼容性问题
- 内部使用了已废弃的 ReactDOM.render 方法
- 主要出现在 Message、Modal、Form 等组件的内部渲染逻辑中

**影响范围：**
- Message.success、Message.error 等方法调用时出现
- Modal 弹窗操作时可能出现
- Form 表单提交时可能出现（如汇率设置页面的保存操作）
- 不影响核心功能，但会在控制台显示错误

**出现场景：**
- 汇率设置页面新增/编辑保存时（`handleSaveExchangeRate` 函数）
- 其他使用 Arco Design 组件的表单操作

**解决方案：**
- 等待 Arco Design 发布 React 19 兼容版本
- 当前可以正常使用，错误不影响实际功能
- 用户操作依然可以正常完成

### 数据类型错误
```
rate.toFixed is not a function
```

**问题来源：**
- 表单输入的数值可能是字符串类型
- 在渲染时直接调用数字方法导致错误

**解决方案：**
- 在保存数据时使用 `parseFloat()` 确保数值类型
- 在渲染时检查数据类型，兼容字符串和数字
- 已在汇率设置页面中修复

### useDraggable 警告
```
useDraggable: Container for initialSnapArea has zero width or height. Cannot calculate relative center from snap area. Falling back to initialRelativeCenter or undefined.
```

**问题来源：**
- 来自拖拽组件的初始化
- 通常在组件首次渲染时容器尺寸未确定导致

**解决方案：**
- 确保拖拽容器有明确的宽高
- 或者在容器尺寸确定后再初始化拖拽功能

---

*最后更新：2024-12-19* 