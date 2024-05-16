declare type ResData<Data> = {
    result: true
    msg: Data
} | {
    result: false
    errorMsg: string
}