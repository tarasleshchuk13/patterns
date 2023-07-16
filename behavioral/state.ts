class DocumentItem {
    text: string
    private state: DocumentItemState
    
    constructor() {
        this.setState(new DraftDocumentItemsState())
    }
    
    getState() {
        return this.state
    }
    
    setState(state: DocumentItemState) {
        this.state = state
        this.state.setContext(this)
    }
    
    publishDoc() {
        this.state.publish()
    }
    
    deleteDoc() {
        this.state.delete()
    }
}

abstract class DocumentItemState {
    name: string
    item: DocumentItem
    
    setContext(item: DocumentItem) {
        this.item = item
    }
    
    abstract publish(): void
    
    abstract delete(): void
}

class DraftDocumentItemsState extends DocumentItemState {
    constructor() {
        super()
        this.name = 'DraftDocument'
    }
    
    publish(): void {
        console.log(`Text sent. Text - ${this.item.text}`)
        this.item.setState(new PublishDocumentItemsState)
    }
    
    delete(): void {
        console.log('Doc is deleted')
    }
}

class PublishDocumentItemsState extends DocumentItemState {
    constructor() {
        super()
        this.name = 'PublishDocument'
    }
    
    publish(): void {
        console.log('Forbidden to publish published doc')
    }
    
    delete(): void {
        console.log('Deleted publish')
        this.item.setState(new DraftDocumentItemsState())
    }
}

const item = new DocumentItem()
item.text = 'My post!'
console.log(item.getState())
item.publishDoc()
item.publishDoc()
console.log(item.getState())
item.deleteDoc()
console.log(item.getState())
