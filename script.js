class Room {
    constructor(name, type, areaCalculator) {
        this.name = name;
        this.type = type;
        this.areaCalculator = areaCalculator;
    }

    getArea() {
        return this.areaCalculator.calculateArea();
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description || `Назва: ${this.name}, Тип: ${this.type}, Площа: ${this.getArea()} м²`;
    }
}

class RectangularRoom {
    constructor(length, width) {
        this.length = length > 0 ? length : 0;
        this.width = width > 0 ? width : 0;
    }

    calculateArea() {
        return this.length * this.width;
    }
}

class TriangularRoom {
    constructor(base, height) {
        this.base = base > 0 ? base : 0;
        this.height = height > 0 ? height : 0;
    }

    calculateArea() {
        return 0.5 * this.base * this.height;
    }
}

class CircularRoom {
    constructor(radius) {
        this.radius = radius > 0 ? radius : 0;
    }

    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}

class House {
    constructor() {
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    editRoom(name, newRoom) {
        const index = this.rooms.findIndex(room => room.name === name);

        (index !== -1) ? this.rooms[index] = newRoom : console.log('Room not found.');
    }

    getTotalLivingArea() {
        return this.rooms.reduce((totalArea, room) => {
            if (room.type === 'Вітальня') totalArea += room.getArea();

            return totalArea;
        }, 0);
    }

    getTotalArea() {
        return this.rooms.reduce((totalArea, room) => totalArea + room.getArea(), 0);
    }

    getRoomsList() {
        return this.rooms.map(room => room.getDescription());
    }

    getRoomsCountByForm() {
        const countByForm = {};
        
        this.rooms.forEach(room => {
            const form = room.areaCalculator.constructor.name;
            countByForm[form] = (countByForm[form] || 0) + 1;
        });

        return countByForm;
    }

    getRoomsCountByType() {
        const countByType = { };

        this.rooms.forEach(room => {
            countByType[room.type] = (countByType[room.type] || 0) + 1;
        });
        
        return countByType;
    }

    getGasUsage() {
        return Math.floor(Math.random() * 100) + 1;
    }

    getWaterUsage() {
        return Math.floor(Math.random() * 1000) + 1;
    }
}

// Приклад використання
const house = new House();

const livingRoom = new Room('Вітальня кімната', 'Вітальня', new RectangularRoom(5, 6));
const bedroom = new Room('Спальня', 'Вітальня', new RectangularRoom(4, 4));
const kitchen = new Room('Кухня', 'Підсобне приміщення', new RectangularRoom(3, 3));
const bathroom = new Room('Душова кімната', 'Підсобне приміщення', new RectangularRoom(2, 2));
const triangularRoom = new Room('Трикутна кімната', 'Вітальня', new TriangularRoom(4, 5));
const circularRoom = new Room('Кругла кімната', 'Вітальня', new CircularRoom(3));

house.addRoom(livingRoom);
house.addRoom(bedroom);
house.addRoom(kitchen);
house.addRoom(bathroom);
house.addRoom(triangularRoom);
house.addRoom(circularRoom);

console.log('Загальна площа житлових кімнат:', house.getTotalLivingArea(), 'м²');
console.log('Площалоща всіх кімнат:', house.getTotalArea(), 'м²');
console.log('Перелік кімнат:', house.getRoomsList());
console.log('Кількість кімнат кожної Форми:', house.getRoomsCountByForm());
console.log('Кількість кімнат кожного Типу:', house.getRoomsCountByType());
console.log('Використано Газу:', house.getGasUsage(), 'м³');
console.log('Використано Води:', house.getWaterUsage(), 'літрів');

// Редагування кімнати
const newLivingRoom = new Room('Вітальня кімната', 'Вітальня', new RectangularRoom(6, 6));
house.editRoom('Вітальня кімната', newLivingRoom);
console.log('Список кімнат після редагування:', house.getRoomsList());