# Linux操作系统与数据库教材

本项目是《Linux操作系统与数据库》教材的**纯 HTML 静态站点**，面向人工智能时代的 Linux 操作系统与数据库基础教学。

## 项目简介

- 不再依赖 MkDocs 或任何构建工具，所有页面均为可直接打开的静态 HTML。
- 教材页面存放在项目根目录，样式与脚本分别位于 `assets/css/` 与 `assets/js/`。
- 图片资源统一存放在 `assets/images/`。
- 旧版 Markdown/MkDocs 源文件已归档至 `archive/` 目录，仅作历史备份。

## 文件结构

```
Linux操作系统与数据库教材/
├── index.html              # 封面与全书目录
├── preface.html            # 序言
├── chapter-01.html         # 第一章 Linux的基础知识
├── case-xz-utils.html      # 延伸阅读：XZ Utils 后门事件
├── template.html           # 新增章节模板
├── assets/
│   ├── css/style.css       # 全局样式
│   ├── js/nav.js           # 导航与高亮脚本
│   └── images/             # 图片资源
├── archive/                # 历史归档（Markdown/MkDocs 源文件）
└── README.md               # 本说明
```

## 本地预览

### 方式一：直接双击打开

用浏览器直接双击打开 `index.html`，即可通过 `file://` 协议离线浏览教材。首页、侧边栏与页脚链接均使用相对路径，可正常跳转。

### 方式二：启动本地 HTTP 服务

在项目根目录运行以下命令：

```bash
python3 -m http.server 8000
```

然后在浏览器访问：

```
http://127.0.0.1:8000
```

> 提示：使用 HTTP 服务可以最真实地验证图片、脚本与链接的加载情况，推荐在修改后使用此方式检查。

## 新增章节流程

1. 复制 `template.html`，重命名为目标章节文件，例如 `chapter-new.html`。
2. 替换页面标题、正文内容以及页脚的“上一章 / 下一章”链接。
3. 在 `index.html` 的“全书目录”中新增对应条目。
4. 更新 `index.html`、`preface.html`、`chapter-01.html`、`case-xz-utils.html`、`template.html` 以及新增页面中的侧边栏导航，确保顺序一致。
5. 启动本地 HTTP 服务，检查新增页面与图片均可正常访问。
