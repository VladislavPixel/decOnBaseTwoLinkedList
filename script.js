class Link{ // элемент базовой структуры
   constructor(value) {
      this.val = value
      this.prev = null
      this.next = null
   }
   displayLink() {
      console.log(`el: ${this.val}`)
   }
}

class TwoLinkedList{ // base-structure (двусвязный список)
   #first
   #last
   constructor() {
      this.#first = null
      this.#last = null
   }
   isEmpty() {
      return this.#first === null
   }
   insertLast(value) {
      const link = new Link(value)
      if (this.isEmpty()) {
         this.#first = link
         this.#last = this.#first
      } else {
         this.#last.next = link
         link.prev = this.#last
         this.#last = link
      }

      return { top: this.#first, lower: this.#last }
   }
   insertFirst(value) {
      const link = new Link(value)
      if (this.isEmpty()) {
         this.#first = link
         this.#last = link
      } else {
         link.next = this.#first
         this.#first.prev = link
         this.#first = link
      }

      return { top: this.#first, lower: this.#last }
   }
   displayNext() {
      if (this.isEmpty()) {
         console.log("Base structure DecQueue is Empty!")
         return false
      }
      let current = this.#first
      while(current) {
         current.displayLink()
         current = current.next
      }
      return true
   }
   displayPrev() {
      if (this.isEmpty()) {
         console.log("Base structure DecQueue is Empty!")
         return false
      }
      let current = this.#last
      while(current) {
         current.displayLink()
         current = current.prev
      }
      return true
   }
   deleteFirst() {
      if (this.isEmpty()) {
         console.log("Operation deleteFirst is not supported in empty DecQueue!")
         return { top: null, lower: null, deleted: null }
      }
      const deletedElement = this.#first
      if (this.#first === this.#last) {
         this.#first = null
         this.#last = this.#first
      } else {
         this.#first = this.#first.next
         this.#first.prev = null
      }
      return { top: this.#first, lower: this.#last, deleted: deletedElement }
   }
   deleteLast() {
      if (this.isEmpty()) {
         console.log("Operation deleteLast is not supported in empty DecQueue!")
         return { top: null, lower: null, deleted: null }
      }
      const deletedElement = this.#last
      if (this.#first === this.#last) {
         this.#first = null
         this.#last = this.#first
      } else {
         this.#last = this.#last.prev
         this.#last.next = null
      }
      return { top: this.#first, lower: this.#last, deleted: deletedElement }
   }
   insertAfterLink(keyLink, value) {
      if (this.isEmpty()) {
         console.log("Operation insertAfter is not supported in empty DecQueue!")
         return { top: null, lower: null }
      }

      let current = this.#first
      while(current !== null && current.val !== keyLink) {
         current = current.next
      }
      if (current === null) {
         console.log(`${keyLink} is not found in DecQueue.`)
         return { top: this.#first, lower: this.#last }
      }
      const link = new Link(value)
      link.next = current.next
      current.next = link
      link.prev = current
      if (link.next === null) {
         this.#last = link
      } else {
         link.next.prev = link
      }

      return { top: this.#first, lower: this.#last }
   }
   inserBeforeLink(keyLink, value) {
      if (this.isEmpty()) {
         console.log("Operation insertBefore is not supported in empty DecQueue!")
         return { top: null, lower: null }
      }

      let current = this.#first
      while(current !== null && current.val !== keyLink) {
         current = current.next
      }
      if (current === null) {
         console.log(`${keyLink} is not found in DecQueue.`)
         return { top: this.#first, lower: this.#last }
      }
      const link = new Link(value)
      link.prev = current.prev
      link.next = current
      if (link.prev === null) {
         this.#first = link
      } else {
         current.prev.next = link
      }
      current.prev = link

      return { top: this.#first, lower: this.#last }
   }
   deletedAfterLink(value) {
      if (this.isEmpty() || this.#first === this.#last) {
         console.log("Operation deletedAfter is not supported in decQueue when there are few elements.")
         return { top: null, lower: null, deleted: null }
      }
      let current = this.#first
      while(current !== null && current.val !== value) {
         current = current.next
      }
      if (current === null) {
         console.log(`${value} is not found in DecQueue`)
         return { top: this.#first, lower: this.#last, deleted: null }
      }
      if (current === this.#last) {
         console.log(`${value} is last element in DecQueue. There is nothing to delete.`)
         return { top: this.#first, lower: this.#last, deleted: null }
      }
      const deletedElement = current.next
      current.next = current.next.next
      if (current.next === null) {
         this.#last = current
      } else {
         current.next.prev = current
      }

      return { top: this.#first, lower: this.#last, deleted: deletedElement }
   }
   deletedBeforeLink(value) {
      if (this.isEmpty() || this.#first === this.#last) {
         console.log("Operation deletedBefore is not supported in decQueue when there are few elements.")
         return { top: null, lower: null, deleted: null }
      }
      let current = this.#first
      while(current !== null && current.val !== value) {
         current = current.next
      }
      if (current === null) {
         console.log(`${value} is not found in DecQueue.`)
         return { top: this.#first, lower: this.#last, deleted: null }
      }
      if (current === this.#first) {
         console.log(`${value} is first element in DecQueue. There is nothing to delete.`)
         return { top: this.#first, lower: this.#last, deleted: null }
      }
      const deletedElement = current.prev
      if (current.prev === this.#first) {
         this.#first = current
         current.prev = null
      } else {
         current.prev.prev.next = current
         current.prev = current.prev.prev
      }
      return { top: this.#first, lower: this.#last, deleted: deletedElement }
   }
   findLink(searchKey) {
      if (this.isEmpty()) {
         console.log(`DecQueue is Empty! SearchKey ${searchKey} is not found is empty DecQueue.`)
         return null
      }
      let current = this.#first
      while(current !== null && current.val !== searchKey) {
         current = current.next
      }
      if (current === null) {
         console.log(`${searchKey} is not found in DecQueue.`)
         return null
      }
      return current
   }
   deleteByKey(value) {
      if (this.isEmpty()) {
         console.log("Operation deleteElementByKey is not supported in empty DecQueue.")
         return null
      }
      let current = this.#first
      while(current !== null && current.val !== value) {
         current = current.next
      }
      if (current === null) {
         console.log(`${value} is not found in DecQueue.`)
         return null
      }
      const deletedElement = current
      if (current === this.#first) {
         this.#first = this.#first.next
         this.#first.prev = null
      } else if (current === this.#last) {
         this.#last = this.#last.prev
         this.#last.next = null
      } else {
         current.prev.next = current.next
         current.next.prev = current.prev
      }
      return { top: this.#first, lower: this.#last, deleted: deletedElement }
   }
}

class DecQueue{ // Пользователь базовой структуры
   // ADT (Abstraction Data Type) / Дек - двухсторонняя очередь
   #top
   #lower
   #base
   constructor() {
      this.#top = null
      this.#lower = null
      this.#base = new TwoLinkedList()
   }
   isEmpty() {
      // Проверка на пустоту очереди
      return this.#base.isEmpty()
   }
   pushLower(newValue) {
      // Добавление в конец
      const { top, lower } = this.#base.insertLast(newValue)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
   }
   pushTop(newValue) {
      // Добавление в начало
      const { top, lower } = this.#base.insertFirst(newValue)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
   }
   displayTopToLower() {
      // Вывод участников очереди с первого по последнего
      this.#base.displayNext()
   }
   displayLowerToTop() {
      // Вывод участников от последнего по первого
      this.#base.displayPrev()
   }
   deleteTop() {
      // Выход из очереди первого элемента
      const { top, lower, deleted } = this.#base.deleteFirst()
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
      return deleted
   }
   deleteLower() {
      // Выход из очереди последнего элемента
      const { top, lower, deleted } = this.#base.deleteLast()
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
      return deleted
   }
   peekTop() {
      // Посмотреть на первого в очереди
      if (this.isEmpty()) {
         console.log("DecQueue is Empty!")
         return null
      }
      return this.#top
   }
   peekLower() {
      // Посмотреть на последнего в очереди
      if (this.isEmpty()) {
         console.log("DecQueue is Empty!")
         return null
      }
      return this.#lower
   }
   insertAfter(keyLink, newValue) {
      // Вставка нового элемента после указанного элемента
      const { top, lower } = this.#base.insertAfterLink(keyLink, newValue)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
   }
   insertBefore(keyLink, newValue) {
      // Вставка нового элемента перед указанным ключом
      const { top, lower } = this.#base.inserBeforeLink(keyLink, newValue)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
   }
   deletedAfter(keyLink) {
      // Удаление элемента после указанного ключа
      const { top, lower, deleted } = this.#base.deletedAfterLink(keyLink)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
      return deleted
   }
   deletedBefore(keyLink) {
      // Удаление элемента до указанного ключа
      const { top, lower, deleted } = this.#base.deletedBeforeLink(keyLink)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
      return deleted
   }
   find(searchValue) {
      // Поиск элемента в очереди
      return this.#base.findLink(searchValue)
   }
   deleteElementByKey(deletedKey) {
      // Удаление элемента из очереди из произвольных позиций
      const { top, lower, deleted } = this.#base.deleteByKey(deletedKey)
      if (this.#top !== top) this.#top = top
      if (this.#lower !== lower) this.#lower = lower
      return deleted
   }
}

class DecQueueApp{ // Класс-точка входа в структуру
   static main() {
      const decQueue = new DecQueue()
      const arrValues = [20, 10, 100, 5, 44, 78, 51]
      arrValues.forEach(value => decQueue.pushLower(value))
      
      console.log(decQueue.deleteElementByKey(100))
      console.log(decQueue)
   }
}

DecQueueApp.main()