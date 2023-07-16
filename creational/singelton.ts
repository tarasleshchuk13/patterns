class MyMap {
    private static instance: MyMap
    
    map: Map<number, string> = new Map()
    
    private constructor() {
    }
    
    public static get(): MyMap {
        if (!MyMap.instance) {
            MyMap.instance = new MyMap()
        }
        return MyMap.instance
    }
    
    clean() {
        this.map = new Map()
    }
}
