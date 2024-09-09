declare class Book {
    private static gedeId;
    /** 获取类别列表 */
    static getCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
    /**
     * 获取指定类别的图书列表
     * @param catagoryId 图书类别编号
     * @param page 页码
     * @param pageSize 返回数据条数
     * @returns
     */
    static getList(catagoryId: number, page?: number, pageSize?: number): Promise<BookItem[]>;
    /**
     * 获取图书详情
     * @param id 图书编号
     * @returns
     */
    static getInfo(id: string): Promise<BookInfo>;
    /**
     * 获取图书正文和目录数据
     * @param id 图书编号
     * @param page 页码
     * @param pageSize 数据条数
     * @param width 阅读器宽度像素，影响计算单页字数
     * @param height 阅读器高度像素，影响计算单页字数
     * @returns
     */
    static getData(id: string, page?: number, pageSize?: number, width?: number, height?: number): Promise<BookData>;
    /** 获取图书目录数据 */
    static getCatalog(id: string): Promise<BookData>;
}
/** 图书列表项 */
type BookItem = {
    name: string;
    author: string;
    id: string;
    publish: string;
    summary: string;
    bigCover: string;
    smallCover: string;
    surl: string;
    price: string;
    /** 网页阅读器 */
    webReader: string;
    type: 'HY' | 'GD';
    isbn: string;
};
/** 图书详情 */
type BookInfo = BookItem & {
    /** EPUB 文件地址 */
    epub: string;
    /** 发布时间 */
    publishTime: string;
};

declare class Magazine {
    private static gedeId;
    /** 获取类别列表 */
    static getCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
    /** 加载指定类别的期刊列表 */
    static getList(catagoryId: number, page?: number, pageSize?: number): Promise<MagazineItem[]>;
    /**
     * 获取期刊的分期列表
     * @param id 期刊编号
     * @returns
     */
    static getIssues(id: number): Promise<IssueItem[]>;
    /**
     * 获取期刊正文和目录数据
     * @param surl 某期的 `surl`
     * @param issueId 某期编号
     * @param page 页码
     * @param pageSize 数据条数
     * @param width 阅读器宽度像素，影响计算单页字数
     * @param height 阅读器高度像素，影响计算单页字数
     * @returns
     */
    static getData(surl: string, issueId: string, page?: number, pageSize?: number, width?: number, height?: number): Promise<BookData>;
    /** 获取期刊目录数据 */
    static getCatalog(surl: string, issueId: string): Promise<BookData>;
    private static getDetailURL;
}
type MagazineItem = {
    /** 期刊名称 */
    name: string;
    /** 在线阅读器所需参数 */
    surl: string;
    /** 期刊编号 */
    id: number;
    /** 国内刊号 */
    cn: string;
    /** 国际刊号 */
    issn: string;
    /** 期刊介绍 */
    summary: string;
    /** 封面地址 */
    cover: string;
};
type IssueItem = {
    issueId: string;
    magazineName: string;
    cover: string;
    name: string;
    qrCode: string;
    surl: string;
    webReader: string;
};

export { Book, Magazine };
