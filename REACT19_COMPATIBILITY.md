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

## 其他警告

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