class ListNode {
    data: any
    next: any

    constructor(data: any) {
        this.data = data
        this.next = null
    }
}
class Linked {

    head: any

    constructor(head: any = null) {
        this.head = head
    }

    size(): number {
        let count = 0

        let node = this.head
        while (node) {
            count++
            node = node.next
        }
        return count
    }

    clear(): void {
        this.head = null
    }

    getLast(): any {
        let lastNode = this.head
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }

        return lastNode
    }

}

let node1 = new ListNode(1)
let node2 = new ListNode(2)
let node3 = new ListNode(3)
node1.next = node2
node2.next = node3

/*
let node1 = new ListNode({ id: 1, name: 'mostafa' })
let node2 = new ListNode({ id: 2, name: 'sarah' })
let node3 = new ListNode({ id: 3, name: 'hanna' })
*/

const l: Linked = new Linked(node1)

console.log("linked:", l.head.next.next.data, l.getLast(), l.size())
//console.log("linked:", l.head.data, l.getLast(), l.size())
