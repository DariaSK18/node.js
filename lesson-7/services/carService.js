import Car from "../models/Car.mjs";

export const getAll = async () => {
    return await Car.find()
}

export const getById = async (id) => {
    return await Car.findById(id)
}

export const create = async (data) => {
    const car = new Car(data)
    return await car.save()
}

export const update = async (id, data) => {
    return Car.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
}

export const deleteById = async (id) => {
    return await Car.findByIdAndDelete(id)
}