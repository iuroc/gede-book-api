/// <reference path="types.d.mts" />

export class Book {
    private static gedeId = 847516381
    /** 获取类别列表 */
    static async getCategories(): Promise<{ id: number, name: string }[]> {
        const getData = async (gedeId?: number) => {
            const end = typeof gedeId == 'undefined' ? '' : `?gedeid=${gedeId}`
            const url = `https://gede.5read.com/apis/touchBook/bookCata.jspx${end}`
            const data = await fetch(url).then(res => res.json()) as ResData<ResCategory[]>
            if (!data.result) throw new Error(data.errorMsg)
            return data.msg.map(item => ({
                id: item.id,
                name: item.cataname
            }))
        }
        return (await Promise.all([
            getData(this.gedeId),
            getData()
        ])).flat()
    }

    /**
     * 获取指定类别的图书列表
     * @param catagoryId 图书类别编号
     * @param page 页码
     * @param pageSize 返回数据条数
     * @returns 
     */
    static async getList(catagoryId: number, page = 0, pageSize = 72): Promise<BookItem[]> {
        const params = new URLSearchParams({
            cataid: catagoryId.toString(),
            page: (page + 1).toString(),
            pageSize: pageSize.toString()
        }).toString()
        const url = `https://gede.5read.com/apis/touchBook/books.jspx?${params}`
        const data = await fetch(url).then(res => res.json()) as ResData<{
            allCount: number
            list: ResBookItem[],
            page: number,
            pageCount: number
            pageSize: number
        }>
        if (!data.result) throw new Error(data.errorMsg)
        return data.msg.list.map(item => ({
            name: item.title,
            author: item.author,
            bigCover: item.bcover,
            smallCover: item.cover,
            id: item.bookNum,
            price: item.price,
            publish: item.publish,
            summary: item.summary,
            surl: item.surl,
            webReadar: `http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${item.surl}`
        }))
    }

    /**
     * 获取图书详情
     * @param id 图书编号
     * @returns 
     */
    static async getInfo(id: string): Promise<BookInfo> {
        const url = `http://gede.5read.com/apis/touchBook/book.jspx?bookNum=${id}`
        const data = await fetch(url).then(res => res.json()) as ResData<ResBookInfo>
        if (!data.result) throw new Error(data.errorMsg)
        return {
            name: data.msg.title,
            author: data.msg.author,
            bigCover: data.msg.bcover,
            smallCover: data.msg.cover,
            id: data.msg.bookNum,
            price: data.msg.price,
            publish: data.msg.publish,
            summary: data.msg.summary,
            surl: data.msg.surl,
            epub: data.msg.path,
            publishTime: data.msg.pubTime,
            webReadar: `http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${data.msg.surl}`
        }
    }

    /**
     * 获取图书正文和目录数据
     * @param id 图书编号
     * @param page 页码
     * @param pageSize 数据条数
     * @param width 阅读器宽度像素，影响计算单页字数
     * @param height 阅读器高度像素，影响计算单页字数
     * @returns
     */
    static async getData(id: string, page = 0, pageSize = 36, width = 1500, height = 1500): Promise<BookData> {
        const params = new URLSearchParams({
            page: (page + 1).toString(),
            psize: pageSize.toString(),
            sid: id,
            w: width.toString(),
            h: height.toString(),
            detailUrl: `http://gede.5read.com/apis/touchBook/book.jspx?bookNum=${id}`,
            from: '4'
        }).toString()
        const url = `http://gede.5read.com/other/epub_epubRead_read.jspx?${params}`
        const data = await fetch(url).then(res => res.json()) as ResData<ResBookData>
        if (!data.result) throw new Error(data.errorMsg)
        return {
            catalogs: data.msg.catalogs,
            contents: data.msg.contents
        }
    }

    /** 获取图书目录数据 */
    static async getCatalog(id: string) {
        return await this.getData(id, 1, 0)
    }
}





/** HTTP 响应中的图书目录数据 */
type ResCategory = {
    cataid: string
    cataname: string
    id: number
    dataversion: string
}

/** HTTP 响应中的图书列表项 */
type ResBookItem = {
    author: string
    /** 大图封面 */
    bcover: string
    /** 小图封面 */
    cover: string
    bookNum: string
    /** 出版社 */
    publish: string
    /** 内容摘要 */
    summary: string
    surl: string
    /** 图书名称 */
    title: string
    /** 总页数 */
    pageNum: number
    /** 图书价格 */
    price: string
}

/** HTTP 响应中的图书详情信息 */
type ResBookInfo = ResBookItem & {
    /** EPUB 文件地址 */
    path: string
    /** 发布时间 */
    pubTime: string
}

/** 图书列表项 */
type BookItem = {
    name: string
    author: string
    id: string
    publish: string
    summary: string
    bigCover: string
    smallCover: string
    surl: string
    price: string
    /** 网页阅读器 */
    webReadar: string
}

/** 图书详情 */
type BookInfo = BookItem & {
    /** EPUB 文件地址 */
    epub: string
    /** 发布时间 */
    publishTime: string
}