export class Magazine {
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
            getData(),
            getData(847516381)
        ])).flat()
    }
}

type ResData<Data> = {
    result: true
    msg: Data
} | {
    result: false
    errorMsg: string
}

type ResCategory = {
    cataid: string
    cataname: string
    id: number
    dataversion: string
}