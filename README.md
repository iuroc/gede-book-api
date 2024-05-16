# gede-book-api

> 歌德电子书借阅机 API

## 免责声明

本项目仅供编程学习交流使用，请勿将其用于任何非法用途。如若违反使用规定，产生的任何后果由使用者承担。

## 快速开始

```
npm install gede-book-api
```

## API 文档

### 图书部分

```ts
(method) Book.getCategories(): Promise<{
    id: number;
    name: string;
}[]>

获取类别列表
```

```ts
(method) Book.getList(
    catagoryId: number,
    page?: number,
    pageSize?: number
): Promise<BookItem[]>

获取指定类别的图书列表

@param catagoryId — 图书类别编号

@param page — 页码

@param pageSize — 返回数据条数
```

```ts
(method) Book.getInfo(id: string): Promise<BookInfo>

获取图书详情

@param id — 图书编号
```

```ts
(method) Book.getData(
    id: string,
    page?: number,
    pageSize?: number,
    width?: number,
    height?: number
): Promise<BookData>

获取图书正文和目录数据

@param id — 图书编号

@param page — 页码

@param pageSize — 数据条数

@param width — 阅读器宽度像素，影响计算单页字数
```

```ts
(method) Book.getCatalog(id: string): Promise<BookData>

获取图书目录数据
```

### 期刊部分

```ts
(method) Magazine.getCategories(): Promise<{
    id: number;
    name: string;
}[]>

获取类别列表
```

```ts
(method) Magazine.getList(
    catagoryId: number,
    page?: number,
    pageSize?: number
): Promise<MagazineItem[]>

加载指定类别的期刊列表
```

```ts
(method) Magazine.getIssues(id: number): Promise<IssueItem[]>

获取期刊的分期列表

@param id — 期刊编号
```

```ts
(method) Magazine.getData(
    surl: string,
    issueId: string,
    page?: number,
    pageSize?: number,
    width?: number,
    height?: number
): Promise<BookData>
 
获取期刊正文和目录数据

@param surl — 某期的 surl

@param issueId — 某期编号

@param page — 页码

@param pageSize — 数据条数
```

```ts
(method) Magazine.getCatalog(surl: string, issueId: string): Promise<BookData>

获取期刊目录数据
```